import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipesService } from '../recipes/recipes.service';
import { Recipe } from '../recipes/recipe.module';
import { exhaustMap, map, take, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  token: any;
  constructor(
    private http: HttpClient,
    private recipeService: RecipesService,
    private authService: AuthService
  ) {}
  storeRecipe() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put<Recipe[]>(
        'https://ngproject-cf398-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
        recipes
      )
      .subscribe((res) => console.log(res));
  }
  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://ngproject-cf398-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
      )
      .pipe(
        map((res) => {
          return res.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((res) => this.recipeService.setRecipes(res))
      );
  }
}
