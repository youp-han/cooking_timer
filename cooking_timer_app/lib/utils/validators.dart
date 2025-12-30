/// 입력 검증 및 파싱 유틸리티
class Validators {
  /// 양수 여부 확인
  static bool isPositiveNumber(String? value) {
    if (value == null || value.isEmpty) return false;
    final number = double.tryParse(value);
    return number != null && number > 0;
  }

  /// 음수가 아닌 숫자 여부 확인
  static bool isNonNegativeNumber(String? value) {
    if (value == null || value.isEmpty) return false;
    final number = double.tryParse(value);
    return number != null && number >= 0;
  }

  /// 유효한 숫자 여부 확인
  static bool isValidNumber(String? value) {
    if (value == null || value.isEmpty) return false;
    return double.tryParse(value) != null;
  }

  /// 빈 문자열 여부 확인
  static bool isEmpty(String? value) {
    return value == null || value.trim().isEmpty;
  }

  /// double 파싱 (안전, fallback 포함)
  /// null safety 개선
  static double parseDouble(String? value, {double fallback = 0.0}) {
    if (value == null || value.isEmpty) return fallback;
    return double.tryParse(value) ?? fallback;
  }

  /// int 파싱 (안전, fallback 포함)
  static int parseInt(String? value, {int fallback = 0}) {
    if (value == null || value.isEmpty) return fallback;
    return int.tryParse(value) ?? fallback;
  }

  /// double 파싱 (nullable)
  static double? parseDoubleNullable(String? value) {
    if (value == null || value.isEmpty) return null;
    return double.tryParse(value);
  }

  /// int 파싱 (nullable)
  static int? parseIntNullable(String? value) {
    if (value == null || value.isEmpty) return null;
    return int.tryParse(value);
  }

  /// 범위 내 값 확인
  static bool isInRange(double value, double min, double max) {
    return value >= min && value <= max;
  }

  /// 값 범위 제한
  static double clamp(double value, double min, double max) {
    if (value < min) return min;
    if (value > max) return max;
    return value;
  }

  /// 이메일 유효성 확인 (간단한 패턴)
  static bool isValidEmail(String? value) {
    if (value == null || value.isEmpty) return false;
    final emailRegex = RegExp(r'^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$');
    return emailRegex.hasMatch(value);
  }
}
