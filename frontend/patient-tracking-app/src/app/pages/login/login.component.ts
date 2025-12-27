import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
    template: `
        <div class="login-container">
            <div class="login-box">
                <h1>🏥 Patient Tracking System</h1>
                <h2>Sign In</h2>

                <!-- Error message -->
                <div class="error" *ngIf="errorMessage">
                    {{ errorMessage }}
                </div>

                <!-- Login form -->
                <form [formGroup]="loginForm" (ngSubmit)="login()">
                    <div class="form-group">
                        <label>Email:</label>
                        <input 
                            type="email" 
                            formControlName="email"
                            placeholder="example@email.com">
                        <div class="validation-error" *ngIf="loginForm.get('email')?.invalid && loginForm.get('email')?.touched">
                            Please enter a valid email address.
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Password:</label>
                        <input 
                            type="password" 
                            formControlName="password"
                            placeholder="Enter your password">
                        <div class="validation-error" *ngIf="loginForm.get('password')?.invalid && loginForm.get('password')?.touched">
                            Password is required.
                        </div>
                    </div>

                    <button type="submit" [disabled]="loading || loginForm.invalid">
                        {{ loading ? 'Signing in...' : 'Sign In' }}
                    </button>
                </form>

                <p class="register-link">
                    Don't have an account? 
                    <a routerLink="/register">Sign Up</a>
                </p>
            </div>
        </div>
    `,
    styles: [`
        .login-container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: linear-gradient(135deg, #1e90ff 0%, #00bfff 100%);
        }

        .login-box {
            background: white;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            width: 100%;
            max-width: 400px;
        }

        h1 {
            text-align: center;
            color: #333;
            margin-bottom: 10px;
        }

        h2 {
            text-align: center;
            color: #666;
            margin-bottom: 30px;
        }

        .form-group {
            margin-bottom: 20px;
        }

        label {
            display: block;
            margin-bottom: 5px;
            color: #333;
            font-weight: bold;
        }

        input {
            width: 100%;
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 16px;
            box-sizing: border-box;
        }

        input:focus {
            outline: none;
            border-color: #1e90ff;
        }

        input.ng-invalid.ng-touched {
            border-color: #dc3545;
        }

        .validation-error {
            color: #dc3545;
            font-size: 12px;
            margin-top: 5px;
        }

        button {
            width: 100%;
            padding: 12px;
            background: linear-gradient(135deg, #1e90ff 0%, #00bfff 100%);
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
        }

        button:hover { opacity: 0.9; }
        button:disabled { opacity: 0.6; cursor: not-allowed; }

        .error {
            background: #ffe6e6;
            color: #cc0000;
            padding: 10px;
            border-radius: 5px;
            margin-bottom: 20px;
            text-align: center;
        }

        .register-link {
            text-align: center;
            margin-top: 20px;
            color: #666;
        }

        .register-link a {
            color: #1e90ff;
            text-decoration: none;
            font-weight: bold;
        }
    `]
})
export class LoginComponent {
    // Reactive Form
    loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required])
    });

    loading = false;
    errorMessage = '';

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    login() {
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.errorMessage = '';

        const { email, password } = this.loginForm.value;

        this.authService.login({
            email: email!,
            password: password!
        }).subscribe({
            next: (response) => {
                if (response.success) {
                    this.router.navigate(['/patients']);
                } else {
                    this.errorMessage = response.message || 'Login failed!';
                }
                this.loading = false;
            },
            error: () => {
                this.errorMessage = 'Connection error! Is the backend running?';
                this.loading = false;
            }
        });
    }
}
