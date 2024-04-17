import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;

  constructor(private readonly httpClient: HttpClient) {}

  // Sign in with email/password
  signIn(email: string, password: string) {
    const url = `${environment.backendUrl}login`;
    return this.httpClient.post(url, {
      email,
      password,
    });
  }

  // Sign out
  signOut() {}
}
