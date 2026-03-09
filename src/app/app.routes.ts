import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component')
      .then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register.component')
      .then(m => m.RegisterComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard.component')
      .then(m => m.DashboardComponent)
  },
  {
    path: 'loans',
    loadComponent: () => import('./features/loans/loan-list/loan-list.component')
      .then(m => m.LoanListComponent)
  },
  {
    path: 'loans/create',
    loadComponent: () => import('./features/loans/loan-create/loan-create.component')
      .then(m => m.LoanCreateComponent)
  },
  {
    path: 'loans/:id',
    loadComponent: () => import('./features/loans/loan-detail/loan-detail.component')
      .then(m => m.LoanDetailComponent)
  },
  {
    path: 'profile',
    loadComponent: () => import('./features/profile/profile.component')
      .then(m => m.ProfileComponent)
  },
  { path: '**', redirectTo: 'dashboard' }
];