import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PatientService } from '../../core/services/patient.service';
import { Patient, AiPredictionResult, MedicalRecord } from '../../models';

@Component({
    selector: 'app-patient-detail',
    standalone: true,
    imports: [CommonModule, RouterLink, ReactiveFormsModule],
    template: `
        <div class="container">
            <!-- Back button -->
            <button class="btn-back" routerLink="/patients">← Back to Patient List</button>

            <!-- Loading -->
            <div class="loading" *ngIf="loading">
                Loading patient information...
            </div>

            <!-- Error -->
            <div class="error" *ngIf="errorMessage">
                {{ errorMessage }}
            </div>

            <!-- Patient information -->
            <div class="patient-info" *ngIf="patient">
                <div class="patient-header">
                    <h1>👤 {{ patient.name }} {{ patient.surname }}</h1>
                    <span class="patient-id">ID: {{ patient.id }}</span>
                </div>

                <div class="info-grid">
                    <!-- Personal Information -->
                    <div class="info-card">
                        <h3>📋 Personal Information</h3>
                        <p><strong>ID Number:</strong> {{ patient.tcId || 'Not specified' }}</p>
                        <p><strong>First Name:</strong> {{ patient.name }}</p>
                        <p><strong>Last Name:</strong> {{ patient.surname }}</p>
                        <p><strong>Birth Date:</strong> {{ patient.birthDate | date:'dd/MM/yyyy' }}</p>
                        <p><strong>Registration Date:</strong> {{ patient.createdDate | date:'dd/MM/yyyy HH:mm' }}</p>
                    </div>

                    <!-- AI Prediction Results -->
                    <div class="info-card ai-card">
                        <h3>🤖 AI Prediction Results</h3>
                        
                        <div *ngIf="predictionLoading">
                            Loading prediction...
                        </div>

                        <div *ngIf="prediction">
                            <p>
                                <strong>Risk Level:</strong> 
                                <span [class]="'risk-' + prediction.riskLevel.toLowerCase()">
                                    {{ prediction.riskLevel }}
                                </span>
                            </p>
                            <p><strong>Probability:</strong> {{ prediction.probability | percent }}</p>
                            <p><strong>Recommendation:</strong> {{ prediction.recommendation }}</p>
                        </div>

                        <div *ngIf="!predictionLoading && !prediction">
                            <p class="no-data">No prediction data available.</p>
                        </div>
                    </div>
                </div>

                <!-- Add New Examination Form (Reactive Forms) -->
                <div class="add-record-section">
                    <h2>➕ Add New Examination</h2>
                    
                    <div class="success-msg" *ngIf="addRecordSuccess">
                        ✅ Examination record added successfully!
                    </div>

                    <form [formGroup]="examinationForm" (ngSubmit)="addMedicalRecord()">
                        <div class="form-group">
                            <label>Examination Description:</label>
                            <textarea 
                                formControlName="description"
                                placeholder="Patient complaints, findings..."
                                rows="3"></textarea>
                            <div class="validation-error" *ngIf="examinationForm.get('description')?.invalid && examinationForm.get('description')?.touched">
                                Description is required.
                            </div>
                        </div>

                        <div class="form-group">
                            <label>Doctor's Notes:</label>
                            <textarea 
                                formControlName="doctorRemarks"
                                placeholder="Treatment plan, medications, recommendations..."
                                rows="3"></textarea>
                        </div>

                        <button type="submit" class="btn-add-record" [disabled]="addingRecord || examinationForm.invalid">
                            {{ addingRecord ? 'Saving...' : '💾 Save Examination' }}
                        </button>
                    </form>
                </div>

                <!-- Medical History (Medical Records) -->
                <div class="records-section">
                    <h2>📁 Medical History ({{ medicalRecords.length }} records)</h2>

                    <div *ngIf="recordsLoading" class="loading-small">
                        Loading records...
                    </div>

                    <!-- If records exist -->
                    <div *ngIf="!recordsLoading && medicalRecords.length > 0" class="records-list">
                        <div class="record-card" *ngFor="let record of medicalRecords">
                            <div class="record-header">
                                <span class="record-date">📅 {{ record.recordDate | date:'dd/MM/yyyy HH:mm' }}</span>
                            </div>
                            <div class="record-body">
                                <p><strong>Description:</strong> {{ record.description }}</p>
                                <p *ngIf="record.doctorRemarks"><strong>Doctor's Notes:</strong> {{ record.doctorRemarks }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- If no records -->
                    <div *ngIf="!recordsLoading && medicalRecords.length === 0" class="no-records">
                        <p>No examination records found for this patient.</p>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .container {
            max-width: 900px;
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

        .loading, .error {
            text-align: center;
            padding: 40px;
        }

        .loading-small {
            text-align: center;
            padding: 20px;
            color: #666;
        }

        .error {
            background: #ffe6e6;
            color: #cc0000;
            border-radius: 5px;
        }

        .patient-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #eee;
        }

        .patient-header h1 {
            margin: 0;
            color: #333;
        }

        .patient-id {
            background: #1e90ff;
            color: white;
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 14px;
        }

        .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 30px;
        }

        @media (max-width: 600px) {
            .info-grid {
                grid-template-columns: 1fr;
            }
        }

        .info-card {
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .info-card h3 {
            margin-top: 0;
            color: #333;
            border-bottom: 2px solid #1e90ff;
            padding-bottom: 10px;
        }

        .info-card p {
            margin: 10px 0;
            color: #555;
        }

        .ai-card {
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        }

        .risk-low { color: #28a745; font-weight: bold; }
        .risk-medium { color: #ffc107; font-weight: bold; }
        .risk-high { color: #dc3545; font-weight: bold; }
        .no-data { color: #999; font-style: italic; }

        /* Add Examination Section */
        .add-record-section {
            background: #e3f2fd;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 30px;
            border: 2px solid #1e90ff;
        }

        .add-record-section h2 {
            margin-top: 0;
            color: #1e90ff;
        }

        .success-msg {
            background: #e3f2fd;
            color: #1565c0;
            padding: 10px;
            border-radius: 5px;
            margin-bottom: 15px;
            text-align: center;
        }

        .form-group {
            margin-bottom: 15px;
        }

        .form-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
            color: #333;
        }

        .form-group textarea {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 14px;
            resize: vertical;
            box-sizing: border-box;
        }

        .form-group textarea:focus {
            outline: none;
            border-color: #1e90ff;
        }

        .form-group textarea.ng-invalid.ng-touched {
            border-color: #dc3545;
        }

        .validation-error {
            color: #dc3545;
            font-size: 12px;
            margin-top: 5px;
        }

        .btn-add-record {
            background: linear-gradient(135deg, #1e90ff 0%, #00bfff 100%);
            color: white;
            border: none;
            padding: 12px 30px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            width: 100%;
        }

        .btn-add-record:hover { opacity: 0.9; }
        .btn-add-record:disabled { opacity: 0.6; cursor: not-allowed; }

        /* Medical History Section */
        .records-section {
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .records-section h2 {
            margin-top: 0;
            color: #333;
            border-bottom: 2px solid #1e90ff;
            padding-bottom: 10px;
        }

        .records-list {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }

        .record-card {
            background: #f8f9fa;
            border-left: 4px solid #1e90ff;
            padding: 15px;
            border-radius: 5px;
        }

        .record-header { margin-bottom: 10px; }
        .record-date { color: #1e90ff; font-weight: bold; }
        .record-body p { margin: 5px 0; color: #555; }

        .no-records {
            text-align: center;
            padding: 30px;
            background: #f8f9fa;
            border-radius: 5px;
            color: #666;
        }
    `]
})
export class PatientDetailComponent implements OnInit {
    patient: Patient | null = null;
    prediction: AiPredictionResult | null = null;
    medicalRecords: MedicalRecord[] = [];

    loading = false;
    predictionLoading = false;
    recordsLoading = false;
    addingRecord = false;
    addRecordSuccess = false;
    errorMessage = '';

    // Reactive Form for Examination
    examinationForm = new FormGroup({
        description: new FormControl('', [Validators.required]),
        doctorRemarks: new FormControl('')
    });

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private patientService: PatientService
    ) { }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            const patientId = Number(id);
            this.loadPatient(patientId);
            this.loadPrediction(patientId);
            this.loadMedicalRecords(patientId);
        }
    }

    loadPatient(id: number) {
        this.loading = true;
        this.patientService.getById(id).subscribe({
            next: (data) => {
                this.patient = data;
                this.loading = false;
            },
            error: () => {
                this.errorMessage = 'Patient not found!';
                this.loading = false;
            }
        });
    }

    loadPrediction(patientId: number) {
        this.predictionLoading = true;
        this.patientService.getPrediction(patientId).subscribe({
            next: (data) => {
                this.prediction = data;
                this.predictionLoading = false;
            },
            error: () => this.predictionLoading = false
        });
    }

    loadMedicalRecords(patientId: number) {
        this.recordsLoading = true;
        this.patientService.getMedicalRecords(patientId).subscribe({
            next: (data) => {
                this.medicalRecords = data;
                this.recordsLoading = false;
            },
            error: () => this.recordsLoading = false
        });
    }

    addMedicalRecord() {
        if (this.examinationForm.invalid || !this.patient) {
            return;
        }

        this.addingRecord = true;
        this.addRecordSuccess = false;

        const { description, doctorRemarks } = this.examinationForm.value;

        this.patientService.createMedicalRecord({
            patientId: this.patient.id,
            description: description!,
            doctorRemarks: doctorRemarks || ''
        }).subscribe({
            next: (record) => {
                this.medicalRecords.unshift(record);
                this.examinationForm.reset();
                this.addingRecord = false;
                this.addRecordSuccess = true;
                this.loadPrediction(this.patient!.id);
                setTimeout(() => this.addRecordSuccess = false, 3000);
            },
            error: () => {
                this.addingRecord = false;
                alert('Failed to add examination record!');
            }
        });
    }
}
