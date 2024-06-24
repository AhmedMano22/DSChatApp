import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, combineLatest, map, startWith } from 'rxjs';
import { ProfileUser } from 'src/app/core/interfaces/ProfileUser';
import { UsersService } from 'src/app/core/services/users.service';
@Component({
  selector: 'app-user-list-dialog',
  templateUrl: './user-list-dialog.component.html',
  styleUrls: ['./user-list-dialog.component.scss'],
})
export class UserListDialogComponent {
  searchControl = new FormControl('');
  users$: Observable<ProfileUser[]> = this.usersService.allUsers$;
  filteredUsers$!: Observable<ProfileUser[]>;

  constructor(
    private dialogRef: MatDialogRef<UserListDialogComponent>,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.filteredUsers$ = combineLatest([
      this.users$,
      this.searchControl.valueChanges.pipe(startWith('')),
      this.usersService.currentUserProfile$,
    ]).pipe(
      map(([users, searchString, currentUser]) =>
        users.filter(
          (user) =>
            user.uid !== currentUser?.uid &&
            user
              .displayName!.toLowerCase()
              .includes(searchString!.toLowerCase())
        )
      )
    );
  }

  selectUser(user: ProfileUser): void {
    this.dialogRef.close(user);
  }
}
