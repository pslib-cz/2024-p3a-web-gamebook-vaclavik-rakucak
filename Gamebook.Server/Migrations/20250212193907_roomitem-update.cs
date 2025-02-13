using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Gamebook.Server.Migrations
{
    /// <inheritdoc />
    public partial class roomitemupdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "LockedBy",
                table: "RoomItems",
                newName: "EquipmentId");

            migrationBuilder.CreateIndex(
                name: "IX_RoomItems_EquipmentId",
                table: "RoomItems",
                column: "EquipmentId");

            migrationBuilder.AddForeignKey(
                name: "FK_RoomItems_Equipments_EquipmentId",
                table: "RoomItems",
                column: "EquipmentId",
                principalTable: "Equipments",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RoomItems_Equipments_EquipmentId",
                table: "RoomItems");

            migrationBuilder.DropIndex(
                name: "IX_RoomItems_EquipmentId",
                table: "RoomItems");

            migrationBuilder.RenameColumn(
                name: "EquipmentId",
                table: "RoomItems",
                newName: "LockedBy");
        }
    }
}
