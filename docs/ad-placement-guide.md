# 광고 배치 가이드

베이킹 타이머 앱의 광고 배치 현황 및 설정 가이드입니다.

## 📋 목차

1. [광고 전략 방향](#광고-전략-방향)
2. [화면별 배너 배치 현황](#화면별-배너-배치-현황)
3. [릴리즈 설정](#릴리즈-설정)
4. [주의사항](#주의사항)

---

## 광고 전략 방향

### 채택: 배너 광고만 사용
- 전면 광고, 네이티브 광고, 보상형 광고는 **미적용**
- 사용자 경험을 해치지 않으면서 모든 화면에 배너 1개씩 배치
- 각 화면별 개별 배너 → 화면 전환마다 새 광고 로드 → 단일 공통 배너보다 수익 높음

### 미채택 광고 유형
| 유형 | 미채택 이유 |
|------|-----------|
| 전면 광고 | 사용자 이탈 위험, UX 저하 |
| 네이티브 광고 | 구현 복잡도 대비 효과 미비 |
| 보상형 광고 | 제공할 보상 콘텐츠 없음 |

---

## 화면별 배너 배치 현황

### ✅ 구현 완료

| 화면 | 파일 | 배너 위치 |
|------|------|---------|
| 시작 화면 | `login_screen.dart` | 버전 정보 위 (하단 고정) |
| 베이커스 계산기 | `calculator_screen.dart` | 비율 입력 ↔ 결과 박스 사이 |
| 도우 계산기 | `dough_calculator_screen.dart` | 추가재료 섹션 아래 |
| 내 레시피 목록 | `my_recipes_screen.dart` | 리스트 하단 (빈 화면도 표시) |
| 레시피 상세 | `recipe_detail_screen.dart` | 타이머 시작 버튼 위 |
| 타이머 설정 | `timer_setup_screen.dart` | 단계 목록 ↔ 하단 버튼 사이 |
| 진행중인 타이머 | `timer_screen.dart` | 화면 하단 (3가지 상태 모두) |
| 가이드 | `guide_screen.dart` | 콘텐츠 하단 |
| 설정 | `settings_screen.dart` | Special Thanks 카드 아래 |

> `calculator_tab_screen.dart`는 탭 컨테이너 역할만 하므로 배너 없음.
> 각 계산기 화면에서 개별 처리.

---

## 릴리즈 설정

### 1. 광고 단위 ID 교체

`lib/widgets/common/banner_ad_widget.dart`의 테스트 ID를 실제 AdMob ID로 교체합니다.

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

**현재 테스트 ID (개발용)**
- Android: `ca-app-pub-3940256099942544/6300978111`
- iOS: `ca-app-pub-3940256099942544/2934735716`

### 2. AndroidManifest.xml 앱 ID 교체

`android/app/src/main/AndroidManifest.xml`에서 앱 ID를 교체합니다.

```xml
<meta-data
    android:name="com.google.android.gms.ads.APPLICATION_ID"
    android:value="ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX" />
```

**현재 테스트 앱 ID (개발용)**: `ca-app-pub-3940256099942544~3347511713`

### 3. iOS Info.plist 설정 (iOS 배포 시)

`ios/Runner/Info.plist`에 추가합니다.

```xml
<key>GADApplicationIdentifier</key>
<string>ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX</string>
```

---

## 주의사항

### 광고 로딩 실패 처리
광고가 로드되지 않으면 `SizedBox.shrink()`로 자동 처리되어 빈 공간이 생기지 않습니다.
별도 처리 불필요합니다.

### 광고 정책 준수
- 실제 기기에서는 반드시 테스트 ID 사용 (정책 위반 시 계정 정지)
- 광고 클릭 유도 문구 금지
- 개인정보 보호 정책 명시 필요 (Play Store / App Store 등록 시)

### 향후 고려사항
- AdMob Mediation 설정으로 수익 최적화 가능
- Firebase Analytics 연동으로 광고 성과 추적 가능

---

**문서 버전**: 2.0
**최종 수정일**: 2026-03-12
**작성자**: Claude Code
