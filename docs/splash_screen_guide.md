# Flutter 스플래시 화면 구현 가이드

RentHouse 앱의 스플래시 화면 구조를 분석하여, 다른 Flutter 프로젝트에서도 동일하게 사용할 수 있도록 정리한 가이드입니다.

---

## 전체 구조 개요

스플래시 화면은 두 단계로 구성됩니다.

```
앱 실행
  │
  ├─ [단계 1] 네이티브 스플래시 (flutter_native_splash)
  │     - 앱이 Flutter 엔진 로딩을 완료하기 전에 OS가 보여주는 화면
  │     - 이미지와 배경색만 설정 가능 (정적 화면)
  │     - Flutter 코드가 준비되면 수동으로 제거
  │
  └─ [단계 2] Flutter 스플래시 화면 (SplashScreen 위젯)
        - Flutter로 만든 애니메이션 화면
        - 로고 페이드인 + 스케일 + 외부 원 회전 애니메이션
        - 3초 후 자동으로 다음 화면(로그인 or 대시보드)으로 이동
```

---

## 필요한 패키지

`pubspec.yaml`에 추가:

```yaml
dependencies:
  flutter_native_splash: ^2.4.0   # 네이티브 스플래시
  package_info_plus: ^8.0.2       # 앱 버전 정보 (선택사항)
  go_router: ^14.0.0              # 화면 이동 (라우터)
  flutter_riverpod: ^2.0.0        # 상태관리 (선택사항)
```

---

## 단계 1 — 네이티브 스플래시 설정

### 1-1. 로고 이미지 준비

`assets/splash_logo.png` 경로에 로고 이미지를 배치합니다.
- 권장 크기: 300x300px 이상 (투명 배경 PNG)
- Android 12+에서는 아이콘 중심부 108x108dp 범위만 보이는 점에 유의

### 1-2. 설정 파일 생성

프로젝트 루트에 `flutter_native_splash.yaml` 생성:

```yaml
flutter_native_splash:
  # 배경색
  color: "#FFFFFF"

  # 중앙 이미지
  image: assets/splash_logo.png

  # 다크모드
  color_dark: "#FFFFFF"
  image_dark: assets/splash_logo.png

  # 플랫폼별 활성화
  android: true
  ios: true
  web: true

  # Android 12+ (Splash Screen API)
  android_12:
    color: "#FFFFFF"
    image: assets/splash_logo.png
    icon_background_color: "#FFFFFF"

  # 웹 설정
  web_image_mode: center

  # 상태바 숨김 여부
  fullscreen: false

  # iOS Info.plist 자동 업데이트
  info_plist_files:
    - 'ios/Runner/Info.plist'
```

### 1-3. 네이티브 스플래시 생성 명령 실행

```bash
flutter pub run flutter_native_splash:create
```

> 로고나 색상을 변경할 때마다 이 명령을 다시 실행해야 합니다.

---

## 단계 2 — Flutter 애니메이션 스플래시 화면

### 2-1. SplashScreen 위젯 구현

`lib/features/splash/presentation/splash_screen.dart`:

```dart
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter_native_splash/flutter_native_splash.dart';
import 'package:go_router/go_router.dart';
import 'package:package_info_plus/package_info_plus.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen>
    with TickerProviderStateMixin {
  // 애니메이션 컨트롤러 2개:
  // - _logoController: 로고 페이드인 + 스케일 (1초)
  // - _rotationController: 외부 원 회전 (3초)
  late AnimationController _logoController;
  late AnimationController _rotationController;
  late Animation<double> _logoFadeIn;
  late Animation<double> _logoScale;
  late Animation<double> _rotationValue;

  PackageInfo? _packageInfo;

  static const Duration _splashDuration = Duration(seconds: 3);

  @override
  void initState() {
    super.initState();
    _loadPackageInfo();
    _initializeAnimations();
    _startSplashSequence();
  }

  Future<void> _loadPackageInfo() async {
    try {
      _packageInfo = await PackageInfo.fromPlatform();
      if (mounted) setState(() {});
    } catch (_) {}
  }

  void _initializeAnimations() {
    // 로고: 1초 동안 페이드인 + 탄성 스케일
    _logoController = AnimationController(
      duration: const Duration(milliseconds: 1000),
      vsync: this,
    );
    _logoFadeIn = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _logoController, curve: Curves.easeOut),
    );
    _logoScale = Tween<double>(begin: 0.5, end: 1.0).animate(
      CurvedAnimation(parent: _logoController, curve: Curves.elasticOut),
    );

    // 외부 원: 3초 동안 한 바퀴 회전
    _rotationController = AnimationController(
      duration: _splashDuration,
      vsync: this,
    );
    _rotationValue = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _rotationController, curve: Curves.easeInOut),
    );
  }

  void _startSplashSequence() async {
    // 즉시 로고 애니메이션 시작
    _logoController.forward();

    // 0.5초 후 회전 애니메이션 시작
    Future.delayed(const Duration(milliseconds: 500), () {
      if (mounted) _rotationController.forward();
    });

    // 2초 후 네이티브 스플래시 제거
    // (Flutter 화면이 이미 그려진 상태이므로 안전하게 제거 가능)
    Future.delayed(const Duration(seconds: 2), () {
      FlutterNativeSplash.remove();
    });

    // 3초 대기 후 다음 화면으로 이동
    await Future.delayed(_splashDuration);

    if (mounted) {
      _navigateToNextScreen();
    }
  }

  void _navigateToNextScreen() {
    // 로그인 상태에 따라 분기
    // 예: context.go('/home') 또는 context.go('/login')
    context.go('/login');
  }

  @override
  void dispose() {
    _logoController.dispose();
    _rotationController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      backgroundColor: theme.colorScheme.primary,
      body: Center(
        child: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.all(24.0),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                // 앱 이름 (페이드인)
                AnimatedBuilder(
                  animation: _logoController,
                  builder: (context, child) {
                    return Opacity(
                      opacity: _logoFadeIn.value,
                      child: Text(
                        _packageInfo?.appName ?? 'MyApp',
                        style: theme.textTheme.headlineLarge?.copyWith(
                          color: theme.colorScheme.onPrimary,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    );
                  },
                ),

                const SizedBox(height: 40),

                // 로고 + 회전 원 (스케일 + 페이드인 + 회전)
                AnimatedBuilder(
                  animation: Listenable.merge([_logoController, _rotationController]),
                  builder: (context, child) {
                    return Transform.scale(
                      scale: _logoScale.value,
                      child: Opacity(
                        opacity: _logoFadeIn.value,
                        child: _buildRotatingLogo(theme),
                      ),
                    );
                  },
                ),

                const SizedBox(height: 60),

                // 버전 정보 (페이드인, 70% 불투명도)
                AnimatedBuilder(
                  animation: _logoController,
                  builder: (context, child) {
                    return Opacity(
                      opacity: _logoFadeIn.value * 0.7,
                      child: Text(
                        '버전 ${_packageInfo?.version ?? '1.0.0'}',
                        style: theme.textTheme.bodyMedium?.copyWith(
                          color: theme.colorScheme.onPrimary.withValues(alpha: 0.7),
                        ),
                      ),
                    );
                  },
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  /// 중앙 아이콘 + 회전하는 외부 원
  Widget _buildRotatingLogo(ThemeData theme) {
    return Stack(
      alignment: Alignment.center,
      children: [
        // 회전하는 외부 원 (점 하나 포함)
        Transform.rotate(
          angle: _rotationValue.value * 2 * 3.14159,
          child: Container(
            width: 140,
            height: 140,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              border: Border.all(
                color: theme.colorScheme.onPrimary.withValues(alpha: 0.3),
                width: 2,
              ),
            ),
            child: Stack(
              children: [
                Positioned(
                  top: 10,
                  left: 140 / 2 - 4,
                  child: Container(
                    width: 8,
                    height: 8,
                    decoration: BoxDecoration(
                      color: theme.colorScheme.onPrimary,
                      shape: BoxShape.circle,
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),

        // 중앙 아이콘 (흰 원 + 아이콘)
        Container(
          width: 100,
          height: 100,
          decoration: BoxDecoration(
            color: theme.colorScheme.surface,
            shape: BoxShape.circle,
            boxShadow: [
              BoxShadow(
                color: Colors.black.withValues(alpha: 0.1),
                blurRadius: 20,
                offset: const Offset(0, 10),
              ),
            ],
          ),
          child: Icon(
            Icons.home_work,         // ← 앱에 맞게 교체
            size: 50,
            color: theme.colorScheme.primary,
          ),
        ),
      ],
    );
  }
}
```

### 2-2. main.dart에서 네이티브 스플래시 보존

```dart
void main() async {
  // 반드시 가장 먼저 호출 — Flutter 준비 전까지 네이티브 스플래시 유지
  final widgetsBinding = WidgetsFlutterBinding.ensureInitialized();
  FlutterNativeSplash.preserve(widgetsBinding: widgetsBinding);

  // ... 기타 초기화 (Firebase, DB 등) ...

  runApp(const MyApp());
}
```

> `FlutterNativeSplash.remove()`는 SplashScreen 위젯 내부 (2초 후)에서 호출합니다.
> main.dart에서 호출하면 Flutter 스플래시 화면이 보이기 전에 제거되어 빈 화면이 잠깐 보일 수 있습니다.

### 2-3. 라우터에 스플래시 등록

```dart
final router = GoRouter(
  initialLocation: '/',     // 앱 시작 시 스플래시 화면부터
  routes: [
    GoRoute(path: '/', builder: (c, s) => const SplashScreen()),
    GoRoute(path: '/login', builder: (c, s) => const LoginScreen()),
    GoRoute(path: '/home', builder: (c, s) => const HomeScreen()),
  ],
);
```

---

## 타이밍 흐름 요약

```
t=0.0s  앱 실행 → 네이티브 스플래시 표시 (OS 담당)
t=0.0s  Flutter 엔진 로딩 완료 → SplashScreen 빌드 시작
t=0.0s  로고 페이드인 + 스케일 애니메이션 시작 (1초)
t=0.5s  외부 원 회전 애니메이션 시작 (3초)
t=2.0s  FlutterNativeSplash.remove() → 네이티브 스플래시 제거
t=3.0s  _navigateToNextScreen() → 로그인 또는 홈 화면으로 이동
```

---

## 새 프로젝트에 적용하는 순서

1. **패키지 추가** — `pubspec.yaml`에 `flutter_native_splash`, `package_info_plus` 추가
2. **로고 이미지 준비** — `assets/splash_logo.png` 배치 및 `pubspec.yaml` assets 등록
3. **flutter_native_splash.yaml 생성** — 위 예시 파일 복사 후 색상/이미지 경로 수정
4. **네이티브 스플래시 생성** — `flutter pub run flutter_native_splash:create` 실행
5. **SplashScreen 위젯 복사** — 아이콘, 앱 이름, `_navigateToNextScreen()` 로직 수정
6. **main.dart 수정** — `FlutterNativeSplash.preserve()` 추가
7. **라우터 등록** — `initialLocation: '/'`로 설정하고 GoRoute 추가

---

## 커스터마이징 포인트

| 항목 | 위치 | 방법 |
|------|------|------|
| 배경색 | `flutter_native_splash.yaml` + SplashScreen `backgroundColor` | 색상 코드 수정 |
| 중앙 아이콘 | `_buildRotatingLogo()` 내 `Icons.home_work` | 원하는 아이콘으로 교체 또는 `Image.asset()` 사용 |
| 스플래시 지속 시간 | `_splashDuration = Duration(seconds: 3)` | 값 변경 |
| 네이티브 스플래시 제거 시점 | `Future.delayed(const Duration(seconds: 2), ...)` | 2초 → 원하는 시간으로 변경 (반드시 _splashDuration 이전) |
| 회전 애니메이션 | `_rotationController` duration | 회전 속도 조절 |
| 다음 화면 이동 로직 | `_navigateToNextScreen()` | 로그인 상태 체크 로직 삽입 |

---

## 주의사항

- `flutter_native_splash:create`는 로고/색상을 변경할 때마다 재실행 필요
- 네이티브 스플래시 제거(`remove()`)는 반드시 Flutter 화면이 렌더링된 이후에 호출해야 빈 화면이 보이지 않음
- Android 12+는 별도의 `android_12` 설정이 필요 (아이콘이 원형으로 잘림)
- 웹(kIsWeb)에서는 스플래시 화면을 건너뛰고 바로 홈으로 이동하는 것을 권장 (네이티브 스플래시 미지원)
