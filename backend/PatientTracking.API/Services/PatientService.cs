using Microsoft.EntityFrameworkCore;
using PatientTracking.API.Data;
using PatientTracking.API.DTOs;
using PatientTracking.Core.Models;

namespace PatientTracking.API.Services;

public class PatientService : IPatientService
{
    private readonly ApplicationDbContext _context;

    public PatientService(ApplicationDbContext context)
    {
        _context = context;
    }
    // Get all patients
    public async Task<IEnumerable<PatientDto>> GetAllPatientsAsync()
    {
        return await _context.Patients
            .Select(p => new PatientDto
            {
                Id = p.Id,
                TcId = p.TcId,
                Name = p.Name,
                Surname = p.Surname,
                BirthDate = p.BirthDate,
                CreatedDate = p.CreatedDate
            })
            .ToListAsync();
    }
     // Get patient by id
    public async Task<PatientDto?> GetPatientByIdAsync(int id)
    {
        var p = await _context.Patients.FindAsync(id);
        if (p == null) return null;

        return new PatientDto
        {
            Id = p.Id,
            TcId = p.TcId,
            Name = p.Name,
            Surname = p.Surname,
            BirthDate = p.BirthDate,
            CreatedDate = p.CreatedDate
        };
    }
    // Create patient
    public async Task<PatientDto> CreatePatientAsync(CreatePatientRequest request)
    {
        var patient = new Patient
        {
            TcId = request.TcId,
            Name = request.Name,
            Surname = request.Surname,
            BirthDate = request.BirthDate,
            CreatedDate = DateTime.UtcNow
        };

        _context.Patients.Add(patient);
        await _context.SaveChangesAsync();

        return new PatientDto
        {
            Id = patient.Id,
            TcId = patient.TcId,
            Name = patient.Name,
            Surname = patient.Surname,
            BirthDate = patient.BirthDate,
            CreatedDate = patient.CreatedDate
        };
    }
    // Update patient
    public async Task<bool> UpdatePatientAsync(UpdatePatientRequest request)
    {
        var patient = await _context.Patients.FindAsync(request.Id);
        if (patient == null) return false;

        patient.TcId = request.TcId;
        patient.Name = request.Name;
        patient.Surname = request.Surname;
        patient.BirthDate = request.BirthDate;
        patient.UpdatedDate = DateTime.UtcNow;

        await _context.SaveChangesAsync();
        return true;
    }
    // Delete patient by id
    public async Task<bool> DeletePatientAsync(int id)
    {
        var patient = await _context.Patients.FindAsync(id);
        if (patient == null) return false;

        _context.Patients.Remove(patient);
        await _context.SaveChangesAsync();
        return true;
    }
}
