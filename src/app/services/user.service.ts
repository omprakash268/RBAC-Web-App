import { Injectable } from '@angular/core';
import { User } from '../modals/modal';

@Injectable({ providedIn: 'root' })
export class UserService {
  key = 'rbac_users';

  constructor() {
    this.ensureDefaultAdminUser();
  }

  private ensureDefaultAdminUser() {
    const users = this.getAllUsers();
    const isAdminUser = users.find((u) => u.username === 'admin');
    if (!isAdminUser) {
      const adminUser: User = {
        id: 'user-admin',
        username: 'admin',
        password: 'admin123',
        roleId: 'role-admin',
        displayName: 'Administrator',
      };
      users.push(adminUser);
      this.saveAllUsers(users);
    }
  }

  getAllUsers(): User[] {
    return JSON.parse(localStorage.getItem(this.key) || '[]');
  }

  getUserById(id: string): User | undefined {
    return this.getAllUsers().find((u) => u.id === id);
  }

  createUser(payload: Omit<User, 'id'>): User {
    const newUser: User = { id: Date.now().toString(), ...payload };
    const users = this.getAllUsers();
    users.push(newUser);
    this.saveAllUsers(users);
    return newUser;
  }

  updateUser(id: string, payload: Partial<User>) {
    const users = this.getAllUsers().map((u) =>
      u.id === id ? { ...u, ...payload } : u
    );
    this.saveAllUsers(users);
  }

  deleteUser(id: string) {
    const users = this.getAllUsers().filter((u) => u.id !== id);
    this.saveAllUsers(users);
  }

  private saveAllUsers(users: User[]) {
    localStorage.setItem(this.key, JSON.stringify(users));
  }
}
