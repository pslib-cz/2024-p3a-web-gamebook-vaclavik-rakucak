using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Gamebook.Server.Migrations
{
    /// <inheritdoc />
    public partial class Forkadded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Forks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    DungeonId = table.Column<int>(type: "INTEGER", nullable: false),
                    ImageId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Forks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Forks_Images_ImageId",
                        column: x => x.ImageId,
                        principalTable: "Images",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ForkConnections",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ForkId = table.Column<int>(type: "INTEGER", nullable: false),
                    ConnectedRoomId = table.Column<int>(type: "INTEGER", nullable: false),
                    IsDeadEnd = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ForkConnections", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ForkConnections_Forks_ForkId",
                        column: x => x.ForkId,
                        principalTable: "Forks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ForkConnections_Rooms_ConnectedRoomId",
                        column: x => x.ConnectedRoomId,
                        principalTable: "Rooms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ForkConnections_ConnectedRoomId",
                table: "ForkConnections",
                column: "ConnectedRoomId");

            migrationBuilder.CreateIndex(
                name: "IX_ForkConnections_ForkId",
                table: "ForkConnections",
                column: "ForkId");

            migrationBuilder.CreateIndex(
                name: "IX_Forks_ImageId",
                table: "Forks",
                column: "ImageId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ForkConnections");

            migrationBuilder.DropTable(
                name: "Forks");
        }
    }
}
