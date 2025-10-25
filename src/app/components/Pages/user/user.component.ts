import { Component, ViewChild } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { RoleService } from '../../../services/role.service';
import { Router } from '@angular/router';
import { User } from '../../../models/model';
import { CommonModule } from '@angular/common';
import { HasfeatureDirective } from '../../../directives/hasfeature.directive';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';

@Component({ 
  selector: 'app-user',
  imports: [CommonModule,HasfeatureDirective,MatTableModule,MatPaginatorModule,MatButtonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  roleMap: Record<string, string> = {};
  displayedColumns: string[] = ['position','name', 'username', 'role', 'action'];
  dataSource:any

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private router: Router
  ) {
    this.roleService
      .getAllRoles()
      .forEach((r) => (this.roleMap[r.id] = r.name));
    this.dataSource = new MatTableDataSource<User>(this.userService.getAllUsers());
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  add() {
    this.router.navigate(['/users/add']);
  }
  edit(id: string) {
    this.router.navigate([`/users/edit/${id}`]);
  }
  delete(id: string) {
    this.userService.deleteUser(id);
    this.dataSource = this.userService.getAllUsers();
  }
}
