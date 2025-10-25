export type FeatureName = 'add-user' | 'edit-user' | 'delete-user';
export type PageName = 'dashboard' | 'users' | 'roles';

export interface Role {
  id: string;
  name: string;
  pages: PageName[];
  features: FeatureName[];
}

export interface User {
  id: string;
  username: string;
  password: string;
  roleId: string;
  displayName?: string;
}
