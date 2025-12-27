# 📚 Swagger API Testing Guide

## 🔗 Access URL
**http://localhost:5283/swagger**

---

## 🔓 Authentication Endpoints

### 1. POST /api/Auth/register
**Purpose:** Create new user account

**Request Body:**
```json
{
  "username": "testuser",
  "email": "test@email.com",
  "password": "123456"
}
```

**Expected Response (200):**
```json
{
  "success": true,
  "message": "User registered successfully."
}
```

---

### 2. POST /api/Auth/login
**Purpose:** Login and get JWT token

**Request Body:**
```json
{
  "email": "admin@gmail.com",
  "password": "admin123"
}
```

**Expected Response (200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "message": "Login successful."
}
```

---

## 👥 Patient Endpoints (Requires JWT Token)

### 3. GET /api/Patients
**Purpose:** Get all patients

**Expected Response (200):**
```json
[
  {
    "id": 1,
    "tcId": "12345678901",
    "name": "John",
    "surname": "Doe",
    "birthDate": "1990-01-15",
    "createdDate": "2024-12-27T10:00:00"
  }
]
```

---

### 4. GET /api/Patients/{id}
**Purpose:** Get single patient by ID

**Parameter:** `id` = 1

**Expected Response (200):** Single patient object

---

### 5. POST /api/Patients
**Purpose:** Create new patient

**Request Body:**
```json
{
  "tcId": "12345678901",
  "name": "Jane",
  "surname": "Smith",
  "birthDate": "1985-05-20"
}
```

**Expected Response (201):** Created patient object

---

### 6. PUT /api/Patients/{id}
**Purpose:** Update existing patient

**Parameter:** `id` = 1

**Request Body:**
```json
{
  "id": 1,
  "tcId": "12345678901",
  "name": "Jane Updated",
  "surname": "Smith",
  "birthDate": "1985-05-20"
}
```

---

### 7. DELETE /api/Patients/{id}
**Purpose:** Delete patient

**Parameter:** `id` = 1

**Expected Response (200):** `"Patient deleted successfully."`

---

## 🤖 AI Prediction Endpoint

### 8. GET /api/Ai/predict/{patientId}
**Purpose:** Get AI risk prediction for patient

**Parameter:** `patientId` = 1

**Expected Response (200):**
```json
{
  "riskLevel": "Low",
  "probability": 0.15,
  "recommendation": "Patient status appears stable.",
  "analysisDate": "2024-12-27T10:00:00"
}
```

**Risk Logic:**
- 0-2 records → LOW (15%)
- 3-5 records → MEDIUM (55%)
- 6+ records OR age > 70 → HIGH (85%)

---

## 📁 Medical Records Endpoints

### 9. GET /api/MedicalRecords/patient/{patientId}
**Purpose:** Get all medical records for a patient

**Parameter:** `patientId` = 1

**Expected Response (200):**
```json
[
  {
    "id": 1,
    "patientId": 1,
    "description": "Flu symptoms",
    "doctorRemarks": "Treatment started",
    "recordDate": "2024-01-15T00:00:00"
  }
]
```

---

### 10. POST /api/MedicalRecords
**Purpose:** Create new medical record

**Request Body:**
```json
{
  "patientId": 1,
  "description": "Annual checkup",
  "doctorRemarks": "All tests normal"
}
```

**Expected Response (200):** Created record object

---

## ✅ Testing Checklist

- [ ] Register new user
- [ ] Login and get token
- [ ] Get all patients
- [ ] Get single patient
- [ ] Create new patient
- [ ] Update patient
- [ ] Delete patient
- [ ] Get AI prediction
- [ ] Get medical records
- [ ] Create medical record
