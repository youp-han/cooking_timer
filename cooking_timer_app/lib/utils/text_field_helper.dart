import 'package:flutter/material.dart';

/// TextField 관련 헬퍼 함수
/// 12+ 중복 제거 (calculator_screen, dough_calculator_screen)
class TextFieldHelper {
  /// TextField 탭 시 전체 텍스트 선택
  /// 사용 예: onTap: () => TextFieldHelper.selectAllOnTap(controller)
  static void selectAllOnTap(TextEditingController controller) {
    controller.selection = TextSelection(
      baseOffset: 0,
      extentOffset: controller.text.length,
    );
  }

  /// onTap 핸들러 생성 (전체 선택)
  /// 사용 예: onTap: TextFieldHelper.onTapSelectAll(controller)
  static VoidCallback onTapSelectAll(TextEditingController controller) {
    return () => selectAllOnTap(controller);
  }

  /// 커서를 텍스트 끝으로 이동
  static void moveCursorToEnd(TextEditingController controller) {
    controller.selection = TextSelection.fromPosition(
      TextPosition(offset: controller.text.length),
    );
  }

  /// 텍스트 초기화
  static void clearText(TextEditingController controller) {
    controller.clear();
  }

  /// 여러 컨트롤러 일괄 초기화
  static void clearAll(List<TextEditingController> controllers) {
    for (final controller in controllers) {
      controller.clear();
    }
  }
}
