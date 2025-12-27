namespace PatientTracking.API.DTOs;

public class AiPredictionResult
{
    public string RiskLevel { get; set; } = string.Empty; // Low, Medium, High
    public double Probability { get; set; } // 
    public string Recommendation { get; set; } = string.Empty;
    public DateTime AnalysisDate { get; set; }
}
