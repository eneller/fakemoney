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
}
