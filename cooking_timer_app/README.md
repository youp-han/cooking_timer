# 베이킹 타이머 (Baking Timer)

사워도우 빵 만들기를 위한 재료 계산 및 다단계 타이머 앱입니다.

## 주요 기능

### 베이커스 계산기
- 총 르방(스타터) 양 기준으로 스타터 / 밀가루 / 물 비율 자동 계산
- 준비 시간별 비율 프리셋 제공 (4-6시간 ~ 16-24시간)
- 온도 및 비율 직접 조정 가능

### 도우 계산기
- **총 도우 기준 모드**: 총 무게 입력 → 베이커스 % 또는 g 양방향 입력
- **재료 기준 모드**: 재료 무게 입력 → 총 도우 무게와 % 자동 계산
- 다종 밀가루 상세 입력 (강력분, 통밀, 호밀 등)
- 추가 재료 지원 (올리브유, 버터, 설탕 등)

### 내 레시피
- 계산 결과를 이름과 함께 저장
- 저장된 레시피에서 바로 타이머 시작 가능
- 스와이프로 개별 삭제 / 전체 삭제 지원

### 다단계 타이머
- 레시피 타입별 자동 템플릿 제공
  - 사워도우: 오토리즈 → 1차 발효 → 폴딩 × 3 → 성형 → 2차 발효 → 굽기 (총 약 16시간)
  - 일반 도우: 오토리즈 → 발효 → 폴딩 → 분할 → 벤치 → 성형 → 2차 발효 → 굽기 (총 약 4시간)
- 단계 추가 / 수정 / 삭제 가능
- 백그라운드 실행 및 단계별 푸시 알림

### 광고
- Google AdMob 배너 광고만 적용 (전면/네이티브/보상형 광고 없음)
- 각 화면별 개별 배너 배치 (화면당 1개)
- 광고 미로드 시 빈 공간 없이 자동 처리 (`SizedBox.shrink()`)
- 개발 중 테스트 광고 ID 사용, 릴리즈 시 실제 ID 교체 필요

## 기술 스택

| 분류 | 사용 기술 |
|------|---------|
| 프레임워크 | Flutter |
| 상태 관리 | Provider |
| 로컬 DB | Drift (SQLite) |
| 백그라운드 | flutter_background_service |
| 알림 | flutter_local_notifications |
| 광고 | google_mobile_ads |
| 기타 | shared_preferences, url_launcher, package_info_plus |

## 화면 구성

```
LoginScreen          - 시작 화면 [배너: 버전 정보 위]
MainScreen           - 탭 네비게이션
├── MyRecipesScreen      - 내 레시피 목록 [배너: 리스트 하단]
├── GuideScreen          - 사용 가이드 [배너: 콘텐츠 하단]
├── CalculatorTabScreen  - 계산기 탭 컨테이너
│   ├── CalculatorScreen     - 베이커스 계산기 [배너: 입력 ↔ 결과 사이]
│   └── DoughCalculatorScreen - 도우 계산기 [배너: 추가재료 섹션 아래]
├── TimerScreen          - 진행중인 타이머 [배너: 화면 하단]
└── SettingsScreen       - 설정 [배너: 리스트 하단]

RecipeDetailScreen   - 레시피 상세 [배너: 타이머 시작 버튼 위]
TimerSetupScreen     - 타이머 단계 설정 [배너: 단계 목록 ↔ 버튼 사이]
```

## 시작하기

### 1. 패키지 설치

```bash
flutter pub get
```

### 2. 광고 설정 (릴리즈 빌드 시)

`lib/widgets/common/banner_ad_widget.dart`에서 테스트 광고 ID를 실제 AdMob ID로 교체합니다.

```dart
static String get _adUnitId {
  if (Platform.isAndroid) {
    return 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX'; // 실제 Android 광고 단위 ID
  } else if (Platform.isIOS) {
    return 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX'; // 실제 iOS 광고 단위 ID
  }
  return '';
}
```

`AndroidManifest.xml`과 `Info.plist`에 AdMob 앱 ID도 등록해야 합니다.

### 3. 실행

```bash
flutter run
```

## 프로젝트 구조

```
lib/
├── main.dart
├── constants/         - 색상, 문자열, 치수 상수
├── database/          - Drift DB 스키마 및 생성 파일
├── models/            - 데이터 모델
├── repositories/      - 레시피 / 타이머 레포지토리
├── screens/           - 각 화면 위젯
├── services/          - 계산, 백그라운드, 알림 서비스
├── utils/             - 입력 포맷터, 유효성 검사 등
└── widgets/
    ├── calculator/    - 계산기 관련 위젯
    ├── cards/         - 카드 위젯
    ├── common/        - 공통 위젯 (BannerAdWidget 포함)
    └── dialogs/       - 다이얼로그 위젯
```

## 개발 정보

- **버전**: 0.0.8
- **개발사**: JJST Software
- **문의**: jjst.soft+dev@gmail.com
