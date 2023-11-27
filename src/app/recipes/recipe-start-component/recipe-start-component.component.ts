import { Component, OnDestroy, OnInit } from '@angular/core';
import { RecipesService } from '../recipes.service';
import { Recipe } from '../recipe.module';
import { Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-recipe-start-component',
  templateUrl: './recipe-start-component.component.html',
  styleUrls: ['./recipe-start-component.component.css'],
})
export class RecipeStartComponentComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  rcpSubscriber: Subscription = new Subscription();
  constructor(private rcpService: RecipesService) {}
  ngOnInit(): void {
    this.recipes = this.rcpService.getRecipes();
    this.rcpSubscriber = this.rcpService.recipeChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
  }
  ngOnDestroy(): void {
    this.rcpSubscriber.unsubscribe();
  }
}
