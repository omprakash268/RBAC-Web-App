import { Routes } from '@angular/router';
import { LoginComponent } from './components/Pages/login/login.component';
import { DashboardHomeComponent } from './components/Dashboard/dashboard-home/dashboard-home.component';
import { UserComponent } from './components/Pages/user/user.component';
import { RoleComponent } from './components/Pages/role/role.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardHomeComponent,
    canActivate: [authGuard],
    data: { page: 'dashboard' },
  },
  {
    path: 'users',
    component: UserComponent,
    canActivate: [authGuard],
    data: { page: 'users' },
  },
  {
    path: 'roles',
    component: RoleComponent,
    canActivate: [authGuard],
    data: { page: 'roles' },
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' },
];
