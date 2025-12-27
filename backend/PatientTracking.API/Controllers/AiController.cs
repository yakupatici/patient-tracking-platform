using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PatientTracking.API.Services;

namespace PatientTracking.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class AiController : ControllerBase
{
    private readonly IAiService _aiService;

    public AiController(IAiService aiService)
    {
        _aiService = aiService;
    }

    [HttpGet("predict/{patientId}")]
    public async Task<IActionResult> GetPrediction(int patientId)
    {
        var result = await _aiService.GetPredictionAsync(patientId);
        return Ok(result);
    }
}
