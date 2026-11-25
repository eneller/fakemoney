import { AfterViewInit, Component, ElementRef, EventEmitter, inject, InjectionToken, OnDestroy, Output, signal, ViewChild } from '@angular/core';
import QrScanner from 'qr-scanner';

export interface QrScannerHandle {
  start(): Promise<void>;
  destroy(): void;
}

export interface QrScannerFactory {
  hasCamera(): Promise<boolean>;
  create(video: HTMLVideoElement, onDecode: (data: string) => void): QrScannerHandle;
}

export const QR_SCANNER_FACTORY = new InjectionToken<QrScannerFactory>('QR_SCANNER_FACTORY', {
  providedIn: 'root',
  factory: () => ({
    hasCamera: () => QrScanner.hasCamera(),
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
  private destroyed = false;

  async ngAfterViewInit(): Promise<void> {
    try {
      if (!await this.factory.hasCamera()) {
        this.error.set('No camera found on this device.');
        return;
      }
      if (this.destroyed) return;

      const scanner = this.factory.create(
        this.video.nativeElement,
        (data) => this.scanned.emit(data),
      );
      this.scanner = scanner;
      await scanner.start();
      if (this.destroyed) {
        scanner.destroy();
        this.scanner = undefined;
      }
    } catch {
      this.error.set('Could not access the camera. Please allow camera access and try again.');
      this.scanner?.destroy();
      this.scanner = undefined;
    }
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    this.scanner?.destroy();
  }
}
