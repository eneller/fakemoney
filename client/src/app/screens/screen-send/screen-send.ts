import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-screen-send',
  imports: [FormsModule],
  templateUrl: './screen-send.html',
  styleUrl: './screen-send.less',
})
export class ScreenSend {
  amount: number = 0;
  recipient: string = '';
  note: string = '';

  sendMoney() {
    console.log('Sending:', this.amount, 'to', this.recipient);
    // Add your logic here (e.g., API call)
  }

  cancel() {
    this.amount = 0;
    this.recipient = '';
    this.note = '';
  }
}