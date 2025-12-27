import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { PatientService } from '../../core/services/patient.service';
import { AuthService } from '../../core/services/auth.service';
import { Patient } from '../../models';

@Component({
    selector: 'app-patient-list',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
        <div class="container">
            <!-- Header -->
            <div class="header">
                <h1>🏥 Patient List</h1>
                <div class="header-buttons">
                    <button class="btn-add" routerLink="/patients/new">➕ New Patient</button>
                    <button class="btn-logout" (click)="logout()">🚪 Logout</button>
                </div>
            </div>

            <!-- Loading -->
            <div class="loading" *ngIf="loading">
                Loading patients...
            </div>

            <!-- Error message -->
            <div class="error" *ngIf="errorMessage">
                {{ errorMessage }}
            </div>

            <!-- Patient table -->
            <table *ngIf="!loading && patients.length > 0">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Birth Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="let patient of patients">
                        <td>{{ patient.id }}</td>
                        <td>{{ patient.name }}</td>
                        <td>{{ patient.surname }}</td>
                        <td>{{ patient.birthDate | date:'dd/MM/yyyy' }}</td>
                        <td class="actions">
                            <button class="btn-view" [routerLink]="['/patients', patient.id]">
                                👁️ View
                            </button>
                            <button class="btn-delete" (click)="deletePatient(patient.id)">
                                🗑️ Delete
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <!-- No patients message -->
            <div class="no-data" *ngIf="!loading && patients.length === 0">
                <p>No patients registered yet.</p>
                <button routerLink="/patients/new">Add First Patient</button>
            </div>
        </div>
    `,
    styles: [`
        .container {
            max-width: 1000px;
            margin: 0 auto;
            padding: 20px;
        }

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #eee;
        }

        h1 { color: #333; margin: 0; }

        .header-buttons {
            display: flex;
            gap: 10px;
        }

        .btn-add {
            background: #28a745;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 14px;
        }

        .btn-logout {
            background: #dc3545;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 14px;
        }

        .loading, .error, .no-data {
            text-align: center;
            padding: 40px;
        }

        .error {
            background: #ffe6e6;
            color: #cc0000;
            border-radius: 5px;
        }

        .no-data {
            background: #f5f5f5;
            border-radius: 10px;
        }

        .no-data button {
            margin-top: 10px;
            background: #1e90ff;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            background: white;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            border-radius: 10px;
            overflow: hidden;
        }

        th, td {
            padding: 15px;
            text-align: left;
            border-bottom: 1px solid #eee;
        }

        th {
            background: #1e90ff;
            color: white;
            font-weight: bold;
        }

        tr:hover { background: #f5f5f5; }

        .actions {
            display: flex;
            gap: 5px;
        }

        .btn-view {
            background: #17a2b8;
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 3px;
            cursor: pointer;
            font-size: 12px;
        }

        .btn-delete {
            background: #dc3545;
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 3px;
            cursor: pointer;
            font-size: 12px;
        }
    `]
})
export class PatientListComponent implements OnInit {
    patients: Patient[] = [];
    loading = false;
    errorMessage = '';

    constructor(
        private patientService: PatientService,
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit() {
        this.loadPatients();
    }

    loadPatients() {
        this.loading = true;
        this.patientService.getAll().subscribe({
            next: (data) => {
                this.patients = data;
                this.loading = false;
            },
            error: (err) => {
                this.errorMessage = 'Failed to load patients! Is the backend running?';
                this.loading = false;
                console.error('Load patients error:', err);
            }
        });
    }

    deletePatient(id: number) {
        if (confirm('Are you sure you want to delete this patient?')) {
            this.patientService.delete(id).subscribe({
                next: () => {
                    this.patients = this.patients.filter(p => p.id !== id);
                },
                error: (err) => {
                    alert('Failed to delete patient!');
                    console.error('Delete error:', err);
                }
            });
        }
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}
