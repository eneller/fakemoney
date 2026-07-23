import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  notifications = signal<Notification[]>([]);

  show(notification: Notification) {
    this.notifications.update(items => [
      ...items,
      notification,
    ]);
  }

  remove(notification: Notification) {
    this.notifications.update(items =>
      items.filter(item => item !== notification)
    );
  }

  success(message: string) {
    this.show({ type: 'success', message});
  }

  error(message: string) {
    this.show({ type: 'danger', message});
  }

  warn(message: string) {
    this.show({ type: 'warning', message});
  }
  info(message: string) {
    this.show({ type: 'info', message});
  }
}
export interface Notification {
  type: 'success' | 'warning' | 'info' | 'danger';
  message: string;
  delay?: number;
}
