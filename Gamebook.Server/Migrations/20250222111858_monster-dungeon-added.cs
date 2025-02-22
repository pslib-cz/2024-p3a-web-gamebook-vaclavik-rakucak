using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Gamebook.Server.Migrations
{
    /// <inheritdoc />
    public partial class monsterdungeonadded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "DungeonId",
                table: "Rooms",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AddColumn<int>(
                name: "DungeonId",
                table: "Monsters",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Monsters_DungeonId",
                table: "Monsters",
                column: "DungeonId");

            migrationBuilder.AddForeignKey(
                name: "FK_Monsters_Dungeons_DungeonId",
                table: "Monsters",
                column: "DungeonId",
                principalTable: "Dungeons",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Monsters_Dungeons_DungeonId",
                table: "Monsters");

            migrationBuilder.DropIndex(
                name: "IX_Monsters_DungeonId",
                table: "Monsters");

            migrationBuilder.DropColumn(
                name: "DungeonId",
                table: "Monsters");

            migrationBuilder.AlterColumn<int>(
                name: "DungeonId",
                table: "Rooms",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);
        }
    }
}
