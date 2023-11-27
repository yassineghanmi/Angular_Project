import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams,
} from '@angular/common/http';
import { Observable, exhaustMap, take, pipe } from 'rxjs';
import { AuthService } from './auth.service';
import { HttpHeaders } from '@angular/common/http';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        if (!user) {
          console.log('no user');
          return next.handle(request);
        } else {
          const modifiedRequest = request.clone({
            params: new HttpParams().set('auth', user?.token),
            headers: new HttpHeaders().set('auth', user?.token),
          });
          console.log('user');
          return next.handle(modifiedRequest);
        }
      })
    );
  }
}
