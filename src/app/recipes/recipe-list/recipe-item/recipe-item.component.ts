import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../recipe.module';
import { RecipesService } from '../../recipes.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent {
  @Input() recipe: Recipe = new Recipe('', '', '', []);
  @Input() index: number = 0;
}
