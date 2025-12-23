# 🏥 AI-Supported Patient Tracking Platform - Öğrenme Yol Haritası

## 📋 Proje Özeti

| Bilgi | Detay |
|-------|-------|
| **Proje Adı** | AI-Supported Patient Tracking Platform (Lite) |
| **Süre** | 2-3 gün (maksimum) |
| **Amaç** | Basit bir klinik izleme sistemi geliştirmek |
| **Teslim** | GitHub/GitLab/Bitbucket repo + README dosyası |

---

## 🎯 Değerlendirme Kriterleri (Önemli!)

1. ✅ **Kod kalitesi ve yapısal mimari**
2. ✅ **Angular ve .NET Core entegrasyonu**
3. ✅ **Yazılım geliştirme prensiplerine uygunluk**
4. ✅ **Zaman ve brief'e uygunluk**

---

## 📚 BÖLÜM 1: TEKNİK GEREKSİNİMLER ANALİZİ

### Frontend Gereksinimleri
| Teknoloji | Açıklama | Öncelik |
|-----------|----------|---------|
| Angular 18+ | Frontend framework | 🔴 Zorunlu |
| Reactive Forms | Form yönetimi | 🔴 Zorunlu |
| JWT Authentication | Güvenli API bağlantısı | 🔴 Zorunlu |
| HttpClient | API çağrıları | 🔴 Zorunlu |

### Backend Gereksinimleri
| Teknoloji | Açıklama | Öncelik |
|-----------|----------|---------|
| .NET 8+ | ASP.NET Core Web API | 🔴 Zorunlu |
| Entity Framework Core | Veri yönetimi | 🔴 Zorunlu |
| Patient CRUD | Hasta işlemleri | 🔴 Zorunlu |
| JWT (Register, Signin, Signout) | AAA mekanizması | 🔴 Zorunlu |
| /api/prediction endpoint | AI tahmin servisi (mock) | 🔴 Zorunlu |

### Veritabanı
| Seçenek | Notlar |
|---------|--------|
| PostgreSQL | Tercih edilebilir |
| MSSQL | Alternatif |

### Bonus (+1) Özellikler
| Özellik | Açıklama |
|---------|----------|
| Swagger API Documentation | API dokümantasyonu |
| Docker Container | Sanallaştırma için |
| Unit Testing | En az 1 controller testi |

---

## 🗺️ BÖLÜM 2: ADIM ADIM ÖĞRENME YOL HARİTASI

### 📍 ADIM 1: Geliştirme Ortamının Kurulumu (30 dakika)

#### 1.1 Gerekli Araçların Kontrolü
```bash
# .NET SDK kontrolü
dotnet --version  # 8.0 veya üzeri olmalı

# Node.js kontrolü
node --version    # 18+ olmalı

# Angular CLI kontrolü
ng version        # 18+ olmalı

# PostgreSQL veya MSSQL kurulu olmalı
```

#### 1.2 Kurulması Gerekenler
- [ ] **.NET 8 SDK**: https://dotnet.microsoft.com/download
- [ ] **Node.js 18+**: https://nodejs.org/
- [ ] **Angular CLI**: `npm install -g @angular/cli@latest`
- [ ] **PostgreSQL**: https://www.postgresql.org/download/
- [ ] **Visual Studio Code** veya **Rider/Visual Studio**
- [ ] **Git**: https://git-scm.com/

#### 📖 Öğrenilecekler:
- Geliştirme ortamı kurulumu
- Versiyon yönetimi
- CLI araçlarının kullanımı

---

### 📍 ADIM 2: Proje Yapısının Oluşturulması (1 saat)

#### 2.1 Klasör Yapısı
```
AI-Supported-Patient-Tracking-Platform/
├── backend/                    # .NET Core Web API
│   ├── PatientTracking.API/    # API projesi
│   ├── PatientTracking.Core/   # Core models, interfaces
│   └── PatientTracking.Tests/  # Unit testler
├── frontend/                   # Angular uygulaması
│   └── patient-tracking-app/
├── docker/                     # Docker dosyaları
├── docs/                       # Dokümantasyon
└── README.md                   # Proje açıklaması
```

#### 2.2 Backend Projesi Oluşturma
```bash
# Proje klasörüne git
cd "AI-Supported Patient Tracking Platform"

# Backend solution oluştur
mkdir backend
cd backend

# Solution ve projeler
dotnet new sln -n PatientTracking
dotnet new webapi -n PatientTracking.API
dotnet new classlib -n PatientTracking.Core
dotnet new xunit -n PatientTracking.Tests

# Projeleri solution'a ekle
dotnet sln add PatientTracking.API
dotnet sln add PatientTracking.Core
dotnet sln add PatientTracking.Tests

# Referansları ekle
cd PatientTracking.API
dotnet add reference ../PatientTracking.Core

cd ../PatientTracking.Tests
dotnet add reference ../PatientTracking.API
```

#### 2.3 Frontend Projesi Oluşturma
```bash
# Root klasöre dön
cd ../..

# Angular projesi oluştur
mkdir frontend
cd frontend
ng new patient-tracking-app --routing --style=scss --standalone
```

#### 📖 Öğrenilecekler:
- .NET Solution yapısı
- Katmanlı mimari (Layered Architecture)
- Angular proje yapısı
- Standalone components (Angular 18)

---

### 📍 ADIM 3: Backend - Veritabanı ve Entity Framework (2 saat)

#### 3.1 NuGet Paketlerinin Kurulumu
```bash
cd backend/PatientTracking.API

# Entity Framework Core
dotnet add package Microsoft.EntityFrameworkCore
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL  # PostgreSQL için
# veya
dotnet add package Microsoft.EntityFrameworkCore.SqlServer  # MSSQL için

# JWT Authentication
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer
dotnet add package System.IdentityModel.Tokens.Jwt

# Swagger (Bonus)
dotnet add package Swashbuckle.AspNetCore
```

#### 3.2 Model Sınıfları (PatientTracking.Core)
```csharp
// Models/Patient.cs
public class Patient
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Surname { get; set; } = string.Empty;
    public DateTime Birthdate { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    
    // Navigation properties
    public ICollection<MedicalRecord> MedicalRecords { get; set; } = new List<MedicalRecord>();
}

// Models/MedicalRecord.cs
public class MedicalRecord
{
    public int Id { get; set; }
    public int PatientId { get; set; }
    public string Description { get; set; } = string.Empty;
    public string DoctorRemarks { get; set; } = string.Empty;
    public DateTime RecordDate { get; set; }
    
    // Navigation property
    public Patient Patient { get; set; } = null!;
}

// Models/User.cs
public class User
{
    public int Id { get; set; }
    public string Username { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
}
```

#### 3.3 DbContext Oluşturma
```csharp
// Data/ApplicationDbContext.cs
public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options) { }
    
    public DbSet<Patient> Patients => Set<Patient>();
    public DbSet<MedicalRecord> MedicalRecords => Set<MedicalRecord>();
    public DbSet<User> Users => Set<User>();
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Seed data eklenebilir
        base.OnModelCreating(modelBuilder);
    }
}
```

#### 3.4 Migration ve Veritabanı Oluşturma
```bash
# Migration oluştur
dotnet ef migrations add InitialCreate

# Veritabanını güncelle
dotnet ef database update
```

#### 📖 Öğrenilecekler:
- Entity Framework Core temelleri
- Code-First yaklaşımı
- Migration yönetimi
- DbContext ve DbSet kullanımı
- Model ilişkileri (One-to-Many)

---

### 📍 ADIM 4: Backend - JWT Authentication (2-3 saat)

#### 4.1 JWT Konfigürasyonu (appsettings.json)
```json
{
  "Jwt": {
    "Key": "YourSuperSecretKeyThatIsAtLeast32CharactersLong!",
    "Issuer": "PatientTrackingAPI",
    "Audience": "PatientTrackingApp",
    "ExpireMinutes": 60
  }
}
```

#### 4.2 Auth Service
```csharp
// Services/IAuthService.cs
public interface IAuthService
{
    Task<AuthResponse> RegisterAsync(RegisterRequest request);
    Task<AuthResponse> LoginAsync(LoginRequest request);
    Task<bool> ValidateTokenAsync(string token);
}

// DTOs
public record RegisterRequest(string Username, string Email, string Password);
public record LoginRequest(string Email, string Password);
public record AuthResponse(bool Success, string? Token, string? Message);
```

#### 4.3 Auth Controller
```csharp
[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request) { }
    
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request) { }
    
    [HttpPost("logout")]
    [Authorize]
    public IActionResult Logout() { }
}
```

#### 📖 Öğrenilecekler:
- JWT (JSON Web Token) temelleri
- Authentication vs Authorization
- Password hashing (BCrypt)
- Middleware kullanımı
- [Authorize] attribute'u

---

### 📍 ADIM 5: Backend - Patient CRUD Operations (2 saat)

#### 5.1 Repository Pattern (Opsiyonel ama tavsiye edilir)
```csharp
// Interfaces/IPatientRepository.cs
public interface IPatientRepository
{
    Task<IEnumerable<Patient>> GetAllAsync();
    Task<Patient?> GetByIdAsync(int id);
    Task<Patient> CreateAsync(Patient patient);
    Task<Patient?> UpdateAsync(int id, Patient patient);
    Task<bool> DeleteAsync(int id);
}
```

#### 5.2 Patient Controller
```csharp
[ApiController]
[Route("api/[controller]")]
[Authorize]  // JWT koruması
public class PatientsController : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll() { }
    
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id) { }
    
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreatePatientRequest request) { }
    
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdatePatientRequest request) { }
    
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id) { }
}
```

#### 📖 Öğrenilecekler:
- CRUD operasyonları
- RESTful API tasarımı
- HTTP metodları (GET, POST, PUT, DELETE)
- DTOs (Data Transfer Objects)
- Repository Pattern

---

### 📍 ADIM 6: Backend - AI Prediction Mock Endpoint (30 dakika)

#### 6.1 Prediction Controller
```csharp
[ApiController]
[Route("api/[controller]")]
[Authorize]
public class PredictionController : ControllerBase
{
    [HttpGet("{patientId}")]
    public IActionResult GetPrediction(int patientId)
    {
        // Mock AI prediction - sabit JSON döndürür
        var prediction = new
        {
            PatientId = patientId,
            RiskLevel = "Low",
            Confidence = 0.85,
            Recommendations = new[]
            {
                "Regular check-ups recommended",
                "Maintain healthy diet",
                "Continue current medication"
            },
            PredictionDate = DateTime.UtcNow
        };
        
        return Ok(prediction);
    }
}
```

#### 📖 Öğrenilecekler:
- Mock API oluşturma
- Anonymous types
- API response formatları

---

### 📍 ADIM 7: Backend - Swagger Entegrasyonu (30 dakika) [BONUS]

#### 7.1 Program.cs Konfigürasyonu
```csharp
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Patient Tracking API",
        Version = "v1",
        Description = "AI-Supported Patient Tracking Platform API"
    });
    
    // JWT için Swagger konfigürasyonu
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });
});
```

#### 📖 Öğrenilecekler:
- API dokümantasyonu
- OpenAPI/Swagger standartları
- API test etme

---

### 📍 ADIM 8: Frontend - Angular Proje Kurulumu (1 saat)

#### 8.1 Gerekli Paketlerin Kurulumu
```bash
cd frontend/patient-tracking-app

# Angular Material (UI components)
ng add @angular/material

# JWT decode
npm install jwt-decode

# HTTP interceptors için
# Angular 18'de standalone yapı ile gelir
```

#### 8.2 Proje Yapısı
```
src/
├── app/
│   ├── core/                 # Services, guards, interceptors
│   │   ├── services/
│   │   │   ├── auth.service.ts
│   │   │   ├── patient.service.ts
│   │   │   └── prediction.service.ts
│   │   ├── guards/
│   │   │   └── auth.guard.ts
│   │   └── interceptors/
│   │       └── jwt.interceptor.ts
│   ├── features/             # Feature modules
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   └── register/
│   │   └── patients/
│   │       ├── patient-list/
│   │       ├── patient-detail/
│   │       └── patient-create/
│   ├── shared/               # Shared components
│   └── app.routes.ts         # Routing
├── environments/
└── styles.scss
```

#### 📖 Öğrenilecekler:
- Angular 18 standalone components
- Angular proje organizasyonu
- Feature-based architecture

---

### 📍 ADIM 9: Frontend - Auth Service ve JWT (2 saat)

#### 9.1 Auth Service
```typescript
// core/services/auth.service.ts
@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:5000/api';
  
  login(email: string, password: string): Observable<AuthResponse> { }
  register(request: RegisterRequest): Observable<AuthResponse> { }
  logout(): void { }
  isAuthenticated(): boolean { }
  getToken(): string | null { }
}
```

#### 9.2 JWT Interceptor
```typescript
// core/interceptors/jwt.interceptor.ts
export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  
  return next(req);
};
```

#### 9.3 Auth Guard
```typescript
// core/guards/auth.guard.ts
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  if (authService.isAuthenticated()) {
    return true;
  }
  
  return router.createUrlTree(['/login']);
};
```

#### 📖 Öğrenilecekler:
- Angular Services (Dependency Injection)
- HTTP Interceptors (functional approach)
- Route Guards
- RxJS Observables
- localStorage kullanımı

---

### 📍 ADIM 10: Frontend - Login Sayfası (1.5 saat)

#### 10.1 Login Component
```typescript
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `...`
})
export class LoginComponent {
  loginForm: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  
  onSubmit(): void {
    if (this.loginForm.valid) {
      // Login logic
    }
  }
}
```

#### 📖 Öğrenilecekler:
- Reactive Forms
- Form validation
- FormBuilder
- Error handling

---

### 📍 ADIM 11: Frontend - Patient List Sayfası (1.5 saat)

#### 11.1 Gereksinimler
- Hasta listesi (Name, Surname, Birthdate)
- 'View' ve 'Delete' butonları
- 'Add New Patient' butonu

#### 11.2 Patient List Component
```typescript
@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="patient-list">
      <h1>Patients</h1>
      <button routerLink="/patients/new">Add New Patient</button>
      
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Birthdate</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          @for (patient of patients; track patient.id) {
            <tr>
              <td>{{ patient.name }}</td>
              <td>{{ patient.surname }}</td>
              <td>{{ patient.birthdate | date }}</td>
              <td>
                <button [routerLink]="['/patients', patient.id]">View</button>
                <button (click)="deletePatient(patient.id)">Delete</button>
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `
})
export class PatientListComponent implements OnInit {
  patients: Patient[] = [];
  
  ngOnInit(): void {
    this.loadPatients();
  }
}
```

#### 📖 Öğrenilecekler:
- Component lifecycle (ngOnInit)
- Template syntax (@for, @if)
- Event binding
- Property binding
- Pipes (date)

---

### 📍 ADIM 12: Frontend - Patient Detail Sayfası (1.5 saat)

#### 12.1 Gereksinimler
- Hasta geçmiş kayıtları listesi
- Doktor notları alanı
- AI-destekli tahmin alanı

#### 12.2 Patient Detail Component
```typescript
@Component({
  selector: 'app-patient-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="patient-detail">
      @if (patient) {
        <h1>{{ patient.name }} {{ patient.surname }}</h1>
        
        <section class="medical-records">
          <h2>Medical History</h2>
          @for (record of patient.medicalRecords; track record.id) {
            <div class="record-card">
              <p>{{ record.description }}</p>
              <small>{{ record.recordDate | date }}</small>
            </div>
          }
        </section>
        
        <section class="doctor-remarks">
          <h2>Doctor's Remarks</h2>
          <p>{{ patient.doctorRemarks }}</p>
        </section>
        
        <section class="ai-prediction">
          <h2>AI Prediction</h2>
          @if (prediction) {
            <div class="prediction-card">
              <p>Risk Level: {{ prediction.riskLevel }}</p>
              <p>Confidence: {{ prediction.confidence | percent }}</p>
            </div>
          }
        </section>
      }
    </div>
  `
})
export class PatientDetailComponent implements OnInit {
  patient: Patient | null = null;
  prediction: Prediction | null = null;
  
  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService,
    private predictionService: PredictionService
  ) {}
  
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadPatient(+id);
      this.loadPrediction(+id);
    }
  }
}
```

#### 📖 Öğrenilecekler:
- Route parameters
- ActivatedRoute
- Conditional rendering (@if)
- Multiple API calls

---

### 📍 ADIM 13: Frontend - Patient Create Sayfası (1 saat)

#### 13.1 Gereksinimler
- Name, Surname, Birthdate alanları
- Backend'e POST request

#### 13.2 Patient Create Component
```typescript
@Component({
  selector: 'app-patient-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="patientForm" (ngSubmit)="onSubmit()">
      <div class="form-group">
        <label for="name">Name</label>
        <input id="name" formControlName="name" />
        @if (patientForm.get('name')?.invalid && patientForm.get('name')?.touched) {
          <span class="error">Name is required</span>
        }
      </div>
      
      <div class="form-group">
        <label for="surname">Surname</label>
        <input id="surname" formControlName="surname" />
      </div>
      
      <div class="form-group">
        <label for="birthdate">Birthdate</label>
        <input id="birthdate" type="date" formControlName="birthdate" />
      </div>
      
      <button type="submit" [disabled]="patientForm.invalid">Create Patient</button>
    </form>
  `
})
export class PatientCreateComponent {
  patientForm: FormGroup;
  
  constructor(private fb: FormBuilder, private patientService: PatientService) {
    this.patientForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      birthdate: ['', Validators.required]
    });
  }
}
```

#### 📖 Öğrenilecekler:
- Form submission
- POST requests
- Form validation feedback
- Navigation after success

---

### 📍 ADIM 14: Routing ve Navigation (1 saat)

#### 14.1 App Routes
```typescript
// app.routes.ts
export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'patients',
    canActivate: [authGuard],
    children: [
      { path: '', component: PatientListComponent },
      { path: 'new', component: PatientCreateComponent },
      { path: ':id', component: PatientDetailComponent }
    ]
  },
  { path: '**', redirectTo: '/login' }
];
```

#### 📖 Öğrenilecekler:
- Angular routing
- Child routes
- Lazy loading (opsiyonel)
- Wildcard routes

---

### 📍 ADIM 15: Unit Testing (1 saat) [BONUS]

#### 15.1 Backend - Controller Test
```csharp
// PatientTracking.Tests/PatientsControllerTests.cs
public class PatientsControllerTests
{
    [Fact]
    public async Task GetAll_ReturnsOkResult_WithListOfPatients()
    {
        // Arrange
        var mockRepo = new Mock<IPatientRepository>();
        mockRepo.Setup(repo => repo.GetAllAsync())
            .ReturnsAsync(new List<Patient> { new Patient { Id = 1, Name = "John" } });
        
        var controller = new PatientsController(mockRepo.Object);
        
        // Act
        var result = await controller.GetAll();
        
        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        var patients = Assert.IsAssignableFrom<IEnumerable<Patient>>(okResult.Value);
        Assert.Single(patients);
    }
}
```

#### 📖 Öğrenilecekler:
- xUnit framework
- Mocking (Moq)
- AAA pattern (Arrange, Act, Assert)
- Test-driven development basics

---

### 📍 ADIM 16: Docker Kurulumu (1 saat) [BONUS]

#### 16.1 Backend Dockerfile
```dockerfile
# backend/PatientTracking.API/Dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["PatientTracking.API/PatientTracking.API.csproj", "PatientTracking.API/"]
RUN dotnet restore "PatientTracking.API/PatientTracking.API.csproj"
COPY . .
WORKDIR "/src/PatientTracking.API"
RUN dotnet build -c Release -o /app/build

FROM build AS publish
RUN dotnet publish -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "PatientTracking.API.dll"]
```

#### 16.2 Docker Compose
```yaml
# docker-compose.yml
version: '3.8'
services:
  api:
    build:
      context: ./backend
      dockerfile: PatientTracking.API/Dockerfile
    ports:
      - "5000:80"
    depends_on:
      - db
    environment:
      - ConnectionStrings__DefaultConnection=Host=db;Database=patienttracking;Username=postgres;Password=postgres

  db:
    image: postgres:15
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_DB=patienttracking
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
    volumes:
      - postgres_data:/var/lib/postgresql/data

  frontend:
    build:
      context: ./frontend/patient-tracking-app
    ports:
      - "4200:80"
    depends_on:
      - api

volumes:
  postgres_data:
```

#### 📖 Öğrenilecekler:
- Docker temelleri
- Multi-stage builds
- Docker Compose
- Container networking

---

### 📍 ADIM 17: README ve Dokümantasyon (1 saat)

#### 17.1 README.md İçeriği
```markdown
# AI-Supported Patient Tracking Platform

## 📋 Project Description
Brief description of the project...

## 🛠️ Technologies Used
- **Frontend**: Angular 18+
- **Backend**: .NET 8 (ASP.NET Core Web API)
- **Database**: PostgreSQL
- **Authentication**: JWT

## 📁 Project Structure
...

## 🚀 Getting Started

### Prerequisites
- .NET 8 SDK
- Node.js 18+
- PostgreSQL

### Installation
1. Clone the repository
2. Backend setup...
3. Frontend setup...

### Running the Application
...

## 📚 API Documentation
Swagger UI available at: http://localhost:5000/swagger

## 🧪 Running Tests
...

## 🐳 Docker
...

## 📝 License
...
```

---

## 📅 BÖLÜM 3: ZAMAN ÇİZELGESİ (2-3 Gün)

### 1. Gün (8-10 saat)
| Süre | Görev | Adım |
|------|-------|------|
| 30 dk | Ortam kurulumu | Adım 1 |
| 1 saat | Proje yapısı oluşturma | Adım 2 |
| 2 saat | Veritabanı ve EF Core | Adım 3 |
| 3 saat | JWT Authentication | Adım 4 |
| 2 saat | Patient CRUD | Adım 5 |
| 30 dk | AI Prediction endpoint | Adım 6 |

### 2. Gün (8-10 saat)
| Süre | Görev | Adım |
|------|-------|------|
| 30 dk | Swagger (Bonus) | Adım 7 |
| 1 saat | Angular kurulum | Adım 8 |
| 2 saat | Auth service ve JWT | Adım 9 |
| 1.5 saat | Login sayfası | Adım 10 |
| 1.5 saat | Patient List | Adım 11 |
| 1.5 saat | Patient Detail | Adım 12 |
| 1 saat | Patient Create | Adım 13 |

### 3. Gün (4-6 saat)
| Süre | Görev | Adım |
|------|-------|------|
| 1 saat | Routing | Adım 14 |
| 1 saat | Unit Testing (Bonus) | Adım 15 |
| 1 saat | Docker (Bonus) | Adım 16 |
| 1 saat | README ve dokümantasyon | Adım 17 |
| 1-2 saat | Test ve bug fix | - |

---

## ✅ BÖLÜM 4: KONTROL LİSTESİ

### Zorunlu Gereksinimler
- [ ] Login sayfası (JWT Authentication)
- [ ] Angular frontend ile backend login
- [ ] Giriş yapmayan kullanıcı hasta sayfasına erişemez
- [ ] Hasta listesi sayfası (Name, Surname, Birthdate)
- [ ] View ve Delete butonları
- [ ] Add New Patient butonu
- [ ] Hasta detay sayfası
- [ ] Geçmiş kayıtlar listesi
- [ ] Doktor notları alanı
- [ ] AI tahmin alanı (mock API)
- [ ] Hasta oluşturma sayfası
- [ ] POST request ile hasta ekleme
- [ ] .NET 8+ Web API
- [ ] Entity Framework Core
- [ ] PostgreSQL veya MSSQL
- [ ] Patient CRUD operasyonları
- [ ] /api/prediction endpoint

### Bonus Özellikler (+1)
- [ ] Swagger API dokümantasyonu
- [ ] Docker container desteği
- [ ] En az 1 controller için unit test

### Teslim
- [ ] GitHub/GitLab/Bitbucket repository
- [ ] Detaylı README dosyası

---

## 💡 BÖLÜM 5: İPUÇLARI VE EN İYİ UYGULAMALAR

### Kod Kalitesi
1. **Naming conventions**: C# için PascalCase, TypeScript için camelCase
2. **SOLID prensipleri**: Özellikle Single Responsibility
3. **DRY (Don't Repeat Yourself)**: Kod tekrarından kaçının
4. **Clean Code**: Anlaşılır değişken ve fonksiyon isimleri

### Git Kullanımı
```bash
# Sık commit atın
git add .
git commit -m "feat: add patient CRUD operations"

# Anlamlı commit mesajları
# feat: yeni özellik
# fix: bug düzeltme
# docs: dokümantasyon
# refactor: kod iyileştirme
```

### Hata Ayıklama
- Backend: Swagger UI kullanın
- Frontend: Browser DevTools (Network tab)
- Console.log / Debug.WriteLine kullanın

---

## 📚 BÖLÜM 6: EK KAYNAKLAR

### Angular
- [Angular Resmi Dokümantasyonu](https://angular.dev)
- [Angular Tutorial](https://angular.dev/tutorials)

### .NET
- [ASP.NET Core Dokümantasyonu](https://docs.microsoft.com/aspnet/core)
- [Entity Framework Core](https://docs.microsoft.com/ef/core)

### JWT
- [JWT.io](https://jwt.io) - JWT debugger

### Docker
- [Docker Dokümantasyonu](https://docs.docker.com)

---

## 🎯 SON SÖZ

Bu proje, modern full-stack geliştirme becerilerinizi göstermeniz için mükemmel bir fırsat. Adım adım ilerleyin, her adımı anladığınızdan emin olun ve soru sormaktan çekinmeyin.

**Başarılar!** 🚀

---

*Bu yol haritası, projenizi başarıyla tamamlamanıza yardımcı olmak için hazırlanmıştır. İhtiyacınız olan herhangi bir adımda yardım isteyebilirsiniz.*
