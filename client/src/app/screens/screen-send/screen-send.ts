import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { APIService } from '../../services/api';

@Component({
  selector: 'app-screen-send',
  imports: [FormsModule],
  templateUrl: './screen-send.html',
  styleUrl: './screen-send.less',
})
export class ScreenSend {
  amount: number = 0;
  recipient: string = '';
  reference: string = '';

  constructor(
    private api: APIService,
  ){}

  sendMoney() {
    this.api.send(this.amount, this.recipient, this.reference).subscribe({
      next:()=> {
        this.cancel()
        //TODO show success message
      },
      error:()=> {
        //TODO show error message
      }
    });
  }

  cancel() {
    this.amount = 0;
    this.recipient = '';
    this.reference = '';
  }
}