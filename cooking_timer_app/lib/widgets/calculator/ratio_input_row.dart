import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sourdough_timer/utils/text_field_helper.dart';

/// 1:2:2 형식의 비율 입력 행 위젯
/// 베이커스 계산기의 스타터:밀가루:물 비율 입력에 사용
///
/// 특징:
/// - 3개 TextField를 가로로 배치
/// - 자동 텍스트 선택 지원
/// - 일관된 스타일링
///
/// 사용 위치: calculator_screen.dart:221-229
class RatioInputRow extends StatelessWidget {
  final TextEditingController starterController;
  final TextEditingController flourController;
  final TextEditingController waterController;
  final List<TextInputFormatter>? inputFormatters;
  final ValueChanged<String>? onChanged;
  final bool autoSelectOnTap;

  const RatioInputRow({
    super.key,
    required this.starterController,
    required this.flourController,
    required this.waterController,
    this.inputFormatters,
    this.onChanged,
    this.autoSelectOnTap = true,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(
          child: _buildRatioField(
            controller: starterController,
            label: '스타터',
          ),
        ),
        const SizedBox(width: 8),
        Expanded(
          child: _buildRatioField(
            controller: flourController,
            label: '밀가루',
          ),
        ),
        const SizedBox(width: 8),
        Expanded(
          child: _buildRatioField(
            controller: waterController,
            label: '물',
          ),
        ),
      ],
    );
  }

  Widget _buildRatioField({
    required TextEditingController controller,
    required String label,
  }) {
    return TextField(
      controller: controller,
      decoration: InputDecoration(
        labelText: label,
        border: const OutlineInputBorder(),
      ),
      keyboardType: TextInputType.number,
      inputFormatters: inputFormatters,
      onChanged: onChanged,
      onTap: autoSelectOnTap
          ? () => TextFieldHelper.selectAllOnTap(controller)
          : null,
    );
  }
}
