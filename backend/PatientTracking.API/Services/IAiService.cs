using PatientTracking.API.DTOs;

namespace PatientTracking.API.Services;

public interface IAiService
{
    Task<AiPredictionResult> GetPredictionAsync(int patientId);
}
