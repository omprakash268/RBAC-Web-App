import { Component, ViewChild } from '@angular/core';
import { Role } from '../../../modals/modal';
import { RoleService } from '../../../services/role.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { HasfeatureDirective } from '../../../directives/hasfeature.directive';
import { MatDialog } from '@angular/material/dialog';
import { RoleModalComponent } from './role-modal/role-modal.component';

@Component({
  selector: 'app-role',
  imports: [
    CommonModule,
    HasfeatureDirective,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
  ],
  templateUrl: './role.component.html',
  styleUrl: './role.component.scss',
})
export class RoleComponent {
  displayedColumns: string[] = ['position', 'pages', 'features', 'action'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private roleService: RoleService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource<Role>(
      this.roleService.getAllRoles()
    );
  }

  loadRoles() {
    this.dataSource = new MatTableDataSource<Role>(
      this.roleService.getAllRoles()
    );
  }

  create() {
    this.dialog
      .open(RoleModalComponent, {
        width: '400px',
        data: {},
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) this.loadRoles();
      });
  }

  edit(roleId: string) {
    this.dialog
      .open(RoleModalComponent, {
        width: 'userId400px',
        data: { roleId },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) this.loadRoles();
      });
  }

  delete(id: string) {
    this.roleService.deleteRole(id);
    this.dataSource = this.roleService.getAllRoles();
  }
}
