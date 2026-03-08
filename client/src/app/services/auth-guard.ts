import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { APIService } from './api';
import { map } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const api = inject(APIService);
  const router = inject(Router);

  return api.isAuthenticated$.pipe(
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
