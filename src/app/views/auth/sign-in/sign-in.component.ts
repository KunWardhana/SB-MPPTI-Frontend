import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { PopupConfirmationComponent } from 'src/app/shared/components/popup-confirmation/popup-confirmation.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PopupConfirmationComponent,
    NgOptimizedImage,
  ],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  signinForm: FormGroup;
  passVisibility = false;
  invalidAuth = false;

  isLoggedIn = localStorage.getItem('isLoggedIn');
  userData = localStorage.getItem('user');
  isVisible = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly spinnerService: NgxSpinnerService,
    private readonly metaService: Meta
  ) {
    this.signinForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.metaService.updateTag({
      name: 'description',
      content: "Desa Manud Jaya's Sign In Page",
    });

    this.handleLogout();
  }

  handleLogout() {
    localStorage.clear();
  }

  submitForm() {
    if (this.signinForm.valid) {
      this.spinnerService.show();
      const email = this.signinForm.controls['username'].value;
      const password = this.signinForm.controls['password'].value;
      this.authService.signIn(email, password).subscribe({
        next: (value: any) => {
          if (value.token) {
            window.localStorage.setItem('token', value?.token);
            this.spinnerService.hide();
            this.invalidAuth = false;
            this.router.navigate(['/admin/home']);
          }
        },
        error: () => {
          this.spinnerService.hide();
        },
      });
    }
  }

  onClickTutup() {
    this.isVisible = false;
  }

  emitModalData(e: any) {
    this.isVisible = e.visible;
  }
}
