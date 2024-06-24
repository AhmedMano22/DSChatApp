import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ChatsService } from 'src/app/core/services/chats.service';
@Component({
  selector: 'app-image-upload-progress-dialog',
  templateUrl: './image-upload-progress-dialog.component.html',
  styleUrls: ['./image-upload-progress-dialog.component.scss'],
})
export class ImageUploadProgressDialogComponent {
  uploadProgress = 0;
  caption = '';
  loading = true;
  imageUrl: string | null = null;

  constructor(
    private dialogRef: MatDialogRef<ImageUploadProgressDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { file: File; caption: string },
    private chatsService: ChatsService
  ) {
    this.caption = data.caption;
    this.previewImage(data.file);
    this.uploadImage(data.file);
  }

  previewImage(file: File) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageUrl = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  uploadImage(file: File) {
    this.chatsService.uploadImageWithProgress(file).subscribe(
      (progress) => {
        if (typeof progress === 'number') {
          this.uploadProgress = progress;
        } else if (typeof progress === 'string') {
          this.loading = false;
          this.imageUrl = progress;
        }
      },
      (error) => {
        this.loading = false;
        console.error('Upload failed:', error);
      }
    );
  }

  onSend() {
    if (this.imageUrl) {
      this.dialogRef.close({ imageUrl: this.imageUrl, caption: this.caption });
    }
  }

  onCancel() {
    this.dialogRef.close(null);
  }
}
