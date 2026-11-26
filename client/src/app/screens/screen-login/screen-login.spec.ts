import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ScreenLogin } from './screen-login';

describe('ScreenLogin', () => {
  let component: ScreenLogin;
  let fixture: ComponentFixture<ScreenLogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScreenLogin],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ScreenLogin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('anchors the login card near the top', () => {
    const container = fixture.nativeElement.firstElementChild as HTMLElement;
    expect(container.classList.contains('align-items-start')).toBe(true);
    expect(container.classList.contains('align-items-center')).toBe(false);
  });
});
