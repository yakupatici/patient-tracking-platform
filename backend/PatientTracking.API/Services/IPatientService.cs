using PatientTracking.API.DTOs;

namespace PatientTracking.API.Services;

public interface IPatientService
{
    Task<IEnumerable<PatientDto>> GetAllPatientsAsync();
    Task<PatientDto?> GetPatientByIdAsync(int id);
    Task<PatientDto> CreatePatientAsync(CreatePatientRequest request);
    Task<bool> UpdatePatientAsync(UpdatePatientRequest request);
    Task<bool> DeletePatientAsync(int id);
}
