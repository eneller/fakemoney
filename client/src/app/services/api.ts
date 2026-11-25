import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import Transaction from '@model/transaction'
import { SendRequest, SendResponse } from '@message/Send';
import { LoginResponse } from '@message/Login';
import Account from '@model/user';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  private apiUrl = '/api';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  
  // data holding
  loggedInUser!: Account;
  currentUser!: Account;
  ownedAccounts!: Account[];

  constructor(private http: HttpClient){}

  private restoreSession(resp: LoginResponse) {
    this.loggedInUser = resp.user;
    this.currentUser = this.loggedInUser;
    this.ownedAccounts = resp.ownedAccounts;
    this.ownedAccounts.push(this.loggedInUser);
    this.isAuthenticatedSubject.next(true);
  }

  login(username: string, password: string): Observable<any>{
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`,{ 'username': username, 'password': password}).pipe(
      tap({
        next: (resp) => this.restoreSession(resp),
        error: () => this.isAuthenticatedSubject.next(false)
      })
    );
  }
  logout(): Observable<any>{
    return this.http.post(`${this.apiUrl}/auth/logout`, {}).pipe(
    tap({
      next: () => this.isAuthenticatedSubject.next(false),
      error: () => this.isAuthenticatedSubject.next(false),
    })
  );
  }
  clearAuthState() {
    this.isAuthenticatedSubject.next(false);
  }
  checkAuthStatus(): Observable<boolean> {
    return this.http.get<LoginResponse>(`${this.apiUrl}/auth/status`).pipe(
      tap({
        next: (resp) => this.restoreSession(resp),
        error: () => this.clearAuthState(),
      }),
      map(() => true),
      catchError(() => of(false))
    );
  }
  getTransactions(): Observable<Transaction[]>{
    return this.http.get<Transaction[]>(`${this.apiUrl}/transactions`);
  }
  send(amount: number, recipientID: string, reference: string = ""): Observable<SendResponse>{
    
    let request: SendRequest = {senderID: this.currentUser.id, amount,  recipientID, reference};
    return this.http.post<SendResponse>(`${this.apiUrl}/send`, request);
  }
}
