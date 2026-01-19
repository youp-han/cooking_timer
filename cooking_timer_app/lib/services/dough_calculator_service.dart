/// 도우 계산 서비스
/// dough_calculator_screen.dart의 복잡한 베이커스 퍼센티지 로직을 추출
///
/// 목적: 도우 계산기의 비즈니스 로직과 UI를 분리하여
/// _isCalculating 플래그 안티패턴 제거 및 테스트 용이성 향상
class DoughCalculatorService {
  /// 총 도우 무게와 퍼센티지로부터 재료량 계산
  ///
  /// [totalDough]: 총 도우 무게 (g)
  /// [waterPercent]: 물 베이커스 퍼센티지 (밀가루 100% 기준)
  /// [saltPercent]: 소금 베이커스 퍼센티지
  /// [levainPercent]: 르방 베이커스 퍼센티지
  /// [extraPercents]: 추가 재료 퍼센티지 리스트
  ///
  /// Returns: DoughCalculationResult
  static DoughCalculationResult calculateFromDough({
    required double totalDough,
    required double waterPercent,
    required double saltPercent,
    required double levainPercent,
    List<double> extraPercents = const [],
  }) {
    // 입력값 검증
    if (totalDough <= 0) {
      return DoughCalculationResult(
        flour: 0,
        water: 0,
        salt: 0,
        levain: 0,
        extras: {},
        totalDough: 0,
      );
    }

    // 추가 재료 퍼센티지 합계
    double extraPercent = 0;
    for (var percent in extraPercents) {
      extraPercent += percent;
    }

    // Baker's Percentage 계산 (밀가루 100% + 기타 재료)
    final totalPercent = 100 + waterPercent + saltPercent + levainPercent + extraPercent;

    final flour = (totalDough * 100 / totalPercent).round();
    final water = (totalDough * waterPercent / totalPercent).round();
    final salt = (totalDough * saltPercent / totalPercent).round();
    final levain = (totalDough * levainPercent / totalPercent).round();

    // 추가 재료 계산
    final Map<String, int> extras = {};
    for (int i = 0; i < extraPercents.length; i++) {
      final grams = (totalDough * extraPercents[i] / totalPercent).round();
      extras['extra_$i'] = grams;
    }

    return DoughCalculationResult(
      flour: flour,
      water: water,
      salt: salt,
      levain: levain,
      extras: extras,
      totalDough: totalDough.round(),
    );
  }

  /// 그램 값으로부터 베이커스 퍼센티지 역계산
  ///
  /// [grams]: 재료의 그램 수
  /// [flourTotal]: 총 밀가루 양 (g)
  ///
  /// Returns: 베이커스 퍼센티지 (밀가루 100% 기준)
  static double calculatePercentFromGrams({
    required double grams,
    required int flourTotal,
  }) {
    if (flourTotal == 0) return 0.0;
    return (grams / flourTotal * 100);
  }

  /// 재료 무게로부터 총 도우 무게와 퍼센티지 계산
  ///
  /// [flourTotal]: 밀가루 총량 (g)
  /// [waterGrams]: 물 (g)
  /// [saltGrams]: 소금 (g)
  /// [levainGrams]: 르방 (g)
  /// [extraGrams]: 추가 재료 그램 리스트
  ///
  /// Returns: DoughCalculationResult (퍼센티지 포함)
  static DoughCalculationResult calculateFromIngredients({
    required int flourTotal,
    required double waterGrams,
    required double saltGrams,
    required double levainGrams,
    List<double> extraGrams = const [],
  }) {
    // 추가 재료 합계
    double extraGramsTotal = 0;
    final Map<String, int> extras = {};
    for (int i = 0; i < extraGrams.length; i++) {
      extras['extra_$i'] = extraGrams[i].round();
      extraGramsTotal += extraGrams[i];
    }

    // 총 도우 무게 = 모든 재료의 합
    final totalDough = flourTotal + waterGrams + saltGrams + levainGrams + extraGramsTotal;

    // 밀가루를 기준으로 % 계산
    double waterPercent = 0;
    double saltPercent = 0;
    double levainPercent = 0;

    if (flourTotal > 0) {
      waterPercent = (waterGrams / flourTotal * 100);
      saltPercent = (saltGrams / flourTotal * 100);
      levainPercent = (levainGrams / flourTotal * 100);
    }

    return DoughCalculationResult(
      flour: flourTotal,
      water: waterGrams.round(),
      salt: saltGrams.round(),
      levain: levainGrams.round(),
      extras: extras,
      totalDough: totalDough.round(),
      waterPercent: waterPercent,
      saltPercent: saltPercent,
      levainPercent: levainPercent,
    );
  }

  /// 밀가루 리스트의 총합 계산
  static int calculateFlourTotal(List<int> flourAmounts) {
    return flourAmounts.fold(0, (sum, amount) => sum + amount);
  }
}

/// 도우 계산 결과 데이터 클래스
class DoughCalculationResult {
  final int flour;
  final int water;
  final int salt;
  final int levain;
  final Map<String, int> extras;
  final int totalDough;

  // 옵션: 역계산 시 사용되는 퍼센티지
  final double? waterPercent;
  final double? saltPercent;
  final double? levainPercent;

  DoughCalculationResult({
    required this.flour,
    required this.water,
    required this.salt,
    required this.levain,
    required this.extras,
    required this.totalDough,
    this.waterPercent,
    this.saltPercent,
    this.levainPercent,
  });

  /// Map 형식으로 변환 (기존 코드와의 호환성)
  Map<String, int> toMap() {
    return {
      'flour': flour,
      'water': water,
      'salt': salt,
      'levain': levain,
    };
  }

  @override
  String toString() =>
      'DoughResult(flour: ${flour}g, water: ${water}g, salt: ${salt}g, levain: ${levain}g, total: ${totalDough}g)';
}
