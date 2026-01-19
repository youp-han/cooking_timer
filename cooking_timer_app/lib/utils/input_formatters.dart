import 'package:flutter/services.dart';

/// 재사용 가능한 입력 포맷터
class AppInputFormatters {
  /// 숫자와 소수점만 허용 (무게, 퍼센티지용)
  static final List<TextInputFormatter> decimal = [
    FilteringTextInputFormatter.allow(RegExp(r'[0-9.]'))
  ];

  /// 정수만 허용 (기간, 횟수용)
  static final List<TextInputFormatter> digitsOnly = [
    FilteringTextInputFormatter.digitsOnly
  ];

  /// 음수 포함 숫자 허용
  static final List<TextInputFormatter> signedDecimal = [
    FilteringTextInputFormatter.allow(RegExp(r'[0-9.\-]'))
  ];
}
