# 🏥 AI-Supported Patient Tracking Platform

A modern patient tracking system built with **.NET 8 Backend** + **Angular 18 Frontend** + **PostgreSQL Database**.

## 📋 Features

- **Authentication**: JWT-based Register, Login, Signout
- **Patient Management**: Full CRUD operations
- **Medical Records**: Patient sub-resource management
- **AI Prediction**: Mock AI module for patient health predictions
- **API Documentation**: Swagger UI with JWT support

---

## 🚀 Quick Start

### Option 1: Docker 

```bash
# Start all services (Backend, Frontend, PostgreSQL)
docker-compose up -d

# Access the application
# Frontend: http://localhost:4200
# Backend API: http://localhost:5283
# Swagger: http://localhost:5283/swagger

# Stop all services
docker-compose down
```

---

### Option 2: Manual Setup

#### Prerequisites
- .NET 8 SDK
- Node.js 18+ & npm
- PostgreSQL 16

#### Step 1: Database Setup
```bash
# macOS
brew services start postgresql@16

# Create database (if not exists)
createdb patienttracking
```

#### Step 2: Backend
```bash
cd backend/PatientTracking.API
dotnet restore
dotnet run
```
Backend runs at: `http://localhost:5283`

#### Step 3: Frontend
```bash
cd frontend/patient-tracking-app

# Install dependencies (creates node_modules)
npm install

# Start development server
ng serve
```
Frontend runs at: `http://localhost:4200`

---

## 🧪 Running Tests

```bash
cd backend/PatientTracking.Tests
dotnet test
```

---

## 📁 Project Structure

```
├── backend/
│   ├── PatientTracking.API/     # .NET 8 Web API
│   └── PatientTracking.Tests/   # Unit Tests (xUnit)
├── frontend/
│   └── patient-tracking-app/    # Angular 18 SPA
└── docker-compose.yml           # Docker orchestration
```


