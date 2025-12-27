import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
    template: `
        <div class="register-container">
            <div class="register-box">
                <h1>🏥 Patient Tracking System</h1>
                <h2>Sign Up</h2>

                <!-- Messages -->
                <div class="error" *ngIf="errorMessage">{{ errorMessage }}</div>
                <div class="success" *ngIf="successMessage">{{ successMessage }}</div>

                <!-- Registration form -->
                <form [formGroup]="registerForm" (ngSubmit)="register()">
                    <div class="form-group">
                        <label>Username:</label>
                        <input 
                            type="text" 
                            formControlName="username"
                            placeholder="Your username">
                        <div class="validation-error" *ngIf="registerForm.get('username')?.invalid && registerForm.get('username')?.touched">
                            Username is required.
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Email:</label>
                        <input 
                            type="email" 
                            formControlName="email"
                            placeholder="example@email.com">
                        <div class="validation-error" *ngIf="registerForm.get('email')?.invalid && registerForm.get('email')?.touched">
                            Please enter a valid email address.
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Password:</label>
                        <input 
                            type="password" 
                            formControlName="password"
                            placeholder="At least 6 characters">
                        <div class="validation-error" *ngIf="registerForm.get('password')?.invalid && registerForm.get('password')?.touched">
                            Password must be at least 6 characters.
                        </div>
                    </div>

                    <button type="submit" [disabled]="loading || registerForm.invalid">
                        {{ loading ? 'Registering...' : 'Sign Up' }}
                    </button>
                </form>

                <p class="login-link">
                    Already have an account? 
                    <a routerLink="/login">Sign In</a>
                </p>
            </div>
        </div>
    `,
    styles: [`
        .register-container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: linear-gradient(135deg, #1e90ff 0%, #00bfff 100%);
        }

        .register-box {
            background: white;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            width: 100%;
            max-width: 400px;
        }

        h1 { text-align: center; color: #333; margin-bottom: 10px; }
        h2 { text-align: center; color: #666; margin-bottom: 30px; }

        .form-group { margin-bottom: 20px; }

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

        input:focus { outline: none; border-color: #1e90ff; }
        
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

        .success {
            background: #e6ffe6;
            color: #00cc00;
            padding: 10px;
            border-radius: 5px;
            margin-bottom: 20px;
            text-align: center;
        }

        .login-link {
            text-align: center;
            margin-top: 20px;
            color: #666;
        }

        .login-link a {
            color: #1e90ff;
            text-decoration: none;
            font-weight: bold;
        }
    `]
})
export class RegisterComponent {
    // Reactive Form
    registerForm = new FormGroup({
        username: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });

    loading = false;
    errorMessage = '';
    successMessage = '';

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    register() {
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.errorMessage = '';

        const { username, email, password } = this.registerForm.value;

        this.authService.register({
            username: username!,
            email: email!,
            password: password!
        }).subscribe({
            next: (response) => {
                if (response.success) {
                    this.successMessage = 'Registration successful! Redirecting...';
                    setTimeout(() => {
                        this.router.navigate(['/login']);
                    }, 2000);
                } else {
                    this.errorMessage = response.message || 'Registration failed!';
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
