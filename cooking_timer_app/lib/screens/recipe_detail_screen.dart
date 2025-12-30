import 'dart:convert';
import 'package:sourdough_timer/database/database.dart';
import 'package:sourdough_timer/screens/timer_setup_screen.dart';
import 'package:sourdough_timer/widgets/cards/index.dart';
import 'package:flutter/material.dart';

class RecipeDetailScreen extends StatelessWidget {
  final Recipe recipe;
  const RecipeDetailScreen({super.key, required this.recipe});

  String _formatNumber(num? value) {
    if (value == null) return '0';
    if (value == value.toInt()) {
      return value.toInt().toString();
    }
    return value.toString();
  }

  String _formatRatio(num? value) {
    if (value == null) return '0.0';
    return value.toStringAsFixed(1);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(recipe.name),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildDetailCard(context),
            const Spacer(),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton.icon(
                icon: const Icon(Icons.timer_outlined),
                label: const Text('이 레시피로 타이머 시작'),
                style: ElevatedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  textStyle: Theme.of(context).textTheme.titleMedium,
                ),
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => TimerSetupScreen(recipe: recipe),
                    ),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildDetailCard(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;
    final isDoughType = recipe.calculationType == 'dough';
    final isUnifiedType = recipe.calculationType == 'unified';

    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('저장된 계산 정보', style: textTheme.titleLarge),
            const Divider(height: 24),
            if (isDoughType) ...[
              DetailRow(label: '총 도우 무게', value: '${_formatNumber(recipe.totalStarter)}g'),
              if (recipe.temperature != null)
                DetailRow(label: '베이커스 퍼센티지',
                  value: '물 ${_formatRatio(recipe.flourRatio)}% / 소금 ${_formatRatio(recipe.waterRatio)}% / 르방 ${_formatRatio(recipe.temperature)}%'),
            ] else if (isUnifiedType) ...[
              DetailRow(label: '총 르방', value: '${_formatNumber(recipe.totalStarter)}g'),
              if (recipe.temperature != null)
                DetailRow(label: '온도', value: '${_formatNumber(recipe.temperature)}°C'),
              DetailRow(label: '준비 시간', value: '${recipe.timeframe} 시간'),
              DetailRow(label: '비율', value: '${_formatRatio(recipe.starterRatio)}:${_formatRatio(recipe.flourRatio)}:${_formatRatio(recipe.waterRatio)}'),
            ] else ...[ // Legacy support
              DetailRow(label: '계산 방식', value: recipe.calculationType == 'ratio' ? '비율 기반' : '시간 기반'),
              DetailRow(label: '총 르방', value: '${_formatNumber(recipe.totalStarter)}g'),
              if (recipe.timeframe != null)
                DetailRow(label: '준비 시간', value: '${recipe.timeframe} 시간'),
              if (recipe.starterRatio != null)
                DetailRow(label: '비율', value: '${_formatRatio(recipe.starterRatio)}:${_formatRatio(recipe.flourRatio)}:${_formatRatio(recipe.waterRatio)}'),
            ],
            const Divider(height: 24),
            Text('계산 결과', style: textTheme.titleMedium),
            const SizedBox(height: 8),
            if (isDoughType) ...[
              DetailRow(label: '밀가루', value: '${_formatNumber(recipe.resultStarter)}g', isSub: true),
              // 밀가루 상세 표시
              if (recipe.flourDetails != null) ..._buildFlourDetails(recipe.flourDetails!),
              DetailRow(label: '물', value: '${_formatNumber(recipe.resultFlour)}g', isSub: true),
              DetailRow(label: '소금', value: '${_formatNumber(recipe.resultWater)}g', isSub: true),
              if (recipe.resultLevain != null)
                DetailRow(label: '르방', value: '${_formatNumber(recipe.resultLevain)}g', isSub: true),
              // 추가 재료 표시
              if (recipe.extraIngredients != null) ..._buildExtraIngredients(recipe.extraIngredients!),
            ] else ...[
              DetailRow(label: '스타터', value: '${_formatNumber(recipe.resultStarter)}g', isSub: true),
              DetailRow(label: '밀가루', value: '${_formatNumber(recipe.resultFlour)}g', isSub: true),
              DetailRow(label: '물', value: '${_formatNumber(recipe.resultWater)}g', isSub: true),
            ],
          ],
        ),
      ),
    );
  }

  List<Widget> _buildFlourDetails(String flourDetailsJson) {
    try {
      final List<dynamic> flours = jsonDecode(flourDetailsJson);
      final flourTotal = recipe.resultStarter;
      return flours.map((flour) {
        final name = flour['name'] ?? '';
        final amount = flour['amount'] ?? 0;
        final percentage = flourTotal > 0
            ? (amount / flourTotal * 100).toStringAsFixed(1)
            : '0.0';
        return Padding(
          padding: const EdgeInsets.only(left: 16.0, top: 2.0, bottom: 2.0),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Expanded(
                child: Text('  └ $name ($percentage%)',
                    style: TextStyle(color: Colors.grey.shade500, fontSize: 13),
                    overflow: TextOverflow.ellipsis),
              ),
              const SizedBox(width: 8),
              Text('${_formatNumber(amount)}g',
                  style: TextStyle(color: Colors.grey.shade700, fontSize: 13)),
            ],
          ),
        );
      }).toList();
    } catch (e) {
      return [];
    }
  }

  List<Widget> _buildExtraIngredients(String extraIngredientsJson) {
    try {
      final List<dynamic> extras = jsonDecode(extraIngredientsJson);
      return extras.map((extra) {
        final name = extra['name'] ?? '';
        final percent = extra['percent'] ?? 0;
        final amount = extra['amount'] ?? 0;
        return DetailRow(
          label: '$name (${_formatRatio(percent)}%)',
          value: '${_formatNumber(amount)}g',
          isSub: true,
        );
      }).toList();
    } catch (e) {
      return [];
    }
  }

}
