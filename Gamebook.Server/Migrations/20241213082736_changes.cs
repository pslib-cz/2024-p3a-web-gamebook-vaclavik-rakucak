using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Gamebook.Server.Migrations
{
    /// <inheritdoc />
    public partial class changes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Halls_Dungeons_IdDungeon",
                table: "Halls");

            migrationBuilder.DropForeignKey(
                name: "FK_Rooms_Halls_HallIdRoom",
                table: "Rooms");

            migrationBuilder.DropIndex(
                name: "IX_Rooms_HallIdRoom",
                table: "Rooms");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Halls",
                table: "Halls");

            migrationBuilder.DropIndex(
                name: "IX_Halls_IdDungeon",
                table: "Halls");

            migrationBuilder.DropColumn(
                name: "HallIdRoom",
                table: "Rooms");

            migrationBuilder.RenameColumn(
                name: "Image",
                table: "Towns",
                newName: "IdImage");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Towns",
                newName: "IdTown");

            migrationBuilder.RenameColumn(
                name: "Image",
                table: "Rooms",
                newName: "IdImage");

            migrationBuilder.RenameColumn(
                name: "Image",
                table: "Monsters",
                newName: "IdImage");

            migrationBuilder.RenameColumn(
                name: "Image",
                table: "Items",
                newName: "IdImage");

            migrationBuilder.RenameColumn(
                name: "Image",
                table: "Halls",
                newName: "IdImage");

            migrationBuilder.RenameColumn(
                name: "IdDungeon",
                table: "Halls",
                newName: "IdHall");

            migrationBuilder.AddColumn<int>(
                name: "ParentTownId",
                table: "Towns",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "IdImage",
                table: "Quests",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "IdImage",
                table: "PlayerItems",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<int>(
                name: "IdRoom",
                table: "Halls",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER")
                .OldAnnotation("Sqlite:Autoincrement", true);

            migrationBuilder.AlterColumn<int>(
                name: "IdHall",
                table: "Halls",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER")
                .Annotation("Sqlite:Autoincrement", true);

            migrationBuilder.AddColumn<string>(
                name: "IdImage",
                table: "Dungeons",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Halls",
                table: "Halls",
                column: "IdHall");

            migrationBuilder.CreateTable(
                name: "Images",
                columns: table => new
                {
                    IdImage = table.Column<string>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Data = table.Column<byte[]>(type: "BLOB", nullable: false),
                    ContentType = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Images", x => x.IdImage);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Towns_IdImage",
                table: "Towns",
                column: "IdImage");

            migrationBuilder.CreateIndex(
                name: "IX_Towns_ParentTownId",
                table: "Towns",
                column: "ParentTownId");

            migrationBuilder.CreateIndex(
                name: "IX_Rooms_IdImage",
                table: "Rooms",
                column: "IdImage");

            migrationBuilder.CreateIndex(
                name: "IX_Quests_IdImage",
                table: "Quests",
                column: "IdImage");

            migrationBuilder.CreateIndex(
                name: "IX_PlayerItems_IdImage",
                table: "PlayerItems",
                column: "IdImage");

            migrationBuilder.CreateIndex(
                name: "IX_Monsters_IdImage",
                table: "Monsters",
                column: "IdImage");

            migrationBuilder.CreateIndex(
                name: "IX_Items_IdImage",
                table: "Items",
                column: "IdImage");

            migrationBuilder.CreateIndex(
                name: "IX_Halls_IdImage",
                table: "Halls",
                column: "IdImage");

            migrationBuilder.CreateIndex(
                name: "IX_Halls_IdRoom",
                table: "Halls",
                column: "IdRoom");

            migrationBuilder.CreateIndex(
                name: "IX_Dungeons_IdImage",
                table: "Dungeons",
                column: "IdImage");

            migrationBuilder.AddForeignKey(
                name: "FK_Dungeons_Images_IdImage",
                table: "Dungeons",
                column: "IdImage",
                principalTable: "Images",
                principalColumn: "IdImage",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Halls_Images_IdImage",
                table: "Halls",
                column: "IdImage",
                principalTable: "Images",
                principalColumn: "IdImage",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Halls_Rooms_IdRoom",
                table: "Halls",
                column: "IdRoom",
                principalTable: "Rooms",
                principalColumn: "IdRoom",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Items_Images_IdImage",
                table: "Items",
                column: "IdImage",
                principalTable: "Images",
                principalColumn: "IdImage",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Monsters_Images_IdImage",
                table: "Monsters",
                column: "IdImage",
                principalTable: "Images",
                principalColumn: "IdImage",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PlayerItems_Images_IdImage",
                table: "PlayerItems",
                column: "IdImage",
                principalTable: "Images",
                principalColumn: "IdImage",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Quests_Images_IdImage",
                table: "Quests",
                column: "IdImage",
                principalTable: "Images",
                principalColumn: "IdImage",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Rooms_Images_IdImage",
                table: "Rooms",
                column: "IdImage",
                principalTable: "Images",
                principalColumn: "IdImage",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Towns_Images_IdImage",
                table: "Towns",
                column: "IdImage",
                principalTable: "Images",
                principalColumn: "IdImage",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Towns_Towns_ParentTownId",
                table: "Towns",
                column: "ParentTownId",
                principalTable: "Towns",
                principalColumn: "IdTown");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Dungeons_Images_IdImage",
                table: "Dungeons");

            migrationBuilder.DropForeignKey(
                name: "FK_Halls_Images_IdImage",
                table: "Halls");

            migrationBuilder.DropForeignKey(
                name: "FK_Halls_Rooms_IdRoom",
                table: "Halls");

            migrationBuilder.DropForeignKey(
                name: "FK_Items_Images_IdImage",
                table: "Items");

            migrationBuilder.DropForeignKey(
                name: "FK_Monsters_Images_IdImage",
                table: "Monsters");

            migrationBuilder.DropForeignKey(
                name: "FK_PlayerItems_Images_IdImage",
                table: "PlayerItems");

            migrationBuilder.DropForeignKey(
                name: "FK_Quests_Images_IdImage",
                table: "Quests");

            migrationBuilder.DropForeignKey(
                name: "FK_Rooms_Images_IdImage",
                table: "Rooms");

            migrationBuilder.DropForeignKey(
                name: "FK_Towns_Images_IdImage",
                table: "Towns");

            migrationBuilder.DropForeignKey(
                name: "FK_Towns_Towns_ParentTownId",
                table: "Towns");

            migrationBuilder.DropTable(
                name: "Images");

            migrationBuilder.DropIndex(
                name: "IX_Towns_IdImage",
                table: "Towns");

            migrationBuilder.DropIndex(
                name: "IX_Towns_ParentTownId",
                table: "Towns");

            migrationBuilder.DropIndex(
                name: "IX_Rooms_IdImage",
                table: "Rooms");

            migrationBuilder.DropIndex(
                name: "IX_Quests_IdImage",
                table: "Quests");

            migrationBuilder.DropIndex(
                name: "IX_PlayerItems_IdImage",
                table: "PlayerItems");

            migrationBuilder.DropIndex(
                name: "IX_Monsters_IdImage",
                table: "Monsters");

            migrationBuilder.DropIndex(
                name: "IX_Items_IdImage",
                table: "Items");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Halls",
                table: "Halls");

            migrationBuilder.DropIndex(
                name: "IX_Halls_IdImage",
                table: "Halls");

            migrationBuilder.DropIndex(
                name: "IX_Halls_IdRoom",
                table: "Halls");

            migrationBuilder.DropIndex(
                name: "IX_Dungeons_IdImage",
                table: "Dungeons");

            migrationBuilder.DropColumn(
                name: "ParentTownId",
                table: "Towns");

            migrationBuilder.DropColumn(
                name: "IdImage",
                table: "Quests");

            migrationBuilder.DropColumn(
                name: "IdImage",
                table: "PlayerItems");

            migrationBuilder.DropColumn(
                name: "IdImage",
                table: "Dungeons");

            migrationBuilder.RenameColumn(
                name: "IdImage",
                table: "Towns",
                newName: "Image");

            migrationBuilder.RenameColumn(
                name: "IdTown",
                table: "Towns",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "IdImage",
                table: "Rooms",
                newName: "Image");

            migrationBuilder.RenameColumn(
                name: "IdImage",
                table: "Monsters",
                newName: "Image");

            migrationBuilder.RenameColumn(
                name: "IdImage",
                table: "Items",
                newName: "Image");

            migrationBuilder.RenameColumn(
                name: "IdImage",
                table: "Halls",
                newName: "Image");

            migrationBuilder.RenameColumn(
                name: "IdHall",
                table: "Halls",
                newName: "IdDungeon");

            migrationBuilder.AddColumn<int>(
                name: "HallIdRoom",
                table: "Rooms",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<int>(
                name: "IdRoom",
                table: "Halls",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER")
                .Annotation("Sqlite:Autoincrement", true);

            migrationBuilder.AlterColumn<int>(
                name: "IdDungeon",
                table: "Halls",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER")
                .OldAnnotation("Sqlite:Autoincrement", true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Halls",
                table: "Halls",
                column: "IdRoom");

            migrationBuilder.CreateIndex(
                name: "IX_Rooms_HallIdRoom",
                table: "Rooms",
                column: "HallIdRoom");

            migrationBuilder.CreateIndex(
                name: "IX_Halls_IdDungeon",
                table: "Halls",
                column: "IdDungeon");

            migrationBuilder.AddForeignKey(
                name: "FK_Halls_Dungeons_IdDungeon",
                table: "Halls",
                column: "IdDungeon",
                principalTable: "Dungeons",
                principalColumn: "IdDungeon",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Rooms_Halls_HallIdRoom",
                table: "Rooms",
                column: "HallIdRoom",
                principalTable: "Halls",
                principalColumn: "IdRoom",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
