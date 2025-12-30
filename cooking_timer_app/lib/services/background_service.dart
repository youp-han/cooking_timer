import 'dart:async';
import 'dart:ui';
import 'package:flutter/widgets.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_background_service/flutter_background_service.dart';
import 'package:flutter_background_service_android/flutter_background_service_android.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:sourdough_timer/database/database.dart';
import 'package:drift/drift.dart' as drift;
import 'package:shared_preferences/shared_preferences.dart';

const String notificationChannelId = 'sourdough_timer_channel';
const int notificationId = 888;

final FlutterLocalNotificationsPlugin flutterLocalNotificationsPlugin = FlutterLocalNotificationsPlugin();

Future<void> initializeService() async {
  final service = FlutterBackgroundService();

  const AndroidNotificationChannel channel = AndroidNotificationChannel(
    notificationChannelId,
    '사워도우 타이머',
    description: '타이머가 백그라운드에서 실행 중입니다.',
    importance: Importance.high,
  );

  await flutterLocalNotificationsPlugin
      .resolvePlatformSpecificImplementation<
          AndroidFlutterLocalNotificationsPlugin>()
      ?.createNotificationChannel(channel);

  await service.configure(
    androidConfiguration: AndroidConfiguration(
      onStart: onStart,
      autoStart: true,
      isForegroundMode: true,
      notificationChannelId: notificationChannelId,
      initialNotificationTitle: '사워도우 타이머',
      initialNotificationContent: '서비스를 초기화하는 중...',
      foregroundServiceNotificationId: notificationId,
    ),
    iosConfiguration: IosConfiguration(
      autoStart: true,
      onForeground: onStart,
      onBackground: onIosBackground,
    ),
  );
}

@pragma('vm:entry-point')
Future<bool> onIosBackground(ServiceInstance service) async {
  WidgetsFlutterBinding.ensureInitialized();
  DartPluginRegistrant.ensureInitialized();
  return true;
}

@pragma('vm:entry-point')
void onStart(ServiceInstance service) async {
  DartPluginRegistrant.ensureInitialized();

  final AppDatabase db = AppDatabase();
  final Map<int, int> lastNotifiedStep = {};

  if (service is AndroidServiceInstance) {
    service.on('setAsForeground').listen((event) {
      service.setAsForegroundService();
    });
    service.on('setAsBackground').listen((event) {
      service.setAsBackgroundService();
    });
  }

  service.on('stopSelf').listen((event) {
    service.stopSelf();
  });

  service.on('startTimer').listen((event) async {
    if (event == null) return;
    final name = event['name'] as String;
    final stepsData = event['steps'] as List<dynamic>;

    final schedule = TimerSchedulesCompanion(
      name: drift.Value(name),
      startTime: drift.Value(DateTime.now()),
    );

    final stepCompanions = <TimerStepsCompanion>[];
    for (int i = 0; i < stepsData.length; i++) {
      final step = stepsData[i] as Map<String, dynamic>;
      stepCompanions.add(
        TimerStepsCompanion(
          stepName: drift.Value(step['name'] as String),
          durationInMinutes: drift.Value(step['duration'] as int),
          stepOrder: drift.Value(i),
        ),
      );
    }
    await db.createScheduleWithSteps(schedule, stepCompanions);
  });
  
  service.on('deleteSchedule').listen((event) async {
    if (event == null) return;
    final scheduleId = event['scheduleId'] as int;
    await db.deleteSchedule(scheduleId);
  });

  Timer.periodic(const Duration(seconds: 1), (timer) async {
    final allSchedulesWithSteps = await db.watchAllSchedulesWithSteps().first;
    final List<Map<String, dynamic>> activeTimersData = [];

    for (var scheduleWithSteps in allSchedulesWithSteps) {
      final schedule = scheduleWithSteps.schedule;
      final steps = scheduleWithSteps.steps;
      final now = DateTime.now();
      final elapsed = now.difference(schedule.startTime);

      int cumulativeDuration = 0;
      int totalDuration = steps.fold(0, (prev, step) => prev + step.durationInMinutes);
      if (totalDuration == 0) totalDuration = 1;

      String currentStepName = '완료';
      Duration timeRemaining = Duration.zero;
      int currentStepIndex = steps.length;
      double progress = 1.0;
      bool isCompleted = true;

      for (int i = 0; i < steps.length; i++) {
        final step = steps[i];
        cumulativeDuration += step.durationInMinutes;
        if (elapsed.inMinutes < cumulativeDuration) {
          isCompleted = false;
          currentStepIndex = i;
          currentStepName = step.stepName;
          timeRemaining = Duration(minutes: cumulativeDuration) - elapsed;
          progress = elapsed.inSeconds / (totalDuration * 60);
          if (progress > 1.0) progress = 1.0;

          if (timeRemaining.inSeconds <= 0 && (lastNotifiedStep[schedule.id] ?? -1) < i) {
            final prefs = await SharedPreferences.getInstance();
            final isNotificationEnabled = prefs.getBool('timer_notification_enabled') ?? true;

            if (isNotificationEnabled) {
              flutterLocalNotificationsPlugin.show(
                schedule.id,
                '${schedule.name}: ${step.stepName} 완료!',
                '다음 단계로 넘어갈 시간입니다.',
                const NotificationDetails(
                  android: AndroidNotificationDetails(
                    notificationChannelId, '사워도우 타이머',
                    icon: '@mipmap/ic_launcher',
                    importance: Importance.high,
                    sound: RawResourceAndroidNotificationSound('stage_complete'),
                  ),
                ),
              );
            }
            lastNotifiedStep[schedule.id] = i;
          }
          break;
        }
      }
      
      if (isCompleted && (lastNotifiedStep[schedule.id] ?? -1) < steps.length) {
         final prefs = await SharedPreferences.getInstance();
         final isNotificationEnabled = prefs.getBool('timer_notification_enabled') ?? true;

         if (isNotificationEnabled) {
           flutterLocalNotificationsPlugin.show(
              schedule.id,
              '${schedule.name}: 모든 단계 완료!',
              '수고하셨습니다!',
              const NotificationDetails(
                android: AndroidNotificationDetails(
                  notificationChannelId, '사워도우 타이머',
                  icon: '@mipmap/ic_launcher',
                  importance: Importance.high,
                  sound: RawResourceAndroidNotificationSound('timer_complete'),
                ),
              ),
            );
         }
         lastNotifiedStep[schedule.id] = steps.length;
         await db.deleteSchedule(schedule.id);
      }


      activeTimersData.add({
        'id': schedule.id,
        'name': schedule.name,
        'currentStepName': currentStepName,
        'currentStepIndex': currentStepIndex,
        'totalSteps': steps.length,
        'timeRemaining': timeRemaining.inSeconds,
        'progress': progress,
        'isCompleted': isCompleted,
      });
    }

    if (service is AndroidServiceInstance) {
      if (await service.isForegroundService()) {
        String content = activeTimersData.isEmpty
            ? '진행 중인 타이머 없음'
            : '${activeTimersData.length}개의 타이머가 실행 중입니다.';
        
        flutterLocalNotificationsPlugin.show(
          notificationId,
          '사워도우 타이머',
          content,
          const NotificationDetails(
            android: AndroidNotificationDetails(
              notificationChannelId,
              '사워도우 타이머',
              icon: '@mipmap/ic_launcher',
              ongoing: true,
            ),
          ),
        );
      }
    }

    service.invoke('update', {'activeTimers': activeTimersData});
  });
}
