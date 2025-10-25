import { Component } from '@angular/core';
import { PermissionService } from '../../../services/permission.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-dashboard-home',
  imports: [CommonModule,MatButtonModule],
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.scss',
})
export class DashboardHomeComponent {
  constructor(private perm: PermissionService, private router: Router) {}

  canAccess(page: string) {
    return this.perm.canAccessPage(page as any);
  }

  navigateToPage(page: string) {
    this.router.navigate(['/', page]);
  }
}
