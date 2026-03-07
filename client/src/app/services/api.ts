import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Transaction from '@model/transaction'

@Injectable({
  providedIn: 'root',
})
export class APIService {
  private apiUrl = 'http://localhost:3000/api' 
  
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
}
