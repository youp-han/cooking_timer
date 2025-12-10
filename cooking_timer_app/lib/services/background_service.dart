import 'dart:async';
import 'dart:ui';
import 'package:flutter/widgets.dart';
import 'package:flutter_background_service/flutter_background_service.dart';
import 'package:flutter_background_service_android/flutter_background_service_android.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:sourdough_timer/database/database.dart';
import 'package:drift/drift.dart' as drift;

// Notification channel ID
const String notificationChannelId = 'sourdough_timer_channel';
const int notificationId = 888; // Unique ID for the foreground service notification

// Global instance for local notifications
final FlutterLocalNotificationsPlugin flutterLocalNotificationsPlugin = FlutterLocalNotificationsPlugin();

// Initialize the background service
Future<void> initializeService() async {
  final service = FlutterBackgroundService();

  // Setup notification channel
  const AndroidNotificationChannel channel = AndroidNotificationChannel(
    notificationChannelId,
    '사워도우 타이머', // title
    description: '타이머가 백그라운드에서 실행 중입니다.', // description
    importance: Importance.low,
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
      // Use the default app icon for the notification
      // Make sure your app has a suitable launcher icon set in AndroidManifest.xml
      // You can also place a custom icon in android/app/src/main/res/drawable/
      // and reference it here, e.g., 'ic_bg_service_small'
    ),
    iosConfiguration: IosConfiguration(
      autoStart: true,
      onForeground: onStart,
      onBackground: onIosBackground,
    ),
  );
}

// Background entry point for iOS (can also be used for other background tasks)
@pragma('vm:entry-point')
Future<bool> onIosBackground(ServiceInstance service) async {
  WidgetsFlutterBinding.ensureInitialized();
  DartPluginRegistrant.ensureInitialized();
  return true;
}

// Background entry point for all platforms
@pragma('vm:entry-point')
void onStart(ServiceInstance service) async {
  DartPluginRegistrant.ensureInitialized();

  // Initialize database for the background isolate
  final AppDatabase db = AppDatabase();

  // This map will keep track of which step notification was last shown for each schedule
  final Map<int, int> _lastNotifiedStep = {};

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

  // Listener to start a new timer from the UI
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
    print('Timer started for: $name');
  });

  // Timer logic for updating UI and sending notifications
  Timer.periodic(const Duration(seconds: 1), (timer) async {
    final List<Map<String, dynamic>> activeTimersData = [];
    final allSchedulesWithSteps = await db.watchAllSchedulesWithSteps().first; // Get current state

    for (var scheduleWithSteps in allSchedulesWithSteps) {
      final schedule = scheduleWithSteps.schedule;
      final steps = scheduleWithSteps.steps;
      
      final now = DateTime.now();
      final elapsed = now.difference(schedule.startTime);

      int cumulativeDuration = 0;
      int totalDuration = 0;
      for (var step in steps) {
        totalDuration += step.durationInMinutes;
      }
      if (totalDuration == 0) totalDuration = 1; // Avoid division by zero

      String currentStepName = '완료';
      Duration timeRemaining = Duration.zero;
      int currentStepIndex = steps.length;
      double progress = 0.0;
      bool isCompleted = false;

      for (int i = 0; i < steps.length; i++) {
        final step = steps[i];
        cumulativeDuration += step.durationInMinutes;
        
        // Check if this step is currently active
        if (elapsed.inMinutes < cumulativeDuration) {
          currentStepIndex = i;
          currentStepName = step.stepName;
          final previousStepsDuration = cumulativeDuration - step.durationInMinutes;
          final remainingMinutes = cumulativeDuration - elapsed.inMinutes;
          timeRemaining = Duration(minutes: remainingMinutes) - Duration(seconds: elapsed.inSeconds % 60); // More precise remaining time
          
          progress = elapsed.inMinutes / totalDuration;
          if (progress > 1.0) progress = 1.0; // Cap progress at 100%

          // Send notification if step just completed
          if (timeRemaining.inSeconds <= 0 && (_lastNotifiedStep[schedule.id] ?? -1) < i) {
            flutterLocalNotificationsPlugin.show(
              schedule.id + notificationId, // Unique notification ID for each timer
              '${schedule.name} 타이머: ${step.stepName} 완료!',
              '다음 단계로 넘어갈 시간입니다.',
              NotificationDetails(
                android: AndroidNotificationDetails(
                  notificationChannelId,
                  '사워도우 타이머',
                  icon: 'mipmap/ic_launcher',
                  importance: Importance.high,
                  priority: Priority.high,
                  ongoing: false, // Not ongoing for step completion
                ),
              ),
            );
            _lastNotifiedStep[schedule.id] = i; // Mark this step as notified
          }
          break;
        }
      }

      if (currentStepIndex == steps.length) { // All steps completed
        isCompleted = true;
        progress = 1.0;
        if ((_lastNotifiedStep[schedule.id] ?? -1) < steps.length) {
           flutterLocalNotificationsPlugin.show(
              schedule.id + notificationId, // Unique notification ID for each timer
              '${schedule.name} 타이머: 모든 단계 완료!',
              '수고하셨습니다!',
              NotificationDetails(
                android: AndroidNotificationDetails(
                  notificationChannelId,
                  '사워도우 타이머',
                  icon: 'mipmap/ic_launcher',
                  importance: Importance.high,
                  priority: Priority.high,
                  ongoing: false,
                ),
              ),
            );
            _lastNotifiedStep[schedule.id] = steps.length;
        }
        await db.deleteSchedule(schedule.id); // Optionally delete completed schedules
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

    // Update the foreground service notification
    if (service is AndroidServiceInstance) {
      if (await service.isForegroundService()) {
        String notificationContent;
        if (activeTimersData.isEmpty) {
          notificationContent = '진행 중인 타이머 없음';
        } else if (activeTimersData.length == 1) {
          final timer = activeTimersData.first;
          final formattedRemaining = '${(timer['timeRemaining'] as int) ~/ 60}:${((timer['timeRemaining'] as int) % 60).toString().padLeft(2, '0')}';
          notificationContent = '${timer['name']}: ${timer['currentStepName']} ($formattedRemaining 남음)';
        } else {
          notificationContent = '${activeTimersData.length}개의 타이머가 실행 중입니다.';
        }
        service.setForegroundNotificationInfo(
          title: '사워도우 타이머',
          content: notificationContent,
        );
      }
    }

    // Send update to UI
    service.invoke('update', {'timers': activeTimersData});
  });
}