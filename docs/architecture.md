# 아키텍처 및 모듈 문서

## 1. 시스템 아키텍처

### 1.1 전체 구조
```
┌─────────────────────────────────────────┐
│          Flutter Application            │
├─────────────────────────────────────────┤
│  Presentation Layer (UI/Screens)        │
│  - LoginScreen                          │
│  - MainScreen (BottomNavigationBar)     │
│    ├─ MyRecipesScreen                   │
│    ├─ GuideScreen                       │
│    ├─ CalculatorTabScreen               │
│    │   ├─ CalculatorScreen (Sourdough)  │
│    │   └─ DoughCalculatorScreen         │
│    ├─ TimerScreen                       │
│    └─ SettingsScreen                    │
│  - RecipeDetailScreen                   │
│  - TimerSetupScreen                     │
├─────────────────────────────────────────┤
│  Business Logic Layer                   │
│  - Calculation Logic (inline)           │
│  - Timer State Management              │
│  - Recipe CRUD Operations               │
├─────────────────────────────────────────┤
│  Data Layer                             │
│  - AppDatabase (Drift ORM)              │
│    ├─ Users Table                       │
│    ├─ Recipes Table                     │
│    ├─ TimerSchedules Table              │
│    └─ TimerSteps Table                  │
│  - SQLite Database                      │
├─────────────────────────────────────────┤
│  Services Layer                         │
│  - BackgroundService                    │
│    ├─ Timer Management                  │
│    ├─ Notifications                     │
│    └─ State Broadcasting                │
└─────────────────────────────────────────┘
```

### 1.2 아키텍처 패턴
- **패턴**: Feature-based Structure (화면 중심)
- **상태 관리**: Provider + StatefulWidget
- **데이터베이스**: Repository Pattern (Drift)
- **의존성 주입**: Provider package

---

## 2. 프로젝트 구조

### 2.1 디렉토리 구조
```
cooking_timer_app/
├── lib/
│   ├── main.dart                      # 앱 진입점
│   ├── database/
│   │   ├── database.dart              # Drift 데이터베이스 정의
│   │   └── database.g.dart            # 생성된 코드
│   ├── screens/
│   │   ├── login_screen.dart          # 로그인 화면
│   │   ├── main_screen.dart           # 메인 네비게이션
│   │   ├── my_recipes_screen.dart     # 레시피 목록
│   │   ├── recipe_detail_screen.dart  # 레시피 상세
│   │   ├── calculator_tab_screen.dart # 계산기 탭 컨테이너
│   │   ├── calculator_screen.dart     # 사워도우 계산기
│   │   ├── dough_calculator_screen.dart # 도우 계산기
│   │   ├── guide_screen.dart          # 가이드
│   │   ├── settings_screen.dart       # 설정
│   │   ├── timer_screen.dart          # 타이머 목록
│   │   └── timer_setup_screen.dart    # 타이머 설정
│   └── services/
│       └── background_service.dart    # 백그라운드 타이머 서비스
├── android/                           # Android 플랫폼 코드
├── ios/                               # iOS 플랫폼 코드 (예정)
├── windows/                           # Windows 플랫폼 코드
├── docs/                              # 프로젝트 문서
│   ├── functional-spec.md
│   ├── non-functional-spec.md
│   ├── architecture.md
│   └── database-schema.md
├── pubspec.yaml                       # 패키지 의존성
└── README.md                          # 프로젝트 README
```

### 2.2 파일 역할

#### Core Files
- **main.dart**: 앱 초기화, Provider 설정, 라우팅 설정
- **database.dart**: 데이터 모델, 테이블 정의, CRUD 메서드

#### Screens (UI Layer)
- **login_screen.dart**: 사용자 인증 UI
- **main_screen.dart**: BottomNavigationBar 기반 메인 화면
- **my_recipes_screen.dart**: 레시피 목록 표시, Stream 리스닝
- **recipe_detail_screen.dart**: 레시피 상세 정보, 타이머 시작 버튼
- **calculator_screen.dart**: 사워도우 계산 로직 + UI
- **dough_calculator_screen.dart**: 도우 계산 로직 + UI
- **timer_setup_screen.dart**: 타이머 단계 편집
- **timer_screen.dart**: 실행 중인 타이머 목록

#### Services
- **background_service.dart**: 백그라운드 타이머 실행, 알림 발송

---

## 3. 데이터 흐름

### 3.1 계산기 → 레시피 저장
```
User Input
    ↓
[Calculator Screen] - 실시간 계산
    ↓
StatefulWidget setState() - UI 업데이트
    ↓
"레시피로 저장" 버튼 클릭
    ↓
[Dialog] - 레시피 이름 입력
    ↓
RecipesCompanion 객체 생성
    ↓
AppDatabase.addRecipe() - Drift Insert
    ↓
SQLite Database
    ↓
[SnackBar] - 저장 완료 알림
```

### 3.2 레시피 → 타이머 시작
```
[MyRecipesScreen] - Stream<List<Recipe>>
    ↓
사용자가 레시피 선택
    ↓
[RecipeDetailScreen] - Recipe 객체 전달
    ↓
"이 레시피로 타이머 시작" 클릭
    ↓
[TimerSetupScreen] - Recipe 객체 받음
    ↓
Recipe.timerSteps 확인
    ├─ 있음 → JSON 파싱하여 로드
    └─ 없음 → calculationType 기반 템플릿 로드
         ├─ 'unified' → 사워도우 템플릿
         └─ 'dough' → 일반 도우 템플릿
    ↓
사용자가 단계 편집
    ↓
"타이머 시작" 클릭
    ↓
1. Recipe.timerSteps 업데이트 (DB 저장)
2. Background Service에 타이머 데이터 전송
3. MainScreen.switchToTab(3) 호출
    ↓
[TimerScreen] - 실시간 업데이트 수신
```

### 3.3 백그라운드 타이머
```
[Background Service] 시작
    ↓
매 1초마다 타이머 업데이트
    ↓
'update' 이벤트 브로드캐스트
    ├─ activeTimers 리스트
    ├─ timeRemaining
    ├─ currentStepIndex
    └─ progress
    ↓
[TimerScreen] - Stream 리스닝
    ↓
setState() - UI 갱신
    ↓
단계 완료 시
    ↓
[Notification] - 푸시 알림 발송
```

---

## 4. 주요 모듈 상세

### 4.1 Database Module (Drift ORM)

#### 4.1.1 테이블 구조
```dart
@DriftDatabase(tables: [Users, Recipes, TimerSchedules, TimerSteps])
class AppDatabase extends _$AppDatabase {
  // 마이그레이션 전략
  int get schemaVersion => 8;

  // CRUD 메서드
  Stream<List<Recipe>> watchAllRecipes();
  Future<Recipe> getRecipe(int id);
  Future<int> addRecipe(RecipesCompanion recipe);
  Future<bool> updateRecipe(RecipesCompanion recipe);
  Future<int> deleteRecipe(int id);
}
```

#### 4.1.2 마이그레이션 히스토리
- **v1-v4**: 초기 스키마
- **v5**: `resultLevain` 컬럼 추가
- **v6**: `flourDetails` (JSON) 컬럼 추가
- **v7**: `extraIngredients` (JSON) 컬럼 추가
- **v8**: `timerSteps` (JSON) 컬럼 추가

#### 4.1.3 JSON 필드
**flourDetails**:
```json
[
  {"name": "강력분", "amount": 200},
  {"name": "통밀", "amount": 50}
]
```

**extraIngredients**:
```json
[
  {"name": "올리브유", "percent": 5.0, "amount": 13}
]
```

**timerSteps**:
```json
[
  {"name": "오토리즈", "duration": 60},
  {"name": "1차 발효", "duration": 30}
]
```

### 4.2 Calculator Module

#### 4.2.1 베이커스 퍼센티지 계산
**공식**:
```
총 르방 = 스타터 + 밀가루 + 물
비율 = S:F:W (예: 1:2:2)
총 비율 = S + F + W = 1 + 2 + 2 = 5

스타터 = (총 르방 * S) / 총 비율
밀가루 = (총 르방 * F) / 총 비율
물 = (총 르방 * W) / 총 비율
```

**예시**:
```dart
총 르방 = 500g
비율 = 1:4:4 (총 9)

스타터 = 500 * 1 / 9 = 55.6g
밀가루 = 500 * 4 / 9 = 222.2g
물 = 500 * 4 / 9 = 222.2g
```

#### 4.2.2 도우 계산기 - 베이커스 퍼센티지
**공식**:
```
총 도우 무게 = 고정값
베이커스 퍼센티지:
  밀가루 = 100% (기준)
  물 = 70%
  소금 = 2%
  르방 = 20%
  (추가 재료 = 5%)

전체 비율 = 100 + 70 + 2 + 20 + 5 = 197%

밀가루 = (총 도우 * 100) / 197
물 = (총 도우 * 70) / 197
소금 = (총 도우 * 2) / 197
르방 = (총 도우 * 20) / 197
추가재료 = (총 도우 * 5) / 197
```

#### 4.2.3 양방향 계산 (% ↔ g)
**% 입력**:
```dart
void _calculate({bool updateGrams = true, String? skipField}) {
  // 1. % 값으로 g 계산
  final water = (totalDough * waterPercent / totalPercent).round();

  // 2. g 필드 업데이트 (skipField 제외)
  if (updateGrams && skipField != 'water') {
    _waterGramsCtrl.text = water.toString();
  }
}
```

**g 입력**:
```dart
void _calculatePercentFromGrams(String type, String gramsText) {
  // 1. 입력된 g 값으로 % 역계산
  final grams = double.tryParse(gramsText);
  final flour = _result['flour'] ?? 1;
  final percent = (grams / flour * 100);

  // 2. % 필드 업데이트
  _waterPercentCtrl.text = percent.toStringAsFixed(1);

  // 3. 전체 재계산 (현재 필드 제외)
  _calculate(updateGrams: true, skipField: type);
}
```

### 4.3 Timer Module

#### 4.3.1 타이머 구조
```dart
class _TimerStep {
  TextEditingController nameController;
  TextEditingController hoursController;  // 시간 입력
  TextEditingController minutesController; // 분 입력

  int getTotalMinutes() {
    return hours * 60 + minutes;
  }
}
```

#### 4.3.2 템플릿 선택 로직
```dart
void _loadDefaultTemplate() {
  if (recipe.calculationType == 'unified') {
    // 사워도우: 16시간 템플릿
    _steps.addAll([...]);
  } else if (recipe.calculationType == 'dough') {
    // 일반 도우: 4시간 템플릿
    _steps.addAll([...]);
  } else {
    // 기본 템플릿
    _steps.addAll([...]);
  }
}
```

#### 4.3.3 백그라운드 서비스
```dart
@pragma('vm:entry-point')
void onStart(ServiceInstance service) async {
  // 타이머 맵 관리
  Map<int, TimerData> activeTimers = {};

  // 매 1초마다 업데이트
  Timer.periodic(Duration(seconds: 1), (timer) {
    for (var timerData in activeTimers.values) {
      timerData.tick();

      if (timerData.isStepComplete()) {
        showNotification(timerData.currentStep);
        timerData.nextStep();
      }
    }

    // UI 업데이트 전송
    service.invoke('update', {
      'activeTimers': activeTimers.toList()
    });
  });
}
```

### 4.4 Navigation Module

#### 4.4.1 메인 네비게이션
```dart
class MainScreen extends StatefulWidget {
  static final GlobalKey<_MainScreenState> globalKey;

  void switchToTab(int index) {
    setState(() => _selectedIndex = index);
  }
}
```

**탭 구조**:
- 0: MyRecipesScreen
- 1: GuideScreen
- 2: CalculatorTabScreen
- 3: TimerScreen
- 4: SettingsScreen

#### 4.4.2 타이머 탭 자동 전환
```dart
// TimerSetupScreen에서 타이머 시작 시
MainScreen.globalKey.currentState?.switchToTab(3);
```

---

## 5. 의존성 그래프

### 5.1 패키지 의존성
```yaml
dependencies:
  flutter:
    sdk: flutter

  # 상태 관리
  provider: ^6.1.2

  # 데이터베이스
  drift: ^2.16.0
  sqlite3_flutter_libs: ^0.5.0
  path_provider: ^2.1.3
  path: ^1.9.0

  # 백그라운드 서비스
  flutter_background_service: ^5.0.10
  flutter_local_notifications: ^17.2.3

dev_dependencies:
  # 코드 생성
  build_runner: ^2.4.11
  drift_dev: ^2.16.0
```

### 5.2 모듈 간 의존성
```
main.dart
  ├─> AppDatabase (Provider)
  ├─> LoginScreen
  └─> background_service

MainScreen
  ├─> MyRecipesScreen
  │     └─> AppDatabase (watch)
  │     └─> RecipeDetailScreen
  │           └─> TimerSetupScreen
  │                 └─> AppDatabase (update)
  │                 └─> BackgroundService (invoke)
  ├─> GuideScreen
  ├─> CalculatorTabScreen
  │     ├─> CalculatorScreen
  │     │     └─> AppDatabase (insert)
  │     └─> DoughCalculatorScreen
  │           └─> AppDatabase (insert)
  ├─> TimerScreen
  │     └─> BackgroundService (listen)
  └─> SettingsScreen
```

---

## 6. 상태 관리

### 6.1 Provider 사용
```dart
// main.dart
Provider<AppDatabase>(
  create: (context) => AppDatabase(),
  dispose: (context, db) => db.close(),
  child: const MyApp(),
)

// Screen에서 사용
final db = Provider.of<AppDatabase>(context, listen: false);
```

### 6.2 Stream 기반 실시간 업데이트
```dart
// MyRecipesScreen
StreamBuilder<List<Recipe>>(
  stream: db.watchAllRecipes(),
  builder: (context, snapshot) {
    if (!snapshot.hasData) return CircularProgressIndicator();
    final recipes = snapshot.data!;
    return ListView.builder(...);
  },
)
```

### 6.3 StatefulWidget 로컬 상태
- **계산기**: TextField 값, 계산 결과
- **타이머 설정**: 단계 목록
- **메인 화면**: 선택된 탭 인덱스

---

## 7. 에러 처리

### 7.1 입력 검증
```dart
// 숫자만 입력
FilteringTextInputFormatter.allow(RegExp(r'[0-9.]'))

// 정수만 입력
FilteringTextInputFormatter.digitsOnly
```

### 7.2 NULL 안전성
```dart
// Null 체크 및 기본값
final value = double.tryParse(controller.text) ?? 0;

// Nullable 필드
TextColumn get timerSteps => text().nullable()();
```

### 7.3 데이터베이스 트랜잭션
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

---

## 8. 성능 최적화

### 8.1 데이터베이스
- **인덱스**: Primary Key 자동 인덱싱
- **쿼리 최적화**: Drift의 컴파일 타임 검증
- **트랜잭션**: 여러 작업을 하나로 묶음

### 8.2 UI
- **ListView.builder**: 가변 길이 리스트
- **setState 최소화**: 필요한 부분만 갱신
- **const 위젯**: 불변 위젯 최적화

### 8.3 백그라운드 서비스
- **Isolate**: 별도 스레드에서 실행
- **업데이트 주기**: 1초 (필요 시 조정 가능)

---

## 9. 보안 아키텍처

### 9.1 현재 보안 수준
- **비밀번호**: 평문 저장 (TODO: 해싱 필요)
- **데이터베이스**: 암호화 없음
- **통신**: 로컬만 사용 (네트워크 없음)

### 9.2 향후 보안 강화
```
┌─────────────────────────────────┐
│  Client (Flutter App)            │
├─────────────────────────────────┤
│  Authentication Layer            │
│  - JWT Token                     │
│  - Biometric Login               │
├─────────────────────────────────┤
│  Encrypted Database              │
│  - SQLCipher                     │
├─────────────────────────────────┤
│  HTTPS Communication             │
│  - Certificate Pinning           │
└─────────────────────────────────┘
         ↓ HTTPS
┌─────────────────────────────────┐
│  Backend Server                  │
│  - Firebase / Custom API         │
│  - Cloud Firestore / PostgreSQL  │
└─────────────────────────────────┘
```

---

## 10. 테스트 전략 (향후)

### 10.1 단위 테스트
```dart
// test/database_test.dart
test('Recipe CRUD operations', () async {
  final db = AppDatabase(testConnection());

  // Insert
  final id = await db.addRecipe(testRecipe);
  expect(id, greaterThan(0));

  // Read
  final recipe = await db.getRecipe(id);
  expect(recipe.name, equals('Test Recipe'));

  // Delete
  await db.deleteRecipe(id);
});
```

### 10.2 위젯 테스트
```dart
// test/calculator_screen_test.dart
testWidgets('Calculator updates on input', (tester) async {
  await tester.pumpWidget(MyApp());

  // 입력
  await tester.enterText(find.byType(TextField).first, '500');
  await tester.pump();

  // 결과 확인
  expect(find.text('밀가루'), findsOneWidget);
});
```

### 10.3 통합 테스트
```dart
// integration_test/app_test.dart
testWidgets('Full recipe creation flow', (tester) async {
  // 1. 로그인
  // 2. 계산기 탭 이동
  // 3. 값 입력
  // 4. 저장
  // 5. 내 레시피에서 확인
});
```

---

## 11. 배포 아키텍처

### 11.1 현재 배포
```
Development
    ↓
  Build
    ↓
APK/AAB (Android)
    ↓
  Test
    ↓
Manual Distribution
```

### 11.2 향후 CI/CD
```
GitHub Repository
    ↓
GitHub Actions
    ├─ Lint & Format
    ├─ Run Tests
    ├─ Build APK/AAB
    └─ Build IPA (iOS)
    ↓
Google Play Console
App Store Connect
    ↓
Production Release
```

---

## 12. 확장 아키텍처 (향후)

### 12.1 마이크로서비스 분리
```
┌─────────────────────────┐
│  Mobile App (Flutter)    │
└────────┬────────────────┘
         │
    ┌────┴────┐
    │ API Gateway │
    └────┬────┘
         │
    ┌────┴────────────────────────┐
    │                             │
┌───┴───┐  ┌─────────┐  ┌────────┴────┐
│ Auth  │  │ Recipe  │  │   Timer     │
│Service│  │ Service │  │   Service   │
└───┬───┘  └────┬────┘  └──────┬──────┘
    │           │               │
    └───────────┴───────────────┘
                │
         ┌──────┴──────┐
         │  PostgreSQL  │
         └─────────────┘
```

### 12.2 클라우드 아키텍처
```
┌─────────────────────────────────┐
│  Flutter App                     │
│  - Offline First                 │
│  - Local SQLite Cache            │
└────────┬────────────────────────┘
         │
         ↓ Sync when online
┌─────────────────────────────────┐
│  Firebase                        │
│  - Authentication                │
│  - Cloud Firestore               │
│  - Cloud Functions               │
│  - Cloud Storage                 │
└─────────────────────────────────┘
```

---

## 13. 모듈별 개선 계획

### 13.1 Database Module
- [ ] Repository Pattern 도입
- [ ] DAO 분리
- [ ] 캐싱 레이어 추가
- [ ] 데이터베이스 암호화

### 13.2 Calculator Module
- [ ] 비즈니스 로직 분리 (BLoC/Cubit)
- [ ] 계산 유틸리티 클래스
- [ ] 단위 테스트 작성

### 13.3 Timer Module
- [ ] 타이머 로직 분리
- [ ] 상태 관리 개선 (BLoC)
- [ ] 타이머 일시정지/재개
- [ ] 여러 타이머 우선순위

### 13.4 UI Module
- [ ] 컴포넌트 라이브러리
- [ ] 테마 시스템 강화
- [ ] 다크 모드
- [ ] 애니메이션 추가

---

## 14. 기술 스택 요약

| 레이어 | 기술 | 버전 |
|--------|------|------|
| UI Framework | Flutter | 3.x |
| Language | Dart | 3.x |
| State Management | Provider | 6.1.2 |
| Database | Drift (SQLite) | 2.16.0 |
| Background | flutter_background_service | 5.0.10 |
| Notifications | flutter_local_notifications | 17.2.3 |
| Build Tool | build_runner | 2.4.11 |

---

## 15. 참고 문서
- [Drift Documentation](https://drift.simonbinder.eu/)
- [Flutter Architecture Samples](https://github.com/brianegan/flutter_architecture_samples)
- [Provider Package](https://pub.dev/packages/provider)
- [Background Service Plugin](https://pub.dev/packages/flutter_background_service)
