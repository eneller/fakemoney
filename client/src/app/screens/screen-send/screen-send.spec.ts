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
});
