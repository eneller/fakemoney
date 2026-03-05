import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-screen-receive',
  imports: [FormsModule],
  templateUrl: './screen-receive.html',
  styleUrl: './screen-receive.less',
})
export class ScreenReceive {
  me = 'DemoUser';
  amount: number = 0;
  shareableLink: string = 'https://yourapp.com/receive?amount=0';

  copyLink() {
    navigator.clipboard.writeText(this.shareableLink);
    alert('Link copied to clipboard!');
  }

  shareViaEmail() {
    const email = `mailto:?subject=Request Money&body=Please send me $${this.amount} via ${this.shareableLink}`;
    window.location.href = email;
  }

  shareViaLink() {
    this.copyLink();
  }
}
