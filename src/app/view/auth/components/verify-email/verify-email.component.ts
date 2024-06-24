import { HotToastService } from '@ngneat/hot-toast';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription, interval, switchMap } from 'rxjs';
import { AuthServiceService } from 'src/app/core/services/auth-service.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss'],
})
export class VerifyEmailComponent {
  emailVerified$: Observable<boolean>;
  private intervalSubscription: Subscription | null = null;
  constructor(
    private authService: AuthServiceService,
    private router: Router,
    private toast: HotToastService
  ) {
    this.emailVerified$ = this.authService.checkEmailVerification();
  }

  ngOnInit() {
    // Periodically check email verification status every 10 seconds
    this.intervalSubscription = interval(1000)
      .pipe(switchMap(() => this.authService.checkEmailVerification()))
      .subscribe((isVerified) => {
        if (isVerified) {
          this.router.navigate(['/']);
          this.toast.success('Email verified successfully.');
        }
      });
  }

  ngOnDestroy() {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
  }

  resendVerificationEmail() {
    const user = this.authService.currentUser$;
    user.subscribe((currentUser) => {
      if (currentUser) {
        this.authService
          .sendVerificationEmail(currentUser)
          .pipe(
            this.toast.observe({
              success: 'Verification email sent successfully',
              loading: 'Sending verification email...',
              error: 'Error sending verification email',
            })
          )
          .subscribe();
      } else {
        this.toast.error('No authenticated user found');
      }
    });
  }

  checkVerificationStatus() {
    this.emailVerified$.subscribe((isVerified) => {
      if (isVerified) {
        this.router.navigate(['/']);
      } else {
        this.toast.error('Please verify your email first.');
      }
    });
  }
}
