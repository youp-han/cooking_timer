import 'package:flutter/material.dart';

/// 설정 화면 카드 위젯
/// 일관된 스타일링으로 설정 섹션을 표시
///
/// 사용 위치: settings_screen.dart:221-258, 262-288
class SettingsCard extends StatelessWidget {
  final IconData? icon;
  final String? title;
  final Widget child;
  final EdgeInsetsGeometry? padding;
  final Color? iconColor;

  const SettingsCard({
    super.key,
    this.icon,
    this.title,
    required this.child,
    this.padding = const EdgeInsets.all(16.0),
    this.iconColor,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Card(
      child: Padding(
        padding: padding!,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            if (icon != null || title != null) ...[
              Row(
                children: [
                  if (icon != null) ...[
                    Icon(
                      icon,
                      size: 20,
                      color: iconColor ?? theme.colorScheme.primary,
                    ),
                    const SizedBox(width: 8),
                  ],
                  if (title != null)
                    Text(
                      title!,
                      style: theme.textTheme.titleMedium?.copyWith(
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                ],
              ),
              const SizedBox(height: 16),
            ],
            child,
          ],
        ),
      ),
    );
  }
}
