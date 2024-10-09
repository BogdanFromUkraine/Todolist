using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Notes_project.Migrations
{
    /// <inheritdoc />
    public partial class UpdateNotes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notes_Group_GroupId",
                table: "Notes");

            migrationBuilder.AlterColumn<int>(
                name: "GroupId",
                table: "Notes",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Notes_Group_GroupId",
                table: "Notes",
                column: "GroupId",
                principalTable: "Group",
                principalColumn: "GroupId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notes_Group_GroupId",
                table: "Notes");

            migrationBuilder.AlterColumn<int>(
                name: "GroupId",
                table: "Notes",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Notes_Group_GroupId",
                table: "Notes",
                column: "GroupId",
                principalTable: "Group",
                principalColumn: "GroupId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}