import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SginUpComponent } from './sgin-up.component';

describe('SginUpComponent', () => {
  let component: SginUpComponent;
  let fixture: ComponentFixture<SginUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SginUpComponent]
    });
    fixture = TestBed.createComponent(SginUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
