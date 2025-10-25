import { Component, ViewChild } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { RoleService } from '../../../services/role.service';
import { User } from '../../../modals/modal';
import { CommonModule } from '@angular/common';
import { HasfeatureDirective } from '../../../directives/hasfeature.directive';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { UserModalComponent } from './user-modal/user-modal.component';

@Component({
  selector: 'app-user',
  imports: [
    CommonModule,
    HasfeatureDirective,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  roleMap: Record<string, string> = {};
  displayedColumns: string[] = [
    'position',
    'name',
    'username',
    'role',
    'action',
  ];
  dataSource: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private dialog: MatDialog
  ) {
    this.roleService
      .getAllRoles()
      .forEach((r) => (this.roleMap[r.id] = r.name));
    this.dataSource = new MatTableDataSource<User>(
      this.userService.getAllUsers()
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadUsers() {
    this.dataSource = new MatTableDataSource<User>(
      this.userService.getAllUsers()
    );
  }

  add() {
    this.dialog
      .open(UserModalComponent, {
        width: '400px',
        data: {},
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) this.loadUsers();
      });
  }
  edit(userId: string) {
    this.dialog
      .open(UserModalComponent, {
        width: 'userId400px',
        data: {},
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) this.loadUsers();
      });
  }
  delete(id: string) {
    this.userService.deleteUser(id);
    this.dataSource = this.userService.getAllUsers();
  }
}
