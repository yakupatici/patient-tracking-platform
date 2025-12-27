import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
    // localStorage'dan token'ı al
    const token = localStorage.getItem('token');

    // Eğer token varsa, isteğe Authorization header ekle
    if (token) {
        const clonedRequest = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
        return next(clonedRequest);
    }

    // Token yoksa isteği olduğu gibi gönder
    return next(req);
};
