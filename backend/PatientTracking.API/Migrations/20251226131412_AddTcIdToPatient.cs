using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PatientTracking.API.Migrations
{
    /// <inheritdoc />
    public partial class AddTcIdToPatient : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "TcId",
                table: "Patients",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TcId",
                table: "Patients");
        }
    }
}
