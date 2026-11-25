import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QR_SCANNER_FACTORY, QrScannerComponent } from './qr-scanner';

describe('QrScannerComponent', () => {
  let fixture: ComponentFixture<QrScannerComponent>;
  let scanner: { start: ReturnType<typeof vi.fn>; destroy: ReturnType<typeof vi.fn> };
  let onDecode: (data: string) => void;
  let hasCamera: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    scanner = { start: vi.fn(() => Promise.resolve()), destroy: vi.fn() };
    hasCamera = vi.fn(() => Promise.resolve(true));
    await TestBed.configureTestingModule({
      imports: [QrScannerComponent],
      providers: [{
        provide: QR_SCANNER_FACTORY,
        useValue: {
          hasCamera,
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

  it('shows an error when no camera is available', async () => {
    hasCamera.mockResolvedValue(false);

    fixture.detectChanges();
    await fixture.whenStable();

    expect(fixture.componentInstance.error()).toContain('No camera');
    expect(scanner.start).not.toHaveBeenCalled();
  });

  it('stops the camera when destroyed', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    fixture.destroy();

    expect(scanner.destroy).toHaveBeenCalled();
  });
});
