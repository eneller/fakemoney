import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QR_SCANNER_FACTORY, QrScannerComponent } from './qr-scanner';

describe('QrScannerComponent', () => {
  let fixture: ComponentFixture<QrScannerComponent>;
  let scanner: { start: ReturnType<typeof vi.fn>; stop: ReturnType<typeof vi.fn>; destroy: ReturnType<typeof vi.fn> };
  let onDecode: (data: string) => void;

  beforeEach(async () => {
    scanner = { start: vi.fn(() => Promise.resolve()), stop: vi.fn(), destroy: vi.fn() };
    await TestBed.configureTestingModule({
      imports: [QrScannerComponent],
      providers: [{
        provide: QR_SCANNER_FACTORY,
        useValue: {
          create: (_video: HTMLVideoElement, decode: (data: string) => void) => {
            onDecode = decode;
            return scanner;
          },
        },
      }],
    }).compileComponents();
    fixture = TestBed.createComponent(QrScannerComponent);
  });

  it('starts the camera and emits decoded codes', async () => {
    const scanned = vi.fn();
    fixture.componentInstance.scanned.subscribe(scanned);

    fixture.detectChanges();
    await fixture.whenStable();
    onDecode('bob');

    expect(scanner.start).toHaveBeenCalled();
    expect(scanned).toHaveBeenCalledWith('bob');
  });

  it('reports only the first decode and stops the camera', async () => {
    const scanned = vi.fn();
    fixture.componentInstance.scanned.subscribe(scanned);

    fixture.detectChanges();
    await fixture.whenStable();
    onDecode('bob');
    onDecode('bob');

    expect(scanned).toHaveBeenCalledTimes(1);
    expect(scanner.stop).toHaveBeenCalledTimes(1);
  });

  it('shows a helpful error when camera access is blocked', async () => {
    scanner.start.mockRejectedValueOnce(new DOMException('denied', 'NotAllowedError'));

    fixture.detectChanges();
    await fixture.whenStable();

    expect(fixture.componentInstance.error()).toContain('HTTPS');
    expect(scanner.destroy).toHaveBeenCalled();
  });

  it('stops the camera when destroyed', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    fixture.destroy();

    expect(scanner.destroy).toHaveBeenCalled();
  });
});
