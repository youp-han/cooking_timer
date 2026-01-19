/// 앱 전체에서 사용되는 문자열 상수
class AppStrings {
  // 공통
  static const String save = '저장';
  static const String cancel = '취소';
  static const String delete = '삭제';
  static const String reset = '재설정';
  static const String add = '추가';
  static const String confirm = '확인';
  static const String close = '닫기';

  // 네비게이션
  static const String myRecipes = '내 레시피';
  static const String guide = '가이드';
  static const String calculator = '계산기';
  static const String timer = '타이머';
  static const String settings = '설정';

  // 계산기 탭
  static const String bakersCalculator = '베이커스';
  static const String doughCalculator = '도우';

  // 베이커스 계산기
  static const String totalStarter = '총 르방 양 (g)';
  static const String temperature = '온도 (°C)';
  static const String preparationTime = '준비 시간 (Hours)';
  static const String ratio = '비율 (스타터:밀가루:물)';
  static const String starterLabel = '스타터';
  static const String flourLabel = '밀가루';
  static const String waterLabel = '물';
  static const String resultTitle = '결과';

  // 도우 계산기
  static const String totalDoughWeight = '총 도우 무게 (g)';
  static const String calculationMode = '계산 모드';
  static const String byDoughMode = '총 도우 기준';
  static const String byIngredientsMode = '재료 기준';
  static const String bakersPercentage = '베이커스 퍼센티지 (밀가루 100% 기준)';
  static const String ingredientWeights = '재료 무게 (g)';
  static const String waterPercent = '물 (%)';
  static const String saltPercent = '소금 (%)';
  static const String levainPercent = '르방 (%)';
  static const String waterGrams = '물 (g)';
  static const String saltGrams = '소금 (g)';
  static const String levainGrams = '르방 (g)';
  static const String flourDetails = '밀가루 상세 (선택사항)';
  static const String flourName = '이름';
  static const String flourAmount = 'g';
  static const String flourPercentage = '%';
  static const String addFlour = '밀가루 추가';
  static const String flourSummary = '합계 (입력)';
  static const String flourRequired = '필요량 (100%)';
  static const String flourExcess = '초과';
  static const String flourDeficit = '부족';
  static const String extraIngredients = '추가 재료';
  static const String extraName = '이름';
  static const String extraPercent = '%';
  static const String extraGrams = 'g';
  static const String addIngredient = '재료 추가';

  // 레시피
  static const String recipeName = '레시피 이름';
  static const String recipeNameHint = '예: 나의 첫 깜파뉴';
  static const String recipeNameHintDough = '예: 내 도우 레시피';
  static const String recipeSaved = '레시피가 저장되었습니다.';
  static const String recipeDeleted = '{name} 레시피가 삭제되었습니다.';
  static const String noRecipes = '저장된 레시피가 없습니다.\n계산기에서 결과를 저장해보세요!';
  static const String deleteAll = '모두 삭제';
  static const String deleteAllConfirm = '저장된 레시피 {count}개를 모두 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.';
  static const String recipesDeleted = '{count}개의 레시피가 삭제되었습니다.';

  // 레시피 상세
  static const String recipeDetails = '레시피 상세';
  static const String ingredients = '재료';
  static const String flourBreakdown = '밀가루 구성';
  static const String additionalIngredients = '추가 재료';
  static const String startTimerWithRecipe = '이 레시피로 타이머 시작';

  // 타이머
  static const String activeTimers = '진행중인 타이머';
  static const String noActiveTimers = '시작된 타이머가 없습니다.\n\'내 레시피\'에서 타이머를 시작해보세요!';
  static const String timerSetup = '타이머 설정';
  static const String timerStepName = '단계 이름';
  static const String timerHours = '시간';
  static const String timerMinutes = '분';
  static const String timerHoursUnit = 'h';
  static const String timerMinutesUnit = 'm';
  static const String addStep = '단계 추가';
  static const String startTimer = '타이머 시작';
  static const String timerStarted = '타이머가 시작되었습니다!';
  static const String timerMobileOnly = '타이머 기능은 모바일에서만 지원됩니다.';
  static const String currentStep = '현재 단계';
  static const String allStepsComplete = '모든 단계 완료!';
  static const String deleteTimer = '타이머 삭제';

  // 설정
  static const String notificationSettings = '알림 설정';
  static const String timerNotification = '타이머 알림';
  static const String timerNotificationDesc = '타이머 단계 완료 시 알림을 받습니다';
  static const String notificationEnabled = '알림이 켜졌습니다.';
  static const String notificationDisabled = '알림이 꺼졌습니다.';

  // 피드백
  static const String feedbackSection = '피드백/문의하기';
  static const String contact = '문의하기';
  static const String contactDesc = '이메일로 문의를 보낼 수 있습니다';
  static const String bugReport = '버그 리포트';
  static const String bugReportDesc = '이메일로 버그를 제보할 수 있습니다';

  // 앱 정보
  static const String appInfo = '앱 정보';
  static const String appName = '베이킹 타이머';
  static const String appDescription = '완벽한 빵을 위한 베이킹 도우미';
  static const String companyName = '회사명';
  static const String companySoftware = 'JJST Software';
  static const String specialThanks = 'Special Thanks To';
  static const String livingBread = '건강 빵집 리빙 브레드';
  static const String livingBreadYear = '2024';
  static const String visitStore = '스토어 방문하기';

  // 시작 화면
  static const String getStarted = '시작하기';

  // 에러 메시지
  static const String errorOccurred = '오류가 발생했습니다';
  static const String errorWithDetails = '오류가 발생했습니다: {error}';
  static const String cannotOpenEmail = '이메일 앱을 열 수 없습니다.';
  static const String cannotOpenLink = '링크를 열 수 없습니다.';
  static const String invalidInput = '잘못된 입력입니다.';
  static const String pleaseEnterValue = '값을 입력해주세요.';

  // 안내 메시지
  static const String loading = '로딩 중...';
  static const String calculating = '계산 중...';
  static const String saving = '저장 중...';

  // Helper method to replace placeholders
  static String replaceParams(String template, Map<String, String> params) {
    String result = template;
    params.forEach((key, value) {
      result = result.replaceAll('{$key}', value);
    });
    return result;
  }
}
