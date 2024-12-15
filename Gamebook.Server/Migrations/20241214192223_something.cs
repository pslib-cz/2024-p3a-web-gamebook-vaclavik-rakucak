using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Gamebook.Server.Migrations
{
    /// <inheritdoc />
    public partial class something : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Rooms_IdHall",
                table: "Rooms");

            migrationBuilder.AddColumn<int>(
                name: "IdRoom",
                table: "Halls",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Rooms_IdHall",
                table: "Rooms",
                column: "IdHall");

            migrationBuilder.CreateIndex(
                name: "IX_Halls_IdRoom",
                table: "Halls",
                column: "IdRoom");

            migrationBuilder.AddForeignKey(
                name: "FK_Halls_Rooms_IdRoom",
                table: "Halls",
                column: "IdRoom",
                principalTable: "Rooms",
                principalColumn: "IdRoom");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Halls_Rooms_IdRoom",
                table: "Halls");

            migrationBuilder.DropIndex(
                name: "IX_Rooms_IdHall",
                table: "Rooms");

            migrationBuilder.DropIndex(
                name: "IX_Halls_IdRoom",
                table: "Halls");

            migrationBuilder.DropColumn(
                name: "IdRoom",
                table: "Halls");

            migrationBuilder.CreateIndex(
                name: "IX_Rooms_IdHall",
                table: "Rooms",
                column: "IdHall",
                unique: true);
        }
    }
}
