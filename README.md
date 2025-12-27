# 🏥 AI-Supported Patient Tracking Platform

Modern bir hasta takip sistemi - .NET 8 Backend + Angular 18 Frontend

## 📋 Proje Özeti

| Bilgi | Detay |
|-------|-------|
| **Backend** | .NET 8 ASP.NET Core Web API |
| **Frontend** | Angular 18+ Standalone Components |
| **Veritabanı** | PostgreSQL |
| **Authentication** | JWT (JSON Web Token) |

---

## 🚀 Hızlı Başlangıç

### Gereksinimler
- .NET 8 SDK
- Node.js 18+
- PostgreSQL 16+
- Angular CLI 18+

### 1. PostgreSQL Veritabanını Başlat
```bash
brew services start postgresql@16
```

### 2. Backend'i Çalıştır
```bash
cd backend
dotnet run --project PatientTracking.API
```
Backend çalışacaktır: `https://localhost:5001`

Swagger UI: `https://localhost:5001/swagger`

### 3. Frontend'i Çalıştır
```bash
cd frontend/patient-tracking-app
npm install  # İlk kez çalıştırıyorsanız
ng serve
```
Frontend çalışacaktır: `http://localhost:4200`

---

## 📂 Proje Yapısı

```
AI-Supported Patient Tracking Platform/
├── backend/                          # .NET Core Web API
│   ├── PatientTracking.API/          # API projesi
│   │   ├── Controllers/              # API endpoint'leri
│   │   │   ├── AuthController.cs     # Giriş/Kayıt
│   │   │   ├── PatientsController.cs # Hasta CRUD
│   │   │   └── AiController.cs       # AI tahmini
│   │   ├── Services/                 # İş mantığı
│   │   ├── Data/                     # Veritabanı
│   │   └── DTOs/                     # Veri transfer nesneleri
│   ├── PatientTracking.Core/         # Model sınıfları
│   └── PatientTracking.Tests/        # Unit testler
├── frontend/                         # Angular uygulaması
│   └── patient-tracking-app/
│       └── src/app/
│           ├── pages/                # Sayfa componentleri
│           │   ├── login/            # Giriş sayfası
│           │   ├── register/         # Kayıt sayfası
│           │   ├── patient-list/     # Hasta listesi
│           │   ├── patient-detail/   # Hasta detayı + AI tahmini
│           │   └── patient-create/   # Yeni hasta ekleme
│           ├── core/                 # Servisler ve guard'lar
│           └── models/               # TypeScript modelleri
└── docs/                             # Dokümantasyon
```

---

## 🔧 API Endpoint'leri

### Auth (Kimlik Doğrulama)
| Method | Endpoint | Açıklama |
|--------|----------|----------|
| POST | `/api/auth/register` | Yeni kullanıcı kaydı |
| POST | `/api/auth/login` | Kullanıcı girişi |

### Patients (Hastalar)
| Method | Endpoint | Açıklama |
|--------|----------|----------|
| GET | `/api/patients` | Tüm hastaları getir |
| GET | `/api/patients/{id}` | ID ile hasta getir |
| POST | `/api/patients` | Yeni hasta oluştur |
| PUT | `/api/patients/{id}` | Hasta güncelle |
| DELETE | `/api/patients/{id}` | Hasta sil |

### AI Prediction (Yapay Zeka Tahmini)
| Method | Endpoint | Açıklama |
|--------|----------|----------|
| GET | `/api/prediction/{patientId}` | Hasta için AI risk tahmini |

---

## 🔐 Güvenlik

- **JWT Authentication**: Tüm hasta endpoint'leri JWT token gerektirir
- **Password Hashing**: BCrypt ile şifreleme
- **CORS**: Frontend erişimi için yapılandırılmış

---

## 🎨 Frontend Sayfaları

1. **Login** - Kullanıcı girişi
2. **Register** - Yeni kullanıcı kaydı
3. **Patient List** - Hasta listesi tablosu
4. **Patient Detail** - Hasta bilgileri + AI tahmin sonuçları
5. **Patient Create** - Yeni hasta ekleme formu

---

## 📦 Teknolojiler

### Backend
- .NET 8 ASP.NET Core Web API
- Entity Framework Core 8
- PostgreSQL (Npgsql)
- JWT Bearer Authentication
- BCrypt.Net (Password Hashing)
- Swagger/OpenAPI

### Frontend
- Angular 18 (Standalone Components)
- TypeScript
- RxJS
- FormsModule / Reactive Forms

---

## 🧪 Test

```bash
# Backend testleri
cd backend
dotnet test

# Frontend build testi
cd frontend/patient-tracking-app
npm run build
```

---

## 📝 Lisans

Bu proje eğitim amaçlı geliştirilmiştir.
