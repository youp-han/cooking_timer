/// 밀가루 항목 모델
/// dough_calculator_screen.dart의 _FlourItem 클래스를 추출
class FlourItem {
  final String name;
  final int amount;

  FlourItem({
    required this.name,
    required this.amount,
  });

  /// JSON에서 생성
  factory FlourItem.fromJson(Map<String, dynamic> json) {
    return FlourItem(
      name: json['name'] as String? ?? '',
      amount: json['amount'] as int? ?? 0,
    );
  }

  /// JSON으로 변환
  Map<String, dynamic> toJson() {
    return {
      'name': name,
      'amount': amount,
    };
  }

  /// 총 밀가루 대비 퍼센티지 계산
  double calculatePercentage(int totalFlour) {
    if (totalFlour <= 0) return 0.0;
    return (amount / totalFlour * 100);
  }

  /// 복사본 생성
  FlourItem copyWith({
    String? name,
    int? amount,
  }) {
    return FlourItem(
      name: name ?? this.name,
      amount: amount ?? this.amount,
    );
  }

  @override
  String toString() => 'FlourItem(name: $name, amount: ${amount}g)';

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    return other is FlourItem &&
        other.name == name &&
        other.amount == amount;
  }

  @override
  int get hashCode => name.hashCode ^ amount.hashCode;
}
