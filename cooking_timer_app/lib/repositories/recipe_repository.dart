import 'package:sourdough_timer/database/database.dart';

/// Repository interface for recipe data access
/// Abstracts database operations to decouple UI from Drift implementation
abstract class RecipeRepository {
  /// Watch all recipes (returns Stream for reactive UI)
  Stream<List<Recipe>> watchAll();

  /// Get a single recipe by ID
  Future<Recipe> getById(int id);

  /// Add a new recipe
  /// Returns the ID of the newly created recipe
  Future<int> add(RecipesCompanion recipe);

  /// Update an existing recipe
  /// Returns true if successful
  Future<bool> update(RecipesCompanion recipe);

  /// Delete a recipe by ID
  /// Returns the number of rows deleted
  Future<int> delete(int id);
}

/// Implementation of RecipeRepository using Drift database
class RecipeRepositoryImpl implements RecipeRepository {
  final AppDatabase _db;

  RecipeRepositoryImpl(this._db);

  @override
  Stream<List<Recipe>> watchAll() => _db.watchAllRecipes();

  @override
  Future<Recipe> getById(int id) => _db.getRecipe(id);

  @override
  Future<int> add(RecipesCompanion recipe) => _db.addRecipe(recipe);

  @override
  Future<bool> update(RecipesCompanion recipe) => _db.updateRecipe(recipe);

  @override
  Future<int> delete(int id) => _db.deleteRecipe(id);
}
