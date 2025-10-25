import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { PermissionService } from '../services/permission.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const perm = inject(PermissionService);
  const router = inject(Router);

  const current = auth.getCurrentUser();
  if (!current) {
    router.navigate(['/login']);
    return false;
  }

  const page = route.data?.['page'];
  if (page && !perm.canAccessPage(page)) {
    router.navigate(['/dashboard']);
    return false;
  }

  return true;
};
