import { Component, HostListener, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  // @ViewChild('authForm') authForm!: NgForm;
  isLogginMode: boolean = true;
  isLoadding: boolean = false;
  error: boolean = false;
  errorMessage!: string;

  constructor(private authService: AuthService, private router: Router) {}

  onSwitchMode() {
    this.isLogginMode = !this.isLogginMode;
  }
  onSubmit(authForm: NgForm) {
    console.log(authForm.value);
    if (authForm.invalid) {
      return;
    }
    let { email, password } = authForm.value;
    this.isLoadding = true;
    if (this.isLogginMode) {
      this.authService.login(email, password).subscribe({
        next: (response) => {
          console.log('auth_______' + response);
          this.isLoadding = false;
          this.router.navigate(['/recipes']);
        },
        error: (errorMessage) => {
          this.isLoadding = false;
          this.error = true;
          this.errorMessage = errorMessage;
          Swal.fire('Hi', errorMessage, 'error');
        },
      });
    } else {
      this.authService.signup(email, password).subscribe({
        next: (response) => {
          console.log(response);
          this.isLoadding = false;
          this.router.navigate(['/recipes']);
        },
        error: (errorMessage) => {
          console.log(errorMessage);
          this.isLoadding = false;
          this.error = true;
          this.errorMessage = errorMessage;
        },
      });
    }
    authForm.reset();
  }
}
