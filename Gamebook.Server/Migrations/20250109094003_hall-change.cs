using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Gamebook.Server.Migrations
{
    /// <inheritdoc />
    public partial class hallchange : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Rooms_HallId",
                table: "Rooms");

            migrationBuilder.CreateIndex(
                name: "IX_Rooms_HallId",
                table: "Rooms",
                column: "HallId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Rooms_HallId",
                table: "Rooms");

            migrationBuilder.CreateIndex(
                name: "IX_Rooms_HallId",
                table: "Rooms",
                column: "HallId",
                unique: true);
        }
    }
}
