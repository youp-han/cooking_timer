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
      autoStart: false,
      isForegroundMode: true,
      notificationChannelId: notificationChannelId,
      initialNotificationTitle: '사워도우 타이머',
      initialNotificationContent: '타이머가 실행 중입니다.',
      foregroundServiceNotificationId: notificationId,
    ),
    iosConfiguration: IosConfiguration(
      autoStart: false,
      onForeground: onStart,
      onBackground: onIosBackground,
    ),
  );
}

Future<void> startBackgroundService() async {
  final service = FlutterBackgroundService();
  if (!await service.isRunning()) {
    await service.startService();
  }
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
  final Set<int> newlyCreatedScheduleIds = {};
  final Set<int> completedScheduleIds = {};
  bool uiSubscribed = false;

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

  service.on('subscribe').listen((event) {
    uiSubscribed = true;
  });

  service.on('unsubscribe').listen((event) {
    uiSubscribed = false;
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
    final scheduleId = await db.createScheduleWithSteps(schedule, stepCompanions);
    newlyCreatedScheduleIds.add(scheduleId);
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

      // 방금 생성된 스케줄은 첫 루프에서 알림 체크 건너뜀
      if (newlyCreatedScheduleIds.contains(schedule.id)) {
        newlyCreatedScheduleIds.remove(schedule.id);
        activeTimersData.add(TimerCalculationService.calculateTimerState(
          schedule: schedule,
          steps: steps,
          lastNotifiedStep: steps.length - 1,
        ).toMap(schedule.id, schedule.name));
        continue;
      }

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

      // 타이머 전체 완료 알림
      if (timerState.shouldNotifyTimerComplete) {
        await notificationService.showTimerCompleteNotification(
          scheduleId: schedule.id,
          scheduleName: schedule.name,
        );
        lastNotifiedStep[schedule.id] = steps.length;
        completedScheduleIds.add(schedule.id);
      }

      // 완료된 타이머는 UI에 완료 상태로 한 번 노출 후 다음 루프에서 삭제
      if (completedScheduleIds.contains(schedule.id)) {
        activeTimersData.add(timerState.toMap(schedule.id, schedule.name));
        await db.deleteSchedule(schedule.id);
        completedScheduleIds.remove(schedule.id);
        lastNotifiedStep.remove(schedule.id);
        continue;
      }

      // 활성 타이머 데이터에 추가
      activeTimersData.add(timerState.toMap(schedule.id, schedule.name));
    }

    // 포그라운드 서비스 알림 업데이트 (Android만)
    if (service is AndroidServiceInstance) {
      if (activeTimersData.isEmpty) {
        // 타이머가 없으면 서비스 종료
        service.stopSelf();
        return;
      } else {
        // 타이머가 있으면 포그라운드 유지
        if (!await service.isForegroundService()) {
          service.setAsForegroundService();
        }
      }
    }

    // 타이머 화면이 활성화된 경우에만 UI 업데이트 전송
    if (uiSubscribed) {
      service.invoke('update', {'activeTimers': activeTimersData});
    }
  });
}
