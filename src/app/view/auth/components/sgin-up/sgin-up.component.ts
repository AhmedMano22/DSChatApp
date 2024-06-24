import { ChangeDetectorRef, Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { TranslateService } from '@ngx-translate/core';
import { AuthServiceService } from '../../../../core/services/auth-service.service';
import { UsersService } from 'src/app/core/services/users.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-sgin-up',
  templateUrl: './sgin-up.component.html',
  styleUrls: ['./sgin-up.component.scss'],
})
export class SginUpComponent {
  value!: string;
  promptLabel!: string;
  weakLabel!: string;
  mediumLabel!: string;
  strongLabel!: string;
  key = 0;
  SginUpForm!: FormGroup;
  iconPosition: 'left' | 'right' = 'left';
  registerBy: string = 'phone';
  constructor(
    private translate: TranslateService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private authService: AuthServiceService,
    private router: Router,
    private toast: HotToastService,
    private userService: UsersService
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
    this.updateValidation();
  }
  private initForm(): void {
    this.SginUpForm = this.fb.group(
      {
        username: ['', [Validators.required]],
        email: [''],
        phone: [''],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordMatchValidator }
    );
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
  private passwordMatchValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordsMismatch: true };
  };
  private updateValidation(): void {
    if (this.registerBy === 'email') {
      this.SginUpForm.get('email')?.setValidators([
        Validators.required,
        Validators.email,
      ]);
      this.SginUpForm.get('phone')?.clearValidators();
    } else {
      this.SginUpForm.get('phone')?.setValidators([Validators.required]);
      this.SginUpForm.get('email')?.clearValidators();
    }
    this.SginUpForm.get('email')?.updateValueAndValidity();
    this.SginUpForm.get('phone')?.updateValueAndValidity();
  }
  private setDirectionality(lang: string): void {
    this.iconPosition = lang == 'ar' ? 'right' : 'left';
  }

  onSubmit(): void {
    console.log(this.SginUpForm.value);
    if (!this.SginUpForm.valid) {
      return;
    }
    const { username, email, password } = this.SginUpForm.value;
    if (username && email && password) {
      this.authService
        .signup(email, password)
        .pipe(
          // This switchMap ensures that in case of any signup, the user profile gets a real-time update with the user id, email, and display name
          switchMap((user) =>
            this.userService.addUser({
              uid: user.uid,
              email,
              displayName: username,
            })
          ),
          this.toast.observe({
            success: 'Account created successfully. Please verify your email.',
            loading: 'Creating account...',
            error: ({ message }) => `${message}`,
          })
        )
        .subscribe(() => {
          this.router.navigate(['auth/verify-email']);
        });
    }
  }
  get username() {
    return this.SginUpForm.get('username');
  }
  get email() {
    return this.SginUpForm.get('email');
  }
  get password() {
    return this.SginUpForm.get('password');
  }
  get confirmPassword() {
    return this.SginUpForm.get('confirmPassword');
  }
}
