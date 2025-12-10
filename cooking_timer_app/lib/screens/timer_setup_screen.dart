import 'package:sourdough_timer/database/database.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_background_service/flutter_background_service.dart';

// A helper class to manage controllers for each step
class _TimerStep {
  final TextEditingController nameController;
  final TextEditingController durationController;
  _TimerStep(String name, int duration)
      : nameController = TextEditingController(text: name),
        durationController = TextEditingController(text: duration.toString());

  void dispose() {
    nameController.dispose();
    durationController.dispose();
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
    // Populate with a default sourdough schedule template
    _steps.addAll([
      _TimerStep('오토리즈 (Autolyse)', 60),
      _TimerStep('1차 발효 (Bulk Fermentation) 시작', 30),
      _TimerStep('폴딩 (Folding) #1', 30),
      _TimerStep('폴딩 (Folding) #2', 30),
      _TimerStep('폴딩 (Folding) #3', 180),
      _TimerStep('성형 및 벤치 레스트 (Shaping & Bench Rest)', 30),
      _TimerStep('2차 발효 (Final Proof)', 60),
      _TimerStep('굽기 (Bake)', 45),
    ]);
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

  void _startTimer() {
    final service = FlutterBackgroundService();

    final stepsMap = _steps.map((step) {
      return {
        'name': step.nameController.text,
        'duration': int.tryParse(step.durationController.text) ?? 0,
      };
    }).toList();

    final timerData = {
      'name': widget.recipe.name,
      'steps': stepsMap,
    };

    service.invoke('startTimer', timerData);

    if (mounted) {
      Navigator.of(context).popUntil((route) => route.isFirst);
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('타이머가 시작되었습니다!')),
      );
      // TODO: Switch to the Timer tab
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
                          flex: 4,
                          child: TextField(
                            controller: step.nameController,
                            decoration: const InputDecoration(labelText: '단계 이름'),
                          ),
                        ),
                        const SizedBox(width: 8),
                        Expanded(
                          flex: 2,
                          child: TextField(
                            controller: step.durationController,
                            decoration: const InputDecoration(labelText: '시간 (분)'),
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
