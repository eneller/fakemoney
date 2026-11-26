import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastContainer } from './toast-container';

describe('ToastContainer', () => {
  let component: ToastContainer;
  let fixture: ComponentFixture<ToastContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastContainer],
    }).compileComponents();

    fixture = TestBed.createComponent(ToastContainer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('centers the toasts horizontally', () => {
    const container = fixture.nativeElement.querySelector('.toast-container') as HTMLElement;
    expect(container.classList.contains('start-50')).toBe(true);
    expect(container.classList.contains('translate-middle-x')).toBe(true);
    expect(container.classList.contains('end-0')).toBe(false);
  });
});
