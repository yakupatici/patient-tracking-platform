using System;

namespace PatientTracking.Core.Models;

public class MedicalRecord
{
    public int Id { get; set; } 
    public int PatientId { get; set; }
    public string Description { get; set; } = string.Empty;
    public string DoctorRemarks { get; set; } = string.Empty;
    public DateTime RecordDate { get; set; }


    public Patient Patient { get; set; } = null!;
}