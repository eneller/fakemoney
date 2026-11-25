import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, provideRouter, Router, RouterStateSnapshot } from '@angular/router';
import { firstValueFrom, Observable, of, Subject } from 'rxjs';
import { authGuard } from './auth-guard';
import { APIService } from './api';

describe('authGuard', () => {
  const route = {} as ActivatedRouteSnapshot;
  const state = { url: '/send' } as RouterStateSnapshot;

  function executeGuard(): Observable<boolean> {
    return TestBed.runInInjectionContext(() => authGuard(route, state)) as Observable<boolean>;
  }

  it('should wait for the auth status result before allowing navigation', async () => {
    const authState = new Subject<boolean>();
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        { provide: APIService, useValue: { isAuthenticated$: authState.asObservable() } },
      ],
    });

    const result = firstValueFrom(executeGuard());
    authState.next(true);

    expect(await result).toBe(true);
  });

  it('should redirect to login with a return URL when unauthenticated', async () => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        { provide: APIService, useValue: { isAuthenticated$: of(false) } },
      ],
    });
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);

    expect(await firstValueFrom(executeGuard())).toBe(false);
    expect(navigate).toHaveBeenCalledWith(['/login'], { queryParams: { returnUrl: '/send' } });
  });
});
