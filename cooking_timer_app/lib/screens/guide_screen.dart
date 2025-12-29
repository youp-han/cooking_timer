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
              '6. "Reset" 버튼으로 모든 입력값을 초기화할 수 있습니다',
              '7. "저장" 버튼을 눌러 레시피를 저장합니다',
              '',
              '💡 팁: 입력 필드를 클릭하면 기존 값이 전체 선택되어',
              '     빠르게 새로운 값을 입력할 수 있습니다',
            ],
          ),
          const SizedBox(height: 24),
          _buildSection(
            context,
            '🍞 도우 계산기',
            '두 가지 방식으로 재료를 계산할 수 있습니다: 총 도우 무게 기준 또는 재료 무게 기준',
          ),
          _buildSubSection(
            context,
            '계산 모드 선택:',
            [
              '🔹 총 도우 기준 (기본)',
              '   • 만들고 싶은 총 도우 무게를 입력',
              '   • % 입력 → g이 자동 계산',
              '   • 또는 g 직접 입력 → % 자동 계산 및 전체 재조정',
              '',
              '🔹 재료 기준',
              '   • 가지고 있는 재료의 무게를 직접 입력',
              '   • g 입력 → 총 도우 무게와 % 자동 계산',
              '   • 총 도우 무게 필드는 읽기 전용 (자동 계산)',
              '   • % 필드는 읽기 전용 (자동 계산)',
              '',
              '💡 화면 상단의 토글 버튼으로 모드 전환 가능',
            ],
          ),
          _buildSubSection(
            context,
            '사용 방법:',
            [
              '1. 계산 모드를 선택합니다',
              '   • "총 도우 기준" 또는 "재료 기준"',
              '',
              '2-A. 총 도우 기준 모드:',
              '   • 총 도우 무게(g)를 입력합니다',
              '   • 재료 입력 - 두 가지 방법:',
              '     - 베이커스 퍼센티지(%) 입력 → g 자동 계산',
              '     - 그램(g) 직접 입력 → % 자동 계산 및 재조정',
              '',
              '2-B. 재료 기준 모드:',
              '   • 재료 무게(g)를 직접 입력합니다',
              '   • 총 도우 무게와 %가 자동으로 계산됩니다',
              '',
              '3. 밀가루 상세 입력 (선택사항)',
              '   • 강력분, 통밀, 호밀 등 여러 종류 사용 가능',
              '   • 각 밀가루의 이름과 그램(g)을 입력합니다',
              '   • "밀가루 추가" 버튼으로 종류를 추가',
              '   • 합계 (입력)과 필요량 (100%)이 표시됩니다',
              '   • 불일치 시 경고가 표시됩니다',
              '',
              '4. 추가 재료 입력 (선택사항)',
              '   • 올리브유, 버터, 설탕 등 추가',
              '   • 모드에 따라 % 또는 g 입력',
              '   • "재료 추가" 버튼으로 여러 재료 추가 가능',
              '',
              '5. "Reset" 버튼으로 모든 입력값 초기화',
              '   • 모든 필드가 초기값으로 되돌아갑니다',
              '   • 밀가루/추가재료도 모두 삭제됩니다',
              '',
              '6. "저장" 버튼을 눌러 레시피 저장',
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
            '총 도우 기준 모드 - 양방향 입력 예시:',
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
          _buildSubSection(
            context,
            '재료 기준 모드 예시:',
            [
              '가지고 있는 재료 무게를 직접 입력:',
              '',
              '• 밀가루 300g',
              '• 물 210g',
              '• 소금 6g',
              '• 르방 60g',
              '',
              '→ 총 도우 무게 자동 계산: 576g',
              '→ 베이커스 % 자동 계산:',
              '   - 밀가루: 100% (기준)',
              '   - 물: 210 ÷ 300 × 100 = 70%',
              '   - 소금: 6 ÷ 300 × 100 = 2%',
              '   - 르방: 60 ÷ 300 × 100 = 20%',
              '',
              '💡 재료 무게만 입력하면 총 도우 무게와 %가',
              '   자동으로 계산되어 편리합니다',
            ],
          ),
          const SizedBox(height: 24),
          _buildSection(
            context,
            '⏱️ 타이머 사용법',
            '저장된 레시피로 다단계 타이머를 설정할 수 있습니다. 레시피 타입에 따라 자동으로 적합한 템플릿이 제공됩니다.',
          ),
          _buildSubSection(
            context,
            '사용 방법:',
            [
              '1. 내 레시피에서 레시피를 선택합니다',
              '2. "이 레시피로 타이머 시작" 버튼을 누릅니다',
              '3. 레시피 타입에 맞는 템플릿이 자동으로 로드됩니다',
              '   • 사워도우: 긴 발효 시간 템플릿 (약 16시간)',
              '   • 일반 도우: 짧은 발효 시간 템플릿 (약 4시간)',
              '4. 타이머 단계를 추가/수정/삭제할 수 있습니다',
              '   • 단계 이름: 예) "1차 발효", "폴딩 #1"',
              '   • 시간: 시간(h)과 분(m)을 각각 입력',
              '   • 예) 12시간 30분 = 12h 30m',
              '5. "타이머 시작" 버튼을 누릅니다',
              '   • 타이머 단계가 자동으로 레시피에 저장됩니다',
              '   • 자동으로 타이머 탭으로 전환됩니다',
              '6. 타이머 화면에서 진행 상황을 확인할 수 있습니다',
              '   • 현재 단계와 남은 시간 표시',
              '   • 전체 진행률 표시',
              '7. 각 단계가 완료되면 알림이 울립니다',
              '8. 삭제 버튼으로 타이머를 중단할 수 있습니다',
              '',
              '💡 팁: 한번 타이머를 시작하면 설정이 저장되어',
              '     다음에 같은 레시피로 타이머 시작 시 이전 설정이 자동으로 적용됩니다',
            ],
          ),
          _buildSubSection(
            context,
            '사워도우 기본 템플릿:',
            [
              '1. 오토리즈 (Autolyse) - 1시간',
              '2. 1차 발효 시작 - 30분',
              '3. 폴딩 #1 - 30분',
              '4. 폴딩 #2 - 30분',
              '5. 폴딩 #3 - 3시간',
              '6. 성형 및 벤치 레스트 - 30분',
              '7. 2차 발효 (냉장) - 12시간',
              '8. 굽기 - 45분',
              '',
              '총 약 16시간 (긴 발효 과정)',
            ],
          ),
          _buildSubSection(
            context,
            '일반 도우 기본 템플릿:',
            [
              '1. 오토리즈 (Autolyse) - 30분',
              '2. 1차 발효 (Bulk Fermentation) - 1시간',
              '3. 폴딩 (Folding) - 30분',
              '4. 분할 및 둥글리기 - 15분',
              '5. 벤치 타임 (Bench Rest) - 20분',
              '6. 성형 (Shaping) - 15분',
              '7. 2차 발효 (Final Proof) - 45분',
              '8. 굽기 (Bake) - 25분',
              '',
              '총 약 4시간 (빠른 발효 과정)',
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
