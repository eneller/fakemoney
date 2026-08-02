import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QrCodeComponent } from 'ng-qrcode';
import { APIService } from '../../services/api';
import { Modal } from '../../components/modal/modal';

@Component({
  selector: 'app-screen-receive',
  imports: [FormsModule, QrCodeComponent],
  templateUrl: './screen-receive.html',
  styleUrl: './screen-receive.less',
})
export class ScreenReceive {
  private modalService = inject(NgbModal);
  api = inject(APIService);
  @ViewChild('qrTemplate') qrTemplate !: TemplateRef<any>;

  amount: number = 0;
  get shareableLink(): string {
    const currentDomain = window.location.origin;
    return `${currentDomain}/send/${this.api.currentUser.id}?amount=${this.amount}`;
  }

  copyLink() {
    navigator.clipboard.writeText(this.shareableLink);
  }
  openModal() {
    const modalRef = this.modalService.open(Modal);
    modalRef.componentInstance.title = `Pay ${this.amount} to ${this.api.currentUser.id}`
    modalRef.componentInstance.body = this.qrTemplate;
  }
}
