using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Gamebook.Server.Migrations
{
    /// <inheritdoc />
    public partial class auth2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Salt",
                table: "Admins",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Salt",
                table: "Admins");
        }
    }
}
