import 'dart:async';
import 'dart:io';
import 'package:sourdough_timer/database/database.dart';
import 'package:sourdough_timer/widgets/common/index.dart';
import 'package:flutter/material.dart';
import 'package:flutter_background_service/flutter_background_service.dart';

class TimerScreen extends StatefulWidget {
  const TimerScreen({super.key});

  @override
  State<TimerScreen> createState() => _TimerScreenState();
}

class _TimerScreenState extends State<TimerScreen> {
  List<Map<String, dynamic>> _activeTimers = [];
  bool _isLoading = true;

  @override
  void dispose() {
    if (Platform.isAndroid || Platform.isIOS) {
      FlutterBackgroundService().invoke('unsubscribe', {});
    }
    super.dispose();
  }

  @override
  void initState() {
    super.initState();

    if (Platform.isAndroid || Platform.isIOS) {
      final service = FlutterBackgroundService();
      service.on('update').listen((data) {
        if (data != null && data['activeTimers'] is List) {
          if (mounted) {
            setState(() {
              _activeTimers = List<Map<String, dynamic>>.from(data['activeTimers']);
              _isLoading = false;
            });
          }
        }
      });
      // 서비스가 실행 중이 아니면(타이머 없음) 로딩 즉시 해제
      Future.delayed(const Duration(milliseconds: 500), () async {
        if (!mounted) return;
        if (!await service.isRunning()) {
          setState(() => _isLoading = false);
        }
      });
      service.invoke('subscribe', {});
    } else {
      setState(() {
        _isLoading = false;
      });
    }
  }

  Future<void> _deleteSchedule(int scheduleId) async {
    if (Platform.isAndroid || Platform.isIOS) {
      final service = FlutterBackgroundService();
      service.invoke('deleteSchedule', {'scheduleId': scheduleId});
    }
  }

  @override
  Widget build(BuildContext context) {
    // 로딩 중일 때
    if (_isLoading) {
      return Scaffold(
        appBar: AppBar(
          title: const Text('진행중인 타이머'),
        ),
        body: const Column(
          children: [
            Expanded(child: LoadingWidget()),
            BannerAdWidget(),
          ],
        ),
      );
    }

    // 타이머가 없을 때
    if (_activeTimers.isEmpty) {
      return Scaffold(
        appBar: AppBar(
          title: const Text('진행중인 타이머'),
        ),
        body: const Column(
          children: [
            Expanded(
              child: EmptyStateWidget(
                message: '시작된 타이머가 없습니다.\n\'내 레시피\'에서 타이머를 시작해보세요!',
                icon: Icons.timer_off,
              ),
            ),
            BannerAdWidget(),
          ],
        ),
      );
    }

    return Scaffold(
      appBar: AppBar(
        title: const Text('진행중인 타이머'),
      ),
      body: Column(
        children: [
          Expanded(
            child: ListView.builder(
              itemCount: _activeTimers.length,
              itemBuilder: (context, index) {
                final timerData = _activeTimers[index];
                return _TimerCard(
                  timerData: timerData,
                  onDelete: () => _deleteSchedule(timerData['id'] as int),
                );
              },
            ),
          ),
          const BannerAdWidget(),
        ],
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
    final progress = (timerData['progress'] as num).toDouble();
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
              const SizedBox(height: 8),
              Container(
                width: double.infinity,
                padding: const EdgeInsets.symmetric(vertical: 16),
                decoration: BoxDecoration(
                  color: Colors.green.shade50,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: Colors.green.shade300),
                ),
                child: Column(
                  children: [
                    Icon(Icons.check_circle, color: Colors.green.shade600, size: 48),
                    const SizedBox(height: 8),
                    Text(
                      '모든 단계 완료!',
                      style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                        color: Colors.green.shade700,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      '수고하셨습니다 🎉',
                      style: TextStyle(color: Colors.green.shade600),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 8),
              LinearProgressIndicator(
                value: 1.0,
                minHeight: 10,
                borderRadius: BorderRadius.circular(5),
                color: Colors.green,
              ),
            ]
          ],
        ),
      ),
    );
  }
}
