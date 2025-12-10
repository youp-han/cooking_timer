// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'database.dart';

// ignore_for_file: type=lint
class $UsersTable extends Users with TableInfo<$UsersTable, User> {
  @override
  final GeneratedDatabase attachedDatabase;
  final String? _alias;
  $UsersTable(this.attachedDatabase, [this._alias]);
  static const VerificationMeta _idMeta = const VerificationMeta('id');
  @override
  late final GeneratedColumn<int> id = GeneratedColumn<int>(
    'id',
    aliasedName,
    false,
    hasAutoIncrement: true,
    type: DriftSqlType.int,
    requiredDuringInsert: false,
    defaultConstraints: GeneratedColumn.constraintIsAlways(
      'PRIMARY KEY AUTOINCREMENT',
    ),
  );
  static const VerificationMeta _emailMeta = const VerificationMeta('email');
  @override
  late final GeneratedColumn<String> email = GeneratedColumn<String>(
    'email',
    aliasedName,
    false,
    type: DriftSqlType.string,
    requiredDuringInsert: true,
    defaultConstraints: GeneratedColumn.constraintIsAlways('UNIQUE'),
  );
  static const VerificationMeta _passwordMeta = const VerificationMeta(
    'password',
  );
  @override
  late final GeneratedColumn<String> password = GeneratedColumn<String>(
    'password',
    aliasedName,
    false,
    type: DriftSqlType.string,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _createdAtMeta = const VerificationMeta(
    'createdAt',
  );
  @override
  late final GeneratedColumn<DateTime> createdAt = GeneratedColumn<DateTime>(
    'created_at',
    aliasedName,
    false,
    type: DriftSqlType.dateTime,
    requiredDuringInsert: false,
    defaultValue: currentDateAndTime,
  );
  @override
  List<GeneratedColumn> get $columns => [id, email, password, createdAt];
  @override
  String get aliasedName => _alias ?? actualTableName;
  @override
  String get actualTableName => $name;
  static const String $name = 'users';
  @override
  VerificationContext validateIntegrity(
    Insertable<User> instance, {
    bool isInserting = false,
  }) {
    final context = VerificationContext();
    final data = instance.toColumns(true);
    if (data.containsKey('id')) {
      context.handle(_idMeta, id.isAcceptableOrUnknown(data['id']!, _idMeta));
    }
    if (data.containsKey('email')) {
      context.handle(
        _emailMeta,
        email.isAcceptableOrUnknown(data['email']!, _emailMeta),
      );
    } else if (isInserting) {
      context.missing(_emailMeta);
    }
    if (data.containsKey('password')) {
      context.handle(
        _passwordMeta,
        password.isAcceptableOrUnknown(data['password']!, _passwordMeta),
      );
    } else if (isInserting) {
      context.missing(_passwordMeta);
    }
    if (data.containsKey('created_at')) {
      context.handle(
        _createdAtMeta,
        createdAt.isAcceptableOrUnknown(data['created_at']!, _createdAtMeta),
      );
    }
    return context;
  }

  @override
  Set<GeneratedColumn> get $primaryKey => {id};
  @override
  User map(Map<String, dynamic> data, {String? tablePrefix}) {
    final effectivePrefix = tablePrefix != null ? '$tablePrefix.' : '';
    return User(
      id: attachedDatabase.typeMapping.read(
        DriftSqlType.int,
        data['${effectivePrefix}id'],
      )!,
      email: attachedDatabase.typeMapping.read(
        DriftSqlType.string,
        data['${effectivePrefix}email'],
      )!,
      password: attachedDatabase.typeMapping.read(
        DriftSqlType.string,
        data['${effectivePrefix}password'],
      )!,
      createdAt: attachedDatabase.typeMapping.read(
        DriftSqlType.dateTime,
        data['${effectivePrefix}created_at'],
      )!,
    );
  }

  @override
  $UsersTable createAlias(String alias) {
    return $UsersTable(attachedDatabase, alias);
  }
}

class User extends DataClass implements Insertable<User> {
  final int id;
  final String email;
  final String password;
  final DateTime createdAt;
  const User({
    required this.id,
    required this.email,
    required this.password,
    required this.createdAt,
  });
  @override
  Map<String, Expression> toColumns(bool nullToAbsent) {
    final map = <String, Expression>{};
    map['id'] = Variable<int>(id);
    map['email'] = Variable<String>(email);
    map['password'] = Variable<String>(password);
    map['created_at'] = Variable<DateTime>(createdAt);
    return map;
  }

  UsersCompanion toCompanion(bool nullToAbsent) {
    return UsersCompanion(
      id: Value(id),
      email: Value(email),
      password: Value(password),
      createdAt: Value(createdAt),
    );
  }

  factory User.fromJson(
    Map<String, dynamic> json, {
    ValueSerializer? serializer,
  }) {
    serializer ??= driftRuntimeOptions.defaultSerializer;
    return User(
      id: serializer.fromJson<int>(json['id']),
      email: serializer.fromJson<String>(json['email']),
      password: serializer.fromJson<String>(json['password']),
      createdAt: serializer.fromJson<DateTime>(json['createdAt']),
    );
  }
  @override
  Map<String, dynamic> toJson({ValueSerializer? serializer}) {
    serializer ??= driftRuntimeOptions.defaultSerializer;
    return <String, dynamic>{
      'id': serializer.toJson<int>(id),
      'email': serializer.toJson<String>(email),
      'password': serializer.toJson<String>(password),
      'createdAt': serializer.toJson<DateTime>(createdAt),
    };
  }

  User copyWith({
    int? id,
    String? email,
    String? password,
    DateTime? createdAt,
  }) => User(
    id: id ?? this.id,
    email: email ?? this.email,
    password: password ?? this.password,
    createdAt: createdAt ?? this.createdAt,
  );
  User copyWithCompanion(UsersCompanion data) {
    return User(
      id: data.id.present ? data.id.value : this.id,
      email: data.email.present ? data.email.value : this.email,
      password: data.password.present ? data.password.value : this.password,
      createdAt: data.createdAt.present ? data.createdAt.value : this.createdAt,
    );
  }

  @override
  String toString() {
    return (StringBuffer('User(')
          ..write('id: $id, ')
          ..write('email: $email, ')
          ..write('password: $password, ')
          ..write('createdAt: $createdAt')
          ..write(')'))
        .toString();
  }

  @override
  int get hashCode => Object.hash(id, email, password, createdAt);
  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      (other is User &&
          other.id == this.id &&
          other.email == this.email &&
          other.password == this.password &&
          other.createdAt == this.createdAt);
}

class UsersCompanion extends UpdateCompanion<User> {
  final Value<int> id;
  final Value<String> email;
  final Value<String> password;
  final Value<DateTime> createdAt;
  const UsersCompanion({
    this.id = const Value.absent(),
    this.email = const Value.absent(),
    this.password = const Value.absent(),
    this.createdAt = const Value.absent(),
  });
  UsersCompanion.insert({
    this.id = const Value.absent(),
    required String email,
    required String password,
    this.createdAt = const Value.absent(),
  }) : email = Value(email),
       password = Value(password);
  static Insertable<User> custom({
    Expression<int>? id,
    Expression<String>? email,
    Expression<String>? password,
    Expression<DateTime>? createdAt,
  }) {
    return RawValuesInsertable({
      if (id != null) 'id': id,
      if (email != null) 'email': email,
      if (password != null) 'password': password,
      if (createdAt != null) 'created_at': createdAt,
    });
  }

  UsersCompanion copyWith({
    Value<int>? id,
    Value<String>? email,
    Value<String>? password,
    Value<DateTime>? createdAt,
  }) {
    return UsersCompanion(
      id: id ?? this.id,
      email: email ?? this.email,
      password: password ?? this.password,
      createdAt: createdAt ?? this.createdAt,
    );
  }

  @override
  Map<String, Expression> toColumns(bool nullToAbsent) {
    final map = <String, Expression>{};
    if (id.present) {
      map['id'] = Variable<int>(id.value);
    }
    if (email.present) {
      map['email'] = Variable<String>(email.value);
    }
    if (password.present) {
      map['password'] = Variable<String>(password.value);
    }
    if (createdAt.present) {
      map['created_at'] = Variable<DateTime>(createdAt.value);
    }
    return map;
  }

  @override
  String toString() {
    return (StringBuffer('UsersCompanion(')
          ..write('id: $id, ')
          ..write('email: $email, ')
          ..write('password: $password, ')
          ..write('createdAt: $createdAt')
          ..write(')'))
        .toString();
  }
}

class $RecipesTable extends Recipes with TableInfo<$RecipesTable, Recipe> {
  @override
  final GeneratedDatabase attachedDatabase;
  final String? _alias;
  $RecipesTable(this.attachedDatabase, [this._alias]);
  static const VerificationMeta _idMeta = const VerificationMeta('id');
  @override
  late final GeneratedColumn<int> id = GeneratedColumn<int>(
    'id',
    aliasedName,
    false,
    hasAutoIncrement: true,
    type: DriftSqlType.int,
    requiredDuringInsert: false,
    defaultConstraints: GeneratedColumn.constraintIsAlways(
      'PRIMARY KEY AUTOINCREMENT',
    ),
  );
  static const VerificationMeta _nameMeta = const VerificationMeta('name');
  @override
  late final GeneratedColumn<String> name = GeneratedColumn<String>(
    'name',
    aliasedName,
    false,
    type: DriftSqlType.string,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _calculationTypeMeta = const VerificationMeta(
    'calculationType',
  );
  @override
  late final GeneratedColumn<String> calculationType = GeneratedColumn<String>(
    'calculation_type',
    aliasedName,
    false,
    type: DriftSqlType.string,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _totalStarterMeta = const VerificationMeta(
    'totalStarter',
  );
  @override
  late final GeneratedColumn<double> totalStarter = GeneratedColumn<double>(
    'total_starter',
    aliasedName,
    false,
    type: DriftSqlType.double,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _starterRatioMeta = const VerificationMeta(
    'starterRatio',
  );
  @override
  late final GeneratedColumn<double> starterRatio = GeneratedColumn<double>(
    'starter_ratio',
    aliasedName,
    true,
    type: DriftSqlType.double,
    requiredDuringInsert: false,
  );
  static const VerificationMeta _flourRatioMeta = const VerificationMeta(
    'flourRatio',
  );
  @override
  late final GeneratedColumn<double> flourRatio = GeneratedColumn<double>(
    'flour_ratio',
    aliasedName,
    true,
    type: DriftSqlType.double,
    requiredDuringInsert: false,
  );
  static const VerificationMeta _waterRatioMeta = const VerificationMeta(
    'waterRatio',
  );
  @override
  late final GeneratedColumn<double> waterRatio = GeneratedColumn<double>(
    'water_ratio',
    aliasedName,
    true,
    type: DriftSqlType.double,
    requiredDuringInsert: false,
  );
  static const VerificationMeta _timeframeMeta = const VerificationMeta(
    'timeframe',
  );
  @override
  late final GeneratedColumn<String> timeframe = GeneratedColumn<String>(
    'timeframe',
    aliasedName,
    true,
    type: DriftSqlType.string,
    requiredDuringInsert: false,
  );
  static const VerificationMeta _resultStarterMeta = const VerificationMeta(
    'resultStarter',
  );
  @override
  late final GeneratedColumn<int> resultStarter = GeneratedColumn<int>(
    'result_starter',
    aliasedName,
    false,
    type: DriftSqlType.int,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _resultFlourMeta = const VerificationMeta(
    'resultFlour',
  );
  @override
  late final GeneratedColumn<int> resultFlour = GeneratedColumn<int>(
    'result_flour',
    aliasedName,
    false,
    type: DriftSqlType.int,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _resultWaterMeta = const VerificationMeta(
    'resultWater',
  );
  @override
  late final GeneratedColumn<int> resultWater = GeneratedColumn<int>(
    'result_water',
    aliasedName,
    false,
    type: DriftSqlType.int,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _temperatureMeta = const VerificationMeta(
    'temperature',
  );
  @override
  late final GeneratedColumn<double> temperature = GeneratedColumn<double>(
    'temperature',
    aliasedName,
    true,
    type: DriftSqlType.double,
    requiredDuringInsert: false,
  );
  static const VerificationMeta _createdAtMeta = const VerificationMeta(
    'createdAt',
  );
  @override
  late final GeneratedColumn<DateTime> createdAt = GeneratedColumn<DateTime>(
    'created_at',
    aliasedName,
    false,
    type: DriftSqlType.dateTime,
    requiredDuringInsert: false,
    defaultValue: currentDateAndTime,
  );
  @override
  List<GeneratedColumn> get $columns => [
    id,
    name,
    calculationType,
    totalStarter,
    starterRatio,
    flourRatio,
    waterRatio,
    timeframe,
    resultStarter,
    resultFlour,
    resultWater,
    temperature,
    createdAt,
  ];
  @override
  String get aliasedName => _alias ?? actualTableName;
  @override
  String get actualTableName => $name;
  static const String $name = 'recipes';
  @override
  VerificationContext validateIntegrity(
    Insertable<Recipe> instance, {
    bool isInserting = false,
  }) {
    final context = VerificationContext();
    final data = instance.toColumns(true);
    if (data.containsKey('id')) {
      context.handle(_idMeta, id.isAcceptableOrUnknown(data['id']!, _idMeta));
    }
    if (data.containsKey('name')) {
      context.handle(
        _nameMeta,
        name.isAcceptableOrUnknown(data['name']!, _nameMeta),
      );
    } else if (isInserting) {
      context.missing(_nameMeta);
    }
    if (data.containsKey('calculation_type')) {
      context.handle(
        _calculationTypeMeta,
        calculationType.isAcceptableOrUnknown(
          data['calculation_type']!,
          _calculationTypeMeta,
        ),
      );
    } else if (isInserting) {
      context.missing(_calculationTypeMeta);
    }
    if (data.containsKey('total_starter')) {
      context.handle(
        _totalStarterMeta,
        totalStarter.isAcceptableOrUnknown(
          data['total_starter']!,
          _totalStarterMeta,
        ),
      );
    } else if (isInserting) {
      context.missing(_totalStarterMeta);
    }
    if (data.containsKey('starter_ratio')) {
      context.handle(
        _starterRatioMeta,
        starterRatio.isAcceptableOrUnknown(
          data['starter_ratio']!,
          _starterRatioMeta,
        ),
      );
    }
    if (data.containsKey('flour_ratio')) {
      context.handle(
        _flourRatioMeta,
        flourRatio.isAcceptableOrUnknown(data['flour_ratio']!, _flourRatioMeta),
      );
    }
    if (data.containsKey('water_ratio')) {
      context.handle(
        _waterRatioMeta,
        waterRatio.isAcceptableOrUnknown(data['water_ratio']!, _waterRatioMeta),
      );
    }
    if (data.containsKey('timeframe')) {
      context.handle(
        _timeframeMeta,
        timeframe.isAcceptableOrUnknown(data['timeframe']!, _timeframeMeta),
      );
    }
    if (data.containsKey('result_starter')) {
      context.handle(
        _resultStarterMeta,
        resultStarter.isAcceptableOrUnknown(
          data['result_starter']!,
          _resultStarterMeta,
        ),
      );
    } else if (isInserting) {
      context.missing(_resultStarterMeta);
    }
    if (data.containsKey('result_flour')) {
      context.handle(
        _resultFlourMeta,
        resultFlour.isAcceptableOrUnknown(
          data['result_flour']!,
          _resultFlourMeta,
        ),
      );
    } else if (isInserting) {
      context.missing(_resultFlourMeta);
    }
    if (data.containsKey('result_water')) {
      context.handle(
        _resultWaterMeta,
        resultWater.isAcceptableOrUnknown(
          data['result_water']!,
          _resultWaterMeta,
        ),
      );
    } else if (isInserting) {
      context.missing(_resultWaterMeta);
    }
    if (data.containsKey('temperature')) {
      context.handle(
        _temperatureMeta,
        temperature.isAcceptableOrUnknown(
          data['temperature']!,
          _temperatureMeta,
        ),
      );
    }
    if (data.containsKey('created_at')) {
      context.handle(
        _createdAtMeta,
        createdAt.isAcceptableOrUnknown(data['created_at']!, _createdAtMeta),
      );
    }
    return context;
  }

  @override
  Set<GeneratedColumn> get $primaryKey => {id};
  @override
  Recipe map(Map<String, dynamic> data, {String? tablePrefix}) {
    final effectivePrefix = tablePrefix != null ? '$tablePrefix.' : '';
    return Recipe(
      id: attachedDatabase.typeMapping.read(
        DriftSqlType.int,
        data['${effectivePrefix}id'],
      )!,
      name: attachedDatabase.typeMapping.read(
        DriftSqlType.string,
        data['${effectivePrefix}name'],
      )!,
      calculationType: attachedDatabase.typeMapping.read(
        DriftSqlType.string,
        data['${effectivePrefix}calculation_type'],
      )!,
      totalStarter: attachedDatabase.typeMapping.read(
        DriftSqlType.double,
        data['${effectivePrefix}total_starter'],
      )!,
      starterRatio: attachedDatabase.typeMapping.read(
        DriftSqlType.double,
        data['${effectivePrefix}starter_ratio'],
      ),
      flourRatio: attachedDatabase.typeMapping.read(
        DriftSqlType.double,
        data['${effectivePrefix}flour_ratio'],
      ),
      waterRatio: attachedDatabase.typeMapping.read(
        DriftSqlType.double,
        data['${effectivePrefix}water_ratio'],
      ),
      timeframe: attachedDatabase.typeMapping.read(
        DriftSqlType.string,
        data['${effectivePrefix}timeframe'],
      ),
      resultStarter: attachedDatabase.typeMapping.read(
        DriftSqlType.int,
        data['${effectivePrefix}result_starter'],
      )!,
      resultFlour: attachedDatabase.typeMapping.read(
        DriftSqlType.int,
        data['${effectivePrefix}result_flour'],
      )!,
      resultWater: attachedDatabase.typeMapping.read(
        DriftSqlType.int,
        data['${effectivePrefix}result_water'],
      )!,
      temperature: attachedDatabase.typeMapping.read(
        DriftSqlType.double,
        data['${effectivePrefix}temperature'],
      ),
      createdAt: attachedDatabase.typeMapping.read(
        DriftSqlType.dateTime,
        data['${effectivePrefix}created_at'],
      )!,
    );
  }

  @override
  $RecipesTable createAlias(String alias) {
    return $RecipesTable(attachedDatabase, alias);
  }
}

class Recipe extends DataClass implements Insertable<Recipe> {
  final int id;
  final String name;
  final String calculationType;
  final double totalStarter;
  final double? starterRatio;
  final double? flourRatio;
  final double? waterRatio;
  final String? timeframe;
  final int resultStarter;
  final int resultFlour;
  final int resultWater;
  final double? temperature;
  final DateTime createdAt;
  const Recipe({
    required this.id,
    required this.name,
    required this.calculationType,
    required this.totalStarter,
    this.starterRatio,
    this.flourRatio,
    this.waterRatio,
    this.timeframe,
    required this.resultStarter,
    required this.resultFlour,
    required this.resultWater,
    this.temperature,
    required this.createdAt,
  });
  @override
  Map<String, Expression> toColumns(bool nullToAbsent) {
    final map = <String, Expression>{};
    map['id'] = Variable<int>(id);
    map['name'] = Variable<String>(name);
    map['calculation_type'] = Variable<String>(calculationType);
    map['total_starter'] = Variable<double>(totalStarter);
    if (!nullToAbsent || starterRatio != null) {
      map['starter_ratio'] = Variable<double>(starterRatio);
    }
    if (!nullToAbsent || flourRatio != null) {
      map['flour_ratio'] = Variable<double>(flourRatio);
    }
    if (!nullToAbsent || waterRatio != null) {
      map['water_ratio'] = Variable<double>(waterRatio);
    }
    if (!nullToAbsent || timeframe != null) {
      map['timeframe'] = Variable<String>(timeframe);
    }
    map['result_starter'] = Variable<int>(resultStarter);
    map['result_flour'] = Variable<int>(resultFlour);
    map['result_water'] = Variable<int>(resultWater);
    if (!nullToAbsent || temperature != null) {
      map['temperature'] = Variable<double>(temperature);
    }
    map['created_at'] = Variable<DateTime>(createdAt);
    return map;
  }

  RecipesCompanion toCompanion(bool nullToAbsent) {
    return RecipesCompanion(
      id: Value(id),
      name: Value(name),
      calculationType: Value(calculationType),
      totalStarter: Value(totalStarter),
      starterRatio: starterRatio == null && nullToAbsent
          ? const Value.absent()
          : Value(starterRatio),
      flourRatio: flourRatio == null && nullToAbsent
          ? const Value.absent()
          : Value(flourRatio),
      waterRatio: waterRatio == null && nullToAbsent
          ? const Value.absent()
          : Value(waterRatio),
      timeframe: timeframe == null && nullToAbsent
          ? const Value.absent()
          : Value(timeframe),
      resultStarter: Value(resultStarter),
      resultFlour: Value(resultFlour),
      resultWater: Value(resultWater),
      temperature: temperature == null && nullToAbsent
          ? const Value.absent()
          : Value(temperature),
      createdAt: Value(createdAt),
    );
  }

  factory Recipe.fromJson(
    Map<String, dynamic> json, {
    ValueSerializer? serializer,
  }) {
    serializer ??= driftRuntimeOptions.defaultSerializer;
    return Recipe(
      id: serializer.fromJson<int>(json['id']),
      name: serializer.fromJson<String>(json['name']),
      calculationType: serializer.fromJson<String>(json['calculationType']),
      totalStarter: serializer.fromJson<double>(json['totalStarter']),
      starterRatio: serializer.fromJson<double?>(json['starterRatio']),
      flourRatio: serializer.fromJson<double?>(json['flourRatio']),
      waterRatio: serializer.fromJson<double?>(json['waterRatio']),
      timeframe: serializer.fromJson<String?>(json['timeframe']),
      resultStarter: serializer.fromJson<int>(json['resultStarter']),
      resultFlour: serializer.fromJson<int>(json['resultFlour']),
      resultWater: serializer.fromJson<int>(json['resultWater']),
      temperature: serializer.fromJson<double?>(json['temperature']),
      createdAt: serializer.fromJson<DateTime>(json['createdAt']),
    );
  }
  @override
  Map<String, dynamic> toJson({ValueSerializer? serializer}) {
    serializer ??= driftRuntimeOptions.defaultSerializer;
    return <String, dynamic>{
      'id': serializer.toJson<int>(id),
      'name': serializer.toJson<String>(name),
      'calculationType': serializer.toJson<String>(calculationType),
      'totalStarter': serializer.toJson<double>(totalStarter),
      'starterRatio': serializer.toJson<double?>(starterRatio),
      'flourRatio': serializer.toJson<double?>(flourRatio),
      'waterRatio': serializer.toJson<double?>(waterRatio),
      'timeframe': serializer.toJson<String?>(timeframe),
      'resultStarter': serializer.toJson<int>(resultStarter),
      'resultFlour': serializer.toJson<int>(resultFlour),
      'resultWater': serializer.toJson<int>(resultWater),
      'temperature': serializer.toJson<double?>(temperature),
      'createdAt': serializer.toJson<DateTime>(createdAt),
    };
  }

  Recipe copyWith({
    int? id,
    String? name,
    String? calculationType,
    double? totalStarter,
    Value<double?> starterRatio = const Value.absent(),
    Value<double?> flourRatio = const Value.absent(),
    Value<double?> waterRatio = const Value.absent(),
    Value<String?> timeframe = const Value.absent(),
    int? resultStarter,
    int? resultFlour,
    int? resultWater,
    Value<double?> temperature = const Value.absent(),
    DateTime? createdAt,
  }) => Recipe(
    id: id ?? this.id,
    name: name ?? this.name,
    calculationType: calculationType ?? this.calculationType,
    totalStarter: totalStarter ?? this.totalStarter,
    starterRatio: starterRatio.present ? starterRatio.value : this.starterRatio,
    flourRatio: flourRatio.present ? flourRatio.value : this.flourRatio,
    waterRatio: waterRatio.present ? waterRatio.value : this.waterRatio,
    timeframe: timeframe.present ? timeframe.value : this.timeframe,
    resultStarter: resultStarter ?? this.resultStarter,
    resultFlour: resultFlour ?? this.resultFlour,
    resultWater: resultWater ?? this.resultWater,
    temperature: temperature.present ? temperature.value : this.temperature,
    createdAt: createdAt ?? this.createdAt,
  );
  Recipe copyWithCompanion(RecipesCompanion data) {
    return Recipe(
      id: data.id.present ? data.id.value : this.id,
      name: data.name.present ? data.name.value : this.name,
      calculationType: data.calculationType.present
          ? data.calculationType.value
          : this.calculationType,
      totalStarter: data.totalStarter.present
          ? data.totalStarter.value
          : this.totalStarter,
      starterRatio: data.starterRatio.present
          ? data.starterRatio.value
          : this.starterRatio,
      flourRatio: data.flourRatio.present
          ? data.flourRatio.value
          : this.flourRatio,
      waterRatio: data.waterRatio.present
          ? data.waterRatio.value
          : this.waterRatio,
      timeframe: data.timeframe.present ? data.timeframe.value : this.timeframe,
      resultStarter: data.resultStarter.present
          ? data.resultStarter.value
          : this.resultStarter,
      resultFlour: data.resultFlour.present
          ? data.resultFlour.value
          : this.resultFlour,
      resultWater: data.resultWater.present
          ? data.resultWater.value
          : this.resultWater,
      temperature: data.temperature.present
          ? data.temperature.value
          : this.temperature,
      createdAt: data.createdAt.present ? data.createdAt.value : this.createdAt,
    );
  }

  @override
  String toString() {
    return (StringBuffer('Recipe(')
          ..write('id: $id, ')
          ..write('name: $name, ')
          ..write('calculationType: $calculationType, ')
          ..write('totalStarter: $totalStarter, ')
          ..write('starterRatio: $starterRatio, ')
          ..write('flourRatio: $flourRatio, ')
          ..write('waterRatio: $waterRatio, ')
          ..write('timeframe: $timeframe, ')
          ..write('resultStarter: $resultStarter, ')
          ..write('resultFlour: $resultFlour, ')
          ..write('resultWater: $resultWater, ')
          ..write('temperature: $temperature, ')
          ..write('createdAt: $createdAt')
          ..write(')'))
        .toString();
  }

  @override
  int get hashCode => Object.hash(
    id,
    name,
    calculationType,
    totalStarter,
    starterRatio,
    flourRatio,
    waterRatio,
    timeframe,
    resultStarter,
    resultFlour,
    resultWater,
    temperature,
    createdAt,
  );
  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      (other is Recipe &&
          other.id == this.id &&
          other.name == this.name &&
          other.calculationType == this.calculationType &&
          other.totalStarter == this.totalStarter &&
          other.starterRatio == this.starterRatio &&
          other.flourRatio == this.flourRatio &&
          other.waterRatio == this.waterRatio &&
          other.timeframe == this.timeframe &&
          other.resultStarter == this.resultStarter &&
          other.resultFlour == this.resultFlour &&
          other.resultWater == this.resultWater &&
          other.temperature == this.temperature &&
          other.createdAt == this.createdAt);
}

class RecipesCompanion extends UpdateCompanion<Recipe> {
  final Value<int> id;
  final Value<String> name;
  final Value<String> calculationType;
  final Value<double> totalStarter;
  final Value<double?> starterRatio;
  final Value<double?> flourRatio;
  final Value<double?> waterRatio;
  final Value<String?> timeframe;
  final Value<int> resultStarter;
  final Value<int> resultFlour;
  final Value<int> resultWater;
  final Value<double?> temperature;
  final Value<DateTime> createdAt;
  const RecipesCompanion({
    this.id = const Value.absent(),
    this.name = const Value.absent(),
    this.calculationType = const Value.absent(),
    this.totalStarter = const Value.absent(),
    this.starterRatio = const Value.absent(),
    this.flourRatio = const Value.absent(),
    this.waterRatio = const Value.absent(),
    this.timeframe = const Value.absent(),
    this.resultStarter = const Value.absent(),
    this.resultFlour = const Value.absent(),
    this.resultWater = const Value.absent(),
    this.temperature = const Value.absent(),
    this.createdAt = const Value.absent(),
  });
  RecipesCompanion.insert({
    this.id = const Value.absent(),
    required String name,
    required String calculationType,
    required double totalStarter,
    this.starterRatio = const Value.absent(),
    this.flourRatio = const Value.absent(),
    this.waterRatio = const Value.absent(),
    this.timeframe = const Value.absent(),
    required int resultStarter,
    required int resultFlour,
    required int resultWater,
    this.temperature = const Value.absent(),
    this.createdAt = const Value.absent(),
  }) : name = Value(name),
       calculationType = Value(calculationType),
       totalStarter = Value(totalStarter),
       resultStarter = Value(resultStarter),
       resultFlour = Value(resultFlour),
       resultWater = Value(resultWater);
  static Insertable<Recipe> custom({
    Expression<int>? id,
    Expression<String>? name,
    Expression<String>? calculationType,
    Expression<double>? totalStarter,
    Expression<double>? starterRatio,
    Expression<double>? flourRatio,
    Expression<double>? waterRatio,
    Expression<String>? timeframe,
    Expression<int>? resultStarter,
    Expression<int>? resultFlour,
    Expression<int>? resultWater,
    Expression<double>? temperature,
    Expression<DateTime>? createdAt,
  }) {
    return RawValuesInsertable({
      if (id != null) 'id': id,
      if (name != null) 'name': name,
      if (calculationType != null) 'calculation_type': calculationType,
      if (totalStarter != null) 'total_starter': totalStarter,
      if (starterRatio != null) 'starter_ratio': starterRatio,
      if (flourRatio != null) 'flour_ratio': flourRatio,
      if (waterRatio != null) 'water_ratio': waterRatio,
      if (timeframe != null) 'timeframe': timeframe,
      if (resultStarter != null) 'result_starter': resultStarter,
      if (resultFlour != null) 'result_flour': resultFlour,
      if (resultWater != null) 'result_water': resultWater,
      if (temperature != null) 'temperature': temperature,
      if (createdAt != null) 'created_at': createdAt,
    });
  }

  RecipesCompanion copyWith({
    Value<int>? id,
    Value<String>? name,
    Value<String>? calculationType,
    Value<double>? totalStarter,
    Value<double?>? starterRatio,
    Value<double?>? flourRatio,
    Value<double?>? waterRatio,
    Value<String?>? timeframe,
    Value<int>? resultStarter,
    Value<int>? resultFlour,
    Value<int>? resultWater,
    Value<double?>? temperature,
    Value<DateTime>? createdAt,
  }) {
    return RecipesCompanion(
      id: id ?? this.id,
      name: name ?? this.name,
      calculationType: calculationType ?? this.calculationType,
      totalStarter: totalStarter ?? this.totalStarter,
      starterRatio: starterRatio ?? this.starterRatio,
      flourRatio: flourRatio ?? this.flourRatio,
      waterRatio: waterRatio ?? this.waterRatio,
      timeframe: timeframe ?? this.timeframe,
      resultStarter: resultStarter ?? this.resultStarter,
      resultFlour: resultFlour ?? this.resultFlour,
      resultWater: resultWater ?? this.resultWater,
      temperature: temperature ?? this.temperature,
      createdAt: createdAt ?? this.createdAt,
    );
  }

  @override
  Map<String, Expression> toColumns(bool nullToAbsent) {
    final map = <String, Expression>{};
    if (id.present) {
      map['id'] = Variable<int>(id.value);
    }
    if (name.present) {
      map['name'] = Variable<String>(name.value);
    }
    if (calculationType.present) {
      map['calculation_type'] = Variable<String>(calculationType.value);
    }
    if (totalStarter.present) {
      map['total_starter'] = Variable<double>(totalStarter.value);
    }
    if (starterRatio.present) {
      map['starter_ratio'] = Variable<double>(starterRatio.value);
    }
    if (flourRatio.present) {
      map['flour_ratio'] = Variable<double>(flourRatio.value);
    }
    if (waterRatio.present) {
      map['water_ratio'] = Variable<double>(waterRatio.value);
    }
    if (timeframe.present) {
      map['timeframe'] = Variable<String>(timeframe.value);
    }
    if (resultStarter.present) {
      map['result_starter'] = Variable<int>(resultStarter.value);
    }
    if (resultFlour.present) {
      map['result_flour'] = Variable<int>(resultFlour.value);
    }
    if (resultWater.present) {
      map['result_water'] = Variable<int>(resultWater.value);
    }
    if (temperature.present) {
      map['temperature'] = Variable<double>(temperature.value);
    }
    if (createdAt.present) {
      map['created_at'] = Variable<DateTime>(createdAt.value);
    }
    return map;
  }

  @override
  String toString() {
    return (StringBuffer('RecipesCompanion(')
          ..write('id: $id, ')
          ..write('name: $name, ')
          ..write('calculationType: $calculationType, ')
          ..write('totalStarter: $totalStarter, ')
          ..write('starterRatio: $starterRatio, ')
          ..write('flourRatio: $flourRatio, ')
          ..write('waterRatio: $waterRatio, ')
          ..write('timeframe: $timeframe, ')
          ..write('resultStarter: $resultStarter, ')
          ..write('resultFlour: $resultFlour, ')
          ..write('resultWater: $resultWater, ')
          ..write('temperature: $temperature, ')
          ..write('createdAt: $createdAt')
          ..write(')'))
        .toString();
  }
}

class $TimerSchedulesTable extends TimerSchedules
    with TableInfo<$TimerSchedulesTable, TimerSchedule> {
  @override
  final GeneratedDatabase attachedDatabase;
  final String? _alias;
  $TimerSchedulesTable(this.attachedDatabase, [this._alias]);
  static const VerificationMeta _idMeta = const VerificationMeta('id');
  @override
  late final GeneratedColumn<int> id = GeneratedColumn<int>(
    'id',
    aliasedName,
    false,
    hasAutoIncrement: true,
    type: DriftSqlType.int,
    requiredDuringInsert: false,
    defaultConstraints: GeneratedColumn.constraintIsAlways(
      'PRIMARY KEY AUTOINCREMENT',
    ),
  );
  static const VerificationMeta _nameMeta = const VerificationMeta('name');
  @override
  late final GeneratedColumn<String> name = GeneratedColumn<String>(
    'name',
    aliasedName,
    false,
    type: DriftSqlType.string,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _startTimeMeta = const VerificationMeta(
    'startTime',
  );
  @override
  late final GeneratedColumn<DateTime> startTime = GeneratedColumn<DateTime>(
    'start_time',
    aliasedName,
    false,
    type: DriftSqlType.dateTime,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _isRunningMeta = const VerificationMeta(
    'isRunning',
  );
  @override
  late final GeneratedColumn<bool> isRunning = GeneratedColumn<bool>(
    'is_running',
    aliasedName,
    false,
    type: DriftSqlType.bool,
    requiredDuringInsert: false,
    defaultConstraints: GeneratedColumn.constraintIsAlways(
      'CHECK ("is_running" IN (0, 1))',
    ),
    defaultValue: const Constant(true),
  );
  static const VerificationMeta _createdAtMeta = const VerificationMeta(
    'createdAt',
  );
  @override
  late final GeneratedColumn<DateTime> createdAt = GeneratedColumn<DateTime>(
    'created_at',
    aliasedName,
    false,
    type: DriftSqlType.dateTime,
    requiredDuringInsert: false,
    defaultValue: currentDateAndTime,
  );
  @override
  List<GeneratedColumn> get $columns => [
    id,
    name,
    startTime,
    isRunning,
    createdAt,
  ];
  @override
  String get aliasedName => _alias ?? actualTableName;
  @override
  String get actualTableName => $name;
  static const String $name = 'timer_schedules';
  @override
  VerificationContext validateIntegrity(
    Insertable<TimerSchedule> instance, {
    bool isInserting = false,
  }) {
    final context = VerificationContext();
    final data = instance.toColumns(true);
    if (data.containsKey('id')) {
      context.handle(_idMeta, id.isAcceptableOrUnknown(data['id']!, _idMeta));
    }
    if (data.containsKey('name')) {
      context.handle(
        _nameMeta,
        name.isAcceptableOrUnknown(data['name']!, _nameMeta),
      );
    } else if (isInserting) {
      context.missing(_nameMeta);
    }
    if (data.containsKey('start_time')) {
      context.handle(
        _startTimeMeta,
        startTime.isAcceptableOrUnknown(data['start_time']!, _startTimeMeta),
      );
    } else if (isInserting) {
      context.missing(_startTimeMeta);
    }
    if (data.containsKey('is_running')) {
      context.handle(
        _isRunningMeta,
        isRunning.isAcceptableOrUnknown(data['is_running']!, _isRunningMeta),
      );
    }
    if (data.containsKey('created_at')) {
      context.handle(
        _createdAtMeta,
        createdAt.isAcceptableOrUnknown(data['created_at']!, _createdAtMeta),
      );
    }
    return context;
  }

  @override
  Set<GeneratedColumn> get $primaryKey => {id};
  @override
  TimerSchedule map(Map<String, dynamic> data, {String? tablePrefix}) {
    final effectivePrefix = tablePrefix != null ? '$tablePrefix.' : '';
    return TimerSchedule(
      id: attachedDatabase.typeMapping.read(
        DriftSqlType.int,
        data['${effectivePrefix}id'],
      )!,
      name: attachedDatabase.typeMapping.read(
        DriftSqlType.string,
        data['${effectivePrefix}name'],
      )!,
      startTime: attachedDatabase.typeMapping.read(
        DriftSqlType.dateTime,
        data['${effectivePrefix}start_time'],
      )!,
      isRunning: attachedDatabase.typeMapping.read(
        DriftSqlType.bool,
        data['${effectivePrefix}is_running'],
      )!,
      createdAt: attachedDatabase.typeMapping.read(
        DriftSqlType.dateTime,
        data['${effectivePrefix}created_at'],
      )!,
    );
  }

  @override
  $TimerSchedulesTable createAlias(String alias) {
    return $TimerSchedulesTable(attachedDatabase, alias);
  }
}

class TimerSchedule extends DataClass implements Insertable<TimerSchedule> {
  final int id;
  final String name;
  final DateTime startTime;
  final bool isRunning;
  final DateTime createdAt;
  const TimerSchedule({
    required this.id,
    required this.name,
    required this.startTime,
    required this.isRunning,
    required this.createdAt,
  });
  @override
  Map<String, Expression> toColumns(bool nullToAbsent) {
    final map = <String, Expression>{};
    map['id'] = Variable<int>(id);
    map['name'] = Variable<String>(name);
    map['start_time'] = Variable<DateTime>(startTime);
    map['is_running'] = Variable<bool>(isRunning);
    map['created_at'] = Variable<DateTime>(createdAt);
    return map;
  }

  TimerSchedulesCompanion toCompanion(bool nullToAbsent) {
    return TimerSchedulesCompanion(
      id: Value(id),
      name: Value(name),
      startTime: Value(startTime),
      isRunning: Value(isRunning),
      createdAt: Value(createdAt),
    );
  }

  factory TimerSchedule.fromJson(
    Map<String, dynamic> json, {
    ValueSerializer? serializer,
  }) {
    serializer ??= driftRuntimeOptions.defaultSerializer;
    return TimerSchedule(
      id: serializer.fromJson<int>(json['id']),
      name: serializer.fromJson<String>(json['name']),
      startTime: serializer.fromJson<DateTime>(json['startTime']),
      isRunning: serializer.fromJson<bool>(json['isRunning']),
      createdAt: serializer.fromJson<DateTime>(json['createdAt']),
    );
  }
  @override
  Map<String, dynamic> toJson({ValueSerializer? serializer}) {
    serializer ??= driftRuntimeOptions.defaultSerializer;
    return <String, dynamic>{
      'id': serializer.toJson<int>(id),
      'name': serializer.toJson<String>(name),
      'startTime': serializer.toJson<DateTime>(startTime),
      'isRunning': serializer.toJson<bool>(isRunning),
      'createdAt': serializer.toJson<DateTime>(createdAt),
    };
  }

  TimerSchedule copyWith({
    int? id,
    String? name,
    DateTime? startTime,
    bool? isRunning,
    DateTime? createdAt,
  }) => TimerSchedule(
    id: id ?? this.id,
    name: name ?? this.name,
    startTime: startTime ?? this.startTime,
    isRunning: isRunning ?? this.isRunning,
    createdAt: createdAt ?? this.createdAt,
  );
  TimerSchedule copyWithCompanion(TimerSchedulesCompanion data) {
    return TimerSchedule(
      id: data.id.present ? data.id.value : this.id,
      name: data.name.present ? data.name.value : this.name,
      startTime: data.startTime.present ? data.startTime.value : this.startTime,
      isRunning: data.isRunning.present ? data.isRunning.value : this.isRunning,
      createdAt: data.createdAt.present ? data.createdAt.value : this.createdAt,
    );
  }

  @override
  String toString() {
    return (StringBuffer('TimerSchedule(')
          ..write('id: $id, ')
          ..write('name: $name, ')
          ..write('startTime: $startTime, ')
          ..write('isRunning: $isRunning, ')
          ..write('createdAt: $createdAt')
          ..write(')'))
        .toString();
  }

  @override
  int get hashCode => Object.hash(id, name, startTime, isRunning, createdAt);
  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      (other is TimerSchedule &&
          other.id == this.id &&
          other.name == this.name &&
          other.startTime == this.startTime &&
          other.isRunning == this.isRunning &&
          other.createdAt == this.createdAt);
}

class TimerSchedulesCompanion extends UpdateCompanion<TimerSchedule> {
  final Value<int> id;
  final Value<String> name;
  final Value<DateTime> startTime;
  final Value<bool> isRunning;
  final Value<DateTime> createdAt;
  const TimerSchedulesCompanion({
    this.id = const Value.absent(),
    this.name = const Value.absent(),
    this.startTime = const Value.absent(),
    this.isRunning = const Value.absent(),
    this.createdAt = const Value.absent(),
  });
  TimerSchedulesCompanion.insert({
    this.id = const Value.absent(),
    required String name,
    required DateTime startTime,
    this.isRunning = const Value.absent(),
    this.createdAt = const Value.absent(),
  }) : name = Value(name),
       startTime = Value(startTime);
  static Insertable<TimerSchedule> custom({
    Expression<int>? id,
    Expression<String>? name,
    Expression<DateTime>? startTime,
    Expression<bool>? isRunning,
    Expression<DateTime>? createdAt,
  }) {
    return RawValuesInsertable({
      if (id != null) 'id': id,
      if (name != null) 'name': name,
      if (startTime != null) 'start_time': startTime,
      if (isRunning != null) 'is_running': isRunning,
      if (createdAt != null) 'created_at': createdAt,
    });
  }

  TimerSchedulesCompanion copyWith({
    Value<int>? id,
    Value<String>? name,
    Value<DateTime>? startTime,
    Value<bool>? isRunning,
    Value<DateTime>? createdAt,
  }) {
    return TimerSchedulesCompanion(
      id: id ?? this.id,
      name: name ?? this.name,
      startTime: startTime ?? this.startTime,
      isRunning: isRunning ?? this.isRunning,
      createdAt: createdAt ?? this.createdAt,
    );
  }

  @override
  Map<String, Expression> toColumns(bool nullToAbsent) {
    final map = <String, Expression>{};
    if (id.present) {
      map['id'] = Variable<int>(id.value);
    }
    if (name.present) {
      map['name'] = Variable<String>(name.value);
    }
    if (startTime.present) {
      map['start_time'] = Variable<DateTime>(startTime.value);
    }
    if (isRunning.present) {
      map['is_running'] = Variable<bool>(isRunning.value);
    }
    if (createdAt.present) {
      map['created_at'] = Variable<DateTime>(createdAt.value);
    }
    return map;
  }

  @override
  String toString() {
    return (StringBuffer('TimerSchedulesCompanion(')
          ..write('id: $id, ')
          ..write('name: $name, ')
          ..write('startTime: $startTime, ')
          ..write('isRunning: $isRunning, ')
          ..write('createdAt: $createdAt')
          ..write(')'))
        .toString();
  }
}

class $TimerStepsTable extends TimerSteps
    with TableInfo<$TimerStepsTable, TimerStep> {
  @override
  final GeneratedDatabase attachedDatabase;
  final String? _alias;
  $TimerStepsTable(this.attachedDatabase, [this._alias]);
  static const VerificationMeta _idMeta = const VerificationMeta('id');
  @override
  late final GeneratedColumn<int> id = GeneratedColumn<int>(
    'id',
    aliasedName,
    false,
    hasAutoIncrement: true,
    type: DriftSqlType.int,
    requiredDuringInsert: false,
    defaultConstraints: GeneratedColumn.constraintIsAlways(
      'PRIMARY KEY AUTOINCREMENT',
    ),
  );
  static const VerificationMeta _scheduleIdMeta = const VerificationMeta(
    'scheduleId',
  );
  @override
  late final GeneratedColumn<int> scheduleId = GeneratedColumn<int>(
    'schedule_id',
    aliasedName,
    false,
    type: DriftSqlType.int,
    requiredDuringInsert: true,
    defaultConstraints: GeneratedColumn.constraintIsAlways(
      'REFERENCES timer_schedules (id) ON DELETE CASCADE',
    ),
  );
  static const VerificationMeta _stepNameMeta = const VerificationMeta(
    'stepName',
  );
  @override
  late final GeneratedColumn<String> stepName = GeneratedColumn<String>(
    'step_name',
    aliasedName,
    false,
    type: DriftSqlType.string,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _durationInMinutesMeta = const VerificationMeta(
    'durationInMinutes',
  );
  @override
  late final GeneratedColumn<int> durationInMinutes = GeneratedColumn<int>(
    'duration_in_minutes',
    aliasedName,
    false,
    type: DriftSqlType.int,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _stepOrderMeta = const VerificationMeta(
    'stepOrder',
  );
  @override
  late final GeneratedColumn<int> stepOrder = GeneratedColumn<int>(
    'step_order',
    aliasedName,
    false,
    type: DriftSqlType.int,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _isCompletedMeta = const VerificationMeta(
    'isCompleted',
  );
  @override
  late final GeneratedColumn<bool> isCompleted = GeneratedColumn<bool>(
    'is_completed',
    aliasedName,
    false,
    type: DriftSqlType.bool,
    requiredDuringInsert: false,
    defaultConstraints: GeneratedColumn.constraintIsAlways(
      'CHECK ("is_completed" IN (0, 1))',
    ),
    defaultValue: const Constant(false),
  );
  @override
  List<GeneratedColumn> get $columns => [
    id,
    scheduleId,
    stepName,
    durationInMinutes,
    stepOrder,
    isCompleted,
  ];
  @override
  String get aliasedName => _alias ?? actualTableName;
  @override
  String get actualTableName => $name;
  static const String $name = 'timer_steps';
  @override
  VerificationContext validateIntegrity(
    Insertable<TimerStep> instance, {
    bool isInserting = false,
  }) {
    final context = VerificationContext();
    final data = instance.toColumns(true);
    if (data.containsKey('id')) {
      context.handle(_idMeta, id.isAcceptableOrUnknown(data['id']!, _idMeta));
    }
    if (data.containsKey('schedule_id')) {
      context.handle(
        _scheduleIdMeta,
        scheduleId.isAcceptableOrUnknown(data['schedule_id']!, _scheduleIdMeta),
      );
    } else if (isInserting) {
      context.missing(_scheduleIdMeta);
    }
    if (data.containsKey('step_name')) {
      context.handle(
        _stepNameMeta,
        stepName.isAcceptableOrUnknown(data['step_name']!, _stepNameMeta),
      );
    } else if (isInserting) {
      context.missing(_stepNameMeta);
    }
    if (data.containsKey('duration_in_minutes')) {
      context.handle(
        _durationInMinutesMeta,
        durationInMinutes.isAcceptableOrUnknown(
          data['duration_in_minutes']!,
          _durationInMinutesMeta,
        ),
      );
    } else if (isInserting) {
      context.missing(_durationInMinutesMeta);
    }
    if (data.containsKey('step_order')) {
      context.handle(
        _stepOrderMeta,
        stepOrder.isAcceptableOrUnknown(data['step_order']!, _stepOrderMeta),
      );
    } else if (isInserting) {
      context.missing(_stepOrderMeta);
    }
    if (data.containsKey('is_completed')) {
      context.handle(
        _isCompletedMeta,
        isCompleted.isAcceptableOrUnknown(
          data['is_completed']!,
          _isCompletedMeta,
        ),
      );
    }
    return context;
  }

  @override
  Set<GeneratedColumn> get $primaryKey => {id};
  @override
  TimerStep map(Map<String, dynamic> data, {String? tablePrefix}) {
    final effectivePrefix = tablePrefix != null ? '$tablePrefix.' : '';
    return TimerStep(
      id: attachedDatabase.typeMapping.read(
        DriftSqlType.int,
        data['${effectivePrefix}id'],
      )!,
      scheduleId: attachedDatabase.typeMapping.read(
        DriftSqlType.int,
        data['${effectivePrefix}schedule_id'],
      )!,
      stepName: attachedDatabase.typeMapping.read(
        DriftSqlType.string,
        data['${effectivePrefix}step_name'],
      )!,
      durationInMinutes: attachedDatabase.typeMapping.read(
        DriftSqlType.int,
        data['${effectivePrefix}duration_in_minutes'],
      )!,
      stepOrder: attachedDatabase.typeMapping.read(
        DriftSqlType.int,
        data['${effectivePrefix}step_order'],
      )!,
      isCompleted: attachedDatabase.typeMapping.read(
        DriftSqlType.bool,
        data['${effectivePrefix}is_completed'],
      )!,
    );
  }

  @override
  $TimerStepsTable createAlias(String alias) {
    return $TimerStepsTable(attachedDatabase, alias);
  }
}

class TimerStep extends DataClass implements Insertable<TimerStep> {
  final int id;
  final int scheduleId;
  final String stepName;
  final int durationInMinutes;
  final int stepOrder;
  final bool isCompleted;
  const TimerStep({
    required this.id,
    required this.scheduleId,
    required this.stepName,
    required this.durationInMinutes,
    required this.stepOrder,
    required this.isCompleted,
  });
  @override
  Map<String, Expression> toColumns(bool nullToAbsent) {
    final map = <String, Expression>{};
    map['id'] = Variable<int>(id);
    map['schedule_id'] = Variable<int>(scheduleId);
    map['step_name'] = Variable<String>(stepName);
    map['duration_in_minutes'] = Variable<int>(durationInMinutes);
    map['step_order'] = Variable<int>(stepOrder);
    map['is_completed'] = Variable<bool>(isCompleted);
    return map;
  }

  TimerStepsCompanion toCompanion(bool nullToAbsent) {
    return TimerStepsCompanion(
      id: Value(id),
      scheduleId: Value(scheduleId),
      stepName: Value(stepName),
      durationInMinutes: Value(durationInMinutes),
      stepOrder: Value(stepOrder),
      isCompleted: Value(isCompleted),
    );
  }

  factory TimerStep.fromJson(
    Map<String, dynamic> json, {
    ValueSerializer? serializer,
  }) {
    serializer ??= driftRuntimeOptions.defaultSerializer;
    return TimerStep(
      id: serializer.fromJson<int>(json['id']),
      scheduleId: serializer.fromJson<int>(json['scheduleId']),
      stepName: serializer.fromJson<String>(json['stepName']),
      durationInMinutes: serializer.fromJson<int>(json['durationInMinutes']),
      stepOrder: serializer.fromJson<int>(json['stepOrder']),
      isCompleted: serializer.fromJson<bool>(json['isCompleted']),
    );
  }
  @override
  Map<String, dynamic> toJson({ValueSerializer? serializer}) {
    serializer ??= driftRuntimeOptions.defaultSerializer;
    return <String, dynamic>{
      'id': serializer.toJson<int>(id),
      'scheduleId': serializer.toJson<int>(scheduleId),
      'stepName': serializer.toJson<String>(stepName),
      'durationInMinutes': serializer.toJson<int>(durationInMinutes),
      'stepOrder': serializer.toJson<int>(stepOrder),
      'isCompleted': serializer.toJson<bool>(isCompleted),
    };
  }

  TimerStep copyWith({
    int? id,
    int? scheduleId,
    String? stepName,
    int? durationInMinutes,
    int? stepOrder,
    bool? isCompleted,
  }) => TimerStep(
    id: id ?? this.id,
    scheduleId: scheduleId ?? this.scheduleId,
    stepName: stepName ?? this.stepName,
    durationInMinutes: durationInMinutes ?? this.durationInMinutes,
    stepOrder: stepOrder ?? this.stepOrder,
    isCompleted: isCompleted ?? this.isCompleted,
  );
  TimerStep copyWithCompanion(TimerStepsCompanion data) {
    return TimerStep(
      id: data.id.present ? data.id.value : this.id,
      scheduleId: data.scheduleId.present
          ? data.scheduleId.value
          : this.scheduleId,
      stepName: data.stepName.present ? data.stepName.value : this.stepName,
      durationInMinutes: data.durationInMinutes.present
          ? data.durationInMinutes.value
          : this.durationInMinutes,
      stepOrder: data.stepOrder.present ? data.stepOrder.value : this.stepOrder,
      isCompleted: data.isCompleted.present
          ? data.isCompleted.value
          : this.isCompleted,
    );
  }

  @override
  String toString() {
    return (StringBuffer('TimerStep(')
          ..write('id: $id, ')
          ..write('scheduleId: $scheduleId, ')
          ..write('stepName: $stepName, ')
          ..write('durationInMinutes: $durationInMinutes, ')
          ..write('stepOrder: $stepOrder, ')
          ..write('isCompleted: $isCompleted')
          ..write(')'))
        .toString();
  }

  @override
  int get hashCode => Object.hash(
    id,
    scheduleId,
    stepName,
    durationInMinutes,
    stepOrder,
    isCompleted,
  );
  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      (other is TimerStep &&
          other.id == this.id &&
          other.scheduleId == this.scheduleId &&
          other.stepName == this.stepName &&
          other.durationInMinutes == this.durationInMinutes &&
          other.stepOrder == this.stepOrder &&
          other.isCompleted == this.isCompleted);
}

class TimerStepsCompanion extends UpdateCompanion<TimerStep> {
  final Value<int> id;
  final Value<int> scheduleId;
  final Value<String> stepName;
  final Value<int> durationInMinutes;
  final Value<int> stepOrder;
  final Value<bool> isCompleted;
  const TimerStepsCompanion({
    this.id = const Value.absent(),
    this.scheduleId = const Value.absent(),
    this.stepName = const Value.absent(),
    this.durationInMinutes = const Value.absent(),
    this.stepOrder = const Value.absent(),
    this.isCompleted = const Value.absent(),
  });
  TimerStepsCompanion.insert({
    this.id = const Value.absent(),
    required int scheduleId,
    required String stepName,
    required int durationInMinutes,
    required int stepOrder,
    this.isCompleted = const Value.absent(),
  }) : scheduleId = Value(scheduleId),
       stepName = Value(stepName),
       durationInMinutes = Value(durationInMinutes),
       stepOrder = Value(stepOrder);
  static Insertable<TimerStep> custom({
    Expression<int>? id,
    Expression<int>? scheduleId,
    Expression<String>? stepName,
    Expression<int>? durationInMinutes,
    Expression<int>? stepOrder,
    Expression<bool>? isCompleted,
  }) {
    return RawValuesInsertable({
      if (id != null) 'id': id,
      if (scheduleId != null) 'schedule_id': scheduleId,
      if (stepName != null) 'step_name': stepName,
      if (durationInMinutes != null) 'duration_in_minutes': durationInMinutes,
      if (stepOrder != null) 'step_order': stepOrder,
      if (isCompleted != null) 'is_completed': isCompleted,
    });
  }

  TimerStepsCompanion copyWith({
    Value<int>? id,
    Value<int>? scheduleId,
    Value<String>? stepName,
    Value<int>? durationInMinutes,
    Value<int>? stepOrder,
    Value<bool>? isCompleted,
  }) {
    return TimerStepsCompanion(
      id: id ?? this.id,
      scheduleId: scheduleId ?? this.scheduleId,
      stepName: stepName ?? this.stepName,
      durationInMinutes: durationInMinutes ?? this.durationInMinutes,
      stepOrder: stepOrder ?? this.stepOrder,
      isCompleted: isCompleted ?? this.isCompleted,
    );
  }

  @override
  Map<String, Expression> toColumns(bool nullToAbsent) {
    final map = <String, Expression>{};
    if (id.present) {
      map['id'] = Variable<int>(id.value);
    }
    if (scheduleId.present) {
      map['schedule_id'] = Variable<int>(scheduleId.value);
    }
    if (stepName.present) {
      map['step_name'] = Variable<String>(stepName.value);
    }
    if (durationInMinutes.present) {
      map['duration_in_minutes'] = Variable<int>(durationInMinutes.value);
    }
    if (stepOrder.present) {
      map['step_order'] = Variable<int>(stepOrder.value);
    }
    if (isCompleted.present) {
      map['is_completed'] = Variable<bool>(isCompleted.value);
    }
    return map;
  }

  @override
  String toString() {
    return (StringBuffer('TimerStepsCompanion(')
          ..write('id: $id, ')
          ..write('scheduleId: $scheduleId, ')
          ..write('stepName: $stepName, ')
          ..write('durationInMinutes: $durationInMinutes, ')
          ..write('stepOrder: $stepOrder, ')
          ..write('isCompleted: $isCompleted')
          ..write(')'))
        .toString();
  }
}

abstract class _$AppDatabase extends GeneratedDatabase {
  _$AppDatabase(QueryExecutor e) : super(e);
  $AppDatabaseManager get managers => $AppDatabaseManager(this);
  late final $UsersTable users = $UsersTable(this);
  late final $RecipesTable recipes = $RecipesTable(this);
  late final $TimerSchedulesTable timerSchedules = $TimerSchedulesTable(this);
  late final $TimerStepsTable timerSteps = $TimerStepsTable(this);
  @override
  Iterable<TableInfo<Table, Object?>> get allTables =>
      allSchemaEntities.whereType<TableInfo<Table, Object?>>();
  @override
  List<DatabaseSchemaEntity> get allSchemaEntities => [
    users,
    recipes,
    timerSchedules,
    timerSteps,
  ];
  @override
  StreamQueryUpdateRules get streamUpdateRules => const StreamQueryUpdateRules([
    WritePropagation(
      on: TableUpdateQuery.onTableName(
        'timer_schedules',
        limitUpdateKind: UpdateKind.delete,
      ),
      result: [TableUpdate('timer_steps', kind: UpdateKind.delete)],
    ),
  ]);
}

typedef $$UsersTableCreateCompanionBuilder =
    UsersCompanion Function({
      Value<int> id,
      required String email,
      required String password,
      Value<DateTime> createdAt,
    });
typedef $$UsersTableUpdateCompanionBuilder =
    UsersCompanion Function({
      Value<int> id,
      Value<String> email,
      Value<String> password,
      Value<DateTime> createdAt,
    });

class $$UsersTableFilterComposer extends Composer<_$AppDatabase, $UsersTable> {
  $$UsersTableFilterComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  ColumnFilters<int> get id => $composableBuilder(
    column: $table.id,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<String> get email => $composableBuilder(
    column: $table.email,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<String> get password => $composableBuilder(
    column: $table.password,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<DateTime> get createdAt => $composableBuilder(
    column: $table.createdAt,
    builder: (column) => ColumnFilters(column),
  );
}

class $$UsersTableOrderingComposer
    extends Composer<_$AppDatabase, $UsersTable> {
  $$UsersTableOrderingComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  ColumnOrderings<int> get id => $composableBuilder(
    column: $table.id,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<String> get email => $composableBuilder(
    column: $table.email,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<String> get password => $composableBuilder(
    column: $table.password,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<DateTime> get createdAt => $composableBuilder(
    column: $table.createdAt,
    builder: (column) => ColumnOrderings(column),
  );
}

class $$UsersTableAnnotationComposer
    extends Composer<_$AppDatabase, $UsersTable> {
  $$UsersTableAnnotationComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  GeneratedColumn<int> get id =>
      $composableBuilder(column: $table.id, builder: (column) => column);

  GeneratedColumn<String> get email =>
      $composableBuilder(column: $table.email, builder: (column) => column);

  GeneratedColumn<String> get password =>
      $composableBuilder(column: $table.password, builder: (column) => column);

  GeneratedColumn<DateTime> get createdAt =>
      $composableBuilder(column: $table.createdAt, builder: (column) => column);
}

class $$UsersTableTableManager
    extends
        RootTableManager<
          _$AppDatabase,
          $UsersTable,
          User,
          $$UsersTableFilterComposer,
          $$UsersTableOrderingComposer,
          $$UsersTableAnnotationComposer,
          $$UsersTableCreateCompanionBuilder,
          $$UsersTableUpdateCompanionBuilder,
          (User, BaseReferences<_$AppDatabase, $UsersTable, User>),
          User,
          PrefetchHooks Function()
        > {
  $$UsersTableTableManager(_$AppDatabase db, $UsersTable table)
    : super(
        TableManagerState(
          db: db,
          table: table,
          createFilteringComposer: () =>
              $$UsersTableFilterComposer($db: db, $table: table),
          createOrderingComposer: () =>
              $$UsersTableOrderingComposer($db: db, $table: table),
          createComputedFieldComposer: () =>
              $$UsersTableAnnotationComposer($db: db, $table: table),
          updateCompanionCallback:
              ({
                Value<int> id = const Value.absent(),
                Value<String> email = const Value.absent(),
                Value<String> password = const Value.absent(),
                Value<DateTime> createdAt = const Value.absent(),
              }) => UsersCompanion(
                id: id,
                email: email,
                password: password,
                createdAt: createdAt,
              ),
          createCompanionCallback:
              ({
                Value<int> id = const Value.absent(),
                required String email,
                required String password,
                Value<DateTime> createdAt = const Value.absent(),
              }) => UsersCompanion.insert(
                id: id,
                email: email,
                password: password,
                createdAt: createdAt,
              ),
          withReferenceMapper: (p0) => p0
              .map((e) => (e.readTable(table), BaseReferences(db, table, e)))
              .toList(),
          prefetchHooksCallback: null,
        ),
      );
}

typedef $$UsersTableProcessedTableManager =
    ProcessedTableManager<
      _$AppDatabase,
      $UsersTable,
      User,
      $$UsersTableFilterComposer,
      $$UsersTableOrderingComposer,
      $$UsersTableAnnotationComposer,
      $$UsersTableCreateCompanionBuilder,
      $$UsersTableUpdateCompanionBuilder,
      (User, BaseReferences<_$AppDatabase, $UsersTable, User>),
      User,
      PrefetchHooks Function()
    >;
typedef $$RecipesTableCreateCompanionBuilder =
    RecipesCompanion Function({
      Value<int> id,
      required String name,
      required String calculationType,
      required double totalStarter,
      Value<double?> starterRatio,
      Value<double?> flourRatio,
      Value<double?> waterRatio,
      Value<String?> timeframe,
      required int resultStarter,
      required int resultFlour,
      required int resultWater,
      Value<double?> temperature,
      Value<DateTime> createdAt,
    });
typedef $$RecipesTableUpdateCompanionBuilder =
    RecipesCompanion Function({
      Value<int> id,
      Value<String> name,
      Value<String> calculationType,
      Value<double> totalStarter,
      Value<double?> starterRatio,
      Value<double?> flourRatio,
      Value<double?> waterRatio,
      Value<String?> timeframe,
      Value<int> resultStarter,
      Value<int> resultFlour,
      Value<int> resultWater,
      Value<double?> temperature,
      Value<DateTime> createdAt,
    });

class $$RecipesTableFilterComposer
    extends Composer<_$AppDatabase, $RecipesTable> {
  $$RecipesTableFilterComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  ColumnFilters<int> get id => $composableBuilder(
    column: $table.id,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<String> get name => $composableBuilder(
    column: $table.name,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<String> get calculationType => $composableBuilder(
    column: $table.calculationType,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<double> get totalStarter => $composableBuilder(
    column: $table.totalStarter,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<double> get starterRatio => $composableBuilder(
    column: $table.starterRatio,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<double> get flourRatio => $composableBuilder(
    column: $table.flourRatio,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<double> get waterRatio => $composableBuilder(
    column: $table.waterRatio,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<String> get timeframe => $composableBuilder(
    column: $table.timeframe,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<int> get resultStarter => $composableBuilder(
    column: $table.resultStarter,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<int> get resultFlour => $composableBuilder(
    column: $table.resultFlour,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<int> get resultWater => $composableBuilder(
    column: $table.resultWater,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<double> get temperature => $composableBuilder(
    column: $table.temperature,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<DateTime> get createdAt => $composableBuilder(
    column: $table.createdAt,
    builder: (column) => ColumnFilters(column),
  );
}

class $$RecipesTableOrderingComposer
    extends Composer<_$AppDatabase, $RecipesTable> {
  $$RecipesTableOrderingComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  ColumnOrderings<int> get id => $composableBuilder(
    column: $table.id,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<String> get name => $composableBuilder(
    column: $table.name,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<String> get calculationType => $composableBuilder(
    column: $table.calculationType,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<double> get totalStarter => $composableBuilder(
    column: $table.totalStarter,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<double> get starterRatio => $composableBuilder(
    column: $table.starterRatio,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<double> get flourRatio => $composableBuilder(
    column: $table.flourRatio,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<double> get waterRatio => $composableBuilder(
    column: $table.waterRatio,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<String> get timeframe => $composableBuilder(
    column: $table.timeframe,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<int> get resultStarter => $composableBuilder(
    column: $table.resultStarter,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<int> get resultFlour => $composableBuilder(
    column: $table.resultFlour,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<int> get resultWater => $composableBuilder(
    column: $table.resultWater,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<double> get temperature => $composableBuilder(
    column: $table.temperature,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<DateTime> get createdAt => $composableBuilder(
    column: $table.createdAt,
    builder: (column) => ColumnOrderings(column),
  );
}

class $$RecipesTableAnnotationComposer
    extends Composer<_$AppDatabase, $RecipesTable> {
  $$RecipesTableAnnotationComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  GeneratedColumn<int> get id =>
      $composableBuilder(column: $table.id, builder: (column) => column);

  GeneratedColumn<String> get name =>
      $composableBuilder(column: $table.name, builder: (column) => column);

  GeneratedColumn<String> get calculationType => $composableBuilder(
    column: $table.calculationType,
    builder: (column) => column,
  );

  GeneratedColumn<double> get totalStarter => $composableBuilder(
    column: $table.totalStarter,
    builder: (column) => column,
  );

  GeneratedColumn<double> get starterRatio => $composableBuilder(
    column: $table.starterRatio,
    builder: (column) => column,
  );

  GeneratedColumn<double> get flourRatio => $composableBuilder(
    column: $table.flourRatio,
    builder: (column) => column,
  );

  GeneratedColumn<double> get waterRatio => $composableBuilder(
    column: $table.waterRatio,
    builder: (column) => column,
  );

  GeneratedColumn<String> get timeframe =>
      $composableBuilder(column: $table.timeframe, builder: (column) => column);

  GeneratedColumn<int> get resultStarter => $composableBuilder(
    column: $table.resultStarter,
    builder: (column) => column,
  );

  GeneratedColumn<int> get resultFlour => $composableBuilder(
    column: $table.resultFlour,
    builder: (column) => column,
  );

  GeneratedColumn<int> get resultWater => $composableBuilder(
    column: $table.resultWater,
    builder: (column) => column,
  );

  GeneratedColumn<double> get temperature => $composableBuilder(
    column: $table.temperature,
    builder: (column) => column,
  );

  GeneratedColumn<DateTime> get createdAt =>
      $composableBuilder(column: $table.createdAt, builder: (column) => column);
}

class $$RecipesTableTableManager
    extends
        RootTableManager<
          _$AppDatabase,
          $RecipesTable,
          Recipe,
          $$RecipesTableFilterComposer,
          $$RecipesTableOrderingComposer,
          $$RecipesTableAnnotationComposer,
          $$RecipesTableCreateCompanionBuilder,
          $$RecipesTableUpdateCompanionBuilder,
          (Recipe, BaseReferences<_$AppDatabase, $RecipesTable, Recipe>),
          Recipe,
          PrefetchHooks Function()
        > {
  $$RecipesTableTableManager(_$AppDatabase db, $RecipesTable table)
    : super(
        TableManagerState(
          db: db,
          table: table,
          createFilteringComposer: () =>
              $$RecipesTableFilterComposer($db: db, $table: table),
          createOrderingComposer: () =>
              $$RecipesTableOrderingComposer($db: db, $table: table),
          createComputedFieldComposer: () =>
              $$RecipesTableAnnotationComposer($db: db, $table: table),
          updateCompanionCallback:
              ({
                Value<int> id = const Value.absent(),
                Value<String> name = const Value.absent(),
                Value<String> calculationType = const Value.absent(),
                Value<double> totalStarter = const Value.absent(),
                Value<double?> starterRatio = const Value.absent(),
                Value<double?> flourRatio = const Value.absent(),
                Value<double?> waterRatio = const Value.absent(),
                Value<String?> timeframe = const Value.absent(),
                Value<int> resultStarter = const Value.absent(),
                Value<int> resultFlour = const Value.absent(),
                Value<int> resultWater = const Value.absent(),
                Value<double?> temperature = const Value.absent(),
                Value<DateTime> createdAt = const Value.absent(),
              }) => RecipesCompanion(
                id: id,
                name: name,
                calculationType: calculationType,
                totalStarter: totalStarter,
                starterRatio: starterRatio,
                flourRatio: flourRatio,
                waterRatio: waterRatio,
                timeframe: timeframe,
                resultStarter: resultStarter,
                resultFlour: resultFlour,
                resultWater: resultWater,
                temperature: temperature,
                createdAt: createdAt,
              ),
          createCompanionCallback:
              ({
                Value<int> id = const Value.absent(),
                required String name,
                required String calculationType,
                required double totalStarter,
                Value<double?> starterRatio = const Value.absent(),
                Value<double?> flourRatio = const Value.absent(),
                Value<double?> waterRatio = const Value.absent(),
                Value<String?> timeframe = const Value.absent(),
                required int resultStarter,
                required int resultFlour,
                required int resultWater,
                Value<double?> temperature = const Value.absent(),
                Value<DateTime> createdAt = const Value.absent(),
              }) => RecipesCompanion.insert(
                id: id,
                name: name,
                calculationType: calculationType,
                totalStarter: totalStarter,
                starterRatio: starterRatio,
                flourRatio: flourRatio,
                waterRatio: waterRatio,
                timeframe: timeframe,
                resultStarter: resultStarter,
                resultFlour: resultFlour,
                resultWater: resultWater,
                temperature: temperature,
                createdAt: createdAt,
              ),
          withReferenceMapper: (p0) => p0
              .map((e) => (e.readTable(table), BaseReferences(db, table, e)))
              .toList(),
          prefetchHooksCallback: null,
        ),
      );
}

typedef $$RecipesTableProcessedTableManager =
    ProcessedTableManager<
      _$AppDatabase,
      $RecipesTable,
      Recipe,
      $$RecipesTableFilterComposer,
      $$RecipesTableOrderingComposer,
      $$RecipesTableAnnotationComposer,
      $$RecipesTableCreateCompanionBuilder,
      $$RecipesTableUpdateCompanionBuilder,
      (Recipe, BaseReferences<_$AppDatabase, $RecipesTable, Recipe>),
      Recipe,
      PrefetchHooks Function()
    >;
typedef $$TimerSchedulesTableCreateCompanionBuilder =
    TimerSchedulesCompanion Function({
      Value<int> id,
      required String name,
      required DateTime startTime,
      Value<bool> isRunning,
      Value<DateTime> createdAt,
    });
typedef $$TimerSchedulesTableUpdateCompanionBuilder =
    TimerSchedulesCompanion Function({
      Value<int> id,
      Value<String> name,
      Value<DateTime> startTime,
      Value<bool> isRunning,
      Value<DateTime> createdAt,
    });

final class $$TimerSchedulesTableReferences
    extends BaseReferences<_$AppDatabase, $TimerSchedulesTable, TimerSchedule> {
  $$TimerSchedulesTableReferences(
    super.$_db,
    super.$_table,
    super.$_typedResult,
  );

  static MultiTypedResultKey<$TimerStepsTable, List<TimerStep>>
  _timerStepsRefsTable(_$AppDatabase db) => MultiTypedResultKey.fromTable(
    db.timerSteps,
    aliasName: $_aliasNameGenerator(
      db.timerSchedules.id,
      db.timerSteps.scheduleId,
    ),
  );

  $$TimerStepsTableProcessedTableManager get timerStepsRefs {
    final manager = $$TimerStepsTableTableManager(
      $_db,
      $_db.timerSteps,
    ).filter((f) => f.scheduleId.id.sqlEquals($_itemColumn<int>('id')!));

    final cache = $_typedResult.readTableOrNull(_timerStepsRefsTable($_db));
    return ProcessedTableManager(
      manager.$state.copyWith(prefetchedData: cache),
    );
  }
}

class $$TimerSchedulesTableFilterComposer
    extends Composer<_$AppDatabase, $TimerSchedulesTable> {
  $$TimerSchedulesTableFilterComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  ColumnFilters<int> get id => $composableBuilder(
    column: $table.id,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<String> get name => $composableBuilder(
    column: $table.name,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<DateTime> get startTime => $composableBuilder(
    column: $table.startTime,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<bool> get isRunning => $composableBuilder(
    column: $table.isRunning,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<DateTime> get createdAt => $composableBuilder(
    column: $table.createdAt,
    builder: (column) => ColumnFilters(column),
  );

  Expression<bool> timerStepsRefs(
    Expression<bool> Function($$TimerStepsTableFilterComposer f) f,
  ) {
    final $$TimerStepsTableFilterComposer composer = $composerBuilder(
      composer: this,
      getCurrentColumn: (t) => t.id,
      referencedTable: $db.timerSteps,
      getReferencedColumn: (t) => t.scheduleId,
      builder:
          (
            joinBuilder, {
            $addJoinBuilderToRootComposer,
            $removeJoinBuilderFromRootComposer,
          }) => $$TimerStepsTableFilterComposer(
            $db: $db,
            $table: $db.timerSteps,
            $addJoinBuilderToRootComposer: $addJoinBuilderToRootComposer,
            joinBuilder: joinBuilder,
            $removeJoinBuilderFromRootComposer:
                $removeJoinBuilderFromRootComposer,
          ),
    );
    return f(composer);
  }
}

class $$TimerSchedulesTableOrderingComposer
    extends Composer<_$AppDatabase, $TimerSchedulesTable> {
  $$TimerSchedulesTableOrderingComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  ColumnOrderings<int> get id => $composableBuilder(
    column: $table.id,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<String> get name => $composableBuilder(
    column: $table.name,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<DateTime> get startTime => $composableBuilder(
    column: $table.startTime,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<bool> get isRunning => $composableBuilder(
    column: $table.isRunning,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<DateTime> get createdAt => $composableBuilder(
    column: $table.createdAt,
    builder: (column) => ColumnOrderings(column),
  );
}

class $$TimerSchedulesTableAnnotationComposer
    extends Composer<_$AppDatabase, $TimerSchedulesTable> {
  $$TimerSchedulesTableAnnotationComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  GeneratedColumn<int> get id =>
      $composableBuilder(column: $table.id, builder: (column) => column);

  GeneratedColumn<String> get name =>
      $composableBuilder(column: $table.name, builder: (column) => column);

  GeneratedColumn<DateTime> get startTime =>
      $composableBuilder(column: $table.startTime, builder: (column) => column);

  GeneratedColumn<bool> get isRunning =>
      $composableBuilder(column: $table.isRunning, builder: (column) => column);

  GeneratedColumn<DateTime> get createdAt =>
      $composableBuilder(column: $table.createdAt, builder: (column) => column);

  Expression<T> timerStepsRefs<T extends Object>(
    Expression<T> Function($$TimerStepsTableAnnotationComposer a) f,
  ) {
    final $$TimerStepsTableAnnotationComposer composer = $composerBuilder(
      composer: this,
      getCurrentColumn: (t) => t.id,
      referencedTable: $db.timerSteps,
      getReferencedColumn: (t) => t.scheduleId,
      builder:
          (
            joinBuilder, {
            $addJoinBuilderToRootComposer,
            $removeJoinBuilderFromRootComposer,
          }) => $$TimerStepsTableAnnotationComposer(
            $db: $db,
            $table: $db.timerSteps,
            $addJoinBuilderToRootComposer: $addJoinBuilderToRootComposer,
            joinBuilder: joinBuilder,
            $removeJoinBuilderFromRootComposer:
                $removeJoinBuilderFromRootComposer,
          ),
    );
    return f(composer);
  }
}

class $$TimerSchedulesTableTableManager
    extends
        RootTableManager<
          _$AppDatabase,
          $TimerSchedulesTable,
          TimerSchedule,
          $$TimerSchedulesTableFilterComposer,
          $$TimerSchedulesTableOrderingComposer,
          $$TimerSchedulesTableAnnotationComposer,
          $$TimerSchedulesTableCreateCompanionBuilder,
          $$TimerSchedulesTableUpdateCompanionBuilder,
          (TimerSchedule, $$TimerSchedulesTableReferences),
          TimerSchedule,
          PrefetchHooks Function({bool timerStepsRefs})
        > {
  $$TimerSchedulesTableTableManager(
    _$AppDatabase db,
    $TimerSchedulesTable table,
  ) : super(
        TableManagerState(
          db: db,
          table: table,
          createFilteringComposer: () =>
              $$TimerSchedulesTableFilterComposer($db: db, $table: table),
          createOrderingComposer: () =>
              $$TimerSchedulesTableOrderingComposer($db: db, $table: table),
          createComputedFieldComposer: () =>
              $$TimerSchedulesTableAnnotationComposer($db: db, $table: table),
          updateCompanionCallback:
              ({
                Value<int> id = const Value.absent(),
                Value<String> name = const Value.absent(),
                Value<DateTime> startTime = const Value.absent(),
                Value<bool> isRunning = const Value.absent(),
                Value<DateTime> createdAt = const Value.absent(),
              }) => TimerSchedulesCompanion(
                id: id,
                name: name,
                startTime: startTime,
                isRunning: isRunning,
                createdAt: createdAt,
              ),
          createCompanionCallback:
              ({
                Value<int> id = const Value.absent(),
                required String name,
                required DateTime startTime,
                Value<bool> isRunning = const Value.absent(),
                Value<DateTime> createdAt = const Value.absent(),
              }) => TimerSchedulesCompanion.insert(
                id: id,
                name: name,
                startTime: startTime,
                isRunning: isRunning,
                createdAt: createdAt,
              ),
          withReferenceMapper: (p0) => p0
              .map(
                (e) => (
                  e.readTable(table),
                  $$TimerSchedulesTableReferences(db, table, e),
                ),
              )
              .toList(),
          prefetchHooksCallback: ({timerStepsRefs = false}) {
            return PrefetchHooks(
              db: db,
              explicitlyWatchedTables: [if (timerStepsRefs) db.timerSteps],
              addJoins: null,
              getPrefetchedDataCallback: (items) async {
                return [
                  if (timerStepsRefs)
                    await $_getPrefetchedData<
                      TimerSchedule,
                      $TimerSchedulesTable,
                      TimerStep
                    >(
                      currentTable: table,
                      referencedTable: $$TimerSchedulesTableReferences
                          ._timerStepsRefsTable(db),
                      managerFromTypedResult: (p0) =>
                          $$TimerSchedulesTableReferences(
                            db,
                            table,
                            p0,
                          ).timerStepsRefs,
                      referencedItemsForCurrentItem: (item, referencedItems) =>
                          referencedItems.where((e) => e.scheduleId == item.id),
                      typedResults: items,
                    ),
                ];
              },
            );
          },
        ),
      );
}

typedef $$TimerSchedulesTableProcessedTableManager =
    ProcessedTableManager<
      _$AppDatabase,
      $TimerSchedulesTable,
      TimerSchedule,
      $$TimerSchedulesTableFilterComposer,
      $$TimerSchedulesTableOrderingComposer,
      $$TimerSchedulesTableAnnotationComposer,
      $$TimerSchedulesTableCreateCompanionBuilder,
      $$TimerSchedulesTableUpdateCompanionBuilder,
      (TimerSchedule, $$TimerSchedulesTableReferences),
      TimerSchedule,
      PrefetchHooks Function({bool timerStepsRefs})
    >;
typedef $$TimerStepsTableCreateCompanionBuilder =
    TimerStepsCompanion Function({
      Value<int> id,
      required int scheduleId,
      required String stepName,
      required int durationInMinutes,
      required int stepOrder,
      Value<bool> isCompleted,
    });
typedef $$TimerStepsTableUpdateCompanionBuilder =
    TimerStepsCompanion Function({
      Value<int> id,
      Value<int> scheduleId,
      Value<String> stepName,
      Value<int> durationInMinutes,
      Value<int> stepOrder,
      Value<bool> isCompleted,
    });

final class $$TimerStepsTableReferences
    extends BaseReferences<_$AppDatabase, $TimerStepsTable, TimerStep> {
  $$TimerStepsTableReferences(super.$_db, super.$_table, super.$_typedResult);

  static $TimerSchedulesTable _scheduleIdTable(_$AppDatabase db) =>
      db.timerSchedules.createAlias(
        $_aliasNameGenerator(db.timerSteps.scheduleId, db.timerSchedules.id),
      );

  $$TimerSchedulesTableProcessedTableManager get scheduleId {
    final $_column = $_itemColumn<int>('schedule_id')!;

    final manager = $$TimerSchedulesTableTableManager(
      $_db,
      $_db.timerSchedules,
    ).filter((f) => f.id.sqlEquals($_column));
    final item = $_typedResult.readTableOrNull(_scheduleIdTable($_db));
    if (item == null) return manager;
    return ProcessedTableManager(
      manager.$state.copyWith(prefetchedData: [item]),
    );
  }
}

class $$TimerStepsTableFilterComposer
    extends Composer<_$AppDatabase, $TimerStepsTable> {
  $$TimerStepsTableFilterComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  ColumnFilters<int> get id => $composableBuilder(
    column: $table.id,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<String> get stepName => $composableBuilder(
    column: $table.stepName,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<int> get durationInMinutes => $composableBuilder(
    column: $table.durationInMinutes,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<int> get stepOrder => $composableBuilder(
    column: $table.stepOrder,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<bool> get isCompleted => $composableBuilder(
    column: $table.isCompleted,
    builder: (column) => ColumnFilters(column),
  );

  $$TimerSchedulesTableFilterComposer get scheduleId {
    final $$TimerSchedulesTableFilterComposer composer = $composerBuilder(
      composer: this,
      getCurrentColumn: (t) => t.scheduleId,
      referencedTable: $db.timerSchedules,
      getReferencedColumn: (t) => t.id,
      builder:
          (
            joinBuilder, {
            $addJoinBuilderToRootComposer,
            $removeJoinBuilderFromRootComposer,
          }) => $$TimerSchedulesTableFilterComposer(
            $db: $db,
            $table: $db.timerSchedules,
            $addJoinBuilderToRootComposer: $addJoinBuilderToRootComposer,
            joinBuilder: joinBuilder,
            $removeJoinBuilderFromRootComposer:
                $removeJoinBuilderFromRootComposer,
          ),
    );
    return composer;
  }
}

class $$TimerStepsTableOrderingComposer
    extends Composer<_$AppDatabase, $TimerStepsTable> {
  $$TimerStepsTableOrderingComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  ColumnOrderings<int> get id => $composableBuilder(
    column: $table.id,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<String> get stepName => $composableBuilder(
    column: $table.stepName,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<int> get durationInMinutes => $composableBuilder(
    column: $table.durationInMinutes,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<int> get stepOrder => $composableBuilder(
    column: $table.stepOrder,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<bool> get isCompleted => $composableBuilder(
    column: $table.isCompleted,
    builder: (column) => ColumnOrderings(column),
  );

  $$TimerSchedulesTableOrderingComposer get scheduleId {
    final $$TimerSchedulesTableOrderingComposer composer = $composerBuilder(
      composer: this,
      getCurrentColumn: (t) => t.scheduleId,
      referencedTable: $db.timerSchedules,
      getReferencedColumn: (t) => t.id,
      builder:
          (
            joinBuilder, {
            $addJoinBuilderToRootComposer,
            $removeJoinBuilderFromRootComposer,
          }) => $$TimerSchedulesTableOrderingComposer(
            $db: $db,
            $table: $db.timerSchedules,
            $addJoinBuilderToRootComposer: $addJoinBuilderToRootComposer,
            joinBuilder: joinBuilder,
            $removeJoinBuilderFromRootComposer:
                $removeJoinBuilderFromRootComposer,
          ),
    );
    return composer;
  }
}

class $$TimerStepsTableAnnotationComposer
    extends Composer<_$AppDatabase, $TimerStepsTable> {
  $$TimerStepsTableAnnotationComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  GeneratedColumn<int> get id =>
      $composableBuilder(column: $table.id, builder: (column) => column);

  GeneratedColumn<String> get stepName =>
      $composableBuilder(column: $table.stepName, builder: (column) => column);

  GeneratedColumn<int> get durationInMinutes => $composableBuilder(
    column: $table.durationInMinutes,
    builder: (column) => column,
  );

  GeneratedColumn<int> get stepOrder =>
      $composableBuilder(column: $table.stepOrder, builder: (column) => column);

  GeneratedColumn<bool> get isCompleted => $composableBuilder(
    column: $table.isCompleted,
    builder: (column) => column,
  );

  $$TimerSchedulesTableAnnotationComposer get scheduleId {
    final $$TimerSchedulesTableAnnotationComposer composer = $composerBuilder(
      composer: this,
      getCurrentColumn: (t) => t.scheduleId,
      referencedTable: $db.timerSchedules,
      getReferencedColumn: (t) => t.id,
      builder:
          (
            joinBuilder, {
            $addJoinBuilderToRootComposer,
            $removeJoinBuilderFromRootComposer,
          }) => $$TimerSchedulesTableAnnotationComposer(
            $db: $db,
            $table: $db.timerSchedules,
            $addJoinBuilderToRootComposer: $addJoinBuilderToRootComposer,
            joinBuilder: joinBuilder,
            $removeJoinBuilderFromRootComposer:
                $removeJoinBuilderFromRootComposer,
          ),
    );
    return composer;
  }
}

class $$TimerStepsTableTableManager
    extends
        RootTableManager<
          _$AppDatabase,
          $TimerStepsTable,
          TimerStep,
          $$TimerStepsTableFilterComposer,
          $$TimerStepsTableOrderingComposer,
          $$TimerStepsTableAnnotationComposer,
          $$TimerStepsTableCreateCompanionBuilder,
          $$TimerStepsTableUpdateCompanionBuilder,
          (TimerStep, $$TimerStepsTableReferences),
          TimerStep,
          PrefetchHooks Function({bool scheduleId})
        > {
  $$TimerStepsTableTableManager(_$AppDatabase db, $TimerStepsTable table)
    : super(
        TableManagerState(
          db: db,
          table: table,
          createFilteringComposer: () =>
              $$TimerStepsTableFilterComposer($db: db, $table: table),
          createOrderingComposer: () =>
              $$TimerStepsTableOrderingComposer($db: db, $table: table),
          createComputedFieldComposer: () =>
              $$TimerStepsTableAnnotationComposer($db: db, $table: table),
          updateCompanionCallback:
              ({
                Value<int> id = const Value.absent(),
                Value<int> scheduleId = const Value.absent(),
                Value<String> stepName = const Value.absent(),
                Value<int> durationInMinutes = const Value.absent(),
                Value<int> stepOrder = const Value.absent(),
                Value<bool> isCompleted = const Value.absent(),
              }) => TimerStepsCompanion(
                id: id,
                scheduleId: scheduleId,
                stepName: stepName,
                durationInMinutes: durationInMinutes,
                stepOrder: stepOrder,
                isCompleted: isCompleted,
              ),
          createCompanionCallback:
              ({
                Value<int> id = const Value.absent(),
                required int scheduleId,
                required String stepName,
                required int durationInMinutes,
                required int stepOrder,
                Value<bool> isCompleted = const Value.absent(),
              }) => TimerStepsCompanion.insert(
                id: id,
                scheduleId: scheduleId,
                stepName: stepName,
                durationInMinutes: durationInMinutes,
                stepOrder: stepOrder,
                isCompleted: isCompleted,
              ),
          withReferenceMapper: (p0) => p0
              .map(
                (e) => (
                  e.readTable(table),
                  $$TimerStepsTableReferences(db, table, e),
                ),
              )
              .toList(),
          prefetchHooksCallback: ({scheduleId = false}) {
            return PrefetchHooks(
              db: db,
              explicitlyWatchedTables: [],
              addJoins:
                  <
                    T extends TableManagerState<
                      dynamic,
                      dynamic,
                      dynamic,
                      dynamic,
                      dynamic,
                      dynamic,
                      dynamic,
                      dynamic,
                      dynamic,
                      dynamic,
                      dynamic
                    >
                  >(state) {
                    if (scheduleId) {
                      state =
                          state.withJoin(
                                currentTable: table,
                                currentColumn: table.scheduleId,
                                referencedTable: $$TimerStepsTableReferences
                                    ._scheduleIdTable(db),
                                referencedColumn: $$TimerStepsTableReferences
                                    ._scheduleIdTable(db)
                                    .id,
                              )
                              as T;
                    }

                    return state;
                  },
              getPrefetchedDataCallback: (items) async {
                return [];
              },
            );
          },
        ),
      );
}

typedef $$TimerStepsTableProcessedTableManager =
    ProcessedTableManager<
      _$AppDatabase,
      $TimerStepsTable,
      TimerStep,
      $$TimerStepsTableFilterComposer,
      $$TimerStepsTableOrderingComposer,
      $$TimerStepsTableAnnotationComposer,
      $$TimerStepsTableCreateCompanionBuilder,
      $$TimerStepsTableUpdateCompanionBuilder,
      (TimerStep, $$TimerStepsTableReferences),
      TimerStep,
      PrefetchHooks Function({bool scheduleId})
    >;

class $AppDatabaseManager {
  final _$AppDatabase _db;
  $AppDatabaseManager(this._db);
  $$UsersTableTableManager get users =>
      $$UsersTableTableManager(_db, _db.users);
  $$RecipesTableTableManager get recipes =>
      $$RecipesTableTableManager(_db, _db.recipes);
  $$TimerSchedulesTableTableManager get timerSchedules =>
      $$TimerSchedulesTableTableManager(_db, _db.timerSchedules);
  $$TimerStepsTableTableManager get timerSteps =>
      $$TimerStepsTableTableManager(_db, _db.timerSteps);
}
