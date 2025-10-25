import { Injectable } from '@angular/core';
import { Role } from '../models/model';

@Injectable({ providedIn: 'root' })
export class RoleService {
  private key = 'rbac_roles';

  constructor() {
    this.ensureDefaultAdmin();
  }

  private ensureDefaultAdmin() {
    const roles = this.getAllRoles();
    const isAdminRolePresent = roles.find(r => r.name.toLowerCase() === 'admin');
    if (!isAdminRolePresent) {
      const admin: Role = {
        id: 'role-admin',
        name: 'Admin',
        pages: ['dashboard', 'users', 'roles'],
        features: ['add-user', 'edit-user', 'delete-user']
      };
      roles.push(admin);
      this.saveAllRoles(roles);
    }
  }

  getAllRoles(): Role[] {
    return JSON.parse(localStorage.getItem(this.key) || '[]');
  }

  getRoleById(id: string): Role | undefined {
    return this.getAllRoles().find(r => r.id === id);
  }

  createRole(role: Omit<Role, 'id'>): Role {
    const newRole: Role = { id: Date.now().toString(), ...role };
    const roles = this.getAllRoles();
    roles.push(newRole);
    this.saveAllRoles(roles);
    return newRole;
  }

  updateRole(id: string, payload: Partial<Role>) {
    const roles = this.getAllRoles().map(r => r.id === id ? { ...r, ...payload } : r);
    this.saveAllRoles(roles);
  }

  deleteRole(id: string) {
    const roles = this.getAllRoles().filter(r => r.id !== id);
    this.saveAllRoles(roles);
  }

  private saveAllRoles(roles: Role[]) {
    localStorage.setItem(this.key, JSON.stringify(roles));
  }
}