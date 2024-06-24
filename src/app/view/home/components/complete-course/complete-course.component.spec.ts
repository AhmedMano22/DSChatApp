import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteCourseComponent } from './complete-course.component';

describe('CompleteCourseComponent', () => {
  let component: CompleteCourseComponent;
  let fixture: ComponentFixture<CompleteCourseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompleteCourseComponent]
    });
    fixture = TestBed.createComponent(CompleteCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
