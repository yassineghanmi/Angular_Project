import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, catchError, tap, throwError } from 'rxjs';
import { User } from './auth/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User>(null!);
  private tokenExpirationTimer: any;
  constructor(private http: HttpClient, private router: Router) {}

  signup(email: string, password: string) {
    return this.http
      .post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBCk1Hux4uvlHefdwFouQocr0Q0ITuDvi4',
        { email, password, returnSecureToken: true }
      )
      .pipe(
        catchError((errorRes: HttpErrorResponse) => {
          let errorMessage = ' An unkown error occurred!';
          if (!errorRes.error || !errorRes.error.error) {
            return throwError(() => errorMessage);
          }
          switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
              errorMessage = 'This email exists already!';
          }
          return throwError(() => errorMessage);
        }),
        tap((resData: any) => {
          const expirationDate = new Date(
            new Date().getTime() + +resData.expiresIn * 1000
          );
          const user = new User(
            resData.email,
            resData.localId,
            resData.idToken,
            expirationDate
          );
          this.autoLogout(resData.expiresIn * 1000);
          this.user.next(user);
        })
      );
  }
  login(email: string, password: string) {
    return this.http
      .post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBCk1Hux4uvlHefdwFouQocr0Q0ITuDvi4',
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError((errorRes: HttpErrorResponse) => {
          let errorMessage = ' An unkown error occurred!';
          if (!errorRes.error || !errorRes.error.error) {
            return throwError(() => errorMessage);
          }
          switch (errorRes.error.error.message) {
            case 'EMAIL_NOT_FOUND':
              errorMessage = 'This email not found!';
          }
          return throwError(() => errorMessage);
        }),
        tap((resData: any) => {
          const expirationDate = new Date(
            new Date().getTime() + +resData.expiresIn * 1000
          );
          const user = new User(
            resData.email,
            resData.localId,
            resData.idToken,
            expirationDate
          );
          this.user.next(user);
          console.log('Expiration Duration : '  + resData.expiresIn * 1000)
          this.autoLogout(resData.expiresIn * 1000);
          localStorage.setItem('userData', JSON.stringify(user));
        })
      );
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );
    if (loadedUser.token) {
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
      this.user.next(loadedUser);
    }
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['auth']);
    if (this.tokenExpirationTimer) {
      console.log(this.tokenExpirationTimer);
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }
}
