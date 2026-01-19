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
      '$scheduleName: $stepName 완료!',
      '다음 단계로 넘어갈 시간입니다.',
      const NotificationDetails(
        android: AndroidNotificationDetails(
          _notificationChannelId,
          '사워도우 타이머',
          icon: '@mipmap/ic_launcher',
          importance: Importance.high,
          sound: RawResourceAndroidNotificationSound('stage_complete'),
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
          sound: RawResourceAndroidNotificationSound('timer_complete'),
        ),
      ),
    );
  }

  /// 포그라운드 서비스 알림 업데이트
  Future<void> showForegroundServiceNotification({
    required int notificationId,
    required int activeTimerCount,
  }) async {
    final String content = activeTimerCount == 0
        ? '진행 중인 타이머 없음'
        : '$activeTimerCount개의 타이머가 실행 중입니다.';

    await _notificationsPlugin.show(
      notificationId,
      '사워도우 타이머',
      content,
      const NotificationDetails(
        android: AndroidNotificationDetails(
          _notificationChannelId,
          '사워도우 타이머',
          icon: '@mipmap/ic_launcher',
          ongoing: true,
        ),
      ),
    );
  }
}
