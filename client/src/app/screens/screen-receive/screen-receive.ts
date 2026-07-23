import { Component, inject, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QrCodeComponent } from 'ng-qrcode';
import { APIService } from '../../services/api';

@Component({
  selector: 'app-screen-receive',
  imports: [FormsModule, QrCodeComponent],
  templateUrl: './screen-receive.html',
  styleUrl: './screen-receive.less',
})
export class ScreenReceive {
  private modalService = inject(NgbModal);
  api = inject(APIService);

  amount: number = 0;
  get shareableLink(): string {
    const currentDomain = window.location.origin;
    return `${currentDomain}/send/${this.api.currentUser}?amount=${this.amount}`;
  }

  copyLink() {
    navigator.clipboard.writeText(this.shareableLink);
  }
  open(content: TemplateRef<any>) {
    this.modalService.open(content)
  }
}
