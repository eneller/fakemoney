import { AfterViewInit, Component, ElementRef, EventEmitter, inject, InjectionToken, OnDestroy, Output, signal, ViewChild } from '@angular/core';
import QrScanner from 'qr-scanner';

export interface QrScannerHandle {
  start(): Promise<void>;
  stop(): void;
  destroy(): void;
}

export interface QrScannerFactory {
  create(video: HTMLVideoElement, onDecode: (data: string) => void): QrScannerHandle;
}

export const QR_SCANNER_FACTORY = new InjectionToken<QrScannerFactory>('QR_SCANNER_FACTORY', {
  providedIn: 'root',
  factory: () => ({
    create: (video, onDecode) => new QrScanner(
      video,
      (result) => onDecode(result.data),
      {
        returnDetailedScanResult: true,
        preferredCamera: 'environment',
        highlightScanRegion: true,
        highlightCodeOutline: true,
      },
    ),
  }),
});

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.html',
  styleUrl: './qr-scanner.less',
})
export class QrScannerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('video') private video!: ElementRef<HTMLVideoElement>;
  @Output() scanned = new EventEmitter<string>();

  readonly error = signal<string | null>(null);
  private factory = inject(QR_SCANNER_FACTORY);
  private scanner?: QrScannerHandle;
  private scannedOnce = false;
  private destroyed = false;

  async ngAfterViewInit(): Promise<void> {
    try {
      // Call start() directly so the browser shows its permission prompt.
      // Checking hasCamera() first can suppress the prompt on mobile devices.
      if (this.destroyed) return;
      const scanner = this.factory.create(
        this.video.nativeElement,
        (data) => {
          // A code stays in view for many frames; only report it once.
          if (this.scannedOnce) return;
          this.scannedOnce = true;
          this.scanner?.stop();
          this.scanned.emit(data);
        },
      );
      this.scanner = scanner;
      await scanner.start();
      if (this.destroyed) {
        scanner.destroy();
        this.scanner = undefined;
      }
    } catch (err: unknown) {
      const name = err instanceof DOMException ? err.name : '';
      if (name === 'NotFoundError' || name === 'OverconstrainedError') {
        this.error.set('No camera found on this device.');
      } else if (name === 'NotAllowedError' || name === 'PermissionDeniedError' || name === 'SecurityError') {
        this.error.set('Camera access is blocked. Allow it for this site and use HTTPS (or localhost).');
      } else {
        this.error.set('Could not start the camera. Camera access requires HTTPS (or localhost).');
      }
      this.scanner?.destroy();
      this.scanner = undefined;
    }
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    this.scanner?.destroy();
  }
}
