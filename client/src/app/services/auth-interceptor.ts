import { HttpErrorResponse, HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { APIService } from './api';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const api = inject(APIService);
  const router = inject(Router)
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401){
        api.clearAuthState();
        router.createUrlTree(['/login']);
      }
      return throwError(() => err);
    })
  )
};
