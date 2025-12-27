using Microsoft.AspNetCore.Mvc;
using Moq;
using PatientTracking.API.Controllers;
using PatientTracking.API.DTOs;
using PatientTracking.API.Services;

namespace PatientTracking.Tests;

/// <summary>
/// Unit tests for AuthController
/// Tests: Register, Login operations
/// </summary>
public class AuthControllerTests
{
    private readonly Mock<IAuthService> _mockAuthService;
    private readonly AuthController _controller;

    public AuthControllerTests()
    {
        _mockAuthService = new Mock<IAuthService>();
        _controller = new AuthController(_mockAuthService.Object);
    }

    [Fact]
    public async Task Register_ReturnsOk_WhenRegistrationSucceeds()
    {
        // Arrange
        var request = new RegisterRequest
        {
            Username = "testuser",
            Email = "test@email.com",
            Password = "password123"
        };
        var response = new AuthResponse
        {
            Success = true,
            Message = "Registration successful."
        };
        _mockAuthService.Setup(s => s.RegisterAsync(request)).ReturnsAsync(response);

        // Act
        var result = await _controller.Register(request);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        var authResponse = Assert.IsType<AuthResponse>(okResult.Value);
        Assert.True(authResponse.Success);
    }

    [Fact]
    public async Task Register_ReturnsBadRequest_WhenRegistrationFails()
    {
        // Arrange
        var request = new RegisterRequest
        {
            Username = "existinguser",
            Email = "existing@email.com",
            Password = "password123"
        };
        var response = new AuthResponse
        {
            Success = false,
            Message = "This email is already registered."
        };
        _mockAuthService.Setup(s => s.RegisterAsync(request)).ReturnsAsync(response);

        // Act
        var result = await _controller.Register(request);

        // Assert
        var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
        var authResponse = Assert.IsType<AuthResponse>(badRequestResult.Value);
        Assert.False(authResponse.Success);
    }

    [Fact]
    public async Task Login_ReturnsOk_WhenLoginSucceeds()
    {
        // Arrange
        var request = new LoginRequest
        {
            Email = "user@email.com",
            Password = "correctpassword"
        };
        var response = new AuthResponse
        {
            Success = true,
            Token = "eyJhbGciOiJIUzI1NiIsInR5...",
            Message = "Login successful."
        };
        _mockAuthService.Setup(s => s.LoginAsync(request)).ReturnsAsync(response);

        // Act
        var result = await _controller.Login(request);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        var authResponse = Assert.IsType<AuthResponse>(okResult.Value);
        Assert.True(authResponse.Success);
        Assert.NotNull(authResponse.Token);
    }

    [Fact]
    public async Task Login_ReturnsUnauthorized_WhenLoginFails()
    {
        // Arrange
        var request = new LoginRequest
        {
            Email = "user@email.com",
            Password = "wrongpassword"
        };
        var response = new AuthResponse
        {
            Success = false,
            Message = "Invalid email or password."
        };
        _mockAuthService.Setup(s => s.LoginAsync(request)).ReturnsAsync(response);

        // Act
        var result = await _controller.Login(request);

        // Assert
        var unauthorizedResult = Assert.IsType<UnauthorizedObjectResult>(result);
        var authResponse = Assert.IsType<AuthResponse>(unauthorizedResult.Value);
        Assert.False(authResponse.Success);
    }
}
