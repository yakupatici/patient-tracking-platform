using Microsoft.AspNetCore.Mvc;
using Moq;
using PatientTracking.API.Controllers;
using PatientTracking.API.DTOs;
using PatientTracking.API.Services;

namespace PatientTracking.Tests;

/// <summary>
/// Unit tests for PatientsController
/// Tests: GetAll, GetById, Create, Delete operations
/// </summary>
public class PatientsControllerTests
{
    private readonly Mock<IPatientService> _mockPatientService;
    private readonly PatientsController _controller;

    public PatientsControllerTests()
    {
        _mockPatientService = new Mock<IPatientService>();
        _controller = new PatientsController(_mockPatientService.Object);
    }

    [Fact]
    public async Task GetAll_ReturnsOkResult_WithListOfPatients()
    {
        // Arrange
        var expectedPatients = new List<PatientDto>
        {
            new PatientDto { Id = 1, TcId = "12345678901", Name = "Ali", Surname = "Yılmaz", BirthDate = new DateTime(1990, 1, 1) },
            new PatientDto { Id = 2, TcId = "12345678902", Name = "Ayşe", Surname = "Kaya", BirthDate = new DateTime(1985, 5, 15) }
        };
        _mockPatientService.Setup(s => s.GetAllPatientsAsync()).ReturnsAsync(expectedPatients);

        // Act
        var result = await _controller.GetAll();

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        var actualPatients = Assert.IsAssignableFrom<IEnumerable<PatientDto>>(okResult.Value);
        Assert.Equal(2, actualPatients.Count());
    }

    [Fact]
    public async Task GetById_ReturnsOkResult_WhenPatientExists()
    {
        // Arrange
        var expectedPatient = new PatientDto 
        { 
            Id = 1, 
            TcId = "12345678901", 
            Name = "Mehmet", 
            Surname = "Demir", 
            BirthDate = new DateTime(1990, 1, 1) 
        };
        _mockPatientService.Setup(s => s.GetPatientByIdAsync(1)).ReturnsAsync(expectedPatient);

        // Act
        var result = await _controller.GetById(1);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        var actualPatient = Assert.IsType<PatientDto>(okResult.Value);
        Assert.Equal("Mehmet", actualPatient.Name);
        Assert.Equal("12345678901", actualPatient.TcId);
    }

    [Fact]
    public async Task GetById_ReturnsNotFound_WhenPatientDoesNotExist()
    {
        // Arrange
        _mockPatientService.Setup(s => s.GetPatientByIdAsync(999)).ReturnsAsync((PatientDto?)null);

        // Act
        var result = await _controller.GetById(999);

        // Assert
        Assert.IsType<NotFoundObjectResult>(result);
    }

    [Fact]
    public async Task Create_ReturnsCreatedAtAction_WithNewPatient()
    {
        // Arrange
        var createRequest = new CreatePatientRequest
        {
            TcId = "12345678903",
            Name = "Fatma",
            Surname = "Şahin",
            BirthDate = new DateTime(1992, 3, 20)
        };
        var createdPatient = new PatientDto
        {
            Id = 3,
            TcId = "12345678903",
            Name = "Fatma",
            Surname = "Şahin",
            BirthDate = new DateTime(1992, 3, 20)
        };
        _mockPatientService.Setup(s => s.CreatePatientAsync(createRequest)).ReturnsAsync(createdPatient);

        // Act
        var result = await _controller.Create(createRequest);

        // Assert
        var createdResult = Assert.IsType<CreatedAtActionResult>(result);
        var actualPatient = Assert.IsType<PatientDto>(createdResult.Value);
        Assert.Equal("Fatma", actualPatient.Name);
    }

    [Fact]
    public async Task Delete_ReturnsOk_WhenPatientExists()
    {
        // Arrange
        _mockPatientService.Setup(s => s.DeletePatientAsync(1)).ReturnsAsync(true);

        // Act
        var result = await _controller.Delete(1);

        // Assert
        Assert.IsType<OkObjectResult>(result);
    }

    [Fact]
    public async Task Delete_ReturnsNotFound_WhenPatientDoesNotExist()
    {
        // Arrange
        _mockPatientService.Setup(s => s.DeletePatientAsync(999)).ReturnsAsync(false);

        // Act
        var result = await _controller.Delete(999);

        // Assert
        Assert.IsType<NotFoundObjectResult>(result);
    }
}
