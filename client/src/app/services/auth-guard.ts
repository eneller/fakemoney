import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { APIService } from './api';
import { first, map } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const api = inject(APIService);
  const router = inject(Router);

  return api.checkAuthStatus().pipe(
    first(),
    map((isAuthenticated) => {
      if (isAuthenticated) {
        return true;
      } else {
        router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
      }
    })
  );
};
