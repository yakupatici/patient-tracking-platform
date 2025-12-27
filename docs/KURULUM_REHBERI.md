# 🏥 AI-Supported Patient Tracking Platform - Kurulum Rehberi

Bu dokümanda projenin başından itibaren ne yaptığımızı, hangi komutları çalıştırdığımızı ve neden yaptığımızı adım adım açıklıyoruz.

---

## 📋 İçindekiler

1. [Ortam Kontrolü](#1-ortam-kontrolü)
2. [PostgreSQL Kurulumu](#2-postgresql-kurulumu)
3. [Proje Yapısı Oluşturma](#3-proje-yapısı-oluşturma)
4. [Backend Projesi Oluşturma](#4-backend-projesi-oluşturma)
5. [Frontend Projesi Oluşturma](#5-frontend-projesi-oluşturma)
6. [Git Repository](#6-git-repository)
7. [NuGet Paketleri](#7-nuget-paketleri)

---

## 1. Ortam Kontrolü

### 🎯 Amaç
Geliştirme için gerekli araçların sistemde kurulu olup olmadığını kontrol ettik.

### 💻 Komutlar

```bash
# .NET SDK versiyonunu kontrol et
dotnet --version
# Sonuç: 8.0.416 ✅

# Node.js versiyonunu kontrol et
node --version
# Sonuç: v25.2.1 ✅

# Angular CLI versiyonunu kontrol et
ng version
# Sonuç: 18.2.21 ✅

# Git versiyonunu kontrol et
git --version
# Sonuç: 2.50.1 ✅

# PostgreSQL kontrolü
psql --version
# Sonuç: Kurulu değil ❌
```

### 📖 Açıklama

| Araç | Ne İşe Yarar |
|------|--------------|
| **.NET SDK** | Backend'i (C# Web API) geliştirmek için |
| **Node.js** | Angular uygulamasını çalıştırmak için |
| **Angular CLI** | Angular projesi oluşturmak ve yönetmek için |
| **Git** | Versiyon kontrolü (kod takibi) için |
| **PostgreSQL** | Veritabanı - hasta verilerini saklamak için |

---

## 2. PostgreSQL Kurulumu

### 🎯 Amaç
Hasta verilerini saklayacak veritabanını kurmak.

### 💻 Komutlar

```bash
# PostgreSQL 16'yı Homebrew ile kur
brew install postgresql@16

# PostgreSQL servisini başlat
brew services start postgresql@16

# Veritabanı oluştur
/opt/homebrew/opt/postgresql@16/bin/createdb patienttracking
```

### ✅ Kontrol

```bash
# Veritabanına bağlan ve versiyonu kontrol et
/opt/homebrew/opt/postgresql@16/bin/psql -d patienttracking -c "SELECT version();"

# Sonuç:
# PostgreSQL 16.11 (Homebrew) on aarch64-apple-darwin25.1.0
```

### 📖 Açıklama

| Komut | Açıklama |
|-------|----------|
| `brew install postgresql@16` | Homebrew paket yöneticisi ile PostgreSQL'i indirir ve kurar |
| `brew services start` | PostgreSQL'i arka planda sürekli çalışır halde başlatır |
| `createdb patienttracking` | "patienttracking" adında boş bir veritabanı oluşturur |

---

## 3. Proje Yapısı Oluşturma

### 🎯 Amaç
Düzenli bir klasör yapısı oluşturmak.

### 💻 Komutlar

```bash
# Proje klasörüne git
cd "AI-Supported Patient Tracking Platform"

# Ana klasörleri oluştur
mkdir -p backend frontend docker docs
```

### 📁 Sonuç Yapısı

```
AI-Supported Patient Tracking Platform/
├── backend/      # .NET Core Web API (C#)
├── frontend/     # Angular uygulaması
├── docker/       # Docker dosyaları (Bonus)
├── docs/         # Dokümantasyon
└── ROADMAP.md    # Yol haritası
```

### 📖 Açıklama

| Klasör | İçerik |
|--------|--------|
| `backend/` | Tüm C# kodları, API, veritabanı işlemleri |
| `frontend/` | Angular uygulaması, kullanıcı arayüzü |
| `docker/` | Projeyi container'da çalıştırmak için (opsiyonel) |
| `docs/` | Dokümantasyon dosyaları |

---

## 4. Backend Projesi Oluşturma

### 🎯 Amaç
.NET 8 ile Web API projesi oluşturmak.

### 💻 Komutlar

```bash
# Backend klasörüne git
cd backend

# Solution dosyası oluştur
dotnet new sln -n PatientTracking

# Web API projesi oluştur
dotnet new webapi -n PatientTracking.API --framework net8.0

# Core kütüphanesi oluştur (models, interfaces)
dotnet new classlib -n PatientTracking.Core --framework net8.0

# Test projesi oluştur
dotnet new xunit -n PatientTracking.Tests --framework net8.0

# Projeleri solution'a ekle
dotnet sln add PatientTracking.API
dotnet sln add PatientTracking.Core
dotnet sln add PatientTracking.Tests

# Proje referanslarını ekle
cd PatientTracking.API
dotnet add reference ../PatientTracking.Core

cd ../PatientTracking.Tests
dotnet add reference ../PatientTracking.API
```

### 📁 Oluşan Yapı

```
backend/
├── PatientTracking.sln           # Solution dosyası (tüm projeleri gruplar)
├── PatientTracking.API/          # Web API projesi
│   ├── Program.cs                # Uygulama giriş noktası
│   ├── appsettings.json          # Ayarlar
│   └── PatientTracking.API.csproj
├── PatientTracking.Core/         # Core kütüphanesi
│   └── PatientTracking.Core.csproj
└── PatientTracking.Tests/        # Unit test projesi
    └── PatientTracking.Tests.csproj
```

### 📖 Açıklama

| Proje | Görev |
|-------|-------|
| **PatientTracking.API** | HTTP isteklerini karşılar (Controllers, Endpoints) |
| **PatientTracking.Core** | Model sınıfları, Interface'ler, iş mantığı |
| **PatientTracking.Tests** | Unit testler |
| **PatientTracking.sln** | Tüm projeleri bir arada tutan "çözüm" dosyası |

### ❓ Neden 3 Ayrı Proje?

**Separation of Concerns** (Sorumlulukların Ayrılması) prensibi:
- Core: Hiçbir şeye bağımlı değil
- API: Core'a bağımlı
- Tests: API'ya bağımlı

Bu yapı sayesinde kod daha temiz, test edilebilir ve bakımı kolay olur.

---

## 5. Frontend Projesi Oluşturma

### 🎯 Amaç
Angular 18 ile kullanıcı arayüzü projesi oluşturmak.

### 💻 Komutlar

```bash
# Frontend klasörüne git
cd frontend

# Angular projesi oluştur
ng new patient-tracking-app --routing --style=scss --standalone --skip-git --defaults
```

### 📖 Parametre Açıklamaları

| Parametre | Açıklama |
|-----------|----------|
| `--routing` | Sayfa yönlendirmeleri için hazır yapı oluşturur |
| `--style=scss` | CSS yerine SCSS (daha güçlü CSS) kullanır |
| `--standalone` | Angular 18'in yeni modül-siz yapısını kullanır |
| `--skip-git` | Ayrı git repo oluşturmaz (ana projede var) |
| `--defaults` | Varsayılan seçenekleri kabul eder |

### 📁 Oluşan Yapı

```
frontend/
└── patient-tracking-app/
    ├── src/
    │   ├── app/
    │   │   ├── app.component.ts      # Ana component
    │   │   ├── app.config.ts         # Uygulama ayarları
    │   │   └── app.routes.ts         # Sayfa yönlendirmeleri
    │   ├── index.html                # Ana HTML dosyası
    │   ├── main.ts                   # Uygulama başlangıç noktası
    │   └── styles.scss               # Global stiller
    ├── angular.json                  # Angular ayarları
    ├── package.json                  # npm bağımlılıkları
    └── tsconfig.json                 # TypeScript ayarları
```

---

## 6. Git Repository

### 🎯 Amaç
Versiyon kontrolü başlatmak ve ilk commit yapmak.

### 💻 Komutlar

```bash
# Git repository başlat
git init

# .gitignore dosyası oluşturuldu (gereksiz dosyaları hariç tutar)

# Tüm dosyaları stage'e ekle
git add .

# İlk commit
git commit -m "Initial commit: Project structure with .NET 8 backend and Angular 18 frontend"
```

### 📖 .gitignore Ne İşe Yarar?

Bazı dosyaları Git'e eklemek istemeyiz:
- `node_modules/` - Çok büyük, npm install ile yeniden oluşturulur
- `bin/`, `obj/` - Derleme çıktıları, build ile yeniden oluşturulur
- `appsettings.Development.json` - Gizli bilgiler içerebilir

---

## 7. NuGet Paketleri

### 🎯 Amaç
Entity Framework Core paketlerini kurmak (veritabanı işlemleri için).

### 💻 Komutlar

```bash
cd backend/PatientTracking.API

# 1. PostgreSQL için EF Core paketi
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL --version 8.0.11

# 2. Migration oluşturma paketi
dotnet add package Microsoft.EntityFrameworkCore.Design --version 8.0.11

# 3. EF Core CLI aracı (global)
dotnet tool install --global dotnet-ef --version 8.0.11
```

### 📖 Paket Açıklamaları

#### 1. Npgsql.EntityFrameworkCore.PostgreSQL
**Ne yapar:** C# kodundan PostgreSQL veritabanına bağlanmamızı sağlar.

**Kullanım örneği:**
```csharp
// Bu paket sayesinde şöyle yazabiliriz:
var patients = await _context.Patients.ToListAsync();
// SQL sorgusu otomatik oluşturulur: SELECT * FROM "Patients"
```

#### 2. Microsoft.EntityFrameworkCore.Design
**Ne yapar:** Migration (veritabanı tablo oluşturma) işlemlerini sağlar.

**Migration Nedir?**
- C# sınıflarını (Patient, User) veritabanı tablolarına çevirir
- Kod değişince veritabanını da günceller
- Veritabanı şemasının versiyonlanmasını sağlar

#### 3. dotnet-ef (Global Tool)
**Ne yapar:** Terminal'de EF Core komutlarını kullanabilmemizi sağlar.

**Kullanım:**
```bash
dotnet ef migrations add InitialCreate  # Migration oluştur
dotnet ef database update               # Veritabanına uygula
```

---

## 📊 Özet: Şu Ana Kadar Ne Yaptık?

| Adım | Açıklama | Durum |
|------|----------|-------|
| Ortam Kontrolü | .NET, Node.js, Angular, Git kontrolü | ✅ |
| PostgreSQL | Veritabanı kurulumu | ✅ |
| Klasör Yapısı | backend, frontend, docker, docs | ✅ |
| Backend | .NET 8 Solution (API, Core, Tests) | ✅ |
| Frontend | Angular 18 standalone app | ✅ |
| Git | Repository başlatıldı, ilk commit | ✅ |
| NuGet Paketleri | EF Core + PostgreSQL paketleri | ✅ |

---

## ⏭️ Sırada Ne Var?

1. **Model Sınıfları** - Patient, MedicalRecord, User
2. **DbContext** - Veritabanı bağlantısı
3. **Migration** - Tabloları oluşturma
4. **JWT Authentication** - Kullanıcı girişi
5. **Controllers** - API endpoint'leri

---

*Bu doküman, projenin geliştirilmesi sırasında güncellenmektedir.*
