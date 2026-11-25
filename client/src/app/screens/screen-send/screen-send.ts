import { ChangeDetectorRef, Component, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { APIService } from '../../services/api';
import { NotificationService } from '../../services/notification';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Modal } from '../../components/modal/modal';
import { QrScannerComponent } from '../../components/qr-scanner/qr-scanner';

@Component({
  selector: 'app-screen-send',
  imports: [FormsModule, QrScannerComponent],
  templateUrl: './screen-send.html',
  styleUrl: './screen-send.less',
})
export class ScreenSend {
  amount: number = 0;
  recipient: string = '';
  reference: string = '';
  private scannerModalRef?: NgbModalRef;
  private scannerHandled = true;
  @ViewChild('qrScanner') templScanner!: TemplateRef<any>;

  constructor(
    private api: APIService,
    private notify: NotificationService,
    private modalService: NgbModal,
    private cdr: ChangeDetectorRef,
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
    this.scannerHandled = false;
    const modalRef = this.modalService.open(Modal, { animation: false });
    modalRef.componentInstance.title = 'Scan a QR Code';
    modalRef.componentInstance.body = this.templScanner;
    this.scannerModalRef = modalRef;
    const forgetRef = () => {
      if (this.scannerModalRef === modalRef) this.scannerModalRef = undefined;
    };
    modalRef.closed.subscribe(forgetRef);
    modalRef.dismissed.subscribe(forgetRef);
  }

  onQrScanned(data: string) {
    if (this.scannerHandled || !data?.trim()) return;
    this.scannerHandled = true;
    const { recipient, amount } = this.parsePaymentQr(data);
    this.recipient = recipient;
    if (amount !== undefined) this.amount = amount;
    this.cdr.markForCheck();
    this.scannerModalRef?.close();
    this.notify.success(`Recipient set to ${recipient}`);
  }

  private parsePaymentQr(data: string): { recipient: string; amount?: number } {
    const value = data.trim();
    try {
      const url = new URL(value);
      const match = url.pathname.match(/\/send\/([^/]+)\/?$/);
      if (!match) return { recipient: value };

      const amountParam = url.searchParams.get('amount');
      const parsedAmount = amountParam === null ? NaN : Number(amountParam);
      return {
        recipient: decodeURIComponent(match[1]),
        amount: Number.isFinite(parsedAmount) && parsedAmount >= 0 ? parsedAmount : undefined,
      };
    } catch {
      // A QR code may also contain just an account id instead of a payment link.
      return { recipient: value };
    }
  }
}