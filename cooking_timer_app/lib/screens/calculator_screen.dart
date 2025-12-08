import 'package:cooking_timer_app/database/database.dart';
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
  // State for Ratio Calculator
  final _totalStarterRatioCtrl = TextEditingController();
  final _starterRatioCtrl = TextEditingController(text: '1');
  final _flourRatioCtrl = TextEditingController(text: '1');
  final _waterRatioCtrl = TextEditingController(text: '1');
  Map<String, int> _ratioResult = {};

  // State for Time Calculator
  final _totalStarterTimeCtrl = TextEditingController();
  String _selectedTimeframe = '6-8';
  Map<String, int> _timeResult = {};

  final List<String> _timeframes = [
    '4-6', '6-8', '8-10', '10-12', '12-14', '16-24'
  ];

  void _calculateRatio() {
    final totalStarter = double.tryParse(_totalStarterRatioCtrl.text) ?? 0;
    final starterRatio = double.tryParse(_starterRatioCtrl.text) ?? 1;
    final flourRatio = double.tryParse(_flourRatioCtrl.text) ?? 1;
    final waterRatio = double.tryParse(_waterRatioCtrl.text) ?? 1;

    if (totalStarter <= 0) return;

    final totalRatio = starterRatio + flourRatio + waterRatio;
    if (totalRatio == 0) return;

    setState(() {
      _ratioResult = {
        'starter': (totalStarter * starterRatio / totalRatio).round(),
        'flour': (totalStarter * flourRatio / totalRatio).round(),
        'water': (totalStarter * waterRatio / totalRatio).round(),
      };
    });
  }

  void _calculateTime() {
    final totalStarter = double.tryParse(_totalStarterTimeCtrl.text) ?? 0;
    if (totalStarter <= 0) return;

    Map<String, List<double>> ratios = {
      '4-6': [1, 1, 1],
      '6-8': [1, 2, 2],
      '8-10': [1, 3, 3],
      '10-12': [1, 4, 4],
      '12-14': [1, 5, 5],
      '16-24': [1, 10, 10],
    };

    final ratio = ratios[_selectedTimeframe] ?? [1, 1, 1];
    final starterRatio = ratio[0];
    final flourRatio = ratio[1];
    final waterRatio = ratio[2];
    final totalRatio = starterRatio + flourRatio + waterRatio;
    
    if (totalRatio == 0) return;

    setState(() {
      _timeResult = {
        'starter': (totalStarter * starterRatio / totalRatio).round(),
        'flour': (totalStarter * flourRatio / totalRatio).round(),
        'water': (totalStarter * waterRatio / totalRatio).round(),
      };
    });
  }

  Future<void> _showSaveRecipeDialog(String type) async {
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
                  _saveRecipeToDb(nameController.text, type);
                  Navigator.of(context).pop();
                }
              },
            ),
          ],
        );
      },
    );
  }

  Future<void> _saveRecipeToDb(String name, String type) async {
    final db = Provider.of<AppDatabase>(context, listen: false);
    
    RecipesCompanion recipe;

    if (type == 'ratio') {
      recipe = RecipesCompanion(
        name: drift.Value(name),
        calculationType: const drift.Value('ratio'),
        totalStarter: drift.Value(double.tryParse(_totalStarterRatioCtrl.text) ?? 0),
        starterRatio: drift.Value(double.tryParse(_starterRatioCtrl.text) ?? 1),
        flourRatio: drift.Value(double.tryParse(_flourRatioCtrl.text) ?? 1),
        waterRatio: drift.Value(double.tryParse(_waterRatioCtrl.text) ?? 1),
        resultStarter: drift.Value(_ratioResult['starter'] ?? 0),
        resultFlour: drift.Value(_ratioResult['flour'] ?? 0),
        resultWater: drift.Value(_ratioResult['water'] ?? 0),
      );
    } else { // time
      final ratio = {
        '4-6': [1.0, 1.0, 1.0], '6-8': [1.0, 2.0, 2.0], '8-10': [1.0, 3.0, 3.0],
        '10-12': [1.0, 4.0, 4.0], '12-14': [1.0, 5.0, 5.0], '16-24': [1.0, 10.0, 10.0],
      }[_selectedTimeframe]!;
      recipe = RecipesCompanion(
        name: drift.Value(name),
        calculationType: const drift.Value('time'),
        totalStarter: drift.Value(double.tryParse(_totalStarterTimeCtrl.text) ?? 0),
        timeframe: drift.Value(_selectedTimeframe),
        starterRatio: drift.Value(ratio[0]),
        flourRatio: drift.Value(ratio[1]),
        waterRatio: drift.Value(ratio[2]),
        resultStarter: drift.Value(_timeResult['starter'] ?? 0),
        resultFlour: drift.Value(_timeResult['flour'] ?? 0),
        resultWater: drift.Value(_timeResult['water'] ?? 0),
      );
    }

    await db.addRecipe(recipe);

    if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('레시피가 저장되었습니다.')),
      );
    }
  }


  @override
  void dispose() {
    _totalStarterRatioCtrl.dispose();
    _starterRatioCtrl.dispose();
    _flourRatioCtrl.dispose();
    _waterRatioCtrl.dispose();
    _totalStarterTimeCtrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final inputFormatter = [FilteringTextInputFormatter.allow(RegExp(r'[0-9.]'))];

    return DefaultTabController(
      length: 2,
      child: Scaffold(
        appBar: AppBar(
          title: const Text('계산기'),
          bottom: const TabBar(
            tabs: [
              Tab(text: '비율 기반'),
              Tab(text: '시간 기반'),
            ],
          ),
        ),
        body: TabBarView(
          children: [
            // Ratio Calculator Tab
            SingleChildScrollView(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  TextField(
                    controller: _totalStarterRatioCtrl,
                    decoration: const InputDecoration(
                      labelText: '총 스타터 양 (g)',
                      border: OutlineInputBorder(),
                    ),
                    keyboardType: TextInputType.number,
                    inputFormatters: inputFormatter,
                  ),
                  const SizedBox(height: 16),
                  Row(
                    children: [
                      Expanded(child: _buildRatioInput(_starterRatioCtrl, '스타터 비율', inputFormatter)),
                      const SizedBox(width: 8),
                      Expanded(child: _buildRatioInput(_flourRatioCtrl, '밀가루 비율', inputFormatter)),
                      const SizedBox(width: 8),
                      Expanded(child: _buildRatioInput(_waterRatioCtrl, '물 비율', inputFormatter)),
                    ],
                  ),
                  const SizedBox(height: 24),
                  ElevatedButton(
                    onPressed: _calculateRatio,
                    child: const Text('계산하기'),
                  ),
                  if (_ratioResult.isNotEmpty)
                    _ResultBox(
                      result: _ratioResult,
                      onSave: () => _showSaveRecipeDialog('ratio'),
                    ),
                ],
              ),
            ),
            // Time Calculator Tab
            SingleChildScrollView(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  TextField(
                    controller: _totalStarterTimeCtrl,
                    decoration: const InputDecoration(
                      labelText: '총 스타터 양 (g)',
                      border: OutlineInputBorder(),
                    ),
                    keyboardType: TextInputType.number,
                    inputFormatters: inputFormatter,
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
                      setState(() {
                        _selectedTimeframe = newValue!;
                      });
                    },
                  ),
                  const SizedBox(height: 24),
                  ElevatedButton(
                    onPressed: _calculateTime,
                    child: const Text('계산하기'),
                  ),
                  if (_timeResult.isNotEmpty)
                     _ResultBox(
                      result: _timeResult,
                      onSave: () => _showSaveRecipeDialog('time'),
                    ),
                ],
              ),
            ),
          ],
        ),
      ),
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
