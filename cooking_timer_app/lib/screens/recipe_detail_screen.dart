import 'package:sourdough_timer/database/database.dart';
import 'package:sourdough_timer/screens/timer_setup_screen.dart';
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
    final isUnifiedType = recipe.calculationType == 'unified';

    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('저장된 계산 정보', style: textTheme.titleLarge),
            const Divider(height: 24),
            if (isUnifiedType) ...[
              _buildDetailRow('총 르방', '${_formatNumber(recipe.totalStarter)}g'),
              if (recipe.temperature != null)
                _buildDetailRow('온도', '${_formatNumber(recipe.temperature)}°C'),
              _buildDetailRow('준비 시간', '${recipe.timeframe} 시간'),
              _buildDetailRow('비율', '${_formatRatio(recipe.starterRatio)}:${_formatRatio(recipe.flourRatio)}:${_formatRatio(recipe.waterRatio)}'),
            ] else ...[ // Legacy support
              _buildDetailRow('계산 방식', recipe.calculationType == 'ratio' ? '비율 기반' : '시간 기반'),
              _buildDetailRow('총 르방', '${_formatNumber(recipe.totalStarter)}g'),
              if (recipe.timeframe != null)
                _buildDetailRow('준비 시간', '${recipe.timeframe} 시간'),
              if (recipe.starterRatio != null)
                _buildDetailRow('비율', '${_formatRatio(recipe.starterRatio)}:${_formatRatio(recipe.flourRatio)}:${_formatRatio(recipe.waterRatio)}'),
            ],
            const Divider(height: 24),
            Text('계산 결과', style: textTheme.titleMedium),
            const SizedBox(height: 8),
            _buildDetailRow('스타터', '${_formatNumber(recipe.resultStarter)}g', isSub: true),
            _buildDetailRow('밀가루', '${_formatNumber(recipe.resultFlour)}g', isSub: true),
            _buildDetailRow('물', '${_formatNumber(recipe.resultWater)}g', isSub: true),
          ],
        ),
      ),
    );
  }

  Widget _buildDetailRow(String label, String value, {bool isSub = false}) {
    return Padding(
      padding: EdgeInsets.symmetric(vertical: isSub ? 2.0 : 4.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label, style: TextStyle(color: Colors.grey.shade600)),
          Text(value, style: const TextStyle(fontWeight: FontWeight.bold)),
        ],
      ),
    );
  }
}
