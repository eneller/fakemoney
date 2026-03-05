import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-screen-profile',
  imports: [CurrencyPipe, DatePipe, CommonModule],
  templateUrl: './screen-profile.html',
  styleUrl: './screen-profile.less',
})
export class ScreenProfile {
    username = 'John Doe';
  email = 'john.doe@example.com';

  transactions = [
    { partner: 'Alice Smith', amount: 50.00, date: new Date('2026-03-01'), type: 'Received' },
    { partner: 'Bob Johnson', amount: -25.50, date: new Date('2026-02-28'), type: 'Sent' },
    { partner: 'Charlie Brown', amount: 75.25, date: new Date('2026-02-27'), type: 'Received' },
    { partner: 'Diana Prince', amount: -100.00, date: new Date('2026-02-25'), type: 'Sent' },
  ];
}
