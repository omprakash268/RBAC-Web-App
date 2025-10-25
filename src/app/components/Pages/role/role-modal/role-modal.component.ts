import { Component, Inject } from '@angular/core';
import { Role } from '../../../../modals/modal';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RoleService } from '../../../../services/role.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-role-modal',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './role-modal.component.html',
  styleUrl: './role-modal.component.scss',
})
export class RoleModalComponent {
  form: FormGroup;
  isEdit = false;

  allPages = ['dashboard', 'users', 'roles'];
  allFeatures = ['add-user', 'edit-user', 'delete-user', 'assign-role'];

  constructor(
    private fb: FormBuilder,
    private roleService: RoleService,
    private dialogRef: MatDialogRef<RoleModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { roleId?: string }
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      pages: [[], Validators.required],
      features: [[]],
    });

    if (data?.roleId) {
      this.isEdit = true;
      const role = this.roleService.getRoleById(data.roleId);
      if (role) this.form.patchValue(role);
    }
  }

  submit() {
    if (this.form.invalid) return;

    const payload: Omit<Role, 'id'> = this.form.value;

    if (this.isEdit && this.data.roleId) {
      this.roleService.updateRole(this.data.roleId, payload);
    } else {
      this.roleService.createRole(payload);
    }

    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
