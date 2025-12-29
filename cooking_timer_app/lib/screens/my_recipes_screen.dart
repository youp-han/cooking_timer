import 'package:sourdough_timer/database/database.dart';
import 'package:sourdough_timer/screens/recipe_detail_screen.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class MyRecipesScreen extends StatefulWidget {
  const MyRecipesScreen({super.key});

  @override
  State<MyRecipesScreen> createState() => _MyRecipesScreenState();
}

class _MyRecipesScreenState extends State<MyRecipesScreen> {
  late AppDatabase _db;

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    _db = Provider.of<AppDatabase>(context);
  }

  Future<void> _showDeleteAllDialog(List<Recipe> recipes) async {
    return showDialog<void>(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('모두 삭제'),
          content: Text('저장된 레시피 ${recipes.length}개를 모두 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.'),
          actions: <Widget>[
            TextButton(
              child: const Text('취소'),
              onPressed: () {
                Navigator.of(context).pop();
              },
            ),
            TextButton(
              style: TextButton.styleFrom(
                foregroundColor: Colors.red,
              ),
              child: const Text('삭제'),
              onPressed: () async {
                Navigator.of(context).pop();
                // 모든 레시피 삭제
                for (final recipe in recipes) {
                  await _db.deleteRecipe(recipe.id);
                }
                if (mounted) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(content: Text('${recipes.length}개의 레시피가 삭제되었습니다.')),
                  );
                }
              },
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return StreamBuilder<List<Recipe>>(
      stream: _db.watchAllRecipes(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return Scaffold(
            appBar: AppBar(
              title: const Text('내 레시피'),
            ),
            body: const Center(child: CircularProgressIndicator()),
          );
        }
        if (snapshot.hasError) {
          return Scaffold(
            appBar: AppBar(
              title: const Text('내 레시피'),
            ),
            body: Center(child: Text('오류가 발생했습니다: ${snapshot.error}')),
          );
        }
        final recipes = snapshot.data ?? [];

        return Scaffold(
          appBar: AppBar(
            title: const Text('내 레시피'),
            actions: recipes.isNotEmpty
                ? [
                    IconButton(
                      icon: const Icon(Icons.delete_sweep),
                      tooltip: '모두 삭제',
                      onPressed: () => _showDeleteAllDialog(recipes),
                    ),
                  ]
                : null,
          ),
          body: recipes.isEmpty
              ? const Center(
                  child: Text(
                    '저장된 레시피가 없습니다.\n계산기에서 결과를 저장해보세요!',
                    textAlign: TextAlign.center,
                    style: TextStyle(color: Colors.grey),
                  ),
                )
              : ListView.builder(
            itemCount: recipes.length,
            itemBuilder: (context, index) {
              final recipe = recipes[index];
              return Dismissible(
                key: ValueKey(recipe.id),
                direction: DismissDirection.endToStart,
                background: Container(
                  color: Colors.red,
                  alignment: Alignment.centerRight,
                  padding: const EdgeInsets.symmetric(horizontal: 20.0),
                  child: const Icon(Icons.delete, color: Colors.white),
                ),
                onDismissed: (_) {
                  _db.deleteRecipe(recipe.id);
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(content: Text('${recipe.name} 레시피가 삭제되었습니다.')),
                  );
                },
                child: ListTile(
                  leading: Icon(
                    recipe.calculationType == 'dough'
                        ? Icons.pie_chart
                        : Icons.calculate,
                    color: recipe.calculationType == 'dough'
                        ? Colors.orange
                        : Colors.brown,
                  ),
                  title: Row(
                    children: [
                      Text(recipe.name),
                      const SizedBox(width: 8),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                        decoration: BoxDecoration(
                          color: recipe.calculationType == 'dough'
                              ? Colors.orange.shade100
                              : Colors.brown.shade100,
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: Text(
                          recipe.calculationType == 'dough' ? '도우' : '베이커스',
                          style: TextStyle(
                            fontSize: 11,
                            color: recipe.calculationType == 'dough'
                                ? Colors.orange.shade800
                                : Colors.brown.shade800,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    ],
                  ),
                  subtitle: Text(
                    recipe.calculationType == 'dough'
                        ? '밀가루 ${recipe.resultStarter}g, 물 ${recipe.resultFlour}g, 소금 ${recipe.resultWater}g${recipe.resultLevain != null ? ", 르방 ${recipe.resultLevain}g" : ""}'
                        : '스타터 ${recipe.resultStarter}g, 밀가루 ${recipe.resultFlour}g, 물 ${recipe.resultWater}g',
                  ),
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => RecipeDetailScreen(recipe: recipe),
                      ),
                    );
                  },
                ),
              );
            },
          ),
        );
      },
    );
  }
}
