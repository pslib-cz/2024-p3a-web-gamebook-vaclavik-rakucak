using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Gamebook.Server.Migrations
{
    /// <inheritdoc />
    public partial class roomdungeon : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Halls_Images_IdImage",
                table: "Halls");

            migrationBuilder.DropForeignKey(
                name: "FK_Halls_Rooms_IdRoom",
                table: "Halls");

            migrationBuilder.DropForeignKey(
                name: "FK_Rooms_Images_IdImage",
                table: "Rooms");

            migrationBuilder.DropIndex(
                name: "IX_Rooms_IdImage",
                table: "Rooms");

            migrationBuilder.DropIndex(
                name: "IX_Halls_IdImage",
                table: "Halls");

            migrationBuilder.DropIndex(
                name: "IX_Halls_IdRoom",
                table: "Halls");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Rooms_IdImage",
                table: "Rooms",
                column: "IdImage");

            migrationBuilder.CreateIndex(
                name: "IX_Halls_IdImage",
                table: "Halls",
                column: "IdImage");

            migrationBuilder.CreateIndex(
                name: "IX_Halls_IdRoom",
                table: "Halls",
                column: "IdRoom");

            migrationBuilder.AddForeignKey(
                name: "FK_Halls_Images_IdImage",
                table: "Halls",
                column: "IdImage",
                principalTable: "Images",
                principalColumn: "IdImage");

            migrationBuilder.AddForeignKey(
                name: "FK_Halls_Rooms_IdRoom",
                table: "Halls",
                column: "IdRoom",
                principalTable: "Rooms",
                principalColumn: "IdRoom");

            migrationBuilder.AddForeignKey(
                name: "FK_Rooms_Images_IdImage",
                table: "Rooms",
                column: "IdImage",
                principalTable: "Images",
                principalColumn: "IdImage");
        }
    }
}
