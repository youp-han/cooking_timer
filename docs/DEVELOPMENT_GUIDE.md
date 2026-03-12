# 개발 가이드라인

이 문서는 리팩토링된 코드 품질을 유지하면서 개발을 진행하기 위한 가이드입니다.

## 📁 프로젝트 구조

```
lib/
├── constants/          # 상수 (문자열, 크기, 색상)
├── models/            # 데이터 모델
├── repositories/      # 데이터 접근 레이어
├── services/          # 비즈니스 로직
├── utils/             # 유틸리티 함수
├── widgets/           # 재사용 가능한 위젯
│   ├── common/       # 공통 위젯
│   ├── calculator/   # 계산기 관련 위젯
│   ├── cards/        # 카드 위젯
│   └── dialogs/      # 다이얼로그 위젯
└── screens/          # 화면
```

---

## ✅ 필수 규칙

### 1. 문자열은 항상 `AppStrings`에서 가져오기

**❌ 나쁜 예:**
```dart
Text('저장')
AlertDialog(title: const Text('레시피 이름'))
```

**✅ 좋은 예:**
```dart
Text(AppStrings.save)
AlertDialog(title: Text(AppStrings.recipeName))
```

### 2. TextField는 `LabeledTextField` 또는 전용 위젯 사용

**❌ 나쁜 예:**
```dart
TextField(
  controller: controller,
  decoration: InputDecoration(labelText: '이름'),
  onTap: () {
    controller.selection = TextSelection(
      baseOffset: 0,
      extentOffset: controller.text.length,
    );
  },
)
```

**✅ 좋은 예:**
```dart
LabeledTextField(
  controller: controller,
  labelText: '이름',
  autoSelectOnTap: true, // 자동으로 전체 선택
)
```

### 3. InputFormatter는 `AppInputFormatters` 사용

**❌ 나쁜 예:**
```dart
TextField(
  inputFormatters: [
    FilteringTextInputFormatter.allow(RegExp(r'^\d*\.?\d*')),
  ],
)
```

**✅ 좋은 예:**
```dart
TextField(
  inputFormatters: AppInputFormatters.decimal,
)
```

### 4. 데이터베이스는 Repository를 통해서만 접근

**❌ 나쁜 예:**
```dart
final db = Provider.of<AppDatabase>(context, listen: false);
await db.addRecipe(recipe);
```

**✅ 좋은 예:**
```dart
final repository = Provider.of<RecipeRepository>(context, listen: false);
await repository.add(recipe);
```

### 5. 계산 로직은 Service 클래스에 작성

**❌ 나쁜 예:**
```dart
// 화면 클래스 내부에 계산 로직
void _calculate() {
  final totalRatio = starterRatio + flourRatio + waterRatio;
  if (totalRatio == 0) return;
  setState(() {
    _result = {
      'starter': (totalStarter * starterRatio / totalRatio).round(),
      'flour': (totalStarter * flourRatio / totalRatio).round(),
      // ...
    };
  });
}
```

**✅ 좋은 예:**
```dart
// Service 클래스에 로직 분리
void _calculate() {
  setState(() {
    _result = BakerCalculatorService.calculate(
      totalStarter: totalStarter,
      starterRatio: starterRatio,
      flourRatio: flourRatio,
      waterRatio: waterRatio,
    );
  });
}
```

---

## 🎯 권장 패턴

### 빈 상태 표시

```dart
EmptyStateWidget(
  message: AppStrings.noRecipes,
  icon: Icons.receipt_long,
)
```

### 로딩 상태 표시

```dart
LoadingWidget()
```

### 키-값 행 표시

```dart
DetailRow(
  label: '총 도우 무게',
  value: '${_formatNumber(recipe.totalStarter)}g',
)
```

### 결과 카드 (저장/재설정 버튼 포함)

```dart
ResultCard(
  result: _result,
  onSave: () => _showSaveDialog(),
  onReset: _reset,
)
```

### 다이얼로그 버튼

```dart
DialogActions.cancelSave(
  onCancel: () => Navigator.pop(context),
  onSave: () => _saveData(),
)
```

---

## 🚫 절대 하지 말아야 할 것

### 1. `_isCalculating` 같은 플래그 사용 금지

**❌ 절대 금지:**
```dart
bool _isCalculating = false;

void _calculate() {
  if (_isCalculating) return;
  _isCalculating = true;
  // 계산 로직
  setState(() { /* ... */ });
  _isCalculating = false;
}
```

**이유:** 무한 루프를 방지하려는 안티패턴입니다. 대신 Service로 로직을 분리하세요.

### 2. 하드코딩된 한글 문자열

모든 문자열은 `AppStrings`에 정의하고 사용하세요.

### 3. UI 코드에 비즈니스 로직 작성

계산, 데이터 변환 등의 로직은 Service 클래스로 분리하세요.

### 4. AppDatabase 직접 접근

항상 Repository를 통해 접근하세요.

---

## 📦 새로운 기능 추가 시 체크리스트

### 새로운 화면 추가 시

- [ ] 문자열을 `AppStrings`에 추가했는가?
- [ ] TextField는 `LabeledTextField` 또는 전용 위젯을 사용하는가?
- [ ] 빈 상태는 `EmptyStateWidget`으로 처리하는가?
- [ ] 로딩 상태는 `LoadingWidget`으로 처리하는가?
- [ ] 데이터베이스 접근은 Repository를 사용하는가?

### 새로운 계산 기능 추가 시

- [ ] Service 클래스에 로직을 작성했는가?
- [ ] 계산 결과를 캡슐화하는 클래스를 만들었는가?
- [ ] 화면 코드는 Service를 호출만 하는가?

### 새로운 위젯 추가 시

- [ ] 재사용 가능한 위젯인가?
- [ ] `widgets/` 폴더의 적절한 하위 폴더에 위치하는가?
- [ ] `index.dart`에 export를 추가했는가?
- [ ] 위젯이 3곳 이상에서 사용될 예정인가?

---

## 🔧 유틸리티 사용 가이드

### 숫자 파싱

```dart
// ❌ 나쁜 예
final value = double.tryParse(controller.text) ?? 0;

// ✅ 좋은 예
final value = Validators.parseDouble(controller.text, defaultValue: 0);
```

### 숫자 포맷팅

```dart
// 정수 포맷팅 (1000 → "1,000")
Text(NumberFormatter.formatNumber(1000))

// 비율 포맷팅 (1:2:2)
Text(NumberFormatter.formatRatio(1, 2, 2))

// 시간 포맷팅 (90분 → "1시간 30분")
Text(NumberFormatter.formatDuration(90))
```

### TextField 자동 선택

```dart
TextField(
  controller: controller,
  onTap: () => TextFieldHelper.selectAllOnTap(controller),
)
```

---

## 🎨 스타일링 가이드

### 간격 (Spacing)

```dart
// ❌ 나쁜 예
const SizedBox(height: 16)
EdgeInsets.all(12)

// ✅ 좋은 예
SizedBox(height: AppDimensions.spacingMedium)
EdgeInsets.all(AppDimensions.paddingSmall)
```

### 색상

```dart
// AppColors에 정의된 의미 있는 색상 사용
// (현재는 비어있음, 필요시 추가하세요)
```

---

## 📝 커밋 메시지 가이드

```
feature: 새로운 기능 추가
fix: 버그 수정
refactor: 리팩토링
docs: 문서 수정
style: 코드 포맷팅
test: 테스트 추가
```

**예시:**
```
feature: 타이머 일시정지 기능 추가
fix: 도우 계산기 퍼센티지 계산 오류 수정
refactor: 알림 로직을 NotificationService로 분리
```

---

## 🧪 테스트 가이드 (향후)

Service 클래스는 순수 함수로 작성되어 있어 단위 테스트가 쉽습니다:

```dart
test('BakerCalculatorService 계산 테스트', () {
  final result = BakerCalculatorService.calculate(
    totalStarter: 100,
    starterRatio: 1,
    flourRatio: 2,
    waterRatio: 2,
  );

  expect(result['starter'], equals(20));
  expect(result['flour'], equals(40));
  expect(result['water'], equals(40));
});
```

---

## 🔄 코드 리뷰 체크리스트

코드를 커밋하기 전 자체 검토:

- [ ] 하드코딩된 문자열이 없는가?
- [ ] 중복된 코드가 3개 이상 있지 않은가?
- [ ] TextField 선택 로직이 중복되지 않았는가?
- [ ] 계산 로직이 화면 클래스에 있지 않은가?
- [ ] `_isCalculating` 같은 플래그를 사용하지 않았는가?
- [ ] 데이터베이스를 직접 접근하지 않았는가?
- [ ] `flutter analyze`를 실행했는가?

---

## 📚 참고 자료

### 주요 파일 위치

- **문자열 추가**: `lib/constants/app_strings.dart`
- **공통 위젯**: `lib/widgets/common/`
- **계산 로직**: `lib/services/`
- **데이터 접근**: `lib/repositories/`
- **모델 클래스**: `lib/models/`

### 자주 사용하는 위젯

| 위젯 | 사용처 | 파일 |
|------|--------|------|
| `LabeledTextField` | 자동 선택 TextField | `widgets/common/labeled_text_field.dart` |
| `EmptyStateWidget` | 빈 상태 화면 | `widgets/common/empty_state_widget.dart` |
| `LoadingWidget` | 로딩 화면 | `widgets/common/loading_widget.dart` |
| `DetailRow` | 키-값 행 | `widgets/cards/detail_row.dart` |
| `ResultCard` | 계산 결과 카드 | `widgets/cards/result_card.dart` |
| `DualInputField` | 퍼센트+그램 입력 | `widgets/calculator/dual_input_field.dart` |
| `RatioInputRow` | 비율 입력 (1:2:2) | `widgets/calculator/ratio_input_row.dart` |

---

## 🚀 빠르게 시작하기

1. **새로운 화면 추가**
   - `lib/screens/` 에 파일 생성
   - Repository를 통해 데이터 접근
   - `AppStrings`로 모든 문자열 관리

2. **새로운 계산 기능 추가**
   - `lib/services/` 에 Service 클래스 생성
   - 순수 함수로 작성 (상태 없음)
   - 결과는 클래스로 캡슐화

3. **새로운 위젯 추가**
   - `lib/widgets/` 의 적절한 폴더에 생성
   - `index.dart`에 export 추가
   - 재사용 가능하게 설계

4. **문자열 추가**
   - `lib/constants/app_strings.dart`에 추가
   - 의미 있는 변수명 사용
   - 파라미터가 필요하면 template 사용

---

**질문이나 문의사항이 있으면 이 가이드를 참고하세요!** 🎯
