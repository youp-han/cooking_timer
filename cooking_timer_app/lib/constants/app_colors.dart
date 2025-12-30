import 'package:flutter/material.dart';

/// 앱 전체에서 사용되는 의미 있는 색상 정의
class AppColors {
  // Calculator Types
  static const Color doughCalculator = Colors.orange;
  static Color doughCalculatorLight = Colors.orange.shade100;
  static Color doughCalculatorDark = Colors.orange.shade800;

  static const Color bakersCalculator = Colors.brown;
  static Color bakersCalculatorLight = Colors.brown.shade100;
  static Color bakersCalculatorDark = Colors.brown.shade800;

  // Status Colors
  static const Color error = Colors.red;
  static const Color success = Colors.green;
  static const Color warning = Colors.orange;
  static const Color info = Colors.blue;

  // Grey Shades
  static Color greyLight = Colors.grey.shade200;
  static Color greyMedium = Colors.grey.shade500;
  static Color greyDark = Colors.grey.shade700;
  static Color greyExtraLight = Colors.grey.shade100;
  static Color greyExtraDark = Colors.grey.shade900;

  // Special
  static const Color white = Colors.white;
  static const Color black = Colors.black;
  static const Color transparent = Colors.transparent;
}
