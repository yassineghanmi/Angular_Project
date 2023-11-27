import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeDetailsComponent } from './recipes/recipe-details/recipe-details.component';
import { RecipeStartComponentComponent } from './recipes/recipe-start-component/recipe-start-component.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { recipeResolver } from './recipes/recipe.resolver';
import { AuthComponent } from './auth/auth/auth.component';
import { authGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/recipes',
    pathMatch: 'full',
  },
  {
    path: 'recipes',
    component: RecipesComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: RecipeStartComponentComponent,
      },
      {
        path: 'new',
        component: RecipeEditComponent,
      },
      {
        path: ':id',
        component: RecipeDetailsComponent,
        resolve: [recipeResolver],
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        resolve: [recipeResolver],
      },
    ],
  },
  {
    path: 'shopping-list',
    component: ShoppingListComponent,
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
