import { Component, ViewChild } from '@angular/core';
import { Role } from '../../../models/model';
import { RoleService } from '../../../services/role.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import { HasfeatureDirective } from '../../../directives/hasfeature.directive';


@Component({
  selector: 'app-role',
  imports: [CommonModule,HasfeatureDirective,MatTableModule,MatPaginatorModule,MatButtonModule],
  templateUrl: './role.component.html',
  styleUrl: './role.component.scss',
})
export class RoleComponent {
  displayedColumns: string[] = ['position','pages', 'features', 'action'];
  dataSource:any

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private roleService: RoleService, private router: Router) {
    this.dataSource = new MatTableDataSource<Role>(this.roleService.getAllRoles());
  }

  create() {
    this.router.navigate(['/roles/create']);
  }

  edit(id: string) {
    this.router.navigate([`/roles/edit/${id}`]);
  }

  delete(id: string) {
    this.roleService.deleteRole(id);
    this.dataSource = this.roleService.getAllRoles();
  }
}
