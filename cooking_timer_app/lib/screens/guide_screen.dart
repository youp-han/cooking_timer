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
              '2. 베이커스 퍼센티지를 조정합니다',
              '   • 물 (%): 밀가루 대비 물의 비율 (기본값: 70%)',
              '   • 소금 (%): 밀가루 대비 소금의 비율 (기본값: 2%)',
              '   • 르방 (%): 밀가루 대비 르방의 비율 (기본값: 20%)',
              '3. 퍼센티지를 조정하면 실시간으로 재료량이 계산됩니다',
              '4. 도우/르방 비율이 자동으로 계산되어 표시됩니다',
              '5. "레시피로 저장" 버튼을 눌러 저장합니다',
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
            '예시:',
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
