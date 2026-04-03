import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import Transaction from '@model/transaction'
import { SendRequest, SendResponse } from '@message/Send';
import { TransactionsRequest } from '@message/Transactions';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  private apiUrl = '/api';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  
  constructor(private http: HttpClient){}

  login(username: string, password: string): Observable<any>{
    return this.http.post(`${this.apiUrl}/auth/login`,{ 'username': username, 'password': password});
  }
  logout(): Observable<any>{
    return this.http.post(`${this.apiUrl}/auth/logout`, {});
  }
  checkAuthStatus(): Observable<boolean> {
    return this.http.get(`${this.apiUrl}/auth/status`).pipe(
      map(() => true),
      catchError(() => of(false)),
      tap({
        next: () => this.isAuthenticatedSubject.next(true),
        error: () => this.isAuthenticatedSubject.next(false),
      })
    );
  }
  getTransactions(): Observable<Transaction[]>{
    return this.http.get<Transaction[]>(`${this.apiUrl}/transactions`);
  }
  send(amount: number, recipientID: string, reference: string = ""): Observable<SendResponse>{
    let request: SendRequest = {amount,  recipientID, reference};
    return this.http.post<SendResponse>(`${this.apiUrl}/send`, request);
  }
}
