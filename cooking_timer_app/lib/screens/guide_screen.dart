import 'package:flutter/material.dart';

class GuideScreen extends StatelessWidget {
  const GuideScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('가이드'),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16.0),
        children: [
          _buildSection(
            context,
            '📱 앱 소개',
            '사워도우 베이킹 도우미는 사워도우 빵 만들기를 위한 재료 계산과 타이머 기능을 제공합니다.',
          ),
          const SizedBox(height: 24),
          _buildSection(
            context,
            '🧮 베이커스 계산기',
            '총 르방(스타터)의 양을 기준으로 재료를 계산합니다.',
          ),
          _buildSubSection(
            context,
            '사용 방법:',
            [
              '1. 총 르방 양(g)을 입력합니다',
              '2. 온도(°C)를 입력합니다',
              '3. 준비 시간을 선택하면 자동으로 비율이 적용됩니다',
              '   • 4-6시간: 1:1:1',
              '   • 6-8시간: 1:2:2',
              '   • 8-10시간: 1:3:3',
              '   • 10-12시간: 1:4:4',
              '   • 12-14시간: 1:5:5',
              '   • 16-24시간: 1:10:10',
              '4. 비율(스타터:밀가루:물)을 직접 조정할 수도 있습니다',
              '5. 계산 결과가 실시간으로 표시됩니다',
              '6. "레시피로 저장" 버튼을 눌러 저장합니다',
              '',
              '💡 팁: 입력 필드를 클릭하면 기존 값이 전체 선택되어',
              '     빠르게 새로운 값을 입력할 수 있습니다',
            ],
          ),
          const SizedBox(height: 24),
          _buildSection(
            context,
            '🍞 도우 계산기',
            '만들고 싶은 총 도우 무게를 기준으로 재료를 계산합니다.',
          ),
          _buildSubSection(
            context,
            '사용 방법:',
            [
              '1. 총 도우 무게(g)를 입력합니다',
              '2. 재료 입력 - 두 가지 방법 선택 가능:',
              '   A. 베이커스 퍼센티지(%) 입력',
              '      • 물/소금/르방의 % 입력 → g이 자동 계산',
              '      • 기본값: 물 70%, 소금 2%, 르방 20%',
              '   B. 그램(g) 직접 입력',
              '      • 물/소금/르방의 g 입력 → %가 자동 계산',
              '      • 전체 재료량이 자동으로 재계산됩니다',
              '   ⚠️ % 또는 g 둘 중 하나만 입력하세요 (양방향 자동 계산)',
              '3. 밀가루 상세 입력 (선택사항)',
              '   • 강력분, 통밀, 호밀 등 여러 종류의 밀가루 사용 가능',
              '   • 각 밀가루의 이름과 그램(g)을 입력합니다',
              '   • "밀가루 추가" 버튼으로 종류를 추가할 수 있습니다',
              '   • 합계가 총 밀가루 양과 일치하지 않으면 경고가 표시됩니다',
              '4. 추가 재료 입력 (선택사항)',
              '   • 올리브유, 버터, 설탕 등 추가 재료를 입력할 수 있습니다',
              '   • % 또는 g 둘 중 하나를 입력하면 나머지가 자동 계산',
              '   • "재료 추가" 버튼으로 여러 재료를 추가할 수 있습니다',
              '   • 추가 재료가 전체 도우 계산에 자동 반영됩니다',
              '5. "레시피로 저장" 버튼을 눌러 저장합니다',
              '',
              '💡 팁: 입력 필드를 클릭하면 기존 값이 전체 선택되어',
              '     빠르게 새로운 값을 입력할 수 있습니다',
            ],
          ),
          const SizedBox(height: 24),
          _buildSection(
            context,
            '💡 베이커스 퍼센티지란?',
            '밀가루를 100%로 기준 삼아 다른 재료의 비율을 나타내는 제빵 공식입니다.',
          ),
          _buildSubSection(
            context,
            '기본 예시:',
            [
              '• 밀가루: 100% (항상 기준)',
              '• 물: 70% = 밀가루 양의 70%',
              '• 소금: 2% = 밀가루 양의 2%',
              '• 르방: 20% = 밀가루 양의 20%',
              '',
              '총 도우 500g일 때:',
              '→ 전체 비율 = 100 + 70 + 2 + 20 = 192%',
              '→ 밀가루 = 500 × (100/192) = 260g',
              '→ 물 = 500 × (70/192) = 182g',
              '→ 소금 = 500 × (2/192) = 5g',
              '→ 르방 = 500 × (20/192) = 52g',
            ],
          ),
          _buildSubSection(
            context,
            '추가 재료 포함 예시:',
            [
              '기본 재료에 올리브유 5%를 추가할 때:',
              '→ 전체 비율 = 100 + 70 + 2 + 20 + 5 = 197%',
              '→ 밀가루 = 500 × (100/197) = 254g',
              '→ 물 = 500 × (70/197) = 178g',
              '→ 소금 = 500 × (2/197) = 5g',
              '→ 르방 = 500 × (20/197) = 51g',
              '→ 올리브유 = 500 × (5/197) = 13g',
              '',
              '⚠️ 추가 재료를 넣으면 전체 비율이 달라지므로',
              '   모든 재료의 양이 자동으로 재계산됩니다',
            ],
          ),
          _buildSubSection(
            context,
            '양방향 입력 예시:',
            [
              '총 도우 500g 고정 상태에서:',
              '',
              '방법 1: % 입력',
              '• 물 70% 입력 → 자동으로 182g 계산됨',
              '',
              '방법 2: g 입력',
              '• 물 200g 직접 입력',
              '→ 물 % 자동 계산: 200g ÷ 260g × 100 = 77.0%',
              '→ 전체 비율 재계산: 100 + 77 + 2 + 20 = 199%',
              '→ 모든 재료 재계산:',
              '   - 밀가루 = 500 × (100/199) = 251g',
              '   - 물 = 200g (입력한 값)',
              '   - 소금 = 500 × (2/199) = 5g',
              '   - 르방 = 500 × (20/199) = 50g',
              '',
              '💡 총 도우 무게는 고정, 한 재료를 바꾸면',
              '   다른 모든 재료가 자동으로 재조정됩니다',
            ],
          ),
          const SizedBox(height: 24),
          _buildSection(
            context,
            '⏱️ 타이머 사용법',
            '저장된 레시피로 다단계 타이머를 설정할 수 있습니다.',
          ),
          _buildSubSection(
            context,
            '사용 방법:',
            [
              '1. 내 레시피에서 레시피를 선택합니다',
              '2. "이 레시피로 타이머 시작" 버튼을 누릅니다',
              '3. 타이머 단계를 추가/수정합니다',
              '4. "타이머 시작" 버튼을 누릅니다',
              '5. 각 단계가 완료되면 알림이 울립니다',
              '6. 타이머 화면에서 진행 상황을 확인할 수 있습니다',
            ],
          ),
          const SizedBox(height: 24),
          _buildSection(
            context,
            '📖 용어 설명',
            '',
          ),
          _buildSubSection(
            context,
            '',
            [
              '• 르방(Levain): 천연 발효종, 스타터(Starter)와 같은 의미',
              '• 도우(Dough): 반죽',
              '• 베이커스 퍼센티지: 밀가루 기준 재료 비율 표기법',
              '• 수화율(Hydration): 물의 비율 (예: 70%)',
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildSection(BuildContext context, String title, String content) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: Theme.of(context).textTheme.titleLarge?.copyWith(
                fontWeight: FontWeight.bold,
              ),
        ),
        if (content.isNotEmpty) ...[
          const SizedBox(height: 8),
          Text(
            content,
            style: Theme.of(context).textTheme.bodyLarge,
          ),
        ],
      ],
    );
  }

  Widget _buildSubSection(BuildContext context, String title, List<String> items) {
    return Padding(
      padding: const EdgeInsets.only(top: 12.0, left: 8.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          if (title.isNotEmpty)
            Text(
              title,
              style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.w600,
                  ),
            ),
          const SizedBox(height: 4),
          ...items.map((item) => Padding(
                padding: const EdgeInsets.symmetric(vertical: 2.0),
                child: Text(
                  item,
                  style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                        color: Colors.grey.shade700,
                      ),
                ),
              )),
        ],
      ),
    );
  }
}
