using Gamebook.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace Gamebook.Server.Data
{
    public class GamebookDbContext : DbContext
    {
        public GamebookDbContext(DbContextOptions<GamebookDbContext> options) : base(options) { }

        public DbSet<Dungeon> Dungeons { get; set; }
        public DbSet<Hall> Halls { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<Monster> Monsters { get; set; }
        public DbSet<PlayerItem> PlayerItems { get; set; }
        public DbSet<Quest> Quests { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<Town> Towns { get; set; }
        public DbSet<Image> Images { get; set; }
    }
}




