import 'dart:convert';
import 'dart:io';
import 'package:sourdough_timer/database/database.dart';
import 'package:sourdough_timer/screens/main_screen.dart';
import 'package:drift/drift.dart' as drift;
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_background_service/flutter_background_service.dart';
import 'package:provider/provider.dart';

// A helper class to manage controllers for each step
class _TimerStep {
  final TextEditingController nameController;
  final TextEditingController hoursController;
  final TextEditingController minutesController;

  _TimerStep(String name, int totalMinutes)
      : nameController = TextEditingController(text: name),
        hoursController = TextEditingController(text: (totalMinutes ~/ 60).toString()),
        minutesController = TextEditingController(text: (totalMinutes % 60).toString());

  int getTotalMinutes() {
    final hours = int.tryParse(hoursController.text) ?? 0;
    final minutes = int.tryParse(minutesController.text) ?? 0;
    return hours * 60 + minutes;
  }

  void dispose() {
    nameController.dispose();
    hoursController.dispose();
    minutesController.dispose();
  }
}

class TimerSetupScreen extends StatefulWidget {
  final Recipe recipe;
  const TimerSetupScreen({super.key, required this.recipe});

  @override
  State<TimerSetupScreen> createState() => _TimerSetupScreenState();
}

class _TimerSetupScreenState extends State<TimerSetupScreen> {
  final List<_TimerStep> _steps = [];

  @override
  void initState() {
    super.initState();
    // Load timer steps from recipe if available
    if (widget.recipe.timerSteps != null) {
      try {
        final List<dynamic> stepsJson = jsonDecode(widget.recipe.timerSteps!);
        _steps.addAll(stepsJson.map((step) {
          return _TimerStep(
            step['name'] as String,
            step['duration'] as int,
          );
        }));
      } catch (e) {
        // If parsing fails, use default template
        _loadDefaultTemplate();
      }
    } else {
      // Use default sourdough schedule template
      _loadDefaultTemplate();
    }
  }

  void _loadDefaultTemplate() {
    // calculationType에 따라 다른 템플릿 사용
    if (widget.recipe.calculationType == 'unified') {
      // 사워도우 템플릿 (베이커스 퍼센티지 계산기)
      _steps.addAll([
        _TimerStep('오토리즈 (Autolyse)', 60),
        _TimerStep('1차 발효 (Bulk Fermentation) 시작', 30),
        _TimerStep('폴딩 (Folding) #1', 30),
        _TimerStep('폴딩 (Folding) #2', 30),
        _TimerStep('폴딩 (Folding) #3', 180),
        _TimerStep('성형 및 벤치 레스트 (Shaping & Bench Rest)', 30),
        _TimerStep('2차 발효 (Final Proof) - 냉장', 720), // 12시간
        _TimerStep('굽기 (Bake)', 45),
      ]);
    } else if (widget.recipe.calculationType == 'dough') {
      // 일반 도우 템플릿 (도우 계산기)
      _steps.addAll([
        _TimerStep('오토리즈 (Autolyse)', 30),
        _TimerStep('1차 발효 (Bulk Fermentation)', 60),
        _TimerStep('폴딩 (Folding)', 30),
        _TimerStep('분할 및 둥글리기 (Divide & Round)', 15),
        _TimerStep('벤치 타임 (Bench Rest)', 20),
        _TimerStep('성형 (Shaping)', 15),
        _TimerStep('2차 발효 (Final Proof)', 45),
        _TimerStep('굽기 (Bake)', 25),
      ]);
    } else {
      // 기타 타입은 기본 템플릿 사용
      _steps.addAll([
        _TimerStep('준비', 30),
        _TimerStep('1차 발효', 60),
        _TimerStep('성형', 20),
        _TimerStep('2차 발효', 45),
        _TimerStep('굽기', 30),
      ]);
    }
  }

  @override
  void dispose() {
    for (var step in _steps) {
      step.dispose();
    }
    super.dispose();
  }

  void _addStep() {
    setState(() {
      _steps.add(_TimerStep('새 단계', 30));
    });
  }

  void _removeStep(int index) {
    setState(() {
      _steps[index].dispose();
      _steps.removeAt(index);
    });
  }

  Future<void> _startTimer() async {
    final db = Provider.of<AppDatabase>(context, listen: false);

    final stepsMap = _steps.map((step) {
      return {
        'name': step.nameController.text,
        'duration': step.getTotalMinutes(),
      };
    }).toList();

    // 타이머 단계를 레시피에 저장
    final timerStepsJson = jsonEncode(stepsMap);
    final updatedRecipe = widget.recipe.toCompanion(true).copyWith(
      timerSteps: drift.Value(timerStepsJson),
    );
    await db.updateRecipe(updatedRecipe);

    // Background service는 모바일 플랫폼에서만 사용
    if (Platform.isAndroid || Platform.isIOS) {
      final service = FlutterBackgroundService();
      final timerData = {
        'name': widget.recipe.name,
        'steps': stepsMap,
      };
      service.invoke('startTimer', timerData);
    }

    if (mounted) {
      Navigator.of(context).popUntil((route) => route.isFirst);

      // 타이머 탭으로 전환 (인덱스 3)
      MainScreen.globalKey.currentState?.switchToTab(3);

      final message = (Platform.isAndroid || Platform.isIOS)
          ? '타이머가 시작되었습니다!'
          : '타이머 기능은 모바일에서만 지원됩니다.';

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(message)),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('${widget.recipe.name} 타이머 설정'),
      ),
      body: Column(
        children: [
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.all(8),
              itemCount: _steps.length,
              itemBuilder: (context, index) {
                final step = _steps[index];
                return Card(
                  margin: const EdgeInsets.symmetric(vertical: 4),
                  child: Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Row(
                      children: [
                        Expanded(
                          flex: 5,
                          child: TextField(
                            controller: step.nameController,
                            decoration: const InputDecoration(labelText: '단계 이름'),
                          ),
                        ),
                        const SizedBox(width: 8),
                        Expanded(
                          flex: 2,
                          child: TextField(
                            controller: step.hoursController,
                            decoration: const InputDecoration(
                              labelText: '시간',
                              suffixText: 'h',
                            ),
                            keyboardType: TextInputType.number,
                            inputFormatters: [FilteringTextInputFormatter.digitsOnly],
                          ),
                        ),
                        const SizedBox(width: 4),
                        Expanded(
                          flex: 2,
                          child: TextField(
                            controller: step.minutesController,
                            decoration: const InputDecoration(
                              labelText: '분',
                              suffixText: 'm',
                            ),
                            keyboardType: TextInputType.number,
                            inputFormatters: [FilteringTextInputFormatter.digitsOnly],
                          ),
                        ),
                        IconButton(
                          icon: const Icon(Icons.delete_outline, color: Colors.red),
                          onPressed: () => _removeStep(index),
                        ),
                      ],
                    ),
                  ),
                );
              },
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                TextButton.icon(
                  icon: const Icon(Icons.add),
                  label: const Text('단계 추가'),
                  onPressed: _addStep,
                ),
                const SizedBox(height: 8),
                ElevatedButton(
                  onPressed: _startTimer,
                  style: ElevatedButton.styleFrom(
                    padding: const EdgeInsets.symmetric(vertical: 16),
                  ),
                  child: const Text('타이머 시작'),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
