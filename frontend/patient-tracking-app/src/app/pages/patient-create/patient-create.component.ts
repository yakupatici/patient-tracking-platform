import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PatientService } from '../../core/services/patient.service';

@Component({
    selector: 'app-patient-create',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
    template: `
        <div class="container">
            <!-- Back button -->
            <button class="btn-back" routerLink="/patients">← Back to Patient List</button>

            <div class="form-container">
                <h1>➕ Add New Patient</h1>

                <!-- Messages -->
                <div class="error" *ngIf="errorMessage">{{ errorMessage }}</div>
                <div class="success" *ngIf="successMessage">{{ successMessage }}</div>

                <!-- Patient form -->
                <form [formGroup]="patientForm" (ngSubmit)="createPatient()">
                    <div class="form-group">
                        <label>ID Number:</label>
                        <input 
                            type="text" 
                            formControlName="tcId"
                            placeholder="11-digit ID number"
                            maxlength="11">
                        <div class="validation-error" *ngIf="patientForm.get('tcId')?.invalid && patientForm.get('tcId')?.touched">
                            ID Number must be exactly 11 digits.
                        </div>
                    </div>

                    <div class="form-group">
                        <label>First Name:</label>
                        <input 
                            type="text" 
                            formControlName="name"
                            placeholder="Patient's first name">
                        <div class="validation-error" *ngIf="patientForm.get('name')?.invalid && patientForm.get('name')?.touched">
                            First name is required.
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Last Name:</label>
                        <input 
                            type="text" 
                            formControlName="surname"
                            placeholder="Patient's last name">
                        <div class="validation-error" *ngIf="patientForm.get('surname')?.invalid && patientForm.get('surname')?.touched">
                            Last name is required.
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Birth Date:</label>
                        <input 
                            type="date" 
                            formControlName="birthDate">
                        <div class="validation-error" *ngIf="patientForm.get('birthDate')?.invalid && patientForm.get('birthDate')?.touched">
                            Birth date is required.
                        </div>
                    </div>

                    <div class="button-group">
                        <button type="button" class="btn-cancel" routerLink="/patients">
                            Cancel
                        </button>
                        <button type="submit" class="btn-submit" [disabled]="loading || patientForm.invalid">
                            {{ loading ? 'Saving...' : 'Save Patient' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `,
    styles: [`
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }

        .btn-back {
            background: #6c757d;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            margin-bottom: 20px;
        }

        .form-container {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        h1 {
            text-align: center;
            color: #333;
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

        .button-group {
            display: flex;
            gap: 10px;
            margin-top: 30px;
        }

        .btn-cancel {
            flex: 1;
            padding: 12px;
            background: #6c757d;
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
        }

        .btn-submit {
            flex: 2;
            padding: 12px;
            background: linear-gradient(135deg, #1e90ff 0%, #00bfff 100%);
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
        }

        .btn-submit:hover { opacity: 0.9; }
        .btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }

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
    `]
})
export class PatientCreateComponent {
    // Reactive Form
    patientForm = new FormGroup({
        tcId: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
        name: new FormControl('', [Validators.required]),
        surname: new FormControl('', [Validators.required]),
        birthDate: new FormControl('', [Validators.required])
    });

    loading = false;
    errorMessage = '';
    successMessage = '';

    constructor(
        private patientService: PatientService,
        private router: Router
    ) { }

    createPatient() {
        if (this.patientForm.invalid) {
            return;
        }

        this.loading = true;
        this.errorMessage = '';

        const { tcId, name, surname, birthDate } = this.patientForm.value;

        this.patientService.create({
            tcId: tcId!,
            name: name!,
            surname: surname!,
            birthDate: new Date(birthDate!)
        }).subscribe({
            next: () => {
                this.successMessage = 'Patient added successfully!';
                setTimeout(() => {
                    this.router.navigate(['/patients']);
                }, 1000);
                this.loading = false;
            },
            error: () => {
                this.errorMessage = 'Failed to add patient! Is the backend running?';
                this.loading = false;
            }
        });
    }
}
