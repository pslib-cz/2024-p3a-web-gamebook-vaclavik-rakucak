using Gamebook.Server.Models;
using Microsoft.EntityFrameworkCore;
using System;

namespace Gamebook.Server.Data
{
    public class GamebookDbContext : DbContext
    {
        public DbSet<Dungeon> Dungeons { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<Hall> Halls { get; set; }
        public DbSet<Town> Towns { get; set; }
        public DbSet<Equipment> Equipments { get; set; }
        public DbSet<Monster> Monsters { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<Admin> Admins { get; set; }
        public DbSet<Quest> Quests { get; set; }
        public DbSet<RoomItem> RoomItems { get; set; }
        public DbSet<Npc> Npcs { get; set; }


        public GamebookDbContext(DbContextOptions<GamebookDbContext> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

        }
        public static void SeedData(IServiceProvider serviceProvider)
        {
            using (var scope = serviceProvider.CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<GamebookDbContext>();

                
            }
        }
    }
}