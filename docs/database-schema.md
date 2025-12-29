# 데이터베이스 스키마 문서

## 1. 개요

**데이터베이스**: SQLite 3.x
**ORM**: Drift 2.16.0
**스키마 버전**: 8
**파일 위치**: `{App Documents}/db.sqlite`

---

## 2. ERD (Entity Relationship Diagram)

```
┌─────────────────────┐
│      Users          │
├─────────────────────┤
│ PK  id             │
│     email          │
│     password       │
│     createdAt      │
└─────────────────────┘

┌─────────────────────────────────┐
│         Recipes                  │
├─────────────────────────────────┤
│ PK  id                          │
│     name                        │
│     calculationType             │
│     totalStarter                │
│     starterRatio                │
│     flourRatio                  │
│     waterRatio                  │
│     timeframe                   │
│     resultStarter               │
│     resultFlour                 │
│     resultWater                 │
│     resultLevain                │
│     temperature                 │
│     flourDetails (JSON)         │
│     extraIngredients (JSON)     │
│     timerSteps (JSON)           │  ← v8에서 추가
│     createdAt                   │
└─────────────────────────────────┘
                │
                │ 1:N (미사용)
                ↓
┌─────────────────────────────────┐
│      TimerSchedules              │
├─────────────────────────────────┤
│ PK  id                          │
│     name                        │
│     startTime                   │
│     isRunning                   │
│     createdAt                   │
└─────────────────────────────────┘
                │
                │ 1:N
                ↓
┌─────────────────────────────────┐
│       TimerSteps                 │
├─────────────────────────────────┤
│ PK  id                          │
│ FK  scheduleId                  │
│     stepName                    │
│     durationInMinutes           │
│     stepOrder                   │
│     isCompleted                 │
└─────────────────────────────────┘
```

---

## 3. 테이블 상세

### 3.1 Users

사용자 계정 정보를 저장하는 테이블.

| 컬럼명 | 타입 | NULL | 기본값 | 설명 |
|--------|------|------|--------|------|
| id | INTEGER | NO | AUTO_INCREMENT | Primary Key |
| email | TEXT | NO | - | 사용자 이메일 (UNIQUE) |
| password | TEXT | NO | - | 비밀번호 (평문, TODO: 해싱 필요) |
| createdAt | DATETIME | NO | CURRENT_TIMESTAMP | 계정 생성 시각 |

**인덱스**:
- PRIMARY KEY: `id`
- UNIQUE: `email`

**제약조건**:
- `email`: UNIQUE

**비고**:
- 현재 인증 로직은 미구현 상태
- 비밀번호는 평문 저장 (보안 취약)

---

### 3.2 Recipes

사용자가 저장한 레시피 정보.

| 컬럼명 | 타입 | NULL | 기본값 | 설명 |
|--------|------|------|--------|------|
| id | INTEGER | NO | AUTO_INCREMENT | Primary Key |
| name | TEXT | NO | - | 레시피 이름 |
| calculationType | TEXT | NO | - | 계산 타입 ('ratio', 'time', 'unified', 'dough') |
| totalStarter | REAL | NO | - | 총 르방 또는 총 도우 무게 (g) |
| starterRatio | REAL | YES | NULL | 스타터 비율 |
| flourRatio | REAL | YES | NULL | 밀가루 비율 또는 물 비율 (도우 계산기) |
| waterRatio | REAL | YES | NULL | 물 비율 또는 소금 비율 (도우 계산기) |
| timeframe | TEXT | YES | NULL | 준비 시간 (사워도우만 사용) |
| resultStarter | INTEGER | NO | - | 계산 결과: 스타터 또는 밀가루 (g) |
| resultFlour | INTEGER | NO | - | 계산 결과: 밀가루 또는 물 (g) |
| resultWater | INTEGER | NO | - | 계산 결과: 물 또는 소금 (g) |
| resultLevain | INTEGER | YES | NULL | 계산 결과: 르방 (g) |
| temperature | REAL | YES | NULL | 온도 (°C) 또는 르방 비율 (도우 계산기) |
| flourDetails | TEXT | YES | NULL | 밀가루 상세 정보 (JSON) |
| extraIngredients | TEXT | YES | NULL | 추가 재료 정보 (JSON) |
| timerSteps | TEXT | YES | NULL | 타이머 단계 정보 (JSON) |
| createdAt | DATETIME | NO | CURRENT_TIMESTAMP | 레시피 생성 시각 |

**인덱스**:
- PRIMARY KEY: `id`

**calculationType 값**:
- `'ratio'`: 비율 기반 계산 (구버전)
- `'time'`: 시간 기반 계산 (구버전)
- `'unified'`: 베이커스 퍼센티지 계산기 (사워도우)
- `'dough'`: 도우 계산기

**JSON 필드 구조**:

#### flourDetails (v6+)
```json
[
  {
    "name": "강력분",
    "amount": 200
  },
  {
    "name": "통밀",
    "amount": 50
  }
]
```

#### extraIngredients (v7+)
```json
[
  {
    "name": "올리브유",
    "percent": 5.0,
    "amount": 13
  },
  {
    "name": "버터",
    "percent": 3.0,
    "amount": 8
  }
]
```

#### timerSteps (v8+)
```json
[
  {
    "name": "오토리즈 (Autolyse)",
    "duration": 60
  },
  {
    "name": "1차 발효",
    "duration": 30
  }
]
```

**필드 매핑 (calculationType별)**:

**unified (사워도우)**:
- totalStarter: 총 르방 (g)
- starterRatio: 스타터 비율
- flourRatio: 밀가루 비율
- waterRatio: 물 비율
- temperature: 온도 (°C)
- resultStarter: 스타터 (g)
- resultFlour: 밀가루 (g)
- resultWater: 물 (g)

**dough (도우)**:
- totalStarter: 총 도우 무게 (g)
- starterRatio: 항상 100 (밀가루 기준)
- flourRatio: 물 % (베이커스 퍼센티지)
- waterRatio: 소금 % (베이커스 퍼센티지)
- temperature: 르방 % (베이커스 퍼센티지)
- resultStarter: 밀가루 (g)
- resultFlour: 물 (g)
- resultWater: 소금 (g)
- resultLevain: 르방 (g)

---

### 3.3 TimerSchedules

실행 중인 타이머 스케줄 정보.

| 컬럼명 | 타입 | NULL | 기본값 | 설명 |
|--------|------|------|--------|------|
| id | INTEGER | NO | AUTO_INCREMENT | Primary Key |
| name | TEXT | NO | - | 타이머 이름 (레시피 이름) |
| startTime | DATETIME | NO | - | 타이머 시작 시각 |
| isRunning | BOOLEAN | NO | TRUE | 실행 중 여부 |
| createdAt | DATETIME | NO | CURRENT_TIMESTAMP | 생성 시각 |

**인덱스**:
- PRIMARY KEY: `id`

**비고**:
- 백그라운드 서비스에서 사용 (현재 DB에 직접 저장하지 않음)
- 향후 타이머 히스토리 기능 구현 시 활용 예정

---

### 3.4 TimerSteps

타이머 스케줄의 각 단계 정보.

| 컬럼명 | 타입 | NULL | 기본값 | 설명 |
|--------|------|------|--------|------|
| id | INTEGER | NO | AUTO_INCREMENT | Primary Key |
| scheduleId | INTEGER | NO | - | Foreign Key (TimerSchedules.id) |
| stepName | TEXT | NO | - | 단계 이름 |
| durationInMinutes | INTEGER | NO | - | 소요 시간 (분) |
| stepOrder | INTEGER | NO | - | 단계 순서 (0부터 시작) |
| isCompleted | BOOLEAN | NO | FALSE | 완료 여부 |

**인덱스**:
- PRIMARY KEY: `id`
- FOREIGN KEY: `scheduleId` REFERENCES `TimerSchedules(id)` ON DELETE CASCADE

**제약조건**:
- CASCADE DELETE: TimerSchedules 삭제 시 자동 삭제

**비고**:
- 백그라운드 서비스에서 사용 (현재 DB에 직접 저장하지 않음)
- 타이머는 Recipes.timerSteps (JSON)에 저장

---

## 4. 마이그레이션 히스토리

### v1 → v2
- 초기 스키마 구성

### v2 → v3
- (내역 미상)

### v3 → v4
- (내역 미상)

### v4 → v5
```sql
ALTER TABLE Recipes ADD COLUMN resultLevain INTEGER;
```

### v5 → v6
```sql
ALTER TABLE Recipes ADD COLUMN flourDetails TEXT;
```

### v6 → v7
```sql
ALTER TABLE Recipes ADD COLUMN extraIngredients TEXT;
```

### v7 → v8
```sql
ALTER TABLE Recipes ADD COLUMN timerSteps TEXT;
```

**마이그레이션 코드** (database.dart):
```dart
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
    if (from < 8) {
      await migrator.addColumn(recipes, recipes.timerSteps);
    }
  },
);
```

---

## 5. 쿼리 예제

### 5.1 레시피 생성
```dart
final recipe = RecipesCompanion(
  name: Value('내 사워도우'),
  calculationType: Value('unified'),
  totalStarter: Value(500),
  starterRatio: Value(1),
  flourRatio: Value(4),
  waterRatio: Value(4),
  temperature: Value(25),
  resultStarter: Value(56),
  resultFlour: Value(222),
  resultWater: Value(222),
  timerSteps: Value(jsonEncode([...])),
);

final id = await db.addRecipe(recipe);
```

### 5.2 레시피 조회 (실시간)
```dart
Stream<List<Recipe>> watchAllRecipes() => select(recipes).watch();
```

### 5.3 레시피 업데이트
```dart
final updatedRecipe = recipe.toCompanion(true).copyWith(
  timerSteps: Value(newTimerSteps),
);
await db.updateRecipe(updatedRecipe);
```

### 5.4 레시피 삭제
```dart
await db.deleteRecipe(recipeId);
```

---

## 6. 인덱싱 전략

### 6.1 현재 인덱스
- **Users.email**: UNIQUE 인덱스 (자동)
- **모든 테이블의 id**: PRIMARY KEY 인덱스 (자동)

### 6.2 향후 인덱스 추가 고려
```sql
-- 레시피 이름 검색
CREATE INDEX idx_recipes_name ON Recipes(name);

-- 레시피 타입별 조회
CREATE INDEX idx_recipes_type ON Recipes(calculationType);

-- 생성 시간 정렬
CREATE INDEX idx_recipes_created ON Recipes(createdAt DESC);

-- 타이머 스케줄 조회
CREATE INDEX idx_timer_running ON TimerSchedules(isRunning);
```

---

## 7. 데이터 무결성

### 7.1 제약조건
- **NOT NULL**: 필수 필드는 NULL 불가
- **UNIQUE**: Users.email은 중복 불가
- **FOREIGN KEY**: TimerSteps.scheduleId는 TimerSchedules.id 참조
- **CASCADE DELETE**: 상위 테이블 삭제 시 하위 테이블 자동 삭제

### 7.2 트랜잭션
```dart
return transaction(() async {
  final scheduleId = await into(timerSchedules).insert(schedule);
  for (final step in steps) {
    await into(timerSteps).insert(
      step.copyWith(scheduleId: Value(scheduleId))
    );
  }
  return scheduleId;
});
```

### 7.3 데이터 검증
- **앱 레벨**: TextField의 InputFormatter
- **데이터베이스 레벨**: Drift의 타입 검증
- **비즈니스 로직**: 계산 전 NULL 체크

---

## 8. 백업 및 복구

### 8.1 현재 백업 방식
- **자동 백업**: 없음
- **수동 백업**: SQLite 파일 복사
  - 위치: `{App Documents}/db.sqlite`
  - 방법: 파일 탐색기로 복사

### 8.2 향후 백업 전략
```dart
// 레시피 내보내기 (JSON)
Future<String> exportRecipes() async {
  final recipes = await select(recipes).get();
  return jsonEncode(recipes.map((r) => r.toJson()).toList());
}

// 레시피 가져오기 (JSON)
Future<void> importRecipes(String json) async {
  final List<dynamic> data = jsonDecode(json);
  await batch((batch) {
    for (var item in data) {
      batch.insert(recipes, Recipe.fromJson(item));
    }
  });
}
```

---

## 9. 성능 최적화

### 9.1 쿼리 최적화
- **Drift 컴파일 타임 검증**: 잘못된 쿼리 사전 방지
- **Prepared Statements**: SQL Injection 방지 + 성능 향상
- **Batch Insert**: 대량 데이터 삽입 시 사용

### 9.2 N+1 문제 해결
```dart
// 조인 사용
Stream<List<ScheduleWithSteps>> watchAllSchedulesWithSteps() {
  final query = select(timerSchedules).join([
    innerJoin(timerSteps, timerSteps.scheduleId.equalsExp(timerSchedules.id))
  ]);
  return query.watch().map(...);
}
```

### 9.3 메모리 최적화
- **Stream 사용**: 전체 데이터를 메모리에 로드하지 않음
- **Lazy Loading**: 필요할 때만 데이터 로드
- **Pagination**: 향후 레시피가 많아지면 페이징 구현

---

## 10. 보안 고려사항

### 10.1 현재 보안 수준
- **평문 비밀번호**: 🔴 취약
- **암호화되지 않은 DB**: 🟡 중간 (개인 정보 최소)
- **SQL Injection**: 🟢 안전 (Drift ORM 사용)

### 10.2 향후 보안 강화
```dart
// 비밀번호 해싱
import 'package:crypto/crypto.dart';

String hashPassword(String password) {
  final bytes = utf8.encode(password);
  final hash = sha256.convert(bytes);
  return hash.toString();
}

// 데이터베이스 암호화 (SQLCipher)
LazyDatabase _openConnection() {
  return LazyDatabase(() async {
    final dbFolder = await getApplicationDocumentsDirectory();
    final file = File(p.join(dbFolder.path, 'db.sqlite'));

    // SQLCipher 설정
    final password = await getEncryptionKey();
    sqlite3.open(file.path, key: password);

    return NativeDatabase(file);
  });
}
```

---

## 11. 데이터 샘플

### 11.1 사워도우 레시피
```sql
INSERT INTO Recipes VALUES (
  1,                          -- id
  '내 사워도우 v1',           -- name
  'unified',                  -- calculationType
  500.0,                      -- totalStarter
  1.0,                        -- starterRatio
  4.0,                        -- flourRatio
  4.0,                        -- waterRatio
  '8-10시간',                 -- timeframe
  56,                         -- resultStarter
  222,                        -- resultFlour
  222,                        -- resultWater
  NULL,                       -- resultLevain
  25.0,                       -- temperature
  NULL,                       -- flourDetails
  NULL,                       -- extraIngredients
  '[{"name":"오토리즈","duration":60}]', -- timerSteps
  '2025-12-29 10:00:00'       -- createdAt
);
```

### 11.2 도우 레시피 (밀가루 상세 + 추가 재료)
```sql
INSERT INTO Recipes VALUES (
  2,
  '피자 도우',
  'dough',
  800.0,                      -- totalStarter (총 도우 무게)
  100.0,                      -- starterRatio (밀가루 100%)
  65.0,                       -- flourRatio (물 65%)
  2.0,                        -- waterRatio (소금 2%)
  NULL,                       -- timeframe
  480,                        -- resultStarter (밀가루)
  312,                        -- resultFlour (물)
  10,                         -- resultWater (소금)
  0,                          -- resultLevain
  0.0,                        -- temperature
  '[{"name":"강력분","amount":336},{"name":"통밀","amount":144}]',
  '[{"name":"올리브유","percent":3.0,"amount":14}]',
  '[{"name":"오토리즈","duration":30},{"name":"1차 발효","duration":60}]',
  '2025-12-29 11:00:00'
);
```

---

## 12. 데이터베이스 통계

### 12.1 예상 데이터 크기
| 테이블 | 레코드당 크기 | 1000개 기준 | 비고 |
|--------|---------------|-------------|------|
| Users | ~100 bytes | 100 KB | 이메일, 비밀번호 |
| Recipes | ~500 bytes | 500 KB | JSON 필드 포함 |
| TimerSchedules | ~80 bytes | 80 KB | 거의 사용 안 함 |
| TimerSteps | ~100 bytes | 100 KB | 거의 사용 안 함 |
| **총계** | - | **~780 KB** | 1000개 레시피 기준 |

### 12.2 성장 예측
- **일반 사용자**: 10-20개 레시피 (~10 KB)
- **파워 유저**: 100-200개 레시피 (~100 KB)
- **최대 용량**: 10,000개 레시피 (~5 MB)

---

## 13. 문제 해결 가이드

### 13.1 마이그레이션 실패
**증상**: 앱 실행 시 크래시
**원인**: 스키마 버전 불일치
**해결**:
1. 앱 삭제 및 재설치
2. 또는 데이터베이스 파일 삭제

### 13.2 데이터 손실
**증상**: 저장한 레시피가 사라짐
**원인**: 앱 삭제 또는 데이터 초기화
**해결**:
- 현재: 복구 불가
- 향후: 클라우드 백업 구현

### 13.3 느린 쿼리
**증상**: 레시피 목록 로딩이 느림
**원인**: 레시피 개수 과다
**해결**:
- 인덱스 추가
- 페이징 구현
- 오래된 레시피 아카이빙

---

## 14. 향후 스키마 변경 계획

### v9 (계획 중)
- [ ] Users 테이블에 `profileImage` (TEXT) 추가
- [ ] Recipes 테이블에 `isFavorite` (BOOLEAN) 추가
- [ ] Recipes 테이블에 `tags` (TEXT, JSON) 추가

### v10 (계획 중)
- [ ] RecipeHistory 테이블 추가 (레시피 수정 이력)
- [ ] TimerHistory 테이블 추가 (완료된 타이머 기록)

### v11 (계획 중)
- [ ] SharedRecipes 테이블 추가 (공유 레시피)
- [ ] Comments 테이블 추가 (레시피 댓글)

---

## 15. 참고 자료
- [Drift Documentation](https://drift.simonbinder.eu/)
- [SQLite Documentation](https://www.sqlite.org/docs.html)
- [SQLite Data Types](https://www.sqlite.org/datatype3.html)
- [Drift Migrations](https://drift.simonbinder.eu/docs/advanced-features/migrations/)
