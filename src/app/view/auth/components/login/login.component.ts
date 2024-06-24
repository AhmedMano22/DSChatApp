import { ChangeDetectorRef, Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AuthServiceService } from '../../../../core/services/auth-service.service';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  value!: string;
  promptLabel!: string;
  weakLabel!: string;
  mediumLabel!: string;
  strongLabel!: string;
  key = 0;
  loginForm!: FormGroup;
  iconPosition: 'left' | 'right' = 'left';
  registerBy: string = 'phone';
  constructor(
    private translate: TranslateService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private authService: AuthServiceService,
    private router: Router,
    private toast: HotToastService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.translateLabels();
    this.translate.onLangChange.subscribe(() => {
      this.translateLabels();
      this.initForm();
    });
    this.setDirectionality(this.translate.currentLang);
    this.translate.onLangChange.subscribe((event) => {
      this.setDirectionality(event.lang);
    });
  }
  private initForm(): void {
    this.loginForm = this.fb.group({
      email: [''],
      phone: [''],
      password: ['', [Validators.required]],
    });
  }
  private translateLabels() {
    this.translate
      .get([
        'CHOOSE_PASSWORD',
        'PASSWORD_TOO_SIMPLE',
        'PASSWORD_AVERAGE_COMPLEXITY',
        'PASSWORD_COMPLEX',
      ])
      .subscribe((translations) => {
        this.promptLabel = translations['CHOOSE_PASSWORD'];
        this.weakLabel = translations['PASSWORD_TOO_SIMPLE'];
        this.mediumLabel = translations['PASSWORD_AVERAGE_COMPLEXITY'];
        this.strongLabel = translations['PASSWORD_COMPLEX'];
        this.cdr.detectChanges();
      });
  }
  onRegisterByChange(method: string): void {
    this.registerBy = method;
    console.log(method);

    this.updateValidation();
  }

  private updateValidation(): void {
    if (this.registerBy === 'email') {
      this.loginForm
        .get('email')
        ?.setValidators([Validators.required, Validators.email]);
      this.loginForm.get('phone')?.clearValidators();
    } else {
      this.loginForm.get('phone')?.setValidators([Validators.required]);
      this.loginForm.get('email')?.clearValidators();
    }
    this.loginForm.get('email')?.updateValueAndValidity();
    this.loginForm.get('phone')?.updateValueAndValidity();
  }
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
  onSubmit(): void {
    console.log(this.loginForm.value);
    if (!this.loginForm.valid) {
      return;
    }
    const { email, password } = this.loginForm.value;
    if (email && password) {
      this.authService
        .login(email, password)
        .pipe(
          this.toast.observe({
            success: 'Logged in successfully',
            loading: 'loading wait a moment',
            error: 'Encountered an error try again',
          })
        )
        .subscribe(() => {
          this.router.navigate(['/']);
        });
    }
  }

  private setDirectionality(lang: string): void {
    this.iconPosition = lang == 'ar' ? 'right' : 'left';
  }
}
