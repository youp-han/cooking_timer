import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sourdough_timer/utils/text_field_helper.dart';

/// 퍼센트와 그램을 동시에 입력하는 듀얼 입력 필드
/// 도우 계산기의 재료 입력에 사용
///
/// 특징:
/// - 왼쪽: 베이커스 퍼센티지 (%)
/// - 오른쪽: 실제 그램 수 (g)
/// - 재료 기준 모드 시 % 필드 비활성화
///
/// 사용 위치: dough_calculator_screen.dart:532-598
class DualInputField extends StatelessWidget {
  final TextEditingController percentController;
  final TextEditingController gramsController;
  final String label;
  final bool isIngredientsMode;
  final ValueChanged<String>? onPercentChanged;
  final ValueChanged<String>? onGramsChanged;
  final List<TextInputFormatter>? percentFormatters;
  final bool autoSelectOnTap;

  const DualInputField({
    super.key,
    required this.percentController,
    required this.gramsController,
    required this.label,
    this.isIngredientsMode = false,
    this.onPercentChanged,
    this.onGramsChanged,
    this.percentFormatters,
    this.autoSelectOnTap = true,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        // % 입력
        Expanded(
          flex: 2,
          child: TextField(
            controller: percentController,
            decoration: InputDecoration(
              labelText: '$label (%)',
              border: const OutlineInputBorder(),
              filled: isIngredientsMode,
              fillColor: isIngredientsMode ? Colors.grey.shade200 : null,
            ),
            keyboardType: TextInputType.number,
            inputFormatters: percentFormatters,
            enabled: !isIngredientsMode,
            readOnly: isIngredientsMode,
            onChanged: onPercentChanged,
            onTap: autoSelectOnTap && !isIngredientsMode
                ? () => TextFieldHelper.selectAllOnTap(percentController)
                : null,
          ),
        ),
        const SizedBox(width: 8),
        // g 입력
        Expanded(
          flex: 2,
          child: TextField(
            controller: gramsController,
            decoration: const InputDecoration(
              labelText: 'g',
              border: OutlineInputBorder(),
            ),
            keyboardType: TextInputType.number,
            inputFormatters: [FilteringTextInputFormatter.digitsOnly],
            onChanged: onGramsChanged,
            onTap: autoSelectOnTap
                ? () => TextFieldHelper.selectAllOnTap(gramsController)
                : null,
          ),
        ),
      ],
    );
  }
}
