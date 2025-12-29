import 'package:drift/drift.dart';
import 'package:drift/native.dart';
import 'package:path_provider/path_provider.dart';
import 'package:path/path.dart' as p;
import 'dart:io';

part 'database.g.dart';

// User Table
class Users extends Table {
  IntColumn get id => integer().autoIncrement()();
  TextColumn get email => text().unique()();
  TextColumn get password => text()(); // In a real app, this should be a hashed value
  DateTimeColumn get createdAt => dateTime().withDefault(currentDateAndTime)();
}

// Recipe Table
class Recipes extends Table {
  IntColumn get id => integer().autoIncrement()();
  TextColumn get name => text()();
  TextColumn get calculationType => text()(); // 'ratio' or 'time' or 'dough'
  RealColumn get totalStarter => real()();
  RealColumn get starterRatio => real().nullable()();
  RealColumn get flourRatio => real().nullable()();
  RealColumn get waterRatio => real().nullable()();
  TextColumn get timeframe => text().nullable()();
  IntColumn get resultStarter => integer()();
  IntColumn get resultFlour => integer()();
  IntColumn get resultWater => integer()();
  IntColumn get resultLevain => integer().nullable()();
  RealColumn get temperature => real().nullable()();
  TextColumn get flourDetails => text().nullable()(); // JSON string for flour breakdown
  TextColumn get extraIngredients => text().nullable()(); // JSON string for extra ingredients
  DateTimeColumn get createdAt => dateTime().withDefault(currentDateAndTime)();
}

// Timer Schedule Table
class TimerSchedules extends Table {
  IntColumn get id => integer().autoIncrement()();
  TextColumn get name => text()(); // Linked from Recipe name
  DateTimeColumn get startTime => dateTime()();
  BoolColumn get isRunning => boolean().withDefault(const Constant(true))();
  DateTimeColumn get createdAt => dateTime().withDefault(currentDateAndTime)();
}

// Timer Steps Table
class TimerSteps extends Table {
  IntColumn get id => integer().autoIncrement()();
  IntColumn get scheduleId => integer().references(TimerSchedules, #id, onDelete: KeyAction.cascade)();
  TextColumn get stepName => text()();
  IntColumn get durationInMinutes => integer()();
  IntColumn get stepOrder => integer()();
  BoolColumn get isCompleted => boolean().withDefault(const Constant(false))();
}

// Data class to hold a schedule with its steps
class ScheduleWithSteps {
  final TimerSchedule schedule;
  final List<TimerStep> steps;

  ScheduleWithSteps({required this.schedule, required this.steps});
}


@DriftDatabase(tables: [Users, Recipes, TimerSchedules, TimerSteps])
class AppDatabase extends _$AppDatabase {
  AppDatabase() : super(_openConnection());

  @override
  int get schemaVersion => 7;

  @override
  MigrationStrategy get migration => MigrationStrategy(
    onUpgrade: (migrator, from, to) async {
      if (from < 5) {
        await migrator.addColumn(recipes, recipes.resultLevain);
      }
      if (from < 6) {
        await migrator.addColumn(recipes, recipes.flourDetails);
      }
      if (from < 7) {
        await migrator.addColumn(recipes, recipes.extraIngredients);
      }
    },
  );

  // --- RECIPE METHODS ---
  Stream<List<Recipe>> watchAllRecipes() => select(recipes).watch();
  Future<Recipe> getRecipe(int id) => (select(recipes)..where((tbl) => tbl.id.equals(id))).getSingle();
  Future<int> addRecipe(RecipesCompanion recipe) => into(recipes).insert(recipe);
  Future<int> deleteRecipe(int id) => (delete(recipes)..where((tbl) => tbl.id.equals(id))).go();

  // --- SCHEDULE & STEPS METHODS ---
  Future<int> createScheduleWithSteps(TimerSchedulesCompanion schedule, List<TimerStepsCompanion> steps) {
    return transaction(() async {
      final scheduleId = await into(timerSchedules).insert(schedule);
      for (final step in steps) {
        await into(timerSteps).insert(step.copyWith(scheduleId: Value(scheduleId)));
      }
      return scheduleId;
    });
  }

  Stream<List<ScheduleWithSteps>> watchAllSchedulesWithSteps() {
    final query = select(timerSchedules).join([
      innerJoin(timerSteps, timerSteps.scheduleId.equalsExp(timerSchedules.id))
    ]);

    return query.watch().map((rows) {
      final groupedData = <TimerSchedule, List<TimerStep>>{};
      for (final row in rows) {
        final schedule = row.readTable(timerSchedules);
        final step = row.readTable(timerSteps);
        final steps = groupedData.putIfAbsent(schedule, () => []);
        steps.add(step);
      }
      return groupedData.entries
          .map((e) => ScheduleWithSteps(schedule: e.key, steps: e.value..sort((a,b) => a.stepOrder.compareTo(b.stepOrder))))
          .toList();
    });
  }

  Future<void> deleteSchedule(int scheduleId) {
    return transaction(() async {
      await (delete(timerSchedules)..where((t) => t.id.equals(scheduleId))).go();
      await (delete(timerSteps)..where((t) => t.scheduleId.equals(scheduleId))).go();
    });
  }
}

LazyDatabase _openConnection() {
  return LazyDatabase(() async {
    final dbFolder = await getApplicationDocumentsDirectory();
    final file = File(p.join(dbFolder.path, 'db.sqlite'));
    return NativeDatabase(file);
  });
}