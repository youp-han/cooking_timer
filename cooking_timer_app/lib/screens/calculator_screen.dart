import 'package:sourdough_timer/database/database.dart';
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

  final List<String> _timeframes = [
    '4-6', '6-8', '8-10', '10-12', '12-14', '16-24'
  ];

  final Map<String, List<double>> _timeframeRatios = {
    '4-6': [1, 1, 1],
    '6-8': [1, 2, 2],
    '8-10': [1, 3, 3],
    '10-12': [1, 4, 4],
    '12-14': [1, 5, 5],
    '16-24': [1, 10, 10],
  };

  void _updateRatiosFromTimeframe(String? timeframe) {
    if (timeframe == null) return;

    final ratios = _timeframeRatios[timeframe] ?? [1, 2, 2];
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

    if (totalStarter <= 0) {
      setState(() {
        _result = {'starter': 0, 'flour': 0, 'water': 0};
      });
      return;
    }

    final totalRatio = starterRatio + flourRatio + waterRatio;
    if (totalRatio == 0) return;

    setState(() {
      _result = {
        'starter': (totalStarter * starterRatio / totalRatio).round(),
        'flour': (totalStarter * flourRatio / totalRatio).round(),
        'water': (totalStarter * waterRatio / totalRatio).round(),
      };
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
    final db = Provider.of<AppDatabase>(context, listen: false);

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

    await db.addRecipe(recipe);

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
                controller: _totalStarterCtrl,
                decoration: const InputDecoration(
                  labelText: '총 르방 양 (g)',
                  border: OutlineInputBorder(),
                ),
                keyboardType: TextInputType.number,
                inputFormatters: inputFormatter,
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
                inputFormatters: inputFormatter,
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
              Row(
                children: [
                  Expanded(child: _buildRatioInput(_starterRatioCtrl, '스타터', inputFormatter)),
                  const SizedBox(width: 8),
                  Expanded(child: _buildRatioInput(_flourRatioCtrl, '밀가루', inputFormatter)),
                  const SizedBox(width: 8),
                  Expanded(child: _buildRatioInput(_waterRatioCtrl, '물', inputFormatter)),
                ],
              ),
              _ResultBox(
                result: _result,
                onSave: () => _showSaveRecipeDialog(),
              ),
            ],
          ),
        )
    );
  }

  Widget _buildRatioInput(TextEditingController controller, String label, List<TextInputFormatter> formatters) {
    return TextField(
      controller: controller,
      decoration: InputDecoration(
        labelText: label,
        border: const OutlineInputBorder(),
      ),
      keyboardType: TextInputType.number,
      inputFormatters: formatters,
      textAlign: TextAlign.center,
      onChanged: (_) => _calculate(),
      onTap: () {
        controller.selection = TextSelection(
          baseOffset: 0,
          extentOffset: controller.text.length,
        );
      },
    );
  }
}

class _ResultBox extends StatelessWidget {
  final Map<String, int> result;
  final VoidCallback onSave;

  const _ResultBox({required this.result, required this.onSave});

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
