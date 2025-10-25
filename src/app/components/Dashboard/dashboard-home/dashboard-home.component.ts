import { Component } from '@angular/core';
import { PermissionService } from '../../../services/permission.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-home',
  imports: [CommonModule],
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
