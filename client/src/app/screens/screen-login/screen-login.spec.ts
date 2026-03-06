import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenLogin } from './screen-login';

describe('ScreenLogin', () => {
  let component: ScreenLogin;
  let fixture: ComponentFixture<ScreenLogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScreenLogin],
    }).compileComponents();

    fixture = TestBed.createComponent(ScreenLogin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
