import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';
import { Recipe } from './recipe.module';
import { RecipesService } from './recipes.service';

export const recipeResolver: ResolveFn<Recipe[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const recipes = inject(RecipesService).getRecipes();
  if (!recipes.length) {
    return inject(DataStorageService).fetchRecipes();
  }
  return recipes;
};
