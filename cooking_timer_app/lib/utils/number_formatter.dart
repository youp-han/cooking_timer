/// 숫자 포맷팅 유틸리티
class NumberFormatter {
  /// 숫자 포맷: 소수점 없으면 정수로, 있으면 그대로 표시
  /// recipe_detail_screen.dart:10-16에서 사용
  static String formatNumber(num? value) {
    if (value == null) return '0';
    if (value == value.toInt()) {
      return value.toInt().toString();
    }
    return value.toString();
  }

  /// 비율 포맷: 소수점 1자리
  /// recipe_detail_screen.dart:18-21에서 사용
  static String formatRatio(num? value) {
    if (value == null) return '0.0';
    return value.toStringAsFixed(1);
  }

  /// 기간을 HH:MM:SS 포맷으로
  /// timer_screen.dart:106-108에서 사용
  static String formatDuration(int seconds) {
    return Duration(seconds: seconds)
        .toString()
        .split('.')
        .first
        .padLeft(8, '0');
  }

  /// 시간과 분을 "X시간 Y분" 형식으로
  static String formatHoursMinutes(int hours, int minutes) {
    if (hours > 0 && minutes > 0) {
      return '$hours시간 $minutes분';
    } else if (hours > 0) {
      return '$hours시간';
    } else if (minutes > 0) {
      return '$minutes분';
    }
    return '0분';
  }

  /// 총 분을 "X시간 Y분" 형식으로
  static String formatTotalMinutes(int totalMinutes) {
    final hours = totalMinutes ~/ 60;
    final minutes = totalMinutes % 60;
    return formatHoursMinutes(hours, minutes);
  }
}
