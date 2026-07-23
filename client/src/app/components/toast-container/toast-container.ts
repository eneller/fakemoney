import { Component, inject } from '@angular/core';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from '../../services/notification';

@Component({
  selector: 'app-toast-container',
  imports: [NgbToastModule],
  templateUrl: './toast-container.html',
  styleUrl: './toast-container.less',
})
export class ToastContainer {
  notifications = inject(NotificationService);
}
