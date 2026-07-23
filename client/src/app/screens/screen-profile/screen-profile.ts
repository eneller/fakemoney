import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
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
  // TODO display real data
  username = 'John Doe';
  balance = 200;
  transactions!: Transaction[];

  constructor(
    protected api: APIService,
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
        this.router.navigate(['/'])
      },
      error: (err) => {
        console.error('Error logging out:', err)
      }
    })
  }

}
