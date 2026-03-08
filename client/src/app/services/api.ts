import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import Transaction from '@model/transaction'

@Injectable({
  providedIn: 'root',
})
export class APIService {
  private apiUrl = 'http://localhost:3000/api' 
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  
  constructor(private http: HttpClient){}

  getTransactions(): Observable<Transaction[]>{
    return this.http.get<Transaction[]>(this.apiUrl + '/transactions');
  }
  login(username: string, password: string): Observable<any>{
    return this.http.post(this.apiUrl + '/auth/login',{ 'username': username, 'password': password});
  }
  logout(): Observable<any>{
    return this.http.post(this.apiUrl + '/auth/logout', {});
  }
  checkAuthStatus(): Observable<boolean> {
    return this.http.get(`${this.apiUrl}/auth/status`, { withCredentials: true}).pipe(
      map(() => true),
      catchError(() => of(false)),
      tap({
        next: () => this.isAuthenticatedSubject.next(true),
        error: () => this.isAuthenticatedSubject.next(false),
      })
    );
  }
}
