import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  UserInfo,
  sendPasswordResetEmail,
  sendEmailVerification,
  User,
} from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, concatMap, from, of, switchMap } from 'rxjs';
import { ImageUploadService } from './image-upload.service';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor(
    private auth: Auth,
    private fireauth: AngularFireAuth,
    private imageUploadService: ImageUploadService
  ) {}

  // To add an absorver to when user is logged in our out
  currentUser$ = authState(this.auth);

  //Login Service
  login(email: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  //Logout
  logout() {
    return from(this.auth.signOut());
  }

  //Register Service
  signup(email: string, password: string): Observable<User> {
    return from(
      createUserWithEmailAndPassword(this.auth, email, password)
    ).pipe(
      switchMap(({ user }) =>
        this.sendVerificationEmail(user).pipe(switchMap(() => of(user)))
      )
    );
  }
  //Reset password
  resetPassword(email: string): Observable<void> {
    return from(sendPasswordResetEmail(this.auth, email));
  }
  //Email verification
  sendVerificationEmail(user: User) {
    return from(sendEmailVerification(user));
  }

  checkEmailVerification(): Observable<boolean> {
    const user = this.auth.currentUser;
    if (user) {
      return from(user.reload()).pipe(switchMap(() => of(user.emailVerified)));
    }
    return of(false);
  }

  //TODO Google login

  //Update Profile
  updateProfile(profileData: Partial<UserInfo>): Observable<any> {
    const user = this.auth.currentUser;
    return of(user).pipe(
      concatMap((user) => {
        if (!user) throw new Error('User Not Authenticated');
        return updateProfile(user, profileData);
      })
    );
  }
}
