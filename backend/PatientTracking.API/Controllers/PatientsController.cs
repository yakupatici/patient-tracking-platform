using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PatientTracking.API.DTOs;
using PatientTracking.API.Services;

namespace PatientTracking.API.Controllers;

[Authorize] // Sadece giriş yapmış kullanıcılar (doktorlar) erişebilir
[ApiController]
[Route("api/[controller]")]
public class PatientsController : ControllerBase
{
    private readonly IPatientService _patientService;

    public PatientsController(IPatientService patientService)
    {
        _patientService = patientService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var patients = await _patientService.GetAllPatientsAsync();
        return Ok(patients);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var patient = await _patientService.GetPatientByIdAsync(id);
        if (patient == null) return NotFound("Patient not found.");
        return Ok(patient);
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreatePatientRequest request)
    {
        var result = await _patientService.CreatePatientAsync(request);
        return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
    }

    [HttpPut]
    public async Task<IActionResult> Update(UpdatePatientRequest request)
    {
        var result = await _patientService.UpdatePatientAsync(request);
        if (!result) return NotFound("Patient not found.");
        return Ok("Patient updated successfully.");
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await _patientService.DeletePatientAsync(id);
        if (!result) return NotFound("Patient not found.");
        return Ok("Patient deleted successfully.");
    }
}
