using Gamebook.Server.Models;
using Microsoft.EntityFrameworkCore;

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

                // Kontrola jestli data existuji
                if (context.Dungeons.Any())
                {
                    return;
                }

                //testovací data

                // 1. Dungeon
                var dungeon = new Dungeon
                {
                    Name = "Testovací Dungeon",
                    Description = "Dungeon pro testování generování chainu.",
                    RewardMoney = 100,
                    DmgCondition = "5"
                };
                context.Dungeons.Add(dungeon);
                context.SaveChanges(); // Uložíme dungeon, abychom měli jeho ID

                // 2. Obrázky (volitelné - můžete nahradit prázdnými poli byte[] nebo NULL)
                var imageHall = new Image { Name = "Hall Image", ContentType = "image/jpeg", Data = new byte[] { /* ... data obrázku ... */ } };
                var imageRoomEmpty = new Image { Name = "Room Empty Image", ContentType = "image/jpeg", Data = new byte[] { /* ... data obrázku ... */ } };
                var imageRoomKey = new Image { Name = "Room Key Image", ContentType = "image/jpeg", Data = new byte[] { /* ... data obrázku ... */ } };
                var imageRoomChest = new Image { Name = "Room Chest Image", ContentType = "image/jpeg", Data = new byte[] { /* ... data obrázku ... */ } };
                context.Images.AddRange(imageHall, imageRoomEmpty, imageRoomKey, imageRoomChest);
                context.SaveChanges();

                // 3. Rooms
                var roomEmpty = new Room { Type = "empty", Description = "Prázdná místnost", DungeonId = dungeon.Id, ImageId = imageRoomEmpty.Id };
                var roomKey = new Room { Type = "key", Description = "Místnost s klíčem", DungeonId = dungeon.Id, ImageId = imageRoomKey.Id };
                var roomChest = new Room { Type = "chest", Description = "Místnost s truhlou", DungeonId = dungeon.Id, ImageId = imageRoomChest.Id };
                context.Rooms.AddRange(roomEmpty, roomKey, roomChest);
                context.SaveChanges();

                // 4. Halls
                var hall1 = new Hall { ImageId = imageHall.Id, RoomId = roomEmpty.Id, DungeonId = dungeon.Id };
                var hall2 = new Hall { ImageId = imageHall.Id, RoomId = roomKey.Id, DungeonId = dungeon.Id };
                var hall3 = new Hall { ImageId = imageHall.Id, RoomId = roomChest.Id, DungeonId = dungeon.Id };
                // ... můžete přidat další Hally pro větší variabilitu
                context.Halls.AddRange(hall1, hall2, hall3);
                context.SaveChanges();
            }
        }
    }
}