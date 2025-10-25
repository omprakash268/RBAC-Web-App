import { Component } from '@angular/core';
import { Role } from '../../../models/model';
import { RoleService } from '../../../services/role.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-role',
  imports: [CommonModule],
  templateUrl: './role.component.html',
  styleUrl: './role.component.scss',
})
export class RoleComponent {
  roles:Role[] = [];

  constructor(private roleService: RoleService, private router: Router) {
    this.roles = this.roleService.getAllRoles();
  }

  create() {
    this.router.navigate(['/roles/create']);
  }

  edit(id: string) {
    this.router.navigate([`/roles/edit/${id}`]);
  }

  delete(id: string) {
    this.roleService.deleteRole(id);
    this.roles = this.roleService.getAllRoles();
  }
}
