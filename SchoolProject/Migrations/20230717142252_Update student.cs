using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SchoolProject.Migrations
{
    /// <inheritdoc />
    public partial class Updatestudent : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TeamNumber",
                table: "Students");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TeamNumber",
                table: "Students",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
