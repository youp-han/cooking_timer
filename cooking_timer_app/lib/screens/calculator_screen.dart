import 'package:sourdough_timer/database/database.dart';
import 'package:sourdough_timer/repositories/recipe_repository.dart';
import 'package:sourdough_timer/services/baker_calculator_service.dart';
import 'package:sourdough_timer/widgets/calculator/index.dart';
import 'package:sourdough_timer/utils/input_formatters.dart';
import 'package:drift/drift.dart' as drift;
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:provider/provider.dart';

class CalculatorScreen extends StatefulWidget {
  const CalculatorScreen({super.key});

  @override
  State<CalculatorScreen> createState() => _CalculatorScreenState();
}

class _CalculatorScreenState extends State<CalculatorScreen> {
  // Unified State
  final _totalStarterCtrl = TextEditingController();
  final _starterRatioCtrl = TextEditingController(text: '1');
  final _flourRatioCtrl = TextEditingController(text: '2');
  final _waterRatioCtrl = TextEditingController(text: '2');
  final _temperatureCtrl = TextEditingController(text: '24');
  Map<String, int> _result = {'starter': 0, 'flour': 0, 'water': 0};
  String _selectedTimeframe = '6-8';

  // 서비스에서 timeframes와 ratios 가져오기
  List<String> get _timeframes => BakerCalculatorService.timeframes;

  void _updateRatiosFromTimeframe(String? timeframe) {
    if (timeframe == null) return;

    final ratios = BakerCalculatorService.getRatiosForTimeframe(timeframe) ?? [1, 2, 2];
    setState(() {
      _selectedTimeframe = timeframe;
      _starterRatioCtrl.text = ratios[0].toString();
      _flourRatioCtrl.text = ratios[1].toString();
      _waterRatioCtrl.text = ratios[2].toString();
      _calculate();
    });
  }

  void _calculate() {
    final totalStarter = double.tryParse(_totalStarterCtrl.text) ?? 0;
    final starterRatio = double.tryParse(_starterRatioCtrl.text) ?? 1;
    final flourRatio = double.tryParse(_flourRatioCtrl.text) ?? 1;
    final waterRatio = double.tryParse(_waterRatioCtrl.text) ?? 1;

    setState(() {
      _result = BakerCalculatorService.calculate(
        totalStarter: totalStarter,
        starterRatio: starterRatio,
        flourRatio: flourRatio,
        waterRatio: waterRatio,
      );
    });
  }

  void _reset() {
    setState(() {
      _totalStarterCtrl.clear();
      _starterRatioCtrl.text = '1';
      _flourRatioCtrl.text = '2';
      _waterRatioCtrl.text = '2';
      _temperatureCtrl.text = '24';
      _selectedTimeframe = '6-8';
      _result = {'starter': 0, 'flour': 0, 'water': 0};
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
            decoration: const InputDecoration(hintText: "예: 나의 첫 깜파뉴"),
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
    final repository = Provider.of<RecipeRepository>(context, listen: false);

    final recipe = RecipesCompanion(
      name: drift.Value(name),
      calculationType: const drift.Value('unified'), // Or any identifier you prefer
      totalStarter: drift.Value(double.tryParse(_totalStarterCtrl.text) ?? 0),
      timeframe: drift.Value(_selectedTimeframe),
      starterRatio: drift.Value(double.tryParse(_starterRatioCtrl.text) ?? 1),
      flourRatio: drift.Value(double.tryParse(_flourRatioCtrl.text) ?? 1),
      waterRatio: drift.Value(double.tryParse(_waterRatioCtrl.text) ?? 1),
      temperature: drift.Value(double.tryParse(_temperatureCtrl.text) ?? 24),
      resultStarter: drift.Value(_result['starter'] ?? 0),
      resultFlour: drift.Value(_result['flour'] ?? 0),
      resultWater: drift.Value(_result['water'] ?? 0),
    );

    await repository.add(recipe);

    if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('레시피가 저장되었습니다.')),
      );
    }
  }


  @override
  void dispose() {
    _totalStarterCtrl.dispose();
    _starterRatioCtrl.dispose();
    _flourRatioCtrl.dispose();
    _waterRatioCtrl.dispose();
    _temperatureCtrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
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
                controller: _totalStarterCtrl,
                decoration: const InputDecoration(
                  labelText: '총 르방 양 (g)',
                  border: OutlineInputBorder(),
                ),
                keyboardType: TextInputType.number,
                inputFormatters: AppInputFormatters.decimal,
                onChanged: (_) => _calculate(),
                onTap: () {
                  _totalStarterCtrl.selection = TextSelection(
                    baseOffset: 0,
                    extentOffset: _totalStarterCtrl.text.length,
                  );
                },
              ),
              const SizedBox(height: 16),
              TextField(
                controller: _temperatureCtrl,
                decoration: const InputDecoration(
                  labelText: '온도 (°C)',
                  border: OutlineInputBorder(),
                ),
                keyboardType: TextInputType.number,
                inputFormatters: AppInputFormatters.decimal,
                onChanged: (_) { /* Only update state if needed, calculation is on other fields */ },
                onTap: () {
                  _temperatureCtrl.selection = TextSelection(
                    baseOffset: 0,
                    extentOffset: _temperatureCtrl.text.length,
                  );
                },
              ),
              const SizedBox(height: 16),
              DropdownButtonFormField<String>(
                value: _selectedTimeframe,
                decoration: const InputDecoration(
                  labelText: '준비 시간 (Hours)',
                  border: OutlineInputBorder(),
                ),
                items: _timeframes.map((String value) {
                  return DropdownMenuItem<String>(
                    value: value,
                    child: Text('$value 시간'),
                  );
                }).toList(),
                onChanged: (newValue) {
                  _updateRatiosFromTimeframe(newValue);
                },
              ),
              const SizedBox(height: 16),
              RatioInputRow(
                starterController: _starterRatioCtrl,
                flourController: _flourRatioCtrl,
                waterController: _waterRatioCtrl,
                inputFormatters: AppInputFormatters.decimal,
                onChanged: (_) => _calculate(),
              ),
              _ResultBox(
                result: _result,
                onSave: () => _showSaveRecipeDialog(),
                onReset: _reset,
              ),
            ],
          ),
        )
    );
  }

}

class _ResultBox extends StatelessWidget {
  final Map<String, int> result;
  final VoidCallback onSave;
  final VoidCallback onReset;

  const _ResultBox({required this.result, required this.onSave, required this.onReset});

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
          Text('스타터: ${result['starter']}g', style: theme.textTheme.bodyLarge),
          Text('밀가루: ${result['flour']}g', style: theme.textTheme.bodyLarge),
          Text('물: ${result['water']}g', style: theme.textTheme.bodyLarge),
          const SizedBox(height: 16),
          Row(
            children: [
              Expanded(
                child: OutlinedButton.icon(
                  onPressed: onReset,
                  icon: const Icon(Icons.refresh),
                  label: const Text('재설정'),
                ),
              ),
              const SizedBox(width: 8),
              Expanded(
                child: ElevatedButton.icon(
                  onPressed: onSave,
                  icon: const Icon(Icons.save),
                  label: const Text('저장'),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
