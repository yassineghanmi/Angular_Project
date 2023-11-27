import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.module';
import { RecipesService } from '../recipes.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css'],
})
export class RecipeDetailsComponent implements OnInit {
  recipe: Recipe = new Recipe('', '', '', []);
  id: number = 0;
  constructor(
    private rcpService: RecipesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipe = this.rcpService.getRecipe(this.id);
    });
  }

  onAddToShoppingList() {
    this.rcpService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
  onDelete() {
    this.rcpService.deleteRecipe(this.id);
    this.router.navigate(['..'], { relativeTo: this.route });
  }
}
