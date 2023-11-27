import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header-component',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.css'],
})
export class HeaderComponentComponent implements OnInit, OnDestroy {
  showNavbar: boolean = false;
  isAuthenticated: boolean = false;
  private userSub!: Subscription;
  constructor(
    private dataStorage: DataStorageService,
    private authService: AuthService
  ) {}
  @ViewChild('collapseRef') collapseRefIn: ElementRef = {} as ElementRef;

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      console.log(user);
      this.isAuthenticated = !!user;
    });
  }

  onSaveData() {
    this.dataStorage.storeRecipe();
  }

  onFetchData() {
    this.dataStorage.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authService.logout()
  }
  
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
