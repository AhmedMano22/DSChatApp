import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstClassComponent } from './first-class.component';

describe('FirstClassComponent', () => {
  let component: FirstClassComponent;
  let fixture: ComponentFixture<FirstClassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FirstClassComponent]
    });
    fixture = TestBed.createComponent(FirstClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
