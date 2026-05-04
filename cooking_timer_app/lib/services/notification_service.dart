import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:shared_preferences/shared_preferences.dart';

/// 알림 서비스
/// 타이머 단계 완료 및 전체 완료 알림을 담당
class NotificationService {
  static const String _notificationChannelId = 'sourdough_timer_channel';
  static const String _notificationEnabledKey = 'timer_notification_enabled';

  final FlutterLocalNotificationsPlugin _notificationsPlugin;

  NotificationService(this._notificationsPlugin);

  /// 알림 설정이 활성화되어 있는지 확인
  Future<bool> isNotificationEnabled() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getBool(_notificationEnabledKey) ?? true;
  }

  /// 타이머 단계 완료 알림 표시
  Future<void> showStepCompleteNotification({
    required int scheduleId,
    required String scheduleName,
    required String stepName,
  }) async {
    if (!await isNotificationEnabled()) return;

    await _notificationsPlugin.show(
      scheduleId,
      '$scheduleName: $stepName 시작!',
      '다음 단계로 넘어갈 시간입니다.',
      const NotificationDetails(
        android: AndroidNotificationDetails(
          _notificationChannelId,
          '사워도우 타이머',
          icon: '@mipmap/ic_launcher',
          importance: Importance.high,
        ),
      ),
    );
  }

  /// 타이머 전체 완료 알림 표시
  Future<void> showTimerCompleteNotification({
    required int scheduleId,
    required String scheduleName,
  }) async {
    if (!await isNotificationEnabled()) return;

    await _notificationsPlugin.show(
      scheduleId,
      '$scheduleName: 모든 단계 완료!',
      '수고하셨습니다!',
      const NotificationDetails(
        android: AndroidNotificationDetails(
          _notificationChannelId,
          '사워도우 타이머',
          icon: '@mipmap/ic_launcher',
          importance: Importance.high,
        ),
      ),
    );
  }

}
