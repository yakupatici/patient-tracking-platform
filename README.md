# 🏥 AI-Supported Patient Tracking Platform

A modern patient tracking system built with .NET 8 Backend + Angular 18 Frontend.

## 📋 Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | .NET 8 ASP.NET Core Web API |
| Frontend | Angular 18+ Standalone Components |
| Database | PostgreSQL |
| Auth | JWT (JSON Web Token) |

---

## 🚀 Quick Start

### Prerequisites
- .NET 8 SDK
- Node.js 18+
- PostgreSQL 16+
- Angular CLI 18+

### Option 1: Run with Docker (Recommended)

```bash
# Start all services
docker-compose up -d

# Access the application
# Frontend: http://localhost:4200
# Backend API: http://localhost:5283
# Swagger: http://localhost:5283/swagger

# Stop all services
docker-compose down
```

### Option 2: Run Manually

**1. Start PostgreSQL**
```bash
brew services start postgresql@16
```

**2. Start Backend**
```bash
cd backend/PatientTracking.API
dotnet run
```
Backend runs at: `http://localhost:5283`

**3. Start Frontend**
```bash
cd frontend/patient-tracking-app
npm install
ng serve
```
Frontend runs at: `http://localhost:4200`

---

## 🧪 Run Tests

```bash
cd backend
dotnet test
```

---

## 📂 Project Structure

```
├── backend/
│   ├── PatientTracking.API/     # Web API
│   ├── PatientTracking.Core/    # Models
│   └── PatientTracking.Tests/   # Unit Tests
├── frontend/
│   └── patient-tracking-app/    # Angular App
├── docker-compose.yml           # Docker Configuration
└── docs/                        # Documentation
```

---

## 🔧 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | User login |
| GET | `/api/patients` | Get all patients |
| GET | `/api/patients/{id}` | Get patient by ID |
| POST | `/api/patients` | Create patient |
| DELETE | `/api/patients/{id}` | Delete patient |
| GET | `/api/ai/predict/{patientId}` | Get AI prediction |
| GET | `/api/medicalrecords/patient/{patientId}` | Get medical records |
| POST | `/api/medicalrecords` | Create medical record |

---

## 📝 License

This project was developed for educational purposes.
