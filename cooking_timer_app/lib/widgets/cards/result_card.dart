import 'package:flutter/material.dart';

/// 계산 결과 표시 카드 위젯
/// 결과 데이터 + 저장/재설정 버튼을 포함
///
/// 사용 위치: calculator_screen.dart:262-312
class ResultCard extends StatelessWidget {
  final String title;
  final List<ResultItem> items;
  final VoidCallback onSave;
  final VoidCallback onReset;
  final String saveButtonText;
  final String resetButtonText;
  final Color? backgroundColor;
  final Color? borderColor;

  const ResultCard({
    super.key,
    this.title = '결과',
    required this.items,
    required this.onSave,
    required this.onReset,
    this.saveButtonText = '저장',
    this.resetButtonText = '재설정',
    this.backgroundColor,
    this.borderColor,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Container(
      margin: const EdgeInsets.only(top: 24),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: backgroundColor ?? theme.colorScheme.secondaryContainer.withOpacity(0.5),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: borderColor ?? theme.colorScheme.outline),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(title, style: theme.textTheme.titleLarge),
          const SizedBox(height: 8),
          ...items.map((item) => Text(
            '${item.label}: ${item.value}${item.unit}',
            style: theme.textTheme.bodyLarge,
          )),
          const SizedBox(height: 16),
          Row(
            children: [
              Expanded(
                child: OutlinedButton.icon(
                  onPressed: onReset,
                  icon: const Icon(Icons.refresh),
                  label: Text(resetButtonText),
                ),
              ),
              const SizedBox(width: 8),
              Expanded(
                child: ElevatedButton.icon(
                  onPressed: onSave,
                  icon: const Icon(Icons.save),
                  label: Text(saveButtonText),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

/// 결과 항목 데이터 클래스
class ResultItem {
  final String label;
  final String value;
  final String unit;

  const ResultItem({
    required this.label,
    required this.value,
    this.unit = 'g',
  });
}
