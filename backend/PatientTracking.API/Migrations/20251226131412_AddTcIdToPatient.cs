using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PatientTracking.API.Migrations
{

    public partial class AddTcIdToPatient : Migration
    {
   
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "TcId",
                table: "Patients",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

       
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TcId",
                table: "Patients");
        }
    }
}
