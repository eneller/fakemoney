import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenProfile } from './screen-profile';

describe('ScreenProfile', () => {
  let component: ScreenProfile;
  let fixture: ComponentFixture<ScreenProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScreenProfile],
    }).compileComponents();

    fixture = TestBed.createComponent(ScreenProfile);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
