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
        public DbSet<Key> Keys { get; set; } // Přidání DbSet pro Key

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
                .HasMany(r => r.RoomItems)
                .WithOne(ri => ri.Room)
                .HasForeignKey(ri => ri.RoomId);

            // Konfigurace pro Room a Key:
            modelBuilder.Entity<Room>()
                .HasOne(r => r.Key)
                .WithOne()
                .HasForeignKey<Room>(r => r.KeyId);

            // Konfigurace diskriminátoru pro dědičnost
            modelBuilder.Entity<Equipment>()
                .HasDiscriminator<string>("Discriminator")
                .HasValue<Equipment>("Equipment")
                .HasValue<Key>("Key");
        }

        public static void SeedData(IServiceProvider serviceProvider)
        {
            using (var scope = serviceProvider.CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<GamebookDbContext>();

                context.Images.AddRange(
                        new Image { Id = 54, Name = "Key", Data = new byte[0], ContentType = "image/webp" },
                        new Image { Id = 55, Name = "Chest", Data = new byte[0], ContentType = "image/webp" }
                    );

                if (!context.Keys.Any())
                {
                    context.Keys.Add(
                        new Key { Id = 1, Name = "Dungeon Key", Type = "Key", Price = null, Rarity = "Common", Dmg = 0, ImageId = 54, DungeonId = 2 }
                    );
                }

                if (!context.RoomItems.Any())
                {
                    context.RoomItems.AddRange(
                        new RoomItem { Id = 1, Name = "Trap", Type = "trap", Description = "A dangerous trap", damage = 10, RoomId = 1, ImageId = 1 },
                        new RoomItem { Id = 2, Name = "Chest", Type = "chest", Description = "A locked chest", damage = null, RoomId = 3, EquipmentId = 4, ImageId = 55 }
                    );
                }

                context.SaveChanges();
            }
        }
    }
}