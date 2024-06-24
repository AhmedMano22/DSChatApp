import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { concatMap } from 'rxjs';
import { ProfileUser } from 'src/app/core/interfaces/ProfileUser';
import { AuthServiceService } from 'src/app/core/services/auth-service.service';
import { ImageUploadService } from 'src/app/core/services/image-upload.service';
import { UsersService } from 'src/app/core/services/users.service';
@UntilDestroy()
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  constructor(
    private authService: AuthServiceService,
    private imageUploadService: ImageUploadService,
    private toast: HotToastService,
    private userService: UsersService
  ) {}
  ngOnInit(): void {
    this.userService.currentUserProfile$
      .pipe(untilDestroyed(this))
      .subscribe((user) => this.profileForm.patchValue({ ...user }));
  }
  user$ = this.userService.currentUserProfile$;
  uploadImage(event: any, { uid }: ProfileUser) {
    const file = event.target.files[0]; // access the first file in the files array

    this.imageUploadService
      .uploadImg(file, `images/profile/${uid}`)
      .pipe(
        this.toast.observe({
          loading: 'Image is uploading..',
          success: 'Image uploaded',
          error: 'Somthing went wrong, try again pls',
        }),
        concatMap((photoURL) => this.userService.updateUser({ uid, photoURL }))
      )
      .subscribe();
  }

  profileForm = new FormGroup({
    uid: new FormControl(''),
    email: new FormControl(''),
    displayName: new FormControl(''),
    photoURL: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phoneNumber: new FormControl(''),
    address: new FormControl(''),
  });

  submitProfile() {
    if (!this.profileForm.valid) {
      return;
    }

    const profileData = this.profileForm.value as ProfileUser;

    this.userService
      .updateUser(profileData)
      .pipe(
        this.toast.observe({
          loading: 'Data is being updated',
          success: 'Data updated successfully',
          error: 'Error while updating data',
        })
      )
      .subscribe();
  }
}
