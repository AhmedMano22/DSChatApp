import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassCoursesComponent } from './class-courses.component';

describe('ClassCoursesComponent', () => {
  let component: ClassCoursesComponent;
  let fixture: ComponentFixture<ClassCoursesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassCoursesComponent]
    });
    fixture = TestBed.createComponent(ClassCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
