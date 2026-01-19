/// 베이커스 퍼센티지 계산 서비스
/// calculator_screen.dart의 비즈니스 로직을 추출
///
/// 목적: 총 르방 양과 비율(스타터:밀가루:물)을 기반으로
/// 각 재료의 정확한 양을 계산
class BakerCalculatorService {
  /// 사용 가능한 준비 시간 옵션 (시간)
  static const List<String> timeframes = [
    '4-6',
    '6-8',
    '8-10',
    '10-12',
    '12-14',
    '16-24'
  ];

  /// 준비 시간별 권장 비율 (스타터:밀가루:물)
  static const Map<String, List<double>> timeframeRatios = {
    '4-6': [1, 1, 1],
    '6-8': [1, 2, 2],
    '8-10': [1, 3, 3],
    '10-12': [1, 4, 4],
    '12-14': [1, 5, 5],
    '16-24': [1, 10, 10],
  };

  /// 총 르방 양과 비율을 기반으로 재료량 계산
  ///
  /// [totalStarter]: 총 르방 양 (그램)
  /// [starterRatio]: 스타터 비율
  /// [flourRatio]: 밀가루 비율
  /// [waterRatio]: 물 비율
  ///
  /// Returns: {starter: int, flour: int, water: int} 형태의 Map
  static Map<String, int> calculate({
    required double totalStarter,
    required double starterRatio,
    required double flourRatio,
    required double waterRatio,
  }) {
    // 입력값 검증
    if (totalStarter <= 0) {
      return {'starter': 0, 'flour': 0, 'water': 0};
    }

    final totalRatio = starterRatio + flourRatio + waterRatio;
    if (totalRatio == 0) {
      return {'starter': 0, 'flour': 0, 'water': 0};
    }

    // 비율에 따라 재료량 계산
    return {
      'starter': (totalStarter * starterRatio / totalRatio).round(),
      'flour': (totalStarter * flourRatio / totalRatio).round(),
      'water': (totalStarter * waterRatio / totalRatio).round(),
    };
  }

  /// 준비 시간에 따른 권장 비율 반환
  ///
  /// [timeframe]: 준비 시간 ('4-6', '6-8', etc.)
  ///
  /// Returns: [스타터, 밀가루, 물] 비율 리스트. 없으면 null
  static List<double>? getRatiosForTimeframe(String timeframe) {
    return timeframeRatios[timeframe];
  }

  /// 주어진 비율이 유효한지 검증
  static bool isValidRatio(double starterRatio, double flourRatio, double waterRatio) {
    return starterRatio > 0 && flourRatio > 0 && waterRatio > 0;
  }
}
