import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../recipe.module';
import { RecipesService } from '../recipes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  isChangedSub: Subscription = new Subscription();
  constructor(
    private recipesService: RecipesService,
    private dataStorage: DataStorageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.dataStorage.fetchRecipes().subscribe();
    this.recipes = this.recipesService.getRecipes();
    this.isChangedSub = this.recipesService.recipeChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
  }
  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
  ngOnDestroy(): void {
    this.isChangedSub.unsubscribe();
  }
}
