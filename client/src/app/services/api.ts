import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import Transaction from '@model/transaction'
import { SendRequest, SendResponse } from '@message/Send';
import { TransactionsRequest } from '@message/Transactions';
import { LoginResponse } from '@message/Login';
import Account from '@model/user';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  private apiUrl = '/api';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  
  currentUser!: Account;
  ownedAccounts!: Account[];

  constructor(private http: HttpClient){}

  login(username: string, password: string): Observable<any>{
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`,{ 'username': username, 'password': password}).pipe(
      tap({
        next: (resp) => {
          this.isAuthenticatedSubject.next(true);
          this.currentUser = resp.user;
          this.ownedAccounts = resp.ownedAccounts;
        },
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
    return this.http.get(`${this.apiUrl}/auth/status`).pipe(
      map(() => true),
      catchError(() => of(false)),
      tap( authenticated => {
        this.isAuthenticatedSubject.next(authenticated);
      })
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
