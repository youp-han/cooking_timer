/// 추가 재료 모델
/// dough_calculator_screen.dart의 _ExtraIngredient 클래스를 추출
class ExtraIngredient {
  final String name;
  final double percent;
  final int amount;

  ExtraIngredient({
    required this.name,
    required this.percent,
    this.amount = 0,
  });

  /// JSON에서 생성
  factory ExtraIngredient.fromJson(Map<String, dynamic> json) {
    return ExtraIngredient(
      name: json['name'] as String? ?? '',
      percent: (json['percent'] as num?)?.toDouble() ?? 0.0,
      amount: json['amount'] as int? ?? 0,
    );
  }

  /// JSON으로 변환
  Map<String, dynamic> toJson() {
    return {
      'name': name,
      'percent': percent,
      'amount': amount,
    };
  }

  /// 밀가루 기준 퍼센티지 계산
  static double calculatePercent(int grams, int flourTotal) {
    if (flourTotal == 0) return 0.0;
    return (grams / flourTotal * 100);
  }

  /// 퍼센티지 기준 그램 계산
  static int calculateGrams(double percent, int flourTotal, double totalPercent) {
    if (totalPercent == 0) return 0;
    return (flourTotal * percent / 100 * (100 / totalPercent)).round();
  }

  /// 복사본 생성
  ExtraIngredient copyWith({
    String? name,
    double? percent,
    int? amount,
  }) {
    return ExtraIngredient(
      name: name ?? this.name,
      percent: percent ?? this.percent,
      amount: amount ?? this.amount,
    );
  }

  @override
  String toString() =>
      'ExtraIngredient(name: $name, percent: $percent%, amount: ${amount}g)';

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    return other is ExtraIngredient &&
        other.name == name &&
        other.percent == percent &&
        other.amount == amount;
  }

  @override
  int get hashCode => name.hashCode ^ percent.hashCode ^ amount.hashCode;
}
