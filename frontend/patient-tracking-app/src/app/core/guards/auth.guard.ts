import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

// Redirects to login if user is not authenticated
export const authGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    // Check if user is logged in
    if (authService.isLoggedIn()) {
        return true;
    }

    // Not logged in, redirect to login
    router.navigate(['/login']);
    return false;
};
