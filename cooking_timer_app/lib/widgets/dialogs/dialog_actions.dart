import 'package:flutter/material.dart';

/// 다이얼로그 액션 버튼을 표준화하는 위젯
/// 취소/확인 버튼 쌍을 일관된 스타일로 제공
///
/// 사용 위치: my_recipes_screen.dart:29-54, calculator_screen.dart, dough_calculator_screen.dart
class DialogActions extends StatelessWidget {
  final VoidCallback? onCancel;
  final VoidCallback onConfirm;
  final String cancelText;
  final String confirmText;
  final Color? confirmTextColor;
  final bool isDangerousAction;

  const DialogActions({
    super.key,
    this.onCancel,
    required this.onConfirm,
    this.cancelText = '취소',
    this.confirmText = '확인',
    this.confirmTextColor,
    this.isDangerousAction = false,
  });

  @override
  Widget build(BuildContext context) {
    final effectiveConfirmColor = confirmTextColor ??
        (isDangerousAction ? Colors.red : null);

    return <Widget>[
      TextButton(
        onPressed: onCancel ?? () => Navigator.of(context).pop(),
        child: Text(cancelText),
      ),
      TextButton(
        style: effectiveConfirmColor != null
            ? TextButton.styleFrom(
                foregroundColor: effectiveConfirmColor,
              )
            : null,
        onPressed: onConfirm,
        child: Text(confirmText),
      ),
    ] as Widget;
  }
}

/// 표준 확인 다이얼로그를 생성하는 헬퍼 함수
Future<bool?> showConfirmDialog({
  required BuildContext context,
  required String title,
  required String content,
  String cancelText = '취소',
  String confirmText = '확인',
  bool isDangerousAction = false,
  Color? confirmTextColor,
}) {
  return showDialog<bool>(
    context: context,
    builder: (BuildContext context) {
      return AlertDialog(
        title: Text(title),
        content: Text(content),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(false),
            child: Text(cancelText),
          ),
          TextButton(
            style: (confirmTextColor ?? (isDangerousAction ? Colors.red : null)) != null
                ? TextButton.styleFrom(
                    foregroundColor: confirmTextColor ?? Colors.red,
                  )
                : null,
            onPressed: () => Navigator.of(context).pop(true),
            child: Text(confirmText),
          ),
        ],
      );
    },
  );
}

/// 표준 정보 다이얼로그를 생성하는 헬퍼 함수
Future<void> showInfoDialog({
  required BuildContext context,
  required String title,
  required String content,
  String buttonText = '확인',
}) {
  return showDialog<void>(
    context: context,
    builder: (BuildContext context) {
      return AlertDialog(
        title: Text(title),
        content: Text(content),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: Text(buttonText),
          ),
        ],
      );
    },
  );
}
