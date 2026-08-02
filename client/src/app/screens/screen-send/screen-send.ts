import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { APIService } from '../../services/api';
import { NotificationService } from '../../services/notification';
import  QrScanner from 'qr-scanner';
import { NgbModal, NgbSlide } from '@ng-bootstrap/ng-bootstrap';
import { Modal } from '../../components/modal/modal';

@Component({
  selector: 'app-screen-send',
  imports: [FormsModule, NgbSlide],
  templateUrl: './screen-send.html',
  styleUrl: './screen-send.less',
})
export class ScreenSend {
  amount: number = 0;
  recipient: string = '';
  reference: string = '';
  scanner!: QrScanner;
  @ViewChild('qrScanner') templScanner!: TemplateRef<any>;

  constructor(
    private api: APIService,
    private notify: NotificationService,
    private modalService: NgbModal,
  ){}

  sendMoney() {
    this.api.send(this.amount, this.recipient, this.reference).subscribe({
      next:()=> {
        this.notify.success(`Sent ${this.amount} to ${this.recipient}`);
        this.clear()
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
  openScanner(){
    const modalRef = this.modalService.open(Modal);
    modalRef.componentInstance.title = 'Scan a QR Code';
    modalRef.componentInstance.body = this.templScanner;


  }
  closeScanner(){}
}