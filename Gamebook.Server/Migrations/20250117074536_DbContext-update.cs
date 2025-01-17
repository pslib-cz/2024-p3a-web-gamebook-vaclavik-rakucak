using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Gamebook.Server.Migrations
{
    /// <inheritdoc />
    public partial class DbContextupdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Equipments_SpecialEffect_SpecialEffectId",
                table: "Equipments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SpecialEffect",
                table: "SpecialEffect");

            migrationBuilder.RenameTable(
                name: "SpecialEffect",
                newName: "SpecialEffects");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SpecialEffects",
                table: "SpecialEffects",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Equipments_SpecialEffects_SpecialEffectId",
                table: "Equipments",
                column: "SpecialEffectId",
                principalTable: "SpecialEffects",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Equipments_SpecialEffects_SpecialEffectId",
                table: "Equipments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SpecialEffects",
                table: "SpecialEffects");

            migrationBuilder.RenameTable(
                name: "SpecialEffects",
                newName: "SpecialEffect");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SpecialEffect",
                table: "SpecialEffect",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Equipments_SpecialEffect_SpecialEffectId",
                table: "Equipments",
                column: "SpecialEffectId",
                principalTable: "SpecialEffect",
                principalColumn: "Id");
        }
    }
}
