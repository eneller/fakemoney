import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenSend } from './screen-send';

describe('ScreenSend', () => {
  let component: ScreenSend;
  let fixture: ComponentFixture<ScreenSend>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScreenSend],
    }).compileComponents();

    fixture = TestBed.createComponent(ScreenSend);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('fills the recipient and amount from a scanned payment link', () => {
    const close = vi.fn();
    component['scannerModalRef'] = { close } as any;

    component.onQrScanned('https://example.com/send/bob?amount=12.50');

    expect(component.recipient).toBe('bob');
    expect(component.amount).toBe(12.5);
    expect(close).toHaveBeenCalled();
  });

  it('accepts a scanned account id', () => {
    component.onQrScanned('  carol  ');

    expect(component.recipient).toBe('carol');
    expect(component.amount).toBe(0);
  });
});
