import 'package:sourdough_timer/database/database.dart';

/// Repository interface for timer schedule data access
/// Abstracts database operations to decouple UI from Drift implementation
abstract class TimerRepository {
  /// Create a new timer schedule with steps
  /// Returns the ID of the newly created schedule
  Future<int> createScheduleWithSteps(
    TimerSchedulesCompanion schedule,
    List<TimerStepsCompanion> steps,
  );

  /// Watch all timer schedules with their steps (returns Stream for reactive UI)
  Stream<List<ScheduleWithSteps>> watchAllSchedulesWithSteps();

  /// Delete a schedule and all its steps
  Future<void> deleteSchedule(int scheduleId);
}

/// Implementation of TimerRepository using Drift database
class TimerRepositoryImpl implements TimerRepository {
  final AppDatabase _db;

  TimerRepositoryImpl(this._db);

  @override
  Future<int> createScheduleWithSteps(
    TimerSchedulesCompanion schedule,
    List<TimerStepsCompanion> steps,
  ) =>
      _db.createScheduleWithSteps(schedule, steps);

  @override
  Stream<List<ScheduleWithSteps>> watchAllSchedulesWithSteps() =>
      _db.watchAllSchedulesWithSteps();

  @override
  Future<void> deleteSchedule(int scheduleId) => _db.deleteSchedule(scheduleId);
}
