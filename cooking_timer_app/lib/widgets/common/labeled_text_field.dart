import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sourdough_timer/utils/text_field_helper.dart';

/// 자동 선택 기능이 내장된 TextField 위젯
///
/// 특징:
/// - onTap 시 전체 텍스트 자동 선택 (selectAllOnTap)
/// - 일관된 스타일링 (OutlineInputBorder)
/// - 선택적 입력 포맷터, 키보드 타입 설정
///
/// 사용 위치: 15+ TextField에서 중복 제거
/// - calculator_screen.dart:180-184, 196-201
/// - dough_calculator_screen.dart 등
class LabeledTextField extends StatelessWidget {
  final TextEditingController controller;
  final String labelText;
  final String? hintText;
  final String? helperText;
  final TextInputType? keyboardType;
  final List<TextInputFormatter>? inputFormatters;
  final ValueChanged<String>? onChanged;
  final VoidCallback? onEditingComplete;
  final bool enabled;
  final bool readOnly;
  final int? maxLines;
  final int? minLines;
  final Widget? suffixIcon;
  final Widget? prefixIcon;
  final bool autoSelectOnTap;

  const LabeledTextField({
    super.key,
    required this.controller,
    required this.labelText,
    this.hintText,
    this.helperText,
    this.keyboardType,
    this.inputFormatters,
    this.onChanged,
    this.onEditingComplete,
    this.enabled = true,
    this.readOnly = false,
    this.maxLines = 1,
    this.minLines,
    this.suffixIcon,
    this.prefixIcon,
    this.autoSelectOnTap = true,
  });

  @override
  Widget build(BuildContext context) {
    return TextField(
      controller: controller,
      decoration: InputDecoration(
        labelText: labelText,
        hintText: hintText,
        helperText: helperText,
        border: const OutlineInputBorder(),
        suffixIcon: suffixIcon,
        prefixIcon: prefixIcon,
      ),
      keyboardType: keyboardType,
      inputFormatters: inputFormatters,
      onChanged: onChanged,
      onEditingComplete: onEditingComplete,
      enabled: enabled,
      readOnly: readOnly,
      maxLines: maxLines,
      minLines: minLines,
      onTap: autoSelectOnTap
          ? () => TextFieldHelper.selectAllOnTap(controller)
          : null,
    );
  }
}
