import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient, CreatePatientRequest, UpdatePatientRequest, AiPredictionResult, MedicalRecord, CreateMedicalRecordRequest } from '../../models';

@Injectable({
    providedIn: 'root'
})
export class PatientService {
    private apiUrl = 'http://localhost:5283/api/patients';
    private predictionUrl = 'http://localhost:5283/api/ai/predict';
    private recordsUrl = 'http://localhost:5283/api/medicalrecords';

    constructor(private http: HttpClient) { }

    // Get all patients
    getAll(): Observable<Patient[]> {
        return this.http.get<Patient[]>(this.apiUrl);
    }

    // Get patient by ID
    getById(id: number): Observable<Patient> {
        return this.http.get<Patient>(`${this.apiUrl}/${id}`);
    }

    // Create new patient
    create(patient: CreatePatientRequest): Observable<Patient> {
        return this.http.post<Patient>(this.apiUrl, patient);
    }

    // Update patient
    update(id: number, patient: UpdatePatientRequest): Observable<Patient> {
        return this.http.put<Patient>(`${this.apiUrl}/${id}`, patient);
    }

    // Delete patient
    delete(id: number): Observable<string> {
        return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
    }

    // Get AI prediction
    getPrediction(patientId: number): Observable<AiPredictionResult> {
        return this.http.get<AiPredictionResult>(`${this.predictionUrl}/${patientId}`);
    }

    // Get patient medical records
    getMedicalRecords(patientId: number): Observable<MedicalRecord[]> {
        return this.http.get<MedicalRecord[]>(`${this.recordsUrl}/patient/${patientId}`);
    }

    // Create medical record
    createMedicalRecord(record: CreateMedicalRecordRequest): Observable<MedicalRecord> {
        return this.http.post<MedicalRecord>(this.recordsUrl, record);
    }
}
