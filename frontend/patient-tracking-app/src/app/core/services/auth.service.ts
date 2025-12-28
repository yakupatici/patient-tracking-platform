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

    // Register user
    register(request: RegisterRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/register`, request);
    }

    // Login user
    login(request: LoginRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/login`, request).pipe(
            tap(response => {
                if (response.success && response.token) {
                    // Save token to localStorage
                    localStorage.setItem('token', response.token);
                }
            })
        );
    }

    // Logout
    logout(): void {
        localStorage.removeItem('token');
    }

    // Get token
    getToken(): string | null {
        return localStorage.getItem('token');
    }

    // Check if user is logged in
    isLoggedIn(): boolean {
        return !!this.getToken();
    }
}
