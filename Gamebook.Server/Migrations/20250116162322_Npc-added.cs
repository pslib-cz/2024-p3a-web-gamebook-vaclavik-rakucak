using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Gamebook.Server.Migrations
{
    /// <inheritdoc />
    public partial class Npcadded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "NpcId",
                table: "Quests",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Npc",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Npc", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Quests_NpcId",
                table: "Quests",
                column: "NpcId");

            migrationBuilder.AddForeignKey(
                name: "FK_Quests_Npc_NpcId",
                table: "Quests",
                column: "NpcId",
                principalTable: "Npc",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Quests_Npc_NpcId",
                table: "Quests");

            migrationBuilder.DropTable(
                name: "Npc");

            migrationBuilder.DropIndex(
                name: "IX_Quests_NpcId",
                table: "Quests");

            migrationBuilder.DropColumn(
                name: "NpcId",
                table: "Quests");
        }
    }
}
