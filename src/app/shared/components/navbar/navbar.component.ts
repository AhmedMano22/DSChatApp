import {
  Component,
  ElementRef,
  HostListener,
  QueryList,
  Renderer2,
  ViewChildren,
} from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ProfileUser } from 'src/app/core/interfaces/ProfileUser';
import { AuthServiceService } from 'src/app/core/services/auth-service.service';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @ViewChildren('default') defaultElements!: QueryList<ElementRef>;
  defaultLanguageFlag: string = '';
  islogin: boolean = false;
  isLoginActive: boolean = true;
  isSignupActive: boolean = false;
  constructor(
    public translate: TranslateService,
    private renderer: Renderer2,
    private el: ElementRef,
    private authService: AuthServiceService,
    private router: Router,
    private userService: UsersService
  ) {
    this.updateFlagAndLanguage(this.translate.currentLang);
    const storedLoginActive = localStorage.getItem('isLoginActive');
    this.isLoginActive = storedLoginActive === 'true';
    const storedSignupActive = localStorage.getItem('isSignupActive');
    this.isSignupActive = storedSignupActive === 'true';
  }
  user$ = this.userService.currentUserProfile$;
  currentUser: ProfileUser | null = null;
  ngOnInit(): void {
    this.user$.subscribe((user: ProfileUser | null) => {
      this.currentUser = user;
      if (user) {
        console.log('User data:', user);
      } else {
        console.log('No user logged in.');
      }
    });
  }
  switchLanguage(lang: string, flagUrl: string): void {
    this.translate.use(lang);
    this.defaultLanguageFlag = flagUrl;
    localStorage.setItem('app-lang', lang);
  }

  private updateFlagAndLanguage(lang: string): void {
    switch (lang) {
      case 'ar':
        this.defaultLanguageFlag = 'assets/images/flags/Saudi-flag.svg';
        break;
      case 'en':
        this.defaultLanguageFlag =
          'assets/images/flags/united_kingdom_flag.png';
        break;

      default:
        this.defaultLanguageFlag = 'assets/images/flags/Saudi-flag.svg';
        break;
    }
    this.translate.use(lang);
  }
  toggleActiveButton(button: string) {
    if (button === 'login') {
      this.isLoginActive = true;
      this.isSignupActive = false;
      localStorage.setItem('isLoginActive', JSON.stringify(true));
      localStorage.setItem('isSignupActive', JSON.stringify(false));
    } else if (button === 'signup') {
      this.isLoginActive = false;
      this.isSignupActive = true;
      localStorage.setItem('isLoginActive', JSON.stringify(false));
      localStorage.setItem('isSignupActive', JSON.stringify(true));
    }
  }
}
