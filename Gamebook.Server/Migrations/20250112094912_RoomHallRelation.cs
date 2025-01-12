using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Gamebook.Server.Migrations
{
    /// <inheritdoc />
    public partial class RoomHallRelation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rooms_Halls_HallId",
                table: "Rooms");

            migrationBuilder.DropIndex(
                name: "IX_Rooms_HallId",
                table: "Rooms");

            migrationBuilder.DropColumn(
                name: "HallId",
                table: "Rooms");

            migrationBuilder.AddColumn<int>(
                name: "DungeonId",
                table: "Halls",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "RoomId",
                table: "Halls",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Halls_DungeonId",
                table: "Halls",
                column: "DungeonId");

            migrationBuilder.CreateIndex(
                name: "IX_Halls_RoomId",
                table: "Halls",
                column: "RoomId");

            migrationBuilder.AddForeignKey(
                name: "FK_Halls_Dungeons_DungeonId",
                table: "Halls",
                column: "DungeonId",
                principalTable: "Dungeons",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Halls_Rooms_RoomId",
                table: "Halls",
                column: "RoomId",
                principalTable: "Rooms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Halls_Dungeons_DungeonId",
                table: "Halls");

            migrationBuilder.DropForeignKey(
                name: "FK_Halls_Rooms_RoomId",
                table: "Halls");

            migrationBuilder.DropIndex(
                name: "IX_Halls_DungeonId",
                table: "Halls");

            migrationBuilder.DropIndex(
                name: "IX_Halls_RoomId",
                table: "Halls");

            migrationBuilder.DropColumn(
                name: "DungeonId",
                table: "Halls");

            migrationBuilder.DropColumn(
                name: "RoomId",
                table: "Halls");

            migrationBuilder.AddColumn<int>(
                name: "HallId",
                table: "Rooms",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Rooms_HallId",
                table: "Rooms",
                column: "HallId");

            migrationBuilder.AddForeignKey(
                name: "FK_Rooms_Halls_HallId",
                table: "Rooms",
                column: "HallId",
                principalTable: "Halls",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
