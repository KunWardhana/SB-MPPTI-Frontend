import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private readonly excludeUrls: string[] = ['/auth/sign-in'];

  constructor(
    private readonly router: Router,
    private readonly auth: AngularFireAuth
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.shouldExcludeUrl(state.url)) {
      return true; // Allow access to excluded URLs
    }

    if (!this.isLoggedIn()) {
      return this.handleUnauthenticated();
    }

    return this.auth.authState.pipe(
      map((user) => {
        if (!user) {
          return this.handleUnauthenticated();
        }
        return true;
      })
    );
  }

  private shouldExcludeUrl(url: string): boolean {
    return this.excludeUrls.includes(url);
  }

  private isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  private handleUnauthenticated(): boolean {
    this.router.navigateByUrl('/auth/sign-in');
    return false;
  }
}
