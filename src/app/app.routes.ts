import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/Auth/login/login.component';
import { DashboardHomeComponent } from './components/Dashboard/dashboard-home/dashboard-home.component';
import { DahboardLayoutComponent } from './components/Dashboard/dahboard-layout/dahboard-layout.component';


export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent },
    ],
  },
  {
    path: 'dashboard',
    component: DahboardLayoutComponent,
    // canActivate: [authGuard],
    children: [
      {
        path: '',
        component: DashboardHomeComponent,
        pathMatch: 'full',
      },
    ],
  },
  { path: '**', redirectTo: '' },
];

