using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Gamebook.Server.Migrations
{
    /// <inheritdoc />
    public partial class rewardmoneyadded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Equipments_Dungeons_DungeonId",
                table: "Equipments");

            migrationBuilder.DropForeignKey(
                name: "FK_Halls_Dungeons_DungeonId",
                table: "Halls");

            migrationBuilder.DropForeignKey(
                name: "FK_Halls_Rooms_RoomId",
                table: "Halls");

            migrationBuilder.DropForeignKey(
                name: "FK_Monsters_Images_ImageId",
                table: "Monsters");

            migrationBuilder.DropForeignKey(
                name: "FK_Quests_Images_ImageId",
                table: "Quests");

            migrationBuilder.DropForeignKey(
                name: "FK_Towns_Images_ImageId",
                table: "Towns");

            migrationBuilder.AlterColumn<int>(
                name: "ImageId",
                table: "Towns",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AlterColumn<int>(
                name: "ImageId",
                table: "Quests",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AlterColumn<int>(
                name: "ImageId",
                table: "Monsters",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AddColumn<int>(
                name: "RewardMoney",
                table: "Monsters",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "RoomId",
                table: "Halls",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AlterColumn<int>(
                name: "DungeonId",
                table: "Halls",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AddForeignKey(
                name: "FK_Equipments_Dungeons_DungeonId",
                table: "Equipments",
                column: "DungeonId",
                principalTable: "Dungeons",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Halls_Dungeons_DungeonId",
                table: "Halls",
                column: "DungeonId",
                principalTable: "Dungeons",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Halls_Rooms_RoomId",
                table: "Halls",
                column: "RoomId",
                principalTable: "Rooms",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Monsters_Images_ImageId",
                table: "Monsters",
                column: "ImageId",
                principalTable: "Images",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Quests_Images_ImageId",
                table: "Quests",
                column: "ImageId",
                principalTable: "Images",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Towns_Images_ImageId",
                table: "Towns",
                column: "ImageId",
                principalTable: "Images",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Equipments_Dungeons_DungeonId",
                table: "Equipments");

            migrationBuilder.DropForeignKey(
                name: "FK_Halls_Dungeons_DungeonId",
                table: "Halls");

            migrationBuilder.DropForeignKey(
                name: "FK_Halls_Rooms_RoomId",
                table: "Halls");

            migrationBuilder.DropForeignKey(
                name: "FK_Monsters_Images_ImageId",
                table: "Monsters");

            migrationBuilder.DropForeignKey(
                name: "FK_Quests_Images_ImageId",
                table: "Quests");

            migrationBuilder.DropForeignKey(
                name: "FK_Towns_Images_ImageId",
                table: "Towns");

            migrationBuilder.DropColumn(
                name: "RewardMoney",
                table: "Monsters");

            migrationBuilder.AlterColumn<int>(
                name: "ImageId",
                table: "Towns",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ImageId",
                table: "Quests",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ImageId",
                table: "Monsters",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "RoomId",
                table: "Halls",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "DungeonId",
                table: "Halls",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Equipments_Dungeons_DungeonId",
                table: "Equipments",
                column: "DungeonId",
                principalTable: "Dungeons",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

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

            migrationBuilder.AddForeignKey(
                name: "FK_Monsters_Images_ImageId",
                table: "Monsters",
                column: "ImageId",
                principalTable: "Images",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Quests_Images_ImageId",
                table: "Quests",
                column: "ImageId",
                principalTable: "Images",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Towns_Images_ImageId",
                table: "Towns",
                column: "ImageId",
                principalTable: "Images",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
