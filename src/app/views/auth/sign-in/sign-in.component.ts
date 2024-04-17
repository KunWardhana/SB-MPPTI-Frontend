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
    // private readonly auth: AngularFireAuth,
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
    // this.spinnerService.show();
    // if (this.isLoggedIn) {
    //   this.authService
    //     .signOut()
    //     .then(() => {
    //       localStorage.clear();
    //       this.spinnerService.hide();
    //     })
    //     .catch(() => {
    //       this.isVisible = true;
    //       this.spinnerService.hide();
    //     });
    // } else {
    //   this.spinnerService.hide();
    // }
  }

  submitForm() {
    const userValid =
      this.signinForm.valid &&
      this.signinForm.controls['username'].value === 'admin';

    if (userValid) {
      const email = 'admin@gmail.com';
      const password = this.signinForm.controls['password'].value;
      this.authService.signIn(email, password).subscribe({
        next: (value) => {
          this.spinnerService.hide();
          this.invalidAuth = false;
          console.log('login');
          console.log(value);
        },
      });
    }

    this.router.navigate(['/admin/home']);
    // if (userValid) {
    //   const email = 'gfe.office365@gmail.com';
    //   const password = this.signinForm.controls['password'].value;
    //   this.spinnerService.show();
    //   this.authService
    //     .signIn(email, password)
    //     .then((result) => {
    //       this.auth.authState.subscribe({
    //         next: (user: any) => {
    //           this.spinnerService.hide();
    //           this.invalidAuth = false;
    //           if (user) {
    //           } else {
    //             this.isVisible = true;
    //           }
    //         },
    //       });
    //     })
    //     .catch((error) => {
    //       this.spinnerService.hide();
    //       this.isVisible = true;
    //     });
    // } else {
    //   this.invalidAuth = true;
    // }
  }

  onClickTutup() {
    this.isVisible = false;
  }

  emitModalData(e: any) {
    this.isVisible = e.visible;
  }
}
