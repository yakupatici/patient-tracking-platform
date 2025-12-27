using Microsoft.EntityFrameworkCore;
using PatientTracking.API.Data;
using PatientTracking.API.DTOs;

namespace PatientTracking.API.Services;

public class AiService : IAiService
{
    private readonly ApplicationDbContext _context;

    public AiService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<AiPredictionResult> GetPredictionAsync(int patientId)
    {
        // get patient and records
        var patient = await _context.Patients
            .Include(p => p.MedicalRecords)
            .FirstOrDefaultAsync(p => p.Id == patientId);

        if (patient == null)
        {
            return new AiPredictionResult
            {
                RiskLevel = "Unknown",
                Recommendation = "Patient not found.",
                AnalysisDate = DateTime.UtcNow
            };
        }

        // MOCK AI 
        
        int recordCount = patient.MedicalRecords.Count;
        int age = DateTime.UtcNow.Year - patient.BirthDate.Year;

        string risk;
        double prob;
        string advice;

        if (recordCount > 5 || age > 70)
        {
            risk = "High";
            prob = 0.85;
            advice = "Comprehensive clinical examination and frequent monitoring recommended.";
        }
        else if (recordCount > 2)
        {
            risk = "Medium";
            prob = 0.55;
            advice = "Routine check-ups should be maintained. Monitor symptoms.";
        }
        else
        {
            risk = "Low";
            prob = 0.15;
            advice = "Patient status appears stable. Continue standard wellness program.";
        }

        return new AiPredictionResult
        {
            RiskLevel = risk,
            Probability = prob,
            Recommendation = advice,
            AnalysisDate = DateTime.UtcNow
        };
    }
}
