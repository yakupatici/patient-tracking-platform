namespace PatientTracking.API.DTOs;

public class PatientDto
{
    public int Id { get; set; }
    public string TcId { get; set; } = string.Empty; // TC Kimlik No
    public string Name { get; set; } = string.Empty;
    public string Surname { get; set; } = string.Empty;
    public DateTime BirthDate { get; set; }
    public DateTime CreatedDate { get; set; }
}

public class CreatePatientRequest
{
    public string TcId { get; set; } = string.Empty; 
    public string Name { get; set; } = string.Empty;
    public string Surname { get; set; } = string.Empty;
    public DateTime BirthDate { get; set; }
}

public class UpdatePatientRequest : CreatePatientRequest
{
    public int Id { get; set; }
}
