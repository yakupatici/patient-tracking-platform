import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient, CreatePatientRequest, UpdatePatientRequest, AiPredictionResult, MedicalRecord, CreateMedicalRecordRequest } from '../../models';

// Hasta işlemleri için servis
@Injectable({
    providedIn: 'root'
})
export class PatientService {
    // Backend API adresi
    private apiUrl = 'http://localhost:5283/api/patients';
    private predictionUrl = 'http://localhost:5283/api/ai/predict';
    private recordsUrl = 'http://localhost:5283/api/medicalrecords';

    constructor(private http: HttpClient) { }

    // Tüm hastaları getir
    getAll(): Observable<Patient[]> {
        return this.http.get<Patient[]>(this.apiUrl);
    }

    // ID ile hasta getir
    getById(id: number): Observable<Patient> {
        return this.http.get<Patient>(`${this.apiUrl}/${id}`);
    }

    // Yeni hasta oluştur
    create(patient: CreatePatientRequest): Observable<Patient> {
        return this.http.post<Patient>(this.apiUrl, patient);
    }

    // Hasta güncelle
    update(id: number, patient: UpdatePatientRequest): Observable<Patient> {
        return this.http.put<Patient>(`${this.apiUrl}/${id}`, patient);
    }

    // Hasta sil
    delete(id: number): Observable<string> {
        return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
    }

    // AI tahmin sonucu getir
    getPrediction(patientId: number): Observable<AiPredictionResult> {
        return this.http.get<AiPredictionResult>(`${this.predictionUrl}/${patientId}`);
    }

    // Hastanın geçmiş vakalarını (tıbbi kayıtlarını) getir
    getMedicalRecords(patientId: number): Observable<MedicalRecord[]> {
        return this.http.get<MedicalRecord[]>(`${this.recordsUrl}/patient/${patientId}`);
    }

    // Yeni muayene kaydı oluştur
    createMedicalRecord(record: CreateMedicalRecordRequest): Observable<MedicalRecord> {
        return this.http.post<MedicalRecord>(this.recordsUrl, record);
    }
}
