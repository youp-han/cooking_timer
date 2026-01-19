import 'dart:async';
import 'dart:ui';
import 'package:flutter/widgets.dart';
import 'package:flutter_background_service/flutter_background_service.dart';
import 'package:flutter_background_service_android/flutter_background_service_android.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:sourdough_timer/database/database.dart';
import 'package:sourdough_timer/services/notification_service.dart';
import 'package:sourdough_timer/services/timer_calculation_service.dart';
import 'package:drift/drift.dart' as drift;

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
  final NotificationService notificationService = NotificationService(flutterLocalNotificationsPlugin);
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

  // 타이머를 5초마다 실행하여 데이터베이스 쿼리 빈도 감소 (60회/분 → 12회/분)
  Timer.periodic(const Duration(seconds: 5), (timer) async {
    final allSchedulesWithSteps = await db.watchAllSchedulesWithSteps().first;
    final List<Map<String, dynamic>> activeTimersData = [];

    for (var scheduleWithSteps in allSchedulesWithSteps) {
      final schedule = scheduleWithSteps.schedule;
      final steps = scheduleWithSteps.steps;

      // TimerCalculationService를 사용하여 타이머 상태 계산
      final timerState = TimerCalculationService.calculateTimerState(
        schedule: schedule,
        steps: steps,
        lastNotifiedStep: lastNotifiedStep[schedule.id] ?? -1,
      );

      // 단계 완료 알림
      if (timerState.shouldNotifyStepComplete) {
        await notificationService.showStepCompleteNotification(
          scheduleId: schedule.id,
          scheduleName: schedule.name,
          stepName: steps[timerState.currentStepIndex].stepName,
        );
        lastNotifiedStep[schedule.id] = timerState.currentStepIndex;
      }

      // 타이머 전체 완료 알림 및 스케줄 삭제
      if (timerState.shouldNotifyTimerComplete) {
        await notificationService.showTimerCompleteNotification(
          scheduleId: schedule.id,
          scheduleName: schedule.name,
        );
        lastNotifiedStep[schedule.id] = steps.length;
        await db.deleteSchedule(schedule.id);
      }

      // 활성 타이머 데이터에 추가
      activeTimersData.add(timerState.toMap(schedule.id, schedule.name));
    }

    // 포그라운드 서비스 알림 업데이트 (Android만)
    if (service is AndroidServiceInstance) {
      if (await service.isForegroundService()) {
        await notificationService.showForegroundServiceNotification(
          notificationId: notificationId,
          activeTimerCount: activeTimersData.length,
        );
      }
    }

    // UI에 활성 타이머 데이터 전송
    service.invoke('update', {'activeTimers': activeTimersData});
  });
}
