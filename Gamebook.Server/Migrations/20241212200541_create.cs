using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Gamebook.Server.Migrations
{
    /// <inheritdoc />
    public partial class create : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Dungeons",
                columns: table => new
                {
                    IdDungeon = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    MaxRooms = table.Column<int>(type: "INTEGER", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: false),
                    Reward = table.Column<int>(type: "INTEGER", nullable: false),
                    DmgCondition = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Dungeons", x => x.IdDungeon);
                });

            migrationBuilder.CreateTable(
                name: "PlayerItems",
                columns: table => new
                {
                    IdPlayerItem = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    BaseStat = table.Column<int>(type: "INTEGER", nullable: false),
                    BasePrice = table.Column<int>(type: "INTEGER", nullable: false),
                    SpecEffectStat = table.Column<int>(type: "INTEGER", nullable: false),
                    SpecEffect = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlayerItems", x => x.IdPlayerItem);
                });

            migrationBuilder.CreateTable(
                name: "Towns",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Image = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Towns", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Halls",
                columns: table => new
                {
                    IdRoom = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Type = table.Column<string>(type: "TEXT", nullable: false),
                    Image = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: false),
                    IdDungeon = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Halls", x => x.IdRoom);
                    table.ForeignKey(
                        name: "FK_Halls_Dungeons_IdDungeon",
                        column: x => x.IdDungeon,
                        principalTable: "Dungeons",
                        principalColumn: "IdDungeon",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Quests",
                columns: table => new
                {
                    IdQuest = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Description = table.Column<string>(type: "TEXT", nullable: false),
                    QuestCondition = table.Column<string>(type: "TEXT", nullable: false),
                    QuestParametr = table.Column<string>(type: "TEXT", nullable: false),
                    IdDungeon = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Quests", x => x.IdQuest);
                    table.ForeignKey(
                        name: "FK_Quests_Dungeons_IdDungeon",
                        column: x => x.IdDungeon,
                        principalTable: "Dungeons",
                        principalColumn: "IdDungeon",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Rooms",
                columns: table => new
                {
                    IdRoom = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Type = table.Column<string>(type: "TEXT", nullable: false),
                    Image = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: false),
                    IdDungeon = table.Column<int>(type: "INTEGER", nullable: false),
                    HallIdRoom = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rooms", x => x.IdRoom);
                    table.ForeignKey(
                        name: "FK_Rooms_Dungeons_IdDungeon",
                        column: x => x.IdDungeon,
                        principalTable: "Dungeons",
                        principalColumn: "IdDungeon",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Rooms_Halls_HallIdRoom",
                        column: x => x.HallIdRoom,
                        principalTable: "Halls",
                        principalColumn: "IdRoom",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Items",
                columns: table => new
                {
                    IdItem = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Type = table.Column<string>(type: "TEXT", nullable: false),
                    Image = table.Column<string>(type: "TEXT", nullable: false),
                    BaseStat = table.Column<int>(type: "INTEGER", nullable: false),
                    BasePrice = table.Column<int>(type: "INTEGER", nullable: false),
                    SpecEffect = table.Column<string>(type: "TEXT", nullable: false),
                    SpecEffectStat = table.Column<int>(type: "INTEGER", nullable: false),
                    IdRoom = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Items", x => x.IdItem);
                    table.ForeignKey(
                        name: "FK_Items_Rooms_IdRoom",
                        column: x => x.IdRoom,
                        principalTable: "Rooms",
                        principalColumn: "IdRoom",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Monsters",
                columns: table => new
                {
                    IdMonster = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Hitpoints = table.Column<int>(type: "INTEGER", nullable: false),
                    Damage = table.Column<int>(type: "INTEGER", nullable: false),
                    Image = table.Column<string>(type: "TEXT", nullable: false),
                    IdRoom = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Monsters", x => x.IdMonster);
                    table.ForeignKey(
                        name: "FK_Monsters_Rooms_IdRoom",
                        column: x => x.IdRoom,
                        principalTable: "Rooms",
                        principalColumn: "IdRoom",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Halls_IdDungeon",
                table: "Halls",
                column: "IdDungeon");

            migrationBuilder.CreateIndex(
                name: "IX_Items_IdRoom",
                table: "Items",
                column: "IdRoom");

            migrationBuilder.CreateIndex(
                name: "IX_Monsters_IdRoom",
                table: "Monsters",
                column: "IdRoom",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Quests_IdDungeon",
                table: "Quests",
                column: "IdDungeon");

            migrationBuilder.CreateIndex(
                name: "IX_Rooms_HallIdRoom",
                table: "Rooms",
                column: "HallIdRoom");

            migrationBuilder.CreateIndex(
                name: "IX_Rooms_IdDungeon",
                table: "Rooms",
                column: "IdDungeon");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Items");

            migrationBuilder.DropTable(
                name: "Monsters");

            migrationBuilder.DropTable(
                name: "PlayerItems");

            migrationBuilder.DropTable(
                name: "Quests");

            migrationBuilder.DropTable(
                name: "Towns");

            migrationBuilder.DropTable(
                name: "Rooms");

            migrationBuilder.DropTable(
                name: "Halls");

            migrationBuilder.DropTable(
                name: "Dungeons");
        }
    }
}
