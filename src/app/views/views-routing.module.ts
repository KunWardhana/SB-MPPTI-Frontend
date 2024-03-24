import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from '../shared/layout/auth-layout/auth-layout.component';
import { AppLayoutComponent } from '../shared/layout/app-layout/app-layout.component';
import { AuthGuard } from '../core/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/sign-in',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'sign-in',
        title: 'Sign In',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./auth/sign-in/sign-in.component').then(
            (c) => c.SignInComponent
          ),
      },
    ],
  },
  {
    path: 'admin',
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
      },
      {
        path: 'home',
        title: 'Desa Manud Jaya - Home',
        // canActivate: [AuthGuard],
        loadComponent: () =>
          import('./admin/landing-page/landing-page.component').then(
            (c) => c.LandingPageComponent
          ),
      },
      {
        path: 'article',
        children: [
          {
            path: '',
            title: 'Desa Manud Jaya - Article',
            // canActivate: [AuthGuard],
            loadComponent: () =>
              import(
                './admin/article/list-article/list-article.component'
              ).then((c) => c.ListArticleComponent),
          },
          {
            path: 'add',
            title: 'Desa Manud Jaya - Add Article',
            // canActivate: [AuthGuard],
            loadComponent: () =>
              import('./admin/article/add-article/add-article.component').then(
                (c) => c.AddArticleComponent
              ),
          },
        ],
      },
    ],
  },
  {
    path: 'apps',
    component: AppLayoutComponent,
    children: [
      {
        path: 'home',
        title: 'Desa Manud Jaya - Home',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewsRoutingModule {}
