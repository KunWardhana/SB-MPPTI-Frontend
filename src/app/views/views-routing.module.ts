import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from '../shared/layout/auth-layout/auth-layout.component';
import { AppLayoutComponent } from '../shared/layout/app-layout/app-layout.component';
import { AuthGuard } from '../core/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'user/informasi-desa',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'sign-in',
        pathMatch: 'full',
      },
      {
        path: 'sign-in',
        title: 'Sign In',
        // canActivate: [AuthGuard],
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
        pathMatch: 'full',
      },
      {
        path: 'home',
        title: 'Desa Manud Jaya - Home',
        canActivate: [AuthGuard],
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
            canActivate: [AuthGuard],
            loadComponent: () =>
              import(
                './admin/article/list-article/list-article.component'
              ).then((c) => c.ListArticleComponent),
          },
          {
            path: 'add',
            title: 'Desa Manud Jaya - Add Article',
            canActivate: [AuthGuard],
            loadComponent: () =>
              import('./admin/article/add-article/add-article.component').then(
                (c) => c.AddArticleComponent
              ),
          },
        ],
      },
      {
        path: 'anggaran',
        children: [
          {
            path: '',
            title: 'Desa Manud Jaya - Anggaran',
            canActivate: [AuthGuard],
            loadComponent: () =>
              import(
                './admin/anggaran/list-anggaran/list-anggaran.component'
              ).then((c) => c.ListAnggaranComponent),
          },
          {
            path: 'add',
            title: 'Desa Manud Jaya - Add Anggaran',
            canActivate: [AuthGuard],
            loadComponent: () =>
              import(
                './admin/anggaran/add-anggaran/add-anggaran.component'
              ).then((c) => c.AddAnggaranComponent),
          },
        ],
      },
      {
        path: 'layanan',
        children: [
          {
            path: '',
            title: 'Desa Manud Jaya - Layanan',
            // canActivate: [AuthGuard],
            loadComponent: () =>
              import(
                './admin/layanan/list-layanan/list-layanan.component'
              ).then((c) => c.ListLayananComponent),
          },
          {
            path: 'add',
            title: 'Desa Manud Jaya - Add Layanan',
            // canActivate: [AuthGuard],
            loadComponent: () =>
              import('./admin/layanan/add-layanan/add-layanan.component').then(
                (c) => c.AddLayananComponent
              ),
          },
        ],
      },
    ],
  },
  {
    path: 'user',
    children: [
      {
        path: '',
        redirectTo: 'informasi-desa',
        pathMatch: 'full',
      },
      {
        path: 'informasi-desa',
        title: 'Informasi Desa',
        // canActivate: [AuthGuard],
        loadComponent: () =>
          import('./user/informasi-desa/informasi-desa.component').then(
            (c) => c.InformasiDesaPageComponent
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewsRoutingModule {}
