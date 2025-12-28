// Patient related models
export interface Patient {
    id: number;
    tcId: string;
    name: string;
    surname: string;
    birthDate: Date;
    createdDate: Date;
}

export interface CreatePatientRequest {
    tcId: string;
    name: string;
    surname: string;
    birthDate: Date;
}

export interface UpdatePatientRequest {
    id: number;
    tcId: string;
    name: string;
    surname: string;
    birthDate: Date;
}

export interface AiPredictionResult {
    riskLevel: string;       // Low, Medium, High
    probability: number;     // 0-1 range
    recommendation: string;
    analysisDate: Date;
}

// Medical record
export interface MedicalRecord {
    id: number;
    patientId: number;
    description: string;
    doctorRemarks: string;
    recordDate: Date;
}

// Create medical record request
export interface CreateMedicalRecordRequest {
    patientId: number;
    description: string;
    doctorRemarks: string;
}
