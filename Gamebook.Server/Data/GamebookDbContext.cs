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
        public DbSet<SpecialEffect> SpecialEffects { get; set; }
        public DbSet<Fork> Forks { get; set; }
        public DbSet<ForkConnection> ForkConnections { get; set; }
        public DbSet<Key> Keys { get; set; }

        public GamebookDbContext(DbContextOptions<GamebookDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Hall>()
                .HasOne(h => h.Room)
                .WithMany()
                .HasForeignKey(h => h.RoomId);

            // Konfigurace pro Fork a ForkConnection:
            modelBuilder.Entity<ForkConnection>()
                .HasOne(fc => fc.Fork)
                .WithMany(f => f.Connections)
                .HasForeignKey(fc => fc.ForkId);

            modelBuilder.Entity<ForkConnection>()
                .HasOne(fc => fc.ConnectedRoom)
                .WithOne()
                .HasForeignKey<ForkConnection>(fc => fc.Id);

            // Konfigurace pro Room a RoomItem:
            modelBuilder.Entity<Room>()
                .HasOne(r => r.RoomItem)
                .WithOne(ri => ri.Room)
                .HasForeignKey<Room>(r => r.RoomItemId);

            modelBuilder.Entity<RoomItem>()
                .HasOne(ri => ri.Room)
                .WithOne(r => r.RoomItem)
                .HasForeignKey<RoomItem>(ri => ri.RoomId);

            // Konfigurace diskriminátoru pro dědičnost
            modelBuilder.Entity<Equipment>()
                .HasDiscriminator<string>("Discriminator")
                .HasValue<Equipment>("Equipment")
                .HasValue<Key>("Key");
            modelBuilder.Entity<Monster>()
                .HasOne(m => m.Dungeon)
                .WithMany() // Dungeon nemá kolekci Monsters
                .HasForeignKey(m => m.DungeonId)
                .OnDelete(DeleteBehavior.SetNull);
        }

        public static void SeedData(IServiceProvider serviceProvider)
        {
            using (var scope = serviceProvider.CreateScope())
            {
                // Seed data logic here
            }
        }
    }
}