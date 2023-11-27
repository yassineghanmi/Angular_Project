import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from './ingredient.module';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: [],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  private isChangeSub: Subscription = new Subscription();
  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.isChangeSub = this.shoppingListService.ingredientsChanged.subscribe({
      next: (ingredient) => {
        this.ingredients = ingredient;
        console.log(ingredient + ' work with just one');
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete'),
    });
  }
  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index);
    
  }
  ngOnDestroy(): void {
    this.isChangeSub.unsubscribe();
  }
}
