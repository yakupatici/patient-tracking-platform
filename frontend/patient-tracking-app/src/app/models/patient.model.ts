// Patient related models
export interface Patient {
    id: number;
    tcId: string;  // TC Kimlik No
    name: string;
    surname: string;
    birthDate: Date;
    createdDate: Date;
}

export interface CreatePatientRequest {
    tcId: string;  // TC Kimlik No
    name: string;
    surname: string;
    birthDate: Date;
}

export interface UpdatePatientRequest {
    id: number;
    tcId: string;  // TC Kimlik No
    name: string;
    surname: string;
    birthDate: Date;
}

export interface AiPredictionResult {
    riskLevel: string;       // Low, Medium, High
    probability: number;     // 0-1 arası
    recommendation: string;
    analysisDate: Date;
}

// Tıbbi kayıt (geçmiş vakalar)
export interface MedicalRecord {
    id: number;
    patientId: number;
    description: string;     // Vaka açıklaması
    doctorRemarks: string;   // Doktor notları
    recordDate: Date;        // Kayıt tarihi
}

// Yeni muayene kaydı oluşturma
export interface CreateMedicalRecordRequest {
    patientId: number;
    description: string;
    doctorRemarks: string;
}
