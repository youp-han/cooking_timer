/// 타이머 단계 데이터 모델
/// timer_setup_screen.dart의 _TimerStep 클래스 개념과 background_service.dart에서 사용
class TimerStepData {
  final String name;
  final int durationInMinutes;

  TimerStepData({
    required this.name,
    required this.durationInMinutes,
  });

  /// JSON에서 생성
  factory TimerStepData.fromJson(Map<String, dynamic> json) {
    return TimerStepData(
      name: json['name'] as String,
      durationInMinutes: json['duration'] as int,
    );
  }

  /// JSON으로 변환
  Map<String, dynamic> toJson() {
    return {
      'name': name,
      'duration': durationInMinutes,
    };
  }

  /// 시간과 분을 총 분으로 변환
  static int hoursMinutesToTotal(int hours, int minutes) {
    return hours * 60 + minutes;
  }

  /// 총 분을 시간으로 변환
  static int totalMinutesToHours(int totalMinutes) {
    return totalMinutes ~/ 60;
  }

  /// 총 분을 분으로 변환 (나머지)
  static int totalMinutesToMinutes(int totalMinutes) {
    return totalMinutes % 60;
  }

  /// 시간과 분 분리
  static Map<String, int> splitHoursMinutes(int totalMinutes) {
    return {
      'hours': totalMinutesToHours(totalMinutes),
      'minutes': totalMinutesToMinutes(totalMinutes),
    };
  }

  /// 복사본 생성
  TimerStepData copyWith({
    String? name,
    int? durationInMinutes,
  }) {
    return TimerStepData(
      name: name ?? this.name,
      durationInMinutes: durationInMinutes ?? this.durationInMinutes,
    );
  }

  @override
  String toString() =>
      'TimerStepData(name: $name, duration: ${durationInMinutes}min)';

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    return other is TimerStepData &&
        other.name == name &&
        other.durationInMinutes == durationInMinutes;
  }

  @override
  int get hashCode => name.hashCode ^ durationInMinutes.hashCode;
}
