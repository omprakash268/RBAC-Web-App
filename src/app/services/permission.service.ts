import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { RoleService } from './role.service';
import { FeatureName, PageName } from '../models/model';

@Injectable({ providedIn: 'root' })
export class PermissionService {
  constructor(private auth: AuthService, private roleService: RoleService) {}

  canAccessPage(page: PageName): boolean {
    const user = this.auth.getCurrentUser();
    if (!user) return false;
    const role = this.roleService.getRoleById(user.roleId);
    return !!role && role.pages.includes(page);
  }

  hasFeature(feature: FeatureName): boolean {
    const user = this.auth.getCurrentUser();
    if (!user) return false;
    const role = this.roleService.getRoleById(user.roleId);
    return !!role && role.features.includes(feature);
  }
}
