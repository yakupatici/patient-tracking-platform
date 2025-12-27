using PatientTracking.API.DTOs;

namespace PatientTracking.API.Services;

public interface IAuthService
{
    // when user register request is sent
    Task<AuthResponse> RegisterAsync(RegisterRequest request);
    
    //  when user login request is sent
    Task<AuthResponse> LoginAsync(LoginRequest request);
}
