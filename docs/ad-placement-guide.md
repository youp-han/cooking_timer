# 광고 배치 가이드

베이킹 타이머 앱의 각 화면별 광고 배치 권장 위치 및 전략입니다.

## 📋 목차

1. [광고 유형별 설명](#광고-유형별-설명)
2. [화면별 광고 배치 전략](#화면별-광고-배치-전략)
3. [구현 우선순위](#구현-우선순위)
4. [주의사항](#주의사항)

---

## 광고 유형별 설명

### 1. 배너 광고 (Banner Ad)
- 크기: 320x50 (일반), 320x100 (대형), 전체 너비 적응형
- 위치: 화면 상단 또는 하단 고정
- 특징: 항상 표시, 사용자 경험에 최소 영향
- 수익성: ⭐⭐ (낮음)

### 2. 전면 광고 (Interstitial Ad)
- 크기: 전체 화면
- 위치: 화면 전환 시점
- 특징: 일시적으로 전체 화면 차지, X 버튼으로 닫기 가능
- 수익성: ⭐⭐⭐⭐ (높음)
- 주의: 과도한 사용 시 사용자 이탈 위험

### 3. 네이티브 광고 (Native Ad)
- 크기: 가변 (콘텐츠에 맞춤)
- 위치: 리스트 항목 사이
- 특징: 앱 디자인과 자연스럽게 통합
- 수익성: ⭐⭐⭐ (중간)

### 4. 보상형 광고 (Rewarded Ad)
- 크기: 전체 화면 비디오
- 위치: 사용자가 선택적으로 시청
- 특징: 광고 시청 후 보상 제공
- 수익성: ⭐⭐⭐⭐⭐ (매우 높음)

---

## 화면별 광고 배치 전략

### 1. 시작 화면 (login_screen.dart)

#### 📍 권장 배치 위치

**A. 하단 배너 광고 (추천 ⭐⭐⭐)**
- **위치**: 버전 정보 바로 위 (현재 bottom: 16 위치)
- **크기**: 320x50 배너
- **이유**:
  - 일회성 화면이므로 배너 광고만으로 충분
  - 사용자가 처음 보는 화면에서 강한 인상 방지
  - "시작하기" 버튼을 가리지 않음

**구현 위치**:
```dart
// Stack의 children에 추가
Positioned(
  bottom: 56, // 버전 정보(16) + 광고(50) 위에 위치
  left: 0,
  right: 0,
  child: BannerAdWidget(), // 배너 광고 위젯
),
// 기존 버전 정보는 bottom: 16 유지
```

#### ❌ 권장하지 않음
- 전면 광고: 첫 화면에서 전면 광고는 사용자 이탈 유발
- 상단 배너: 타이틀과 아이콘을 가림

---

### 2. 메인 탭 화면 (main_screen.dart)

#### 📍 권장 배치 위치

**A. 하단 배너 광고 - 탭바 위 (추천 ⭐⭐⭐⭐)**
- **위치**: BottomNavigationBar 바로 위
- **크기**: 전체 너비 적응형 배너
- **이유**:
  - 모든 탭에서 공통으로 표시
  - 탭 전환 시에도 계속 표시되어 노출 빈도 높음
  - 콘텐츠와 탭바를 구분하는 역할도 함

**구현 위치**:
```dart
// Scaffold 구조 변경
Scaffold(
  body: Column(
    children: [
      Expanded(
        child: _pages[_selectedIndex],
      ),
      BannerAdWidget(), // 탭바 위에 배너 광고
    ],
  ),
  bottomNavigationBar: BottomNavigationBar(...),
)
```

#### ⚠️ 주의사항
- 광고 높이만큼 콘텐츠 영역이 줄어들므로 각 탭 화면의 레이아웃 조정 필요
- 광고가 로드되지 않을 경우 빈 공간 처리 필요

---

### 3. 계산기 탭 (calculator_tab_screen.dart)

#### 📍 권장 배치 위치

**현재 구조**: TabController로 베이커스/도우 계산기 전환

- 이 화면 자체에는 광고 배치 **불필요**
- 메인 탭 화면의 하단 배너가 이미 표시됨
- 각 계산기 화면(calculator_screen, dough_calculator_screen)에서 개별 배치

---

### 4. 베이커스 계산기 (calculator_screen.dart)

#### 📍 권장 배치 위치

**A. 중간 배너 광고 - 입력부와 결과부 사이 (추천 ⭐⭐⭐⭐⭐)**
- **위치**: 입력 필드들과 결과 표시 카드 사이
- **크기**: 320x50 또는 320x100 배너
- **이유**:
  - 자연스러운 섹션 구분
  - 사용자가 계산 결과를 확인하는 시점에 시선 집중
  - 스크롤 가능 영역이므로 광고가 콘텐츠를 가리지 않음

**구현 위치** (calculator_screen.dart 라인 150-200 근처):
```dart
SingleChildScrollView(
  child: Column(
    children: [
      // 입력 필드들...
      TextField(총 르방),
      TextField(온도),
      // ... 기타 입력 필드

      const SizedBox(height: 16),
      BannerAdWidget(), // 입력부와 결과부 사이에 배너 광고
      const SizedBox(height: 16),

      // 결과 표시 카드
      if (_result['starter'] > 0) _ResultBox(...),
    ],
  ),
)
```

**B. 전면 광고 - 레시피 저장 후 (추천 ⭐⭐⭐⭐)**
- **타이밍**: "저장" 버튼 클릭 → 레시피 저장 성공 → 전면 광고 표시
- **빈도**: 3-5회 저장마다 1회 표시 (너무 자주 표시 방지)
- **이유**:
  - 자연스러운 작업 완료 시점
  - 사용자가 다음 행동을 하기 전 짧은 휴지기

**구현 위치** (_saveRecipe 메서드 내):
```dart
Future<void> _saveRecipe() async {
  // ... 레시피 저장 로직

  // 저장 성공 후
  _saveCount++; // 저장 횟수 카운트
  if (_saveCount % 3 == 0) { // 3번마다 1번
    await _showInterstitialAd(); // 전면 광고 표시
  }

  ScaffoldMessenger.of(context).showSnackBar(...);
}
```

---

### 5. 도우 계산기 (dough_calculator_screen.dart)

#### 📍 권장 배치 위치

**A. 중간 배너 광고 - 밀가루 섹션과 추가재료 섹션 사이 (추천 ⭐⭐⭐⭐)**
- **위치**: _buildFlourResult()와 _buildExtraIngredients() 사이
- **크기**: 320x50 배너
- **이유**:
  - 두 섹션을 시각적으로 구분
  - 스크롤 중간 위치에서 자연스러운 노출
  - 밀가루 상세 입력 완료 후 시선이 머무는 위치

**구현 위치** (dough_calculator_screen.dart 라인 400-500 근처):
```dart
SingleChildScrollView(
  child: Column(
    children: [
      // 기본 입력 필드들...
      _buildFlourResult(), // 밀가루 섹션

      const SizedBox(height: 16),
      BannerAdWidget(), // 배너 광고
      const SizedBox(height: 16),

      _buildExtraIngredients(), // 추가 재료 섹션
      // ...
    ],
  ),
)
```

**B. 전면 광고 - 레시피 저장 후 (추천 ⭐⭐⭐⭐)**
- 베이커스 계산기와 동일한 전략
- 두 계산기의 저장 횟수를 **합산**하여 카운트 (공유 변수 사용)
- 어느 계산기에서든 3-5회 저장마다 1회 표시

---

### 6. 내 레시피 목록 (my_recipes_screen.dart)

#### 📍 권장 배치 위치

**A. 네이티브 광고 - 리스트 중간 (추천 ⭐⭐⭐⭐⭐)**
- **위치**: ListView의 3번째, 7번째, 11번째... 항목으로 삽입
- **크기**: ListTile과 유사한 높이
- **이유**:
  - 리스트 항목과 자연스럽게 섞여 높은 클릭률
  - 레시피가 많을수록 광고 노출 증가
  - 사용자가 스크롤하며 자연스럽게 시청

**구현 위치**:
```dart
ListView.builder(
  itemCount: recipes.length + (recipes.length ~/ 3), // 광고 포함 개수
  itemBuilder: (context, index) {
    // 3의 배수 위치마다 광고 삽입
    if (index % 4 == 3 && index > 0) {
      return NativeAdWidget(); // 네이티브 광고
    }

    // 실제 레시피 인덱스 계산
    final recipeIndex = index - (index ~/ 4);
    final recipe = recipes[recipeIndex];

    return Dismissible(...); // 기존 레시피 타일
  },
)
```

**B. 빈 상태 배너 광고 (추천 ⭐⭐⭐)**
- **위치**: "저장된 레시피가 없습니다" 메시지 아래
- **크기**: 320x100 중형 배너
- **이유**:
  - 신규 사용자에게 광고 노출
  - 빈 화면 활용

**구현 위치**:
```dart
body: recipes.isEmpty
  ? Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const Text('저장된 레시피가 없습니다...'),
          const SizedBox(height: 32),
          BannerAdWidget(size: AdSize.mediumRectangle), // 중형 배너
        ],
      ),
    )
  : ListView.builder(...)
```

---

### 7. 레시피 상세 화면 (recipe_detail_screen.dart)

#### 📍 권장 배치 위치

**A. 하단 배너 광고 - 버튼 위 (추천 ⭐⭐⭐⭐)**
- **위치**: "이 레시피로 타이머 시작" 버튼 바로 위
- **크기**: 전체 너비 적응형 배너
- **이유**:
  - 사용자가 버튼을 누르기 전 시선이 머무는 위치
  - 스크롤 끝 지점에서 자연스러운 노출
  - 버튼과 시각적으로 구분됨

**구현 위치** (화면 하단):
```dart
Column(
  children: [
    Expanded(
      child: SingleChildScrollView(
        child: Column(
          children: [
            // 레시피 정보 카드들...
          ],
        ),
      ),
    ),
    BannerAdWidget(), // 배너 광고
    Padding(
      padding: const EdgeInsets.all(16.0),
      child: ElevatedButton(...), // 타이머 시작 버튼
    ),
  ],
)
```

**B. 전면 광고 - 타이머 시작 버튼 클릭 후 (추천 ⭐⭐⭐)**
- **타이밍**: "이 레시피로 타이머 시작" 버튼 클릭 → 전면 광고 → 타이머 설정 화면으로 이동
- **빈도**: 타이머 시작 2-3회마다 1회
- **이유**:
  - 화면 전환 시점이므로 자연스러움
  - 타이머 기능 사용 빈도가 높지 않아 과도하지 않음

---

### 8. 타이머 설정 화면 (timer_setup_screen.dart)

#### 📍 권장 배치 위치

**A. 중간 배너 광고 - 단계 리스트와 버튼 사이 (추천 ⭐⭐⭐)**
- **위치**: 단계 목록(ListView)과 하단 버튼들 사이
- **크기**: 320x50 배너
- **이유**:
  - 단계 목록과 버튼을 시각적으로 구분
  - 사용자가 단계를 모두 확인한 후 시선이 가는 위치

**구현 위치**:
```dart
Column(
  children: [
    Expanded(
      child: ListView.builder(...), // 타이머 단계 목록
    ),
    BannerAdWidget(), // 배너 광고
    Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        children: [
          TextButton.icon(...), // 단계 추가 버튼
          ElevatedButton(...), // 타이머 시작 버튼
        ],
      ),
    ),
  ],
)
```

#### ❌ 권장하지 않음
- 전면 광고: 타이머 시작은 중요한 액션이므로 방해하지 않음

---

### 9. 타이머 화면 (timer_screen.dart)

#### 📍 권장 배치 위치

**A. 배너 광고 없음 (추천 ⭐⭐⭐⭐⭐)**
- **이유**:
  - 타이머 진행 중에는 광고로 방해하지 않는 것이 사용자 경험에 중요
  - 이 화면은 자주 확인하는 화면이므로 광고가 있으면 짜증 유발
  - 타이머 기능의 신뢰성과 유용성 유지

**대안 - 보상형 광고 제안 (선택사항 ⭐⭐⭐)**
- **위치**: 타이머 완료 후 "수고하셨습니다" 화면
- **내용**: "광고를 시청하면 프리미엄 타이머 템플릿 해금" 등의 보상 제공
- **특징**: 사용자가 **선택적으로** 시청 가능

---

### 10. 가이드 화면 (guide_screen.dart)

#### 📍 권장 배치 위치

**A. 하단 배너 광고 (추천 ⭐⭐)**
- **위치**: 화면 하단 고정
- **크기**: 320x50 배너
- **이유**:
  - 스크롤 가능한 긴 콘텐츠이므로 하단 고정이 적합
  - 가이드 읽기에 방해되지 않음
  - 메인 탭의 배너와 중복이므로 우선순위 낮음

**구현 위치**:
```dart
Scaffold(
  appBar: AppBar(...),
  body: Column(
    children: [
      Expanded(
        child: ListView(...), // 가이드 콘텐츠
      ),
      BannerAdWidget(), // 하단 배너
    ],
  ),
)
```

#### ❌ 권장하지 않음
- 중간 배너: 가이드 콘텐츠 흐름을 방해함
- 전면 광고: 정보 제공 화면에서는 부적절

---

### 11. 설정 화면 (settings_screen.dart)

#### 📍 권장 배치 위치

**A. 리스트 하단 배너 광고 (추천 ⭐⭐⭐)**
- **위치**: Special Thanks 섹션 아래
- **크기**: 320x50 배너
- **이유**:
  - 설정 항목들 아래 자연스러운 위치
  - 설정 화면은 자주 방문하지 않으므로 부담 없음

**구현 위치**:
```dart
ListView(
  padding: const EdgeInsets.all(16.0),
  children: [
    // 알림 설정 카드
    // 피드백/문의하기 카드
    // 앱 정보 카드
    // Special Thanks 카드

    const SizedBox(height: 16),
    BannerAdWidget(), // 하단 배너 광고
    const SizedBox(height: 16),
  ],
)
```

**B. 광고 제거 옵션 (선택사항 ⭐⭐⭐⭐)**
- **위치**: 설정 화면 상단에 "광고 제거" 버튼 추가
- **내용**: 인앱 결제로 광고 제거 (Premium 버전)
- **이유**:
  - 수익 다각화
  - 광고를 싫어하는 사용자에게 선택권 제공

---

## 구현 우선순위

### Phase 1: 필수 구현 (즉시 수익 발생)
1. **메인 탭 하단 배너** ⭐⭐⭐⭐⭐
   - 모든 화면에서 노출, 가장 높은 노출 빈도

2. **베이커스 계산기 중간 배너** ⭐⭐⭐⭐⭐
   - 핵심 기능 사용 중 노출

3. **도우 계산기 중간 배너** ⭐⭐⭐⭐⭐
   - 핵심 기능 사용 중 노출

**예상 수익**: 중간 (DAU 100명 기준 하루 $1-3)

### Phase 2: 수익 극대화 (중간)
4. **레시피 저장 후 전면 광고** ⭐⭐⭐⭐
   - 높은 eCPM, 자연스러운 타이밍

5. **레시피 목록 네이티브 광고** ⭐⭐⭐⭐
   - 자연스러운 통합, 높은 클릭률

6. **레시피 상세 하단 배너** ⭐⭐⭐⭐
   - 타이머 시작 전 노출

**예상 수익 증가**: +50% (하루 $1.5-4.5 추가)

### Phase 3: 추가 최적화 (선택)
7. **타이머 설정 화면 배너** ⭐⭐⭐

8. **시작 화면 하단 배너** ⭐⭐

9. **가이드/설정 화면 배너** ⭐⭐

**예상 수익 증가**: +20% (하루 $0.5-1 추가)

### Phase 4: 프리미엄 기능 (장기)
10. **광고 제거 인앱 결제** ⭐⭐⭐⭐
    - 가격: $2.99 (일회성) 또는 $0.99/월 (구독)
    - 예상 전환율: 3-5%

11. **보상형 광고** ⭐⭐⭐
    - 프리미엄 템플릿 해금
    - 추가 레시피 슬롯 해금

---

## 주의사항

### 1. 사용자 경험 우선
- ⚠️ **광고가 기능을 방해하지 않도록** 주의
- ⚠️ 계산 결과, 타이머 등 핵심 기능에서는 광고 최소화
- ⚠️ 전면 광고는 **과도하게 사용하지 않음** (저장 3-5회당 1회)

### 2. 광고 로딩 실패 처리
```dart
// 광고가 로드되지 않을 경우 빈 공간 처리
class BannerAdWidget extends StatefulWidget {
  @override
  _BannerAdWidgetState createState() => _BannerAdWidgetState();
}

class _BannerAdWidgetState extends State<BannerAdWidget> {
  bool _isAdLoaded = false;

  @override
  Widget build(BuildContext context) {
    if (!_isAdLoaded) {
      return SizedBox.shrink(); // 광고 없으면 공간 차지 안 함
    }
    return Container(
      height: 50,
      child: AdWidget(ad: _bannerAd),
    );
  }
}
```

### 3. 광고 네트워크 선택
- **Google AdMob**: 가장 안정적, 초보자 추천
- **Facebook Audience Network**: 높은 eCPM
- **Unity Ads**: 게임 앱에 적합
- **AdMob Mediation**: 여러 네트워크 통합으로 수익 최적화

### 4. 테스트 광고 ID 사용
```dart
// 개발 중에는 반드시 테스트 광고 ID 사용
const String testBannerAdUnitId = Platform.isAndroid
    ? 'ca-app-pub-3940256099942544/6300978111' // Android 테스트
    : 'ca-app-pub-3940256099942544/2934735716'; // iOS 테스트
```

### 5. 광고 정책 준수
- ✅ 앱이 Google Play/App Store 정책 준수
- ✅ 개인정보 보호 정책 명시
- ✅ GDPR, COPPA 준수 (EU 및 어린이 대상 앱)
- ✅ 광고 클릭 유도 금지 ("광고를 클릭하세요" 등)

### 6. 성과 측정
```dart
// Firebase Analytics로 광고 성과 추적
FirebaseAnalytics.instance.logEvent(
  name: 'ad_impression',
  parameters: {
    'ad_type': 'banner',
    'screen_name': 'calculator_screen',
  },
);
```

---

## 예상 수익 계산

### 가정
- **DAU (Daily Active Users)**: 100명
- **세션당 광고 노출**: 5회
- **배너 광고 eCPM**: $0.50
- **전면 광고 eCPM**: $5.00
- **네이티브 광고 eCPM**: $2.00

### Phase 1 (배너만)
- 일 노출 수: 100명 × 5회 = 500회
- 일 수익: 500 × $0.50 / 1000 = $0.25
- **월 수익: $7.50**

### Phase 2 (배너 + 전면 + 네이티브)
- 배너: $0.25/일
- 전면: 100명 × 1회 ÷ 4 × $5.00 / 1000 = $0.125/일
- 네이티브: 100명 × 2회 × $2.00 / 1000 = $0.40/일
- **일 수익: $0.775**
- **월 수익: $23.25**

### Phase 3 + 4 (모든 광고 + 인앱 결제)
- 광고 수익: $30/월
- 인앱 결제 (3% 전환): 100명 × 0.03 × $2.99 = $8.97/월
- **총 월 수익: $38.97**

**DAU 1,000명 기준: 약 $390/월**

---

## 구현 체크리스트

### 초기 설정
- [ ] Google AdMob 계정 생성
- [ ] 앱 등록 및 광고 단위 ID 발급
- [ ] pubspec.yaml에 google_mobile_ads 패키지 추가
- [ ] AndroidManifest.xml / Info.plist 설정
- [ ] 테스트 광고 ID로 개발/테스트

### Phase 1 구현
- [ ] 메인 탭 하단 배너 광고
- [ ] 베이커스 계산기 중간 배너
- [ ] 도우 계산기 중간 배너

### Phase 2 구현
- [ ] 레시피 저장 후 전면 광고 (빈도 제한)
- [ ] 레시피 목록 네이티브 광고
- [ ] 레시피 상세 하단 배너

### Phase 3 구현
- [ ] 타이머 설정 화면 배너
- [ ] 시작 화면 배너
- [ ] 가이드/설정 화면 배너

### Phase 4 구현
- [ ] 인앱 결제 구현 (광고 제거)
- [ ] 보상형 광고 (프리미엄 기능)

### 최적화
- [ ] AdMob Mediation 설정
- [ ] Firebase Analytics 연동
- [ ] A/B 테스트로 광고 위치 최적화
- [ ] 사용자 피드백 수집 및 개선

---

## 참고 자료

- [Google AdMob 시작하기](https://developers.google.com/admob)
- [Flutter google_mobile_ads 플러그인](https://pub.dev/packages/google_mobile_ads)
- [AdMob 정책 가이드라인](https://support.google.com/admob/answer/6128543)
- [Firebase Analytics](https://firebase.google.com/docs/analytics)

---

**문서 버전**: 1.0
**최종 수정일**: 2025-12-30
**작성자**: Claude Code
