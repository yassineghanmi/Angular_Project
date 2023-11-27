import { Injectable } from '@angular/core';
import { Recipe } from './recipe.module';
import { Ingredient } from '../shopping-list/ingredient.module';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  recipeChanged = new Subject<Recipe[]>();
  recipes: Recipe[] = [];
  // [
  //   new Recipe(
  //     'This is a recipe',
  //     'test recipe',
  //     'https://i.guim.co.uk/img/media/3d54198fd5966761db8629c41557112c8f31fda5/0_1102_3985_4716/master/3985.jpg?width=620&quality=45&dpr=2&s=none',
  //     [new Ingredient('batata', 5), new Ingredient('khobz', 5)]
  //   ),
  //   new Recipe(
  //     'This is a second recipe',
  //     'new test recipe',
  //     'https://i.guim.co.uk/img/media/3d54198fd5966761db8629c41557112c8f31fda5/0_1102_3985_4716/master/3985.jpg?width=620&quality=45&dpr=2&s=none',
  //     [new Ingredient('tamatem', 5), new Ingredient('bsal', 3)]
  //   ),
  // ];

  constructor(private slService: ShoppingListService) {}

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }
  getRecipe(index: number): Recipe {
    return this.recipes[index];
  }
  setRecipes(recipe: Recipe[]) {
    this.recipes = recipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }
  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }
  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
}
