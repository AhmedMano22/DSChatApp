import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplashDesignComponent } from './splash-design.component';

describe('SplashDesignComponent', () => {
  let component: SplashDesignComponent;
  let fixture: ComponentFixture<SplashDesignComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SplashDesignComponent]
    });
    fixture = TestBed.createComponent(SplashDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
