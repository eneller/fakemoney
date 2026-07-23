import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { APIService } from '../../services/api';
import Transaction from '@model/transaction';
import { Router } from '@angular/router';
import { NgbAccordionToggle, NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-screen-profile',
  imports: [CurrencyPipe, DatePipe, CommonModule, NgbDropdown, NgbDropdownMenu, NgbDropdownToggle, NgbDropdownItem],
  templateUrl: './screen-profile.html',
  styleUrl: './screen-profile.less',
})
export class ScreenProfile implements OnInit{
  transactions = signal<Transaction[]>([])

  constructor(
    protected api: APIService,
    private router: Router,
  ){}

  ngOnInit(): void {
    this.api.getTransactions().subscribe({
      next: (transactions) => {
        this.transactions.set(transactions);
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
