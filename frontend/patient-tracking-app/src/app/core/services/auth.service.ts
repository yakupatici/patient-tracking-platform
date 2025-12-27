import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginRequest, RegisterRequest, AuthResponse } from '../../models';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:5283/api/auth';

    constructor(private http: HttpClient) { }

    // Kullanıcı kayıt işlemi
    register(request: RegisterRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/register`, request);
    }

    // Kullanıcı giriş işlemi
    login(request: LoginRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/login`, request).pipe(
            tap(response => {
                if (response.success && response.token) {
                    // Token'ı localStorage'a kaydet
                    localStorage.setItem('token', response.token);
                }
            })
        );
    }

    // Çıkış işlemi
    logout(): void {
        localStorage.removeItem('token');
    }

    // Token'ı getir
    getToken(): string | null {
        return localStorage.getItem('token');
    }

    // Kullanıcı giriş yapmış mı?
    isLoggedIn(): boolean {
        return !!this.getToken();
    }
}
