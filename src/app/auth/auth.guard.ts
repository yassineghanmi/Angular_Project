import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  return inject(AuthService).user.pipe(
    take(1),
    map((user) => {
      const isAuth = !!user;
      if (isAuth) {
        return true;
      }
      return router.createUrlTree(['auth']);
    })
  );
};
