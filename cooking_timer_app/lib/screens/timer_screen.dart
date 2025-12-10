import 'package:cooking_timer_app/database/database.dart';
import 'package:flutter/material.dart';
import 'package:flutter_background_service/flutter_background_service.dart';

class TimerScreen extends StatefulWidget {
  const TimerScreen({super.key});

  @override
  State<TimerScreen> createState() => _TimerScreenState();
}

class _TimerScreenState extends State<TimerScreen> {
  List<Map<String, dynamic>> _activeTimers = [];

  @override
  void initState() {
    super.initState();
    final service = FlutterBackgroundService();
    // Listen for updates from the background service
    service.on('update').listen((data) {
      if (data != null && data['activeTimers'] is List) {
        if (mounted) {
          setState(() {
            _activeTimers = List<Map<String, dynamic>>.from(data['activeTimers']);
          });
        }
      }
    });
  }

  Future<void> _deleteSchedule(int scheduleId) async {
    final service = FlutterBackgroundService();
    service.invoke('deleteSchedule', {'scheduleId': scheduleId});
  }

  @override
  Widget build(BuildContext context) {
    if (_activeTimers.isEmpty) {
      return Scaffold(
        appBar: AppBar(
          title: const Text('진행중인 타이머'),
        ),
        body: const Center(
          child: Text(
            '시작된 타이머가 없습니다.\n\'내 레시피\'에서 타이머를 시작해보세요!',
            textAlign: TextAlign.center,
            style: TextStyle(color: Colors.grey),
          ),
        ),
      );
    }

    return Scaffold(
      appBar: AppBar(
        title: const Text('진행중인 타이머'),
      ),
      body: ListView.builder(
        itemCount: _activeTimers.length,
        itemBuilder: (context, index) {
          final timerData = _activeTimers[index];
          return _TimerCard(
            timerData: timerData,
            onDelete: () => _deleteSchedule(timerData['id'] as int),
          );
        },
      ),
    );
  }
}

class _TimerCard extends StatelessWidget {
  final Map<String, dynamic> timerData;
  final VoidCallback onDelete;

  const _TimerCard({required this.timerData, required this.onDelete});

  @override
  Widget build(BuildContext context) {
    String formattedTime = timerData['timeRemaining'] != null
        ? Duration(seconds: timerData['timeRemaining'] as int).toString().split('.').first.padLeft(8, '0')
        : '00:00:00';
    
    final totalSteps = timerData['totalSteps'] as int;
    final currentStepIndex = timerData['currentStepIndex'] as int;
    final currentStepName = timerData['currentStepName'] as String;
    final progress = timerData['progress'] as double;
    final isCompleted = timerData['isCompleted'] as bool;

    return Card(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  timerData['name'] as String,
                  style: Theme.of(context).textTheme.titleLarge,
                ),
                IconButton(
                  icon: const Icon(Icons.delete_forever, color: Colors.grey),
                  onPressed: onDelete,
                ),
              ],
            ),
            const SizedBox(height: 16),
            if (!isCompleted) ...[
              Text('현재 단계: $currentStepName (${currentStepIndex + 1}/$totalSteps)'),
              const SizedBox(height: 8),
              Text(formattedTime, style: Theme.of(context).textTheme.headlineMedium),
              const SizedBox(height: 8),
              LinearProgressIndicator(
                value: progress,
                minHeight: 10,
                borderRadius: BorderRadius.circular(5),
              ),
            ] else ...[
              Text('모든 단계 완료!', style: Theme.of(context).textTheme.headlineMedium),
            ]
          ],
        ),
      ),
    );
  }
}
