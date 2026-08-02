import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenRequest } from './screen-request';

describe('ScreenReceive', () => {
  let component: ScreenRequest;
  let fixture: ComponentFixture<ScreenRequest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScreenRequest],
    }).compileComponents();

    fixture = TestBed.createComponent(ScreenRequest);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
