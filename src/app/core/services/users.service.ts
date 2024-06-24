import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
  query,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';

import { Observable, from, of, switchMap } from 'rxjs';
import { AuthServiceService } from './auth-service.service';
import { ProfileUser } from '../interfaces/ProfileUser';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(
    private firestore: Firestore,
    private authService: AuthServiceService
  ) {}

  get currentUserProfile$(): Observable<ProfileUser | null> {
    return this.authService.currentUser$.pipe(
      switchMap((user) => {
        if (!user?.uid) return of(null);
        const ref = doc(this.firestore, 'users', user?.uid);
        return docData(ref) as Observable<ProfileUser>; //docData is to get a real time update on our user doc
      })
    );
  }

  addUser(user: ProfileUser): Observable<any> {
    // creat ref to doc in the users collection with the id of the user
    const ref = doc(this.firestore, 'users', user?.uid);
    return from(setDoc(ref, user)); // creates the user's doc with its ref
  }

  updateUser(user: ProfileUser): Observable<any> {
    const ref = doc(this.firestore, 'users', user?.uid);
    return from(updateDoc(ref, { ...user }));
  }

  // To get all user our collection contains
  get allUsers$(): Observable<ProfileUser[]> {
    const ref = collection(this.firestore, 'users');
    const queryAll = query(ref);
    return collectionData(queryAll) as Observable<ProfileUser[]>;
  }
}
