import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeLecturesComponent } from './free-lectures.component';

describe('FreeLecturesComponent', () => {
  let component: FreeLecturesComponent;
  let fixture: ComponentFixture<FreeLecturesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FreeLecturesComponent]
    });
    fixture = TestBed.createComponent(FreeLecturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
