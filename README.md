# 🏥 AI-Supported Patient Tracking Platform

A modern patient tracking system built with .NET 8 Backend + Angular 18 Frontend.



## 🚀 Quick Start

### Option 1: Run with Docker 

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

