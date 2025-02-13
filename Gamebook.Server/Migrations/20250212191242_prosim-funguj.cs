using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Gamebook.Server.Migrations
{
    /// <inheritdoc />
    public partial class prosimfunguj : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "KeyId",
                table: "Rooms",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PositionX",
                table: "Rooms",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PositionY",
                table: "Rooms",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "DungeonId",
                table: "Quests",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ItemId",
                table: "Quests",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "MonsterId",
                table: "Quests",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "RoomItemId",
                table: "Quests",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Dmg",
                table: "Equipments",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "Equipments",
                type: "TEXT",
                maxLength: 13,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "DungeonId",
                table: "Equipments",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Rooms_KeyId",
                table: "Rooms",
                column: "KeyId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Quests_DungeonId",
                table: "Quests",
                column: "DungeonId");

            migrationBuilder.CreateIndex(
                name: "IX_Quests_ItemId",
                table: "Quests",
                column: "ItemId");

            migrationBuilder.CreateIndex(
                name: "IX_Quests_MonsterId",
                table: "Quests",
                column: "MonsterId");

            migrationBuilder.CreateIndex(
                name: "IX_Equipments_DungeonId",
                table: "Equipments",
                column: "DungeonId");

            migrationBuilder.AddForeignKey(
                name: "FK_Equipments_Dungeons_DungeonId",
                table: "Equipments",
                column: "DungeonId",
                principalTable: "Dungeons",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Quests_Dungeons_DungeonId",
                table: "Quests",
                column: "DungeonId",
                principalTable: "Dungeons",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Quests_Monsters_MonsterId",
                table: "Quests",
                column: "MonsterId",
                principalTable: "Monsters",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Quests_RoomItems_ItemId",
                table: "Quests",
                column: "ItemId",
                principalTable: "RoomItems",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Rooms_Equipments_KeyId",
                table: "Rooms",
                column: "KeyId",
                principalTable: "Equipments",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Equipments_Dungeons_DungeonId",
                table: "Equipments");

            migrationBuilder.DropForeignKey(
                name: "FK_Quests_Dungeons_DungeonId",
                table: "Quests");

            migrationBuilder.DropForeignKey(
                name: "FK_Quests_Monsters_MonsterId",
                table: "Quests");

            migrationBuilder.DropForeignKey(
                name: "FK_Quests_RoomItems_ItemId",
                table: "Quests");

            migrationBuilder.DropForeignKey(
                name: "FK_Rooms_Equipments_KeyId",
                table: "Rooms");

            migrationBuilder.DropIndex(
                name: "IX_Rooms_KeyId",
                table: "Rooms");

            migrationBuilder.DropIndex(
                name: "IX_Quests_DungeonId",
                table: "Quests");

            migrationBuilder.DropIndex(
                name: "IX_Quests_ItemId",
                table: "Quests");

            migrationBuilder.DropIndex(
                name: "IX_Quests_MonsterId",
                table: "Quests");

            migrationBuilder.DropIndex(
                name: "IX_Equipments_DungeonId",
                table: "Equipments");

            migrationBuilder.DropColumn(
                name: "KeyId",
                table: "Rooms");

            migrationBuilder.DropColumn(
                name: "PositionX",
                table: "Rooms");

            migrationBuilder.DropColumn(
                name: "PositionY",
                table: "Rooms");

            migrationBuilder.DropColumn(
                name: "DungeonId",
                table: "Quests");

            migrationBuilder.DropColumn(
                name: "ItemId",
                table: "Quests");

            migrationBuilder.DropColumn(
                name: "MonsterId",
                table: "Quests");

            migrationBuilder.DropColumn(
                name: "RoomItemId",
                table: "Quests");

            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "Equipments");

            migrationBuilder.DropColumn(
                name: "DungeonId",
                table: "Equipments");

            migrationBuilder.AlterColumn<int>(
                name: "Dmg",
                table: "Equipments",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);
        }
    }
}
