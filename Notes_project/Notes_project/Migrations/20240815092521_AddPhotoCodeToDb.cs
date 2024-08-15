using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Notes_project.Migrations
{
    /// <inheritdoc />
    public partial class AddPhotoCodeToDb : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte[]>(
                name: "PhotoCode",
                table: "Notes",
                type: "varbinary(max)",
                nullable: false,
                defaultValue: new byte[0]);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PhotoCode",
                table: "Notes");
        }
    }
}
