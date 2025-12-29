import 'dart:convert';
import 'package:sourdough_timer/database/database.dart';
import 'package:drift/drift.dart' as drift;
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:provider/provider.dart';

// Helper class for flour details
class _FlourItem {
  final TextEditingController nameController;
  final TextEditingController amountController;

  _FlourItem(String name, String amount)
      : nameController = TextEditingController(text: name),
        amountController = TextEditingController(text: amount);

  void dispose() {
    nameController.dispose();
    amountController.dispose();
  }
}

// Helper class for extra ingredients
class _ExtraIngredient {
  final TextEditingController nameController;
  final TextEditingController percentController;
  final TextEditingController gramsController;

  _ExtraIngredient(String name, String percent)
      : nameController = TextEditingController(text: name),
        percentController = TextEditingController(text: percent),
        gramsController = TextEditingController(text: '0');

  void dispose() {
    nameController.dispose();
    percentController.dispose();
    gramsController.dispose();
  }
}

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

  // g 입력용 컨트롤러
  final _waterGramsCtrl = TextEditingController();
  final _saltGramsCtrl = TextEditingController();
  final _levainGramsCtrl = TextEditingController();

  final List<_FlourItem> _flourItems = [];
  final List<_ExtraIngredient> _extraIngredients = [];

  bool _isCalculating = false; // 무한 루프 방지
  String _calculationMode = 'byDough'; // 'byDough' 또는 'byIngredients'

  Map<String, int> _result = {
    'flour': 0,
    'water': 0,
    'salt': 0,
    'levain': 0,
  };
  Map<String, int> _extraResults = {};

  @override
  void initState() {
    super.initState();
    // 기본 밀가루 추가
    _flourItems.add(_FlourItem('밀가루1', '0'));
  }

  void _calculate({bool updateGrams = true, String? skipField, int? skipExtraIndex}) {
    if (_isCalculating) return;
    _isCalculating = true;

    final totalDough = double.tryParse(_totalDoughCtrl.text) ?? 0;
    final waterPercent = double.tryParse(_waterPercentCtrl.text) ?? 70;
    final saltPercent = double.tryParse(_saltPercentCtrl.text) ?? 2;
    final levainPercent = double.tryParse(_levainPercentCtrl.text) ?? 20;

    if (totalDough <= 0) {
      setState(() {
        _result = {'flour': 0, 'water': 0, 'salt': 0, 'levain': 0};
        _extraResults = {};
        if (updateGrams) {
          if (skipField != 'water') _waterGramsCtrl.text = '0';
          if (skipField != 'salt') _saltGramsCtrl.text = '0';
          if (skipField != 'levain') _levainGramsCtrl.text = '0';
        }
      });
      _isCalculating = false;
      return;
    }

    // 추가 재료 퍼센티지 합계
    double extraPercent = 0;
    for (var ingredient in _extraIngredients) {
      extraPercent += double.tryParse(ingredient.percentController.text) ?? 0;
    }

    // Baker's Percentage 계산 (추가 재료 포함)
    final totalPercent = 100 + waterPercent + saltPercent + levainPercent + extraPercent;

    final flour = (totalDough * 100 / totalPercent).round();
    final water = (totalDough * waterPercent / totalPercent).round();
    final salt = (totalDough * saltPercent / totalPercent).round();
    final levain = (totalDough * levainPercent / totalPercent).round();

    // 추가 재료 계산
    final Map<String, int> extras = {};
    for (int i = 0; i < _extraIngredients.length; i++) {
      final percent = double.tryParse(_extraIngredients[i].percentController.text) ?? 0;
      final grams = (totalDough * percent / totalPercent).round();
      extras['extra_$i'] = grams;
    }

    setState(() {
      _result = {
        'flour': flour,
        'water': water,
        'salt': salt,
        'levain': levain,
      };
      _extraResults = extras;

      // g 필드 업데이트 (현재 수정 중인 필드는 제외)
      if (updateGrams) {
        if (skipField != 'water') _waterGramsCtrl.text = water.toString();
        if (skipField != 'salt') _saltGramsCtrl.text = salt.toString();
        if (skipField != 'levain') _levainGramsCtrl.text = levain.toString();
        // 추가 재료 g 필드 업데이트
        for (int i = 0; i < _extraIngredients.length; i++) {
          if (skipExtraIndex != i) {
            _extraIngredients[i].gramsController.text = extras['extra_$i'].toString();
          }
        }
      }
    });

    _isCalculating = false;
  }

  // g 입력으로부터 % 역계산
  void _calculatePercentFromGrams(String type, String gramsText, {int? extraIndex}) {
    if (_isCalculating) return;

    final grams = double.tryParse(gramsText) ?? 0;
    final flour = _result['flour'] ?? 1; // 0으로 나누기 방지

    if (flour == 0) return;

    final percent = (grams / flour * 100);

    if (extraIndex != null) {
      // 추가 재료의 경우
      if (extraIndex < _extraIngredients.length) {
        _extraIngredients[extraIndex].percentController.text = percent.toStringAsFixed(1);
      }
    } else {
      // 기본 재료의 경우
      switch (type) {
        case 'water':
          _waterPercentCtrl.text = percent.toStringAsFixed(1);
          break;
        case 'salt':
          _saltPercentCtrl.text = percent.toStringAsFixed(1);
          break;
        case 'levain':
          _levainPercentCtrl.text = percent.toStringAsFixed(1);
          break;
      }
    }

    // 현재 수정 중인 필드를 제외하고 모든 g 필드 업데이트
    _calculate(updateGrams: true, skipField: type, skipExtraIndex: extraIndex);
  }

  // 재료 기준 계산 (재료 무게 → 총 도우 무게 & %)
  void _calculateByIngredients() {
    if (_isCalculating) return;
    _isCalculating = true;

    // 밀가루 총합 계산
    int flourTotal = 0;
    for (var item in _flourItems) {
      flourTotal += int.tryParse(item.amountController.text) ?? 0;
    }

    // 재료 g 값 읽기
    final waterGrams = double.tryParse(_waterGramsCtrl.text) ?? 0;
    final saltGrams = double.tryParse(_saltGramsCtrl.text) ?? 0;
    final levainGrams = double.tryParse(_levainGramsCtrl.text) ?? 0;

    // 추가 재료 g 값 읽기
    double extraGramsTotal = 0;
    final Map<String, int> extras = {};
    for (int i = 0; i < _extraIngredients.length; i++) {
      final grams = double.tryParse(_extraIngredients[i].gramsController.text) ?? 0;
      extras['extra_$i'] = grams.round();
      extraGramsTotal += grams;
    }

    // 총 도우 무게 = 모든 재료의 합
    final totalDough = flourTotal + waterGrams + saltGrams + levainGrams + extraGramsTotal;

    // 밀가루를 기준으로 % 계산
    double waterPercent = 0;
    double saltPercent = 0;
    double levainPercent = 0;

    if (flourTotal > 0) {
      waterPercent = (waterGrams / flourTotal * 100);
      saltPercent = (saltGrams / flourTotal * 100);
      levainPercent = (levainGrams / flourTotal * 100);
    }

    setState(() {
      // 총 도우 무게 업데이트
      _totalDoughCtrl.text = totalDough.round().toString();

      // % 값 업데이트
      _waterPercentCtrl.text = waterPercent.toStringAsFixed(1);
      _saltPercentCtrl.text = saltPercent.toStringAsFixed(1);
      _levainPercentCtrl.text = levainPercent.toStringAsFixed(1);

      // 결과 업데이트
      _result = {
        'flour': flourTotal,
        'water': waterGrams.round(),
        'salt': saltGrams.round(),
        'levain': levainGrams.round(),
      };
      _extraResults = extras;

      // 추가 재료 % 계산
      for (int i = 0; i < _extraIngredients.length; i++) {
        if (flourTotal > 0) {
          final grams = extras['extra_$i'] ?? 0;
          final percent = (grams / flourTotal * 100);
          _extraIngredients[i].percentController.text = percent.toStringAsFixed(1);
        }
      }
    });

    _isCalculating = false;
  }

  void _reset() {
    setState(() {
      // 컨트롤러 초기화
      _totalDoughCtrl.clear();
      _waterPercentCtrl.text = '70';
      _saltPercentCtrl.text = '2';
      _levainPercentCtrl.text = '20';
      _waterGramsCtrl.clear();
      _saltGramsCtrl.clear();
      _levainGramsCtrl.clear();

      // 밀가루 아이템 초기화
      for (var item in _flourItems) {
        item.dispose();
      }
      _flourItems.clear();
      _flourItems.add(_FlourItem('밀가루1', '0'));

      // 추가 재료 초기화
      for (var ingredient in _extraIngredients) {
        ingredient.dispose();
      }
      _extraIngredients.clear();

      // 계산 모드 및 결과 초기화
      _calculationMode = 'byDough';
      _result = {'flour': 0, 'water': 0, 'salt': 0, 'levain': 0};
      _extraResults = {};
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

    // 밀가루 상세 정보를 JSON으로 변환
    final flourDetailsList = _flourItems.map((item) {
      return {
        'name': item.nameController.text,
        'amount': int.tryParse(item.amountController.text) ?? 0,
      };
    }).toList();
    final flourDetailsJson = jsonEncode(flourDetailsList);

    // 추가 재료 정보를 JSON으로 변환
    final extraIngredientsList = _extraIngredients.asMap().entries.map((entry) {
      final index = entry.key;
      final ingredient = entry.value;
      return {
        'name': ingredient.nameController.text,
        'percent': double.tryParse(ingredient.percentController.text) ?? 0,
        'amount': _extraResults['extra_$index'] ?? 0,
      };
    }).toList();
    final extraIngredientsJson = _extraIngredients.isNotEmpty
        ? jsonEncode(extraIngredientsList)
        : null;

    final recipe = RecipesCompanion(
      name: drift.Value(name),
      calculationType: const drift.Value('dough'),
      totalStarter: drift.Value(double.tryParse(_totalDoughCtrl.text) ?? 0),
      starterRatio: drift.Value(100), // 밀가루는 항상 100%
      flourRatio: drift.Value(double.tryParse(_waterPercentCtrl.text) ?? 70),
      waterRatio: drift.Value(double.tryParse(_saltPercentCtrl.text) ?? 2),
      temperature: drift.Value(double.tryParse(_levainPercentCtrl.text) ?? 20),
      resultStarter: drift.Value(_result['flour'] ?? 0),
      resultFlour: drift.Value(_result['water'] ?? 0),
      resultWater: drift.Value(_result['salt'] ?? 0),
      resultLevain: drift.Value(_result['levain'] ?? 0),
      flourDetails: drift.Value(flourDetailsJson),
      extraIngredients: extraIngredientsJson != null
          ? drift.Value(extraIngredientsJson)
          : const drift.Value.absent(),
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
    _waterGramsCtrl.dispose();
    _saltGramsCtrl.dispose();
    _levainGramsCtrl.dispose();
    for (var item in _flourItems) {
      item.dispose();
    }
    for (var item in _extraIngredients) {
      item.dispose();
    }
    super.dispose();
  }

  int _getFlourTotal() {
    int total = 0;
    for (var item in _flourItems) {
      total += int.tryParse(item.amountController.text) ?? 0;
    }
    return total;
  }

  void _addFlourItem() {
    setState(() {
      _flourItems.add(_FlourItem('밀가루${_flourItems.length + 1}', '0'));
    });
  }

  void _removeFlourItem(int index) {
    setState(() {
      _flourItems[index].dispose();
      _flourItems.removeAt(index);
    });
  }

  void _addExtraIngredient() {
    setState(() {
      _extraIngredients.add(_ExtraIngredient('재료', '0'));
    });
  }

  void _removeExtraIngredient(int index) {
    setState(() {
      _extraIngredients[index].dispose();
      _extraIngredients.removeAt(index);
      _calculate();
    });
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
              // 계산 모드 선택
              SegmentedButton<String>(
                segments: const [
                  ButtonSegment(
                    value: 'byDough',
                    label: Text('총 도우 기준'),
                    icon: Icon(Icons.straighten),
                  ),
                  ButtonSegment(
                    value: 'byIngredients',
                    label: Text('재료 기준'),
                    icon: Icon(Icons.bakery_dining),
                  ),
                ],
                selected: {_calculationMode},
                onSelectionChanged: (Set<String> newSelection) {
                  setState(() {
                    _calculationMode = newSelection.first;
                  });
                },
              ),
              const SizedBox(height: 16),
              TextField(
                controller: _totalDoughCtrl,
                decoration: InputDecoration(
                  labelText: '총 도우 무게 (g)',
                  border: const OutlineInputBorder(),
                  filled: _calculationMode == 'byIngredients',
                  fillColor: _calculationMode == 'byIngredients'
                      ? Colors.grey.shade200
                      : null,
                ),
                keyboardType: TextInputType.number,
                inputFormatters: inputFormatter,
                enabled: _calculationMode == 'byDough',
                readOnly: _calculationMode == 'byIngredients',
                onChanged: (_) => _calculate(),
                onTap: () {
                  if (_calculationMode == 'byDough') {
                    _totalDoughCtrl.selection = TextSelection(
                      baseOffset: 0,
                      extentOffset: _totalDoughCtrl.text.length,
                    );
                  }
                },
              ),
              const SizedBox(height: 24),
              Text(
                '베이커스 퍼센티지 (밀가루 100% 기준)',
                style: Theme.of(context).textTheme.titleMedium,
              ),
              const SizedBox(height: 16),
              _buildFlourResult(),
              const SizedBox(height: 16),
              _buildDualInputWithResult(_waterPercentCtrl, _waterGramsCtrl, '물', 'water', inputFormatter),
              const SizedBox(height: 12),
              _buildDualInputWithResult(_saltPercentCtrl, _saltGramsCtrl, '소금', 'salt', inputFormatter),
              const SizedBox(height: 12),
              _buildDualInputWithResult(_levainPercentCtrl, _levainGramsCtrl, '르방', 'levain', inputFormatter),
              const SizedBox(height: 16),
              _buildExtraIngredientsSection(inputFormatter),
              const SizedBox(height: 24),
              Row(
                children: [
                  Expanded(
                    child: OutlinedButton.icon(
                      onPressed: _reset,
                      icon: const Icon(Icons.refresh),
                      label: const Text('Reset'),
                      style: OutlinedButton.styleFrom(
                        padding: const EdgeInsets.symmetric(vertical: 16),
                      ),
                    ),
                  ),
                  const SizedBox(width: 8),
                  Expanded(
                    child: ElevatedButton.icon(
                      onPressed: () => _showSaveRecipeDialog(),
                      icon: const Icon(Icons.save),
                      label: const Text('저장'),
                      style: ElevatedButton.styleFrom(
                        padding: const EdgeInsets.symmetric(vertical: 16),
                      ),
                    ),
                  ),
                ],
              ),
            ],
          ),
        )
    );
  }

  Widget _buildDualInputWithResult(
    TextEditingController percentCtrl,
    TextEditingController gramsCtrl,
    String label,
    String resultKey,
    List<TextInputFormatter> formatters,
  ) {
    final isIngredientsMode = _calculationMode == 'byIngredients';

    return Row(
      children: [
        // % 입력
        Expanded(
          flex: 2,
          child: TextField(
            controller: percentCtrl,
            decoration: InputDecoration(
              labelText: '$label (%)',
              border: const OutlineInputBorder(),
              filled: isIngredientsMode,
              fillColor: isIngredientsMode ? Colors.grey.shade200 : null,
            ),
            keyboardType: TextInputType.number,
            inputFormatters: formatters,
            enabled: !isIngredientsMode,
            readOnly: isIngredientsMode,
            onChanged: (_) => _calculate(),
            onTap: () {
              if (!isIngredientsMode) {
                percentCtrl.selection = TextSelection(
                  baseOffset: 0,
                  extentOffset: percentCtrl.text.length,
                );
              }
            },
          ),
        ),
        const SizedBox(width: 8),
        // g 입력
        Expanded(
          flex: 2,
          child: TextField(
            controller: gramsCtrl,
            decoration: const InputDecoration(
              labelText: 'g',
              border: OutlineInputBorder(),
            ),
            keyboardType: TextInputType.number,
            inputFormatters: [FilteringTextInputFormatter.digitsOnly],
            onChanged: (value) {
              if (isIngredientsMode) {
                _calculateByIngredients();
              } else {
                _calculatePercentFromGrams(resultKey, value);
              }
            },
            onTap: () {
              gramsCtrl.selection = TextSelection(
                baseOffset: 0,
                extentOffset: gramsCtrl.text.length,
              );
            },
          ),
        ),
      ],
    );
  }

  Widget _buildFlourResult() {
    final flourTotal = _result['flour'] ?? 0;
    final inputTotal = _getFlourTotal();
    final isValid = inputTotal == flourTotal;
    final theme = Theme.of(context);

    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: theme.colorScheme.surfaceVariant.withOpacity(0.3),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: theme.colorScheme.outline),
      ),
            child: Column(
              children: [
                ..._flourItems.asMap().entries.map((entry) {
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
                        Expanded(
                          flex: 2,
                          child: TextField(
                            controller: item.nameController,
                            decoration: const InputDecoration(
                              labelText: '이름',
                              border: OutlineInputBorder(),
                              isDense: true,
                            ),
                            onTap: () {
                              item.nameController.selection = TextSelection(
                                baseOffset: 0,
                                extentOffset: item.nameController.text.length,
                              );
                            },
                          ),
                        ),
                        const SizedBox(width: 8),
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
                            onChanged: (_) {
                              if (_calculationMode == 'byIngredients') {
                                _calculateByIngredients();
                              } else {
                                setState(() {});
                              }
                            },
                            onTap: () {
                              item.amountController.selection = TextSelection(
                                baseOffset: 0,
                                extentOffset: item.amountController.text.length,
                              );
                            },
                          ),
                        ),
                        const SizedBox(width: 8),
                        Expanded(
                          flex: 1,
                          child: Text(
                            '$percentage%',
                            style: theme.textTheme.bodySmall,
                            textAlign: TextAlign.center,
                          ),
                        ),
                        if (_flourItems.length > 1)
                          IconButton(
                            icon: Icon(Icons.delete_outline,
                                size: 20, color: theme.colorScheme.error),
                            onPressed: () => _removeFlourItem(index),
                            padding: EdgeInsets.zero,
                            constraints: const BoxConstraints(),
                          ),
                      ],
                    ),
                  );
                }),
                if (_flourItems.isNotEmpty) const SizedBox(height: 8),
                TextButton.icon(
                  icon: const Icon(Icons.add, size: 18),
                  label: const Text('밀가루 추가'),
                  onPressed: _addFlourItem,
                ),
                const Divider(height: 16),
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
                          '$inputTotal g',
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
                if (!isValid)
                  Padding(
                    padding: const EdgeInsets.only(top: 8.0),
                    child: Text(
                      inputTotal > flourTotal
                          ? '⚠️ ${inputTotal - flourTotal}g 초과'
                          : '⚠️ ${flourTotal - inputTotal}g 부족',
                      style: theme.textTheme.bodySmall?.copyWith(
                        color: theme.colorScheme.error,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
              ],
            ),
          ),
    );
  }

  Widget _buildExtraIngredientsSection(List<TextInputFormatter> inputFormatter) {
    final theme = Theme.of(context);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            Icon(Icons.add_circle_outline, size: 20, color: theme.colorScheme.primary),
            const SizedBox(width: 8),
            Text(
              '추가 재료',
              style: theme.textTheme.titleMedium,
            ),
          ],
        ),
        const SizedBox(height: 12),
        Container(
          padding: const EdgeInsets.all(12),
          decoration: BoxDecoration(
            color: theme.colorScheme.surfaceVariant.withOpacity(0.3),
            borderRadius: BorderRadius.circular(8),
            border: Border.all(color: theme.colorScheme.outline),
          ),
          child: Column(
            children: [
              ..._extraIngredients.asMap().entries.map((entry) {
                  final index = entry.key;
                  final ingredient = entry.value;
                  final amount = _extraResults['extra_$index'] ?? 0;

                  return Padding(
                    padding: const EdgeInsets.only(bottom: 8.0),
                    child: Row(
                      children: [
                        Expanded(
                          flex: 2,
                          child: TextField(
                            controller: ingredient.nameController,
                            decoration: const InputDecoration(
                              labelText: '이름',
                              border: OutlineInputBorder(),
                              isDense: true,
                              hintText: '예: 오일, 버터',
                            ),
                            onTap: () {
                              ingredient.nameController.selection = TextSelection(
                                baseOffset: 0,
                                extentOffset: ingredient.nameController.text.length,
                              );
                            },
                          ),
                        ),
                        const SizedBox(width: 8),
                        Expanded(
                          flex: 2,
                          child: TextField(
                            controller: ingredient.percentController,
                            decoration: InputDecoration(
                              labelText: '%',
                              border: const OutlineInputBorder(),
                              isDense: true,
                              filled: _calculationMode == 'byIngredients',
                              fillColor: _calculationMode == 'byIngredients' ? Colors.grey.shade200 : null,
                            ),
                            keyboardType: TextInputType.number,
                            inputFormatters: inputFormatter,
                            enabled: _calculationMode != 'byIngredients',
                            readOnly: _calculationMode == 'byIngredients',
                            onChanged: (_) => _calculate(),
                            onTap: () {
                              if (_calculationMode != 'byIngredients') {
                                ingredient.percentController.selection = TextSelection(
                                  baseOffset: 0,
                                  extentOffset: ingredient.percentController.text.length,
                                );
                              }
                            },
                          ),
                        ),
                        const SizedBox(width: 8),
                        Expanded(
                          flex: 2,
                          child: TextField(
                            controller: ingredient.gramsController,
                            decoration: const InputDecoration(
                              labelText: 'g',
                              border: OutlineInputBorder(),
                              isDense: true,
                            ),
                            keyboardType: TextInputType.number,
                            inputFormatters: [FilteringTextInputFormatter.digitsOnly],
                            onChanged: (value) {
                              if (_calculationMode == 'byIngredients') {
                                _calculateByIngredients();
                              } else {
                                _calculatePercentFromGrams('', value, extraIndex: index);
                              }
                            },
                            onTap: () {
                              ingredient.gramsController.selection = TextSelection(
                                baseOffset: 0,
                                extentOffset: ingredient.gramsController.text.length,
                              );
                            },
                          ),
                        ),
                        IconButton(
                          icon: Icon(Icons.delete_outline,
                              size: 20, color: theme.colorScheme.error),
                          onPressed: () => _removeExtraIngredient(index),
                          padding: EdgeInsets.zero,
                          constraints: const BoxConstraints(),
                        ),
                      ],
                    ),
                );
              }),
              if (_extraIngredients.isNotEmpty) const SizedBox(height: 8),
              TextButton.icon(
                icon: const Icon(Icons.add, size: 18),
                label: const Text('재료 추가'),
                onPressed: _addExtraIngredient,
              ),
            ],
          ),
        ),
      ],
    );
  }
}
