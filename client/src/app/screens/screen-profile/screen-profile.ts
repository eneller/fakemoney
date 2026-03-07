import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { APIService } from '../../services/api';
import Transaction from '@model/transaction';
import { Router } from '@angular/router';

@Component({
  selector: 'app-screen-profile',
  imports: [CurrencyPipe, DatePipe, CommonModule],
  templateUrl: './screen-profile.html',
  styleUrl: './screen-profile.less',
})
export class ScreenProfile implements OnInit{
  username = 'John Doe';
  userID = 'testuser';
  balance = 200;
  transactions!: Transaction[];

  constructor(
    private api: APIService,
    private router: Router,
  ){}

  ngOnInit(): void {
    // FIXME transactions displaying delayed (only on second nav click)
    this.api.getTransactions().subscribe({
      next: (transactions) => {
        this.transactions = transactions;
      },
      error: (err) => {
        console.error('Error fetching transactions:', err);
      },
    })
  }
  logOut(){
    this.api.logout().subscribe({
      next: () => {
        this.router.navigate(['login'])
      },
      error: (err) => {
        console.error('Error logging out:', err)
      }
    })
  }

}
