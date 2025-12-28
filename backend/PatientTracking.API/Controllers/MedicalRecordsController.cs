using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PatientTracking.API.Data;
using PatientTracking.Core.Models;

namespace PatientTracking.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class MedicalRecordsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public MedicalRecordsController(ApplicationDbContext context)
    {
        _context = context;
    }

    // Get all medical records for a patient
    [HttpGet("patient/{patientId}")]
    public async Task<IActionResult> GetByPatientId(int patientId)
    {
        var records = await _context.MedicalRecords
            .Where(r => r.PatientId == patientId)
            .OrderByDescending(r => r.RecordDate)
            .Select(r => new
            {
                r.Id,
                r.PatientId,
                r.Description,
                r.DoctorRemarks,
                r.RecordDate
            })
            .ToListAsync();

        return Ok(records);
    }

    // Create new medical record
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateMedicalRecordRequest request)
    {
        // Check if patient exists
        var patient = await _context.Patients.FindAsync(request.PatientId);
        if (patient == null)
            return NotFound("Patient not found.");

        var record = new MedicalRecord
        {
            PatientId = request.PatientId,
            Description = request.Description,
            DoctorRemarks = request.DoctorRemarks,
            RecordDate = DateTime.UtcNow
        };

        _context.MedicalRecords.Add(record);
        await _context.SaveChangesAsync();

        return Ok(new
        {
            record.Id,
            record.PatientId,
            record.Description,
            record.DoctorRemarks,
            record.RecordDate
        });
    }
}

// DTO for creating medical record
public class CreateMedicalRecordRequest
{
    public int PatientId { get; set; }
    public string Description { get; set; } = string.Empty;
    public string DoctorRemarks { get; set; } = string.Empty;
}
