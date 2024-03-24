import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;

  constructor(private readonly auth: AngularFireAuth) {
    this.auth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        localStorage.setItem('isLoggedIn', 'true');
        JSON.parse(localStorage.getItem('user')!);
        JSON.parse(localStorage.getItem('isLoggedIn')!);
      } else {
        localStorage.setItem('user', 'null');
        localStorage.setItem('isLoggedIn', 'null');
        JSON.parse(localStorage.getItem('user')!);
        JSON.parse(localStorage.getItem('isLoggedIn')!);
      }
    });
  }

  // Sign in with email/password
  signIn(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  // Sign out
  signOut() {
    return this.auth.signOut();
  }
}
