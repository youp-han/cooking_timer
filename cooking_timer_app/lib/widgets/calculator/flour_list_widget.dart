import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sourdough_timer/utils/text_field_helper.dart';

/// 밀가루 목록 위젯 (추가/삭제 기능 포함)
/// 도우 계산기에서 여러 종류의 밀가루를 입력하고 관리
///
/// 특징:
/// - 밀가루 이름과 양(g) 입력
/// - 각 밀가루의 퍼센티지 자동 계산 및 표시
/// - 밀가루 추가/삭제 기능
/// - 입력 합계와 필요량 비교 검증
///
/// 사용 위치: dough_calculator_screen.dart:600-759 (160줄 추출)
class FlourListWidget extends StatelessWidget {
  final List<FlourItemData> flourItems;
  final int flourTotal; // 필요한 총 밀가루 양
  final bool isIngredientsMode;
  final VoidCallback onAdd;
  final ValueChanged<int> onRemove;
  final VoidCallback? onAmountChanged;

  const FlourListWidget({
    super.key,
    required this.flourItems,
    required this.flourTotal,
    this.isIngredientsMode = false,
    required this.onAdd,
    required this.onRemove,
    this.onAmountChanged,
  });

  int get _inputTotal {
    return flourItems.fold(0, (sum, item) {
      return sum + (int.tryParse(item.amountController.text) ?? 0);
    });
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isValid = _inputTotal == flourTotal;

    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: theme.colorScheme.surfaceContainerHighest.withOpacity(0.3),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: theme.colorScheme.outline),
      ),
      child: Column(
        children: [
          // 밀가루 항목들
          ...flourItems.asMap().entries.map((entry) {
            final index = entry.key;
            final item = entry.value;
            final amount = int.tryParse(item.amountController.text) ?? 0;
            final percentage = flourTotal > 0
                ? (amount / flourTotal * 100).toStringAsFixed(1)
                : '0.0';

            return Padding(
              padding: const EdgeInsets.only(bottom: 8.0),
              child: Row(
                children: [
                  // 이름 입력
                  Expanded(
                    flex: 2,
                    child: TextField(
                      controller: item.nameController,
                      decoration: const InputDecoration(
                        labelText: '이름',
                        border: OutlineInputBorder(),
                        isDense: true,
                      ),
                      onTap: () => TextFieldHelper.selectAllOnTap(
                        item.nameController,
                      ),
                    ),
                  ),
                  const SizedBox(width: 8),
                  // 그램 입력
                  Expanded(
                    flex: 2,
                    child: TextField(
                      controller: item.amountController,
                      decoration: const InputDecoration(
                        labelText: 'g',
                        border: OutlineInputBorder(),
                        isDense: true,
                      ),
                      keyboardType: TextInputType.number,
                      inputFormatters: [
                        FilteringTextInputFormatter.digitsOnly
                      ],
                      onChanged: (_) => onAmountChanged?.call(),
                      onTap: () => TextFieldHelper.selectAllOnTap(
                        item.amountController,
                      ),
                    ),
                  ),
                  const SizedBox(width: 8),
                  // 퍼센티지 표시
                  Expanded(
                    flex: 1,
                    child: Text(
                      '$percentage%',
                      style: theme.textTheme.bodySmall,
                      textAlign: TextAlign.center,
                    ),
                  ),
                  // 삭제 버튼 (항목이 2개 이상일 때만)
                  if (flourItems.length > 1)
                    IconButton(
                      icon: Icon(Icons.delete_outline,
                          size: 20, color: theme.colorScheme.error),
                      onPressed: () => onRemove(index),
                      padding: EdgeInsets.zero,
                      constraints: const BoxConstraints(),
                    ),
                ],
              ),
            );
          }),

          // 밀가루 추가 버튼
          if (flourItems.isNotEmpty) const SizedBox(height: 8),
          TextButton.icon(
            icon: const Icon(Icons.add, size: 18),
            label: const Text('밀가루 추가'),
            onPressed: onAdd,
          ),

          const Divider(height: 16),

          // 합계 표시
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    '합계 (입력):',
                    style: theme.textTheme.bodySmall?.copyWith(
                      color: theme.colorScheme.onSurfaceVariant,
                    ),
                  ),
                  Text(
                    '필요량 (100%):',
                    style: theme.textTheme.bodySmall?.copyWith(
                      color: theme.colorScheme.onSurfaceVariant,
                    ),
                  ),
                ],
              ),
              Column(
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  Text(
                    '$_inputTotal g',
                    style: theme.textTheme.titleSmall?.copyWith(
                      fontWeight: FontWeight.bold,
                      color: isValid
                          ? theme.colorScheme.primary
                          : theme.colorScheme.error,
                    ),
                  ),
                  Text(
                    '$flourTotal g',
                    style: theme.textTheme.titleSmall?.copyWith(
                      fontWeight: FontWeight.bold,
                      color: theme.colorScheme.primary,
                    ),
                  ),
                ],
              ),
            ],
          ),

          // 검증 메시지
          if (!isValid)
            Padding(
              padding: const EdgeInsets.only(top: 8.0),
              child: Text(
                _inputTotal > flourTotal
                    ? '⚠️ ${_inputTotal - flourTotal}g 초과'
                    : '⚠️ ${flourTotal - _inputTotal}g 부족',
                style: theme.textTheme.bodySmall?.copyWith(
                  color: theme.colorScheme.error,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
        ],
      ),
    );
  }
}

/// 밀가루 항목 데이터 (컨트롤러 포함)
/// FlourListWidget에서 사용하는 UI 전용 데이터 클래스
class FlourItemData {
  final TextEditingController nameController;
  final TextEditingController amountController;

  FlourItemData({
    String name = '',
    String amount = '0',
  })  : nameController = TextEditingController(text: name),
        amountController = TextEditingController(text: amount);

  void dispose() {
    nameController.dispose();
    amountController.dispose();
  }
}
