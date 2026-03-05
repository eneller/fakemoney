import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenReceive } from './screen-receive';

describe('ScreenReceive', () => {
  let component: ScreenReceive;
  let fixture: ComponentFixture<ScreenReceive>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScreenReceive],
    }).compileComponents();

    fixture = TestBed.createComponent(ScreenReceive);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
