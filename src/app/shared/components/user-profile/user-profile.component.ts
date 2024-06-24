import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileUser } from 'src/app/core/interfaces/ProfileUser';
import { AuthServiceService } from 'src/app/core/services/auth-service.service';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  @Input() user!: ProfileUser;
  public path = '../../../../assets/images/image.png';
  // User = {
  //   firstName: 'Ahmed',
  //   lastName: 'Saeed',
  //   image: '../../../../assets/images/default.jpg',
  // };
  constructor(
    private authService: AuthServiceService,
    private router: Router,
    private userService: UsersService
  ) {}
  logout() {
    this.authService.logout().subscribe(() => this.router.navigate(['']));
  }
}
