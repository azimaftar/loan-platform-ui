import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'login',
    canActivate: [guestGuard],
    loadComponent: () => import('./features/auth/login/login.component')
      .then(m => m.LoginComponent)
  },
  {
    path: 'register',
    canActivate: [guestGuard],
    loadComponent: () => import('./features/auth/register/register.component')
      .then(m => m.RegisterComponent)
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () => import('./features/dashboard/dashboard.component')
      .then(m => m.DashboardComponent)
  },
  {
    path: 'loans',
    canActivate: [authGuard],
    loadComponent: () => import('./features/loans/loan-list/loan-list.component')
      .then(m => m.LoanListComponent)
  },
  {
    path: 'loans/create',
    canActivate: [authGuard],
    loadComponent: () => import('./features/loans/loan-create/loan-create.component')
      .then(m => m.LoanCreateComponent)
  },
  {
    path: 'loans/:id',
    canActivate: [authGuard],
    loadComponent: () => import('./features/loans/loan-detail/loan-detail.component')
      .then(m => m.LoanDetailComponent)
  },
  {
    path: 'profile',
    canActivate: [authGuard],
    loadComponent: () => import('./features/profile/profile.component')
      .then(m => m.ProfileComponent)
  },
  { path: '**', redirectTo: 'dashboard' },
  {
    path: '**',
    loadComponent: () => import('./features/not-found/not-found.component')
      .then(m => m.NotFoundComponent)
  }
];
