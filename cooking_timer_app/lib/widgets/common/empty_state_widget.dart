import 'package:flutter/material.dart';

/// 빈 상태를 표시하는 공통 위젯
/// 사용 위치: my_recipes_screen.dart:97-103, timer_screen.dart:70-77
class EmptyStateWidget extends StatelessWidget {
  final String message;
  final IconData? icon;
  final double? iconSize;
  final Color? textColor;
  final Color? iconColor;

  const EmptyStateWidget({
    super.key,
    required this.message,
    this.icon,
    this.iconSize = 64.0,
    this.textColor = Colors.grey,
    this.iconColor,
  });

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          if (icon != null) ...[
            Icon(
              icon,
              size: iconSize,
              color: iconColor ?? textColor,
            ),
            const SizedBox(height: 16),
          ],
          Text(
            message,
            textAlign: TextAlign.center,
            style: TextStyle(color: textColor),
          ),
        ],
      ),
    );
  }
}
