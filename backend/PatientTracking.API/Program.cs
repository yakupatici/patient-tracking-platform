using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using PatientTracking.API.Data;
using PatientTracking.API.Services;

var builder = WebApplication.CreateBuilder(args);

// ========== 1. SERVİSLER ==========

// Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Controllers (API endpoint'leri için) - JSON çıktısı camelCase olacak
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        // camelCase kullan (Angular ile uyumlu olması için)
        options.JsonSerializerOptions.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase;
    });

// DbContext - PostgreSQL bağlantısı
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Auth Servisi
builder.Services.AddScoped<IAuthService, AuthService>();

// Patient Servisi
builder.Services.AddScoped<IPatientService, PatientService>();

// AI Servisi
builder.Services.AddScoped<IAiService, AiService>();

// CORS - Frontend'in API'ye erişimi için
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// JWT Authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!))
        };
    });

builder.Services.AddAuthorization();

var app = builder.Build();

// ========== 2. MIDDLEWARE ==========

// Development ortamında Swagger'ı aktif et
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseHttpsRedirection(); // Disabled for local development

// CORS
app.UseCors("AllowFrontend");

// Authentication & Authorization
app.UseAuthentication();
app.UseAuthorization();

// Controller'ları route'lara bağla
app.MapControllers();

app.Run();
