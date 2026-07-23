import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { APIService } from '../../services/api';
import { NotificationService } from '../../services/notification';

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
    private notify: NotificationService,
  ){}

  sendMoney() {
    this.api.send(this.amount, this.recipient, this.reference).subscribe({
      next:()=> {
        this.clear()
        this.notify.success(`Sent ${this.amount} to ${this.recipient}`);
      },
      error:(err)=> {
        if(err.status == 404){
          this.notify.error(`Invalid recipient "${this.recipient}"`);
        }
        else if(err.status == 402){
          this.notify.error(`Insufficient funds.`);
        }
        else{
          this.notify.error(`An error occurred during payment: ${err.status}`);
        }
      }
    });
  }

  clear() {
    this.amount = 0;
    this.recipient = '';
    this.reference = '';
  }
}