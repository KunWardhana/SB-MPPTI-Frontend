import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { BehaviorSubject, Observable, filter } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private isRefresh = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  url: string = '';
  urlArray: string[] = [];

  constructor(private readonly router: Router) {
    if (!this.url && !this.urlArray) {
      this.url = this.router.url;
      this.urlArray = this.url.split('/').filter((val) => {
        if (val) return true;
        return false;
      });
    }

    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((data: any) => {
        this.url = data?.url;
        this.urlArray = this.url.split('/').filter((val) => {
          if (val) return true;
          return false;
        });
      });
  }

  addTokenHeader(request: HttpRequest<any>) {
    const token = window.localStorage.getItem('token');

    if (token) {
      return request.clone({
        withCredentials: true,
        headers: request.headers.set('Authorization', `Bearer ${token}`),
      });
    } else {
      return request;
    }
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = this.addTokenHeader(request);
    return next.handle(request);
  }
}
