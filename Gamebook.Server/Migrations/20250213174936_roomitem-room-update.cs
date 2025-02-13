using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Gamebook.Server.Migrations
{
    /// <inheritdoc />
    public partial class roomitemroomupdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rooms_Dungeons_DungeonId",
                table: "Rooms");

            migrationBuilder.DropIndex(
                name: "IX_Rooms_DungeonId",
                table: "Rooms");

            migrationBuilder.DropIndex(
                name: "IX_Rooms_KeyId",
                table: "Rooms");

            migrationBuilder.DropIndex(
                name: "IX_RoomItems_RoomId",
                table: "RoomItems");

            migrationBuilder.AddColumn<bool>(
                name: "Active",
                table: "Rooms",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeadEnd",
                table: "Rooms",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "MonsterId",
                table: "Rooms",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "RoomItemId",
                table: "Rooms",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Rooms_KeyId",
                table: "Rooms",
                column: "KeyId");

            migrationBuilder.CreateIndex(
                name: "IX_Rooms_MonsterId",
                table: "Rooms",
                column: "MonsterId");

            migrationBuilder.CreateIndex(
                name: "IX_RoomItems_RoomId",
                table: "RoomItems",
                column: "RoomId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Rooms_Monsters_MonsterId",
                table: "Rooms",
                column: "MonsterId",
                principalTable: "Monsters",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rooms_Monsters_MonsterId",
                table: "Rooms");

            migrationBuilder.DropIndex(
                name: "IX_Rooms_KeyId",
                table: "Rooms");

            migrationBuilder.DropIndex(
                name: "IX_Rooms_MonsterId",
                table: "Rooms");

            migrationBuilder.DropIndex(
                name: "IX_RoomItems_RoomId",
                table: "RoomItems");

            migrationBuilder.DropColumn(
                name: "Active",
                table: "Rooms");

            migrationBuilder.DropColumn(
                name: "IsDeadEnd",
                table: "Rooms");

            migrationBuilder.DropColumn(
                name: "MonsterId",
                table: "Rooms");

            migrationBuilder.DropColumn(
                name: "RoomItemId",
                table: "Rooms");

            migrationBuilder.CreateIndex(
                name: "IX_Rooms_DungeonId",
                table: "Rooms",
                column: "DungeonId");

            migrationBuilder.CreateIndex(
                name: "IX_Rooms_KeyId",
                table: "Rooms",
                column: "KeyId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_RoomItems_RoomId",
                table: "RoomItems",
                column: "RoomId");

            migrationBuilder.AddForeignKey(
                name: "FK_Rooms_Dungeons_DungeonId",
                table: "Rooms",
                column: "DungeonId",
                principalTable: "Dungeons",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
