import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../../../services/user.service';
import { RoleService } from '../../../../services/role.service';
import { PermissionService } from '../../../../services/permission.service';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { FeatureName, UserModalData } from '../../../../modals/modal';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { HasfeatureDirective } from '../../../../directives/hasfeature.directive';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-user-modal',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    HasfeatureDirective,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './user-modal.component.html',
  styleUrl: './user-modal.component.scss',
})
export class UserModalComponent {
  form: FormGroup;
  roles: any[] = [];
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private roleService: RoleService,
    private permissionService: PermissionService,
    private dialogRef: MatDialogRef<UserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserModalData
  ) {
    // Only show roles current user has access to
    this.roles = this.roleService
      .getAllRoles()
      .filter(
        (r) =>
          this.permissionService.hasFeature('assign-role') || r.id !== 'admin'
      );

    this.form = this.fb.group({
      username: ['', Validators.required],
      displayName: ['', Validators.required],
      password: ['', Validators.required],
      roleId: ['', Validators.required],
    });

    if (data.userId) this.loadUser(data.userId);
  }

  private loadUser(id: string) {
    const user = this.userService.getUserById(id);
    if (user) {
      this.form.patchValue({
        username: user.username,
        displayName: user.displayName,
        password: user.password,
        roleId: user.roleId,
      });
    }
  }

  save() {
    if (this.form.invalid) return;

    if (this.data.userId) {
      if (!this.permissionService.hasFeature('edit-user')) return; // RBAC check
      this.userService.updateUser(this.data.userId, this.form.value);
    } else {
      if (!this.permissionService.hasFeature('add-user')) return; // RBAC check
      this.userService.createUser(this.form.value);
    }

    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }

  // Helper for template to conditionally show fields/buttons
  canShow(feature: FeatureName) {
    return this.permissionService.hasFeature(feature);
  }
}
