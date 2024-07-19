﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Notes_project.Migrations
{
    /// <inheritdoc />
    public partial class AddIsCompletedToDb : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsCompleted",
                table: "Notes",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsCompleted",
                table: "Notes");
        }
    }
}
