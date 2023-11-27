import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { Recipe } from './recipes/recipe.module';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.authService.autoLogin();
  }
}
