using System;
using System.Collections.Generic;

namespace PatientTracking.Core.Models;

public class Patient
{
    public int Id { get; set; }
    public string TcId { get; set; } = string.Empty; // TC Kimlik No
    public string Name { get; set; } = string.Empty;
    public string Surname { get; set; } = string.Empty;
    public DateTime BirthDate { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? UpdatedDate { get; set; }


    public ICollection<MedicalRecord> MedicalRecords { get; set; } = new List<MedicalRecord>();
}