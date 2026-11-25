import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { LoginResponse } from '@message/Login';
import Account from '@model/user';
import { APIService } from './api';

describe('APIService', () => {
  let service: APIService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(APIService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should restore the user and owned accounts from an existing session', async () => {
    const user = { id: 'alice', displayName: 'Alice', balance: 100 } as Account;
    const business = { id: 'business', displayName: 'Business', balance: 0 } as Account;
    const result = firstValueFrom(service.checkAuthStatus());

    const request = httpMock.expectOne('/api/auth/status');
    expect(request.request.method).toBe('GET');
    request.flush(new LoginResponse(user, [business]));

    expect(await result).toBe(true);
    expect(await firstValueFrom(service.isAuthenticated$)).toBe(true);
    expect(service.loggedInUser).toEqual(user);
    expect(service.currentUser).toEqual(user);
    expect(service.ownedAccounts).toEqual([business, user]);
  });

  it('should report unauthenticated when the session check fails', async () => {
    const result = firstValueFrom(service.checkAuthStatus());

    httpMock.expectOne('/api/auth/status')
      .flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });

    expect(await result).toBe(false);
    expect(await firstValueFrom(service.isAuthenticated$)).toBe(false);
  });
});
