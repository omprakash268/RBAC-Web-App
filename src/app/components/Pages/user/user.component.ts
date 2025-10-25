import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { RoleService } from '../../../services/role.service';
import { Router } from '@angular/router';
import { User } from '../../../models/model';
import { CommonModule } from '@angular/common';
import { HasfeatureDirective } from '../../../directives/hasfeature.directive';

@Component({ 
  selector: 'app-user',
  imports: [CommonModule,HasfeatureDirective],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  users: User[] = [];
  roleMap: Record<string, string> = {};

  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private router: Router
  ) {
    this.roleService
      .getAllRoles()
      .forEach((r) => (this.roleMap[r.id] = r.name));
    this.users = this.userService.getAllUsers();
  }

  add() {
    this.router.navigate(['/users/add']);
  }
  edit(id: string) {
    this.router.navigate([`/users/edit/${id}`]);
  }
  delete(id: string) {
    this.userService.deleteUser(id);
    this.users = this.userService.getAllUsers();
  }
}
