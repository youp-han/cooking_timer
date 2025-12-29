import 'package:sourdough_timer/database/database.dart';
import 'package:drift/drift.dart' as drift;
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:provider/provider.dart';

class DoughCalculatorScreen extends StatefulWidget {
  const DoughCalculatorScreen({super.key});

  @override
  State<DoughCalculatorScreen> createState() => _DoughCalculatorScreenState();
}

class _DoughCalculatorScreenState extends State<DoughCalculatorScreen> {
  final _totalDoughCtrl = TextEditingController();
  final _waterPercentCtrl = TextEditingController(text: '70');
  final _saltPercentCtrl = TextEditingController(text: '2');
  final _levainPercentCtrl = TextEditingController(text: '20');

  Map<String, int> _result = {
    'flour': 0,
    'water': 0,
    'salt': 0,
    'levain': 0,
  };
  double _doughToLevainRatio = 0;

  void _calculate() {
    final totalDough = double.tryParse(_totalDoughCtrl.text) ?? 0;
    final waterPercent = double.tryParse(_waterPercentCtrl.text) ?? 70;
    final saltPercent = double.tryParse(_saltPercentCtrl.text) ?? 2;
    final levainPercent = double.tryParse(_levainPercentCtrl.text) ?? 20;

    if (totalDough <= 0) {
      setState(() {
        _result = {'flour': 0, 'water': 0, 'salt': 0, 'levain': 0};
        _doughToLevainRatio = 0;
      });
      return;
    }

    // Baker's Percentage 계산
    final totalPercent = 100 + waterPercent + saltPercent + levainPercent;

    final flour = (totalDough * 100 / totalPercent).round();
    final water = (totalDough * waterPercent / totalPercent).round();
    final salt = (totalDough * saltPercent / totalPercent).round();
    final levain = (totalDough * levainPercent / totalPercent).round();

    setState(() {
      _result = {
        'flour': flour,
        'water': water,
        'salt': salt,
        'levain': levain,
      };
      _doughToLevainRatio = levain > 0 ? totalDough / levain : 0;
    });
  }

  Future<void> _showSaveRecipeDialog() async {
    final nameController = TextEditingController();
    return showDialog<void>(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('레시피 이름'),
          content: TextField(
            controller: nameController,
            decoration: const InputDecoration(hintText: "예: 내 도우 레시피"),
          ),
          actions: <Widget>[
            TextButton(
              child: const Text('취소'),
              onPressed: () {
                Navigator.of(context).pop();
              },
            ),
            TextButton(
              child: const Text('저장'),
              onPressed: () {
                if (nameController.text.isNotEmpty) {
                  _saveRecipeToDb(nameController.text);
                  Navigator.of(context).pop();
                }
              },
            ),
          ],
        );
      },
    );
  }

  Future<void> _saveRecipeToDb(String name) async {
    final db = Provider.of<AppDatabase>(context, listen: false);

    final recipe = RecipesCompanion(
      name: drift.Value(name),
      calculationType: const drift.Value('dough'),
      totalStarter: drift.Value(double.tryParse(_totalDoughCtrl.text) ?? 0),
      starterRatio: drift.Value(100), // 밀가루는 항상 100%
      flourRatio: drift.Value(double.tryParse(_waterPercentCtrl.text) ?? 70),
      waterRatio: drift.Value(double.tryParse(_saltPercentCtrl.text) ?? 2),
      temperature: drift.Value(double.tryParse(_levainPercentCtrl.text) ?? 20), // 르방 퍼센티지를 temperature에 임시 저장
      resultStarter: drift.Value(_result['flour'] ?? 0),
      resultFlour: drift.Value(_result['water'] ?? 0),
      resultWater: drift.Value(_result['salt'] ?? 0),
    );

    await db.addRecipe(recipe);

    if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('레시피가 저장되었습니다.')),
      );
    }
  }

  @override
  void dispose() {
    _totalDoughCtrl.dispose();
    _waterPercentCtrl.dispose();
    _saltPercentCtrl.dispose();
    _levainPercentCtrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final inputFormatter = [FilteringTextInputFormatter.allow(RegExp(r'[0-9.]'))];

    return GestureDetector(
        onTap: () {
          FocusScope.of(context).unfocus();
        },
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              TextField(
                controller: _totalDoughCtrl,
                decoration: const InputDecoration(
                  labelText: '총 도우 무게 (g)',
                  border: OutlineInputBorder(),
                ),
                keyboardType: TextInputType.number,
                inputFormatters: inputFormatter,
                onChanged: (_) => _calculate(),
              ),
              const SizedBox(height: 24),
              Text(
                '베이커스 퍼센티지 (밀가루 100% 기준)',
                style: Theme.of(context).textTheme.titleMedium,
              ),
              const SizedBox(height: 16),
              _buildPercentInput(_waterPercentCtrl, '물 (%)', inputFormatter),
              const SizedBox(height: 12),
              _buildPercentInput(_saltPercentCtrl, '소금 (%)', inputFormatter),
              const SizedBox(height: 12),
              _buildPercentInput(_levainPercentCtrl, '르방 (%)', inputFormatter),
              _ResultBox(
                result: _result,
                doughToLevainRatio: _doughToLevainRatio,
                onSave: () => _showSaveRecipeDialog(),
              ),
            ],
          ),
        )
    );
  }

  Widget _buildPercentInput(TextEditingController controller, String label, List<TextInputFormatter> formatters) {
    return TextField(
      controller: controller,
      decoration: InputDecoration(
        labelText: label,
        border: const OutlineInputBorder(),
      ),
      keyboardType: TextInputType.number,
      inputFormatters: formatters,
      onChanged: (_) => _calculate(),
    );
  }
}

class _ResultBox extends StatelessWidget {
  final Map<String, int> result;
  final double doughToLevainRatio;
  final VoidCallback onSave;

  const _ResultBox({
    required this.result,
    required this.doughToLevainRatio,
    required this.onSave,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Container(
      margin: const EdgeInsets.only(top: 24),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: theme.colorScheme.secondaryContainer.withOpacity(0.5),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: theme.colorScheme.outline),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('결과', style: theme.textTheme.titleLarge),
          const SizedBox(height: 8),
          Text('밀가루: ${result['flour']}g', style: theme.textTheme.bodyLarge),
          Text('물: ${result['water']}g', style: theme.textTheme.bodyLarge),
          Text('소금: ${result['salt']}g', style: theme.textTheme.bodyLarge),
          Text('르방: ${result['levain']}g', style: theme.textTheme.bodyLarge),
          const Divider(height: 24),
          Text(
            '도우/르방: ${doughToLevainRatio > 0 ? doughToLevainRatio.toStringAsFixed(1) : '-'}',
            style: theme.textTheme.bodyLarge?.copyWith(
              fontWeight: FontWeight.bold,
              color: theme.colorScheme.primary,
            ),
          ),
          const SizedBox(height: 16),
          SizedBox(
            width: double.infinity,
            child: ElevatedButton.icon(
              onPressed: onSave,
              icon: const Icon(Icons.save),
              label: const Text('레시피로 저장'),
            ),
          ),
        ],
      ),
    );
  }
}
