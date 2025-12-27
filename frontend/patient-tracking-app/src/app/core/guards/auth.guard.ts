import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

// Bu guard, kullanıcı giriş yapmamışsa login sayfasına yönlendirir
export const authGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    // Kullanıcı giriş yapmış mı kontrol et
    if (authService.isLoggedIn()) {
        return true; // Giriş yapmış, sayfaya erişebilir
    }

    // Giriş yapmamış, login sayfasına yönlendir
    router.navigate(['/login']);
    return false;
};
