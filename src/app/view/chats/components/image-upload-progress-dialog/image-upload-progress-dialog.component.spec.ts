import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageUploadProgressDialogComponent } from './image-upload-progress-dialog.component';

describe('ImageUploadProgressDialogComponent', () => {
  let component: ImageUploadProgressDialogComponent;
  let fixture: ComponentFixture<ImageUploadProgressDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImageUploadProgressDialogComponent]
    });
    fixture = TestBed.createComponent(ImageUploadProgressDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
