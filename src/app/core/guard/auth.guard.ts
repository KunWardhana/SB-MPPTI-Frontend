import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  private readonly excludeUrls: string[] = ['/auth/sign-in'];

  constructor(private readonly router: Router) {}

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

    return true;
  }

  private shouldExcludeUrl(url: string): boolean {
    return this.excludeUrls.includes(url);
  }

  private isLoggedIn(): boolean {
    return !!window.localStorage.getItem('token');
  }

  private handleUnauthenticated(): boolean {
    this.router.navigateByUrl('/auth/sign-in');
    return false;
  }
}
