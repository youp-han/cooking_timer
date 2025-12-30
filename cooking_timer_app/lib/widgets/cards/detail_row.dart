import 'package:flutter/material.dart';

/// 키-값 쌍을 표시하는 디테일 행 위젯
/// 레시피 상세 화면 등에서 정보를 표시할 때 사용
///
/// 사용 위치: recipe_detail_screen.dart:167-183
class DetailRow extends StatelessWidget {
  final String label;
  final String value;
  final bool isSub;
  final Color? labelColor;
  final FontWeight? valueFontWeight;

  const DetailRow({
    super.key,
    required this.label,
    required this.value,
    this.isSub = false,
    this.labelColor,
    this.valueFontWeight = FontWeight.bold,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(vertical: isSub ? 2.0 : 4.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Expanded(
            child: Text(
              label,
              style: TextStyle(color: labelColor ?? Colors.grey.shade600),
              overflow: TextOverflow.ellipsis,
            ),
          ),
          const SizedBox(width: 8),
          Text(
            value,
            style: TextStyle(fontWeight: valueFontWeight),
          ),
        ],
      ),
    );
  }
}
