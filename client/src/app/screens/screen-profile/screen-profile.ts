import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { APIService } from '../../services/api';
import Transaction from '@model/transaction';

@Component({
  selector: 'app-screen-profile',
  imports: [CurrencyPipe, DatePipe, CommonModule],
  templateUrl: './screen-profile.html',
  styleUrl: './screen-profile.less',
})
export class ScreenProfile implements OnInit{
  username = 'John Doe';
  email = 'john.doe@example.com';
  transactions!: Transaction[];

  constructor(private api: APIService){}

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

}
