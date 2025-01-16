using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Gamebook.Server.Migrations
{
    /// <inheritdoc />
    public partial class NpcDbcontextadded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Quests_Npc_NpcId",
                table: "Quests");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Npc",
                table: "Npc");

            migrationBuilder.RenameTable(
                name: "Npc",
                newName: "Npcs");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Npcs",
                table: "Npcs",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Quests_Npcs_NpcId",
                table: "Quests",
                column: "NpcId",
                principalTable: "Npcs",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Quests_Npcs_NpcId",
                table: "Quests");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Npcs",
                table: "Npcs");

            migrationBuilder.RenameTable(
                name: "Npcs",
                newName: "Npc");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Npc",
                table: "Npc",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Quests_Npc_NpcId",
                table: "Quests",
                column: "NpcId",
                principalTable: "Npc",
                principalColumn: "Id");
        }
    }
}
