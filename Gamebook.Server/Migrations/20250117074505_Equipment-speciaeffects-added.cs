using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Gamebook.Server.Migrations
{
    /// <inheritdoc />
    public partial class Equipmentspeciaeffectsadded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Dmg",
                table: "Equipments",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "SpecialEffectId",
                table: "Equipments",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "SpecialEffect",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: false),
                    Value = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SpecialEffect", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Equipments_SpecialEffectId",
                table: "Equipments",
                column: "SpecialEffectId");

            migrationBuilder.AddForeignKey(
                name: "FK_Equipments_SpecialEffect_SpecialEffectId",
                table: "Equipments",
                column: "SpecialEffectId",
                principalTable: "SpecialEffect",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Equipments_SpecialEffect_SpecialEffectId",
                table: "Equipments");

            migrationBuilder.DropTable(
                name: "SpecialEffect");

            migrationBuilder.DropIndex(
                name: "IX_Equipments_SpecialEffectId",
                table: "Equipments");

            migrationBuilder.DropColumn(
                name: "Dmg",
                table: "Equipments");

            migrationBuilder.DropColumn(
                name: "SpecialEffectId",
                table: "Equipments");
        }
    }
}
