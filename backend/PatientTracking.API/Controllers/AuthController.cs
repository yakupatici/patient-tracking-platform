using Microsoft.AspNetCore.Mvc;
using PatientTracking.API.DTOs;
using PatientTracking.API.Services;

namespace PatientTracking.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{    
    // Auth Service for authentication
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }
    // Register Controller 
    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterRequest request)
    {
        var result = await _authService.RegisterAsync(request);
        if (!result.Success)
        {
            return BadRequest(result);
        }
        return Ok(result);
    }
      // Login Controller 
    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginRequest request)
    {
        var result = await _authService.LoginAsync(request);
        if (!result.Success)
        {
            return Unauthorized(result);
        }
        return Ok(result);
    }

    // Signout Controller
    [HttpPost("signout")]
    public IActionResult Signout()
    {
        // JWT is stateless - client should remove the token
        // This endpoint confirms successful signout request
        return Ok(new { Success = true, Message = "Signed out successfully." });
    }
}
