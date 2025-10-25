import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Role, User } from '../modals/modal';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private storageKey = 'rbac_current_user';
  private _currentUser$ = new BehaviorSubject<User | null>(
    this.getFromStorage()
  );
  currentUser$ = this._currentUser$.asObservable();

  constructor() {}

  login(username: string, password: string): boolean {
    const usersJson = localStorage.getItem('rbac_users') || '[]';
    const users: User[] = JSON.parse(usersJson);
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      localStorage.setItem(this.storageKey, JSON.stringify(user));
      this._currentUser$.next(user);
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem(this.storageKey);
    this._currentUser$.next(null);
  }

  getCurrentUser(): User | null {
    return this._currentUser$.value;
  }

  private getFromStorage(): User | null {
    const raw = localStorage.getItem(this.storageKey);
    return raw ? JSON.parse(raw) : null;
  }

  // helper to check role id quickly
  isAdmin(): boolean {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return false;

    const rolesJson = localStorage.getItem('rbac_roles') || '[]';
    const roles: Role[] = JSON.parse(rolesJson);

    const role = roles.find((r) => r.id === currentUser.roleId);
    return role?.name?.toLowerCase() === 'admin';
  }
}
