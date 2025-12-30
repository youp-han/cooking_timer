import 'package:sourdough_timer/database/database.dart';

/// 타이머 상태 계산 결과
class TimerState {
  final String currentStepName;
  final int currentStepIndex;
  final int totalSteps;
  final Duration timeRemaining;
  final double progress;
  final bool isCompleted;
  final bool shouldNotifyStepComplete;
  final bool shouldNotifyTimerComplete;

  TimerState({
    required this.currentStepName,
    required this.currentStepIndex,
    required this.totalSteps,
    required this.timeRemaining,
    required this.progress,
    required this.isCompleted,
    this.shouldNotifyStepComplete = false,
    this.shouldNotifyTimerComplete = false,
  });

  Map<String, dynamic> toMap(int scheduleId, String scheduleName) {
    return {
      'id': scheduleId,
      'name': scheduleName,
      'currentStepName': currentStepName,
      'currentStepIndex': currentStepIndex,
      'totalSteps': totalSteps,
      'timeRemaining': timeRemaining.inSeconds,
      'progress': progress,
      'isCompleted': isCompleted,
    };
  }
}

/// 타이머 계산 서비스
/// 타이머 상태 계산 로직을 캡슐화하여 재사용성과 테스트 용이성 향상
class TimerCalculationService {
  /// 스케줄의 현재 타이머 상태를 계산
  ///
  /// [schedule]: 타이머 스케줄
  /// [steps]: 타이머 단계 목록
  /// [lastNotifiedStep]: 마지막으로 알림을 보낸 단계 인덱스 (-1이면 알림 안 보냄)
  ///
  /// Returns: [TimerState] 현재 타이머 상태
  static TimerState calculateTimerState({
    required TimerSchedule schedule,
    required List<TimerStep> steps,
    required int lastNotifiedStep,
  }) {
    final now = DateTime.now();
    final elapsed = now.difference(schedule.startTime);

    int cumulativeDuration = 0;
    int totalDuration = steps.fold(0, (prev, step) => prev + step.durationInMinutes);
    if (totalDuration == 0) totalDuration = 1; // Avoid division by zero

    String currentStepName = '완료';
    Duration timeRemaining = Duration.zero;
    int currentStepIndex = steps.length;
    double progress = 1.0;
    bool isCompleted = true;
    bool shouldNotifyStepComplete = false;
    bool shouldNotifyTimerComplete = false;

    // 각 단계를 순회하며 현재 단계 찾기
    for (int i = 0; i < steps.length; i++) {
      final step = steps[i];
      cumulativeDuration += step.durationInMinutes;

      if (elapsed.inMinutes < cumulativeDuration) {
        // 현재 진행 중인 단계 발견
        isCompleted = false;
        currentStepIndex = i;
        currentStepName = step.stepName;
        timeRemaining = Duration(minutes: cumulativeDuration) - elapsed;
        progress = elapsed.inSeconds / (totalDuration * 60);
        if (progress > 1.0) progress = 1.0;

        // 단계가 방금 완료되었고 아직 알림을 보내지 않았으면
        if (timeRemaining.inSeconds <= 0 && lastNotifiedStep < i) {
          shouldNotifyStepComplete = true;
        }
        break;
      }
    }

    // 모든 단계가 완료되었고 아직 완료 알림을 보내지 않았으면
    if (isCompleted && lastNotifiedStep < steps.length) {
      shouldNotifyTimerComplete = true;
    }

    return TimerState(
      currentStepName: currentStepName,
      currentStepIndex: currentStepIndex,
      totalSteps: steps.length,
      timeRemaining: timeRemaining,
      progress: progress,
      isCompleted: isCompleted,
      shouldNotifyStepComplete: shouldNotifyStepComplete,
      shouldNotifyTimerComplete: shouldNotifyTimerComplete,
    );
  }
}
