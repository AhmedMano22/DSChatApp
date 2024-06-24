import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatsRoutingModule } from './chats-routing.module';
import { ChatsComponent } from './chats.component';
import { MainComponent } from './components/main/main.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmDeleteDialogComponent } from './components/confirm-delete-dialog/confirm-delete-dialog.component';
import { ImageUploadProgressDialogComponent } from './components/image-upload-progress-dialog/image-upload-progress-dialog.component';
import { UserListDialogComponent } from './components/user-list-dialog/user-list-dialog.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { ListboxModule } from 'primeng/listbox';
@NgModule({
  declarations: [
    ChatsComponent,
    MainComponent,
    ConfirmDeleteDialogComponent,
    ImageUploadProgressDialogComponent,
    UserListDialogComponent,
  ],
  imports: [
    CommonModule,
    ChatsRoutingModule,
    SharedModule,
    TranslateModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    PickerModule,
    ListboxModule,
  ],
})
export class ChatsModule {}
