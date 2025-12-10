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

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('내 레시피'),
      ),
      body: StreamBuilder<List<Recipe>>(
        stream: _db.watchAllRecipes(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          }
          if (snapshot.hasError) {
            return Center(child: Text('오류가 발생했습니다: ${snapshot.error}'));
          }
          final recipes = snapshot.data ?? [];

          if (recipes.isEmpty) {
            return const Center(
              child: Text(
                '저장된 레시피가 없습니다.\n계산기에서 결과를 저장해보세요!',
                textAlign: TextAlign.center,
                style: TextStyle(color: Colors.grey),
              ),
            );
          }

          return ListView.builder(
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
                  title: Text(recipe.name),
                  subtitle: Text(
                    '결과: 스타터 ${recipe.resultStarter}g, 밀가루 ${recipe.resultFlour}g, 물 ${recipe.resultWater}g',
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
          );
        },
      ),
    );
  }
}
