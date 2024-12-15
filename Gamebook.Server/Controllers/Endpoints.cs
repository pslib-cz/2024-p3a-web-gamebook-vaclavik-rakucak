using Microsoft.EntityFrameworkCore;
using Gamebook.Server.Data;
using Gamebook.Server.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.OpenApi;
using Microsoft.AspNetCore.Mvc;
namespace Gamebook.Server.Controllers;

public static class Endpoints
{
    public static void MapDungeonEndpoints (this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/api/Dungeon").WithTags(nameof(Dungeon));

        group.MapGet("/", async (GamebookDbContext db) =>
        {
            return await db.Dungeons.ToListAsync();
        })
        .WithName("GetAllDungeons")
        .WithOpenApi();

        group.MapGet("/{id}", async Task<Results<Ok<Dungeon>, NotFound>> (int iddungeon, GamebookDbContext db) =>
        {
            return await db.Dungeons.AsNoTracking()
                .FirstOrDefaultAsync(model => model.IdDungeon == iddungeon)
                is Dungeon model
                    ? TypedResults.Ok(model)
                    : TypedResults.NotFound();
        })
        .WithName("GetDungeonById")
        .WithOpenApi();

        group.MapPut("/{id}", async Task<Results<Ok, NotFound>> (int iddungeon, Dungeon dungeon, GamebookDbContext db) =>
        {
            var affected = await db.Dungeons
                .Where(model => model.IdDungeon == iddungeon)
                .ExecuteUpdateAsync(setters => setters
                    .SetProperty(m => m.IdDungeon, dungeon.IdDungeon)
                    .SetProperty(m => m.Name, dungeon.Name)
                    .SetProperty(m => m.MaxRooms, dungeon.MaxRooms)
                    .SetProperty(m => m.Description, dungeon.Description)
                    .SetProperty(m => m.Reward, dungeon.Reward)
                    .SetProperty(m => m.DmgCondition, dungeon.DmgCondition)
                    );
            return affected == 1 ? TypedResults.Ok() : TypedResults.NotFound();
        })
        .WithName("UpdateDungeon")
        .WithOpenApi();

        group.MapPost("/", async (Dungeon dungeon, GamebookDbContext db) =>
        {
            db.Dungeons.Add(dungeon);
            await db.SaveChangesAsync();
            return TypedResults.Created($"/api/Dungeon/{dungeon.IdDungeon}",dungeon);
        })
        .WithName("CreateDungeon")
        .WithOpenApi();

        group.MapDelete("/{id}", async Task<Results<Ok, NotFound>> (int iddungeon, GamebookDbContext db) =>
        {
            var affected = await db.Dungeons
                .Where(model => model.IdDungeon == iddungeon)
                .ExecuteDeleteAsync();
            return affected == 1 ? TypedResults.Ok() : TypedResults.NotFound();
        })
        .WithName("DeleteDungeon")
        .WithOpenApi();
    }
	public static void MapItemEndpoints (this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/api/Item").WithTags(nameof(Item));

        group.MapGet("/", async (GamebookDbContext db) =>
        {
            return await db.Items.ToListAsync();
        })
        .WithName("GetAllItems")
        .WithOpenApi();

        group.MapGet("/{id}", async Task<Results<Ok<Item>, NotFound>> (int iditem, GamebookDbContext db) =>
        {
            return await db.Items.AsNoTracking()
                .FirstOrDefaultAsync(model => model.IdItem == iditem)
                is Item model
                    ? TypedResults.Ok(model)
                    : TypedResults.NotFound();
        })
        .WithName("GetItemById")
        .WithOpenApi();

        group.MapPut("/{id}", async Task<Results<Ok, NotFound>> (int iditem, Item item, GamebookDbContext db) =>
        {
            var affected = await db.Items
                .Where(model => model.IdItem == iditem)
                .ExecuteUpdateAsync(setters => setters
                  .SetProperty(m => m.IdItem, item.IdItem)
                  .SetProperty(m => m.Name, item.Name)
                  .SetProperty(m => m.Type, item.Type)
                  .SetProperty(m => m.Image, item.Image)
                  .SetProperty(m => m.BaseStat, item.BaseStat)
                  .SetProperty(m => m.BasePrice, item.BasePrice)
                  .SetProperty(m => m.SpecEffect, item.SpecEffect)
                  .SetProperty(m => m.SpecEffectStat, item.SpecEffectStat)
                  .SetProperty(m => m.IdRoom, item.IdRoom)
                  );
            return affected == 1 ? TypedResults.Ok() : TypedResults.NotFound();
        })
        .WithName("UpdateItem")
        .WithOpenApi();

        group.MapPost("/", async (Item item, GamebookDbContext db) =>
        {
            db.Items.Add(item);
            await db.SaveChangesAsync();
            return TypedResults.Created($"/api/Item/{item.IdItem}",item);
        })
        .WithName("CreateItem")
        .WithOpenApi();

        group.MapDelete("/{id}", async Task<Results<Ok, NotFound>> (int iditem, GamebookDbContext db) =>
        {
            var affected = await db.Items
                .Where(model => model.IdItem == iditem)
                .ExecuteDeleteAsync();
            return affected == 1 ? TypedResults.Ok() : TypedResults.NotFound();
        })
        .WithName("DeleteItem")
        .WithOpenApi();
    }
	public static void MapMonsterEndpoints (this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/api/Monster").WithTags(nameof(Monster));

        group.MapGet("/", async (GamebookDbContext db) =>
        {
            return await db.Monsters.ToListAsync();
        })
        .WithName("GetAllMonsters")
        .WithOpenApi();

        group.MapGet("/{id}", async Task<Results<Ok<Monster>, NotFound>> (int idmonster, GamebookDbContext db) =>
        {
            return await db.Monsters.AsNoTracking()
                .FirstOrDefaultAsync(model => model.IdMonster == idmonster)
                is Monster model
                    ? TypedResults.Ok(model)
                    : TypedResults.NotFound();
        })
        .WithName("GetMonsterById")
        .WithOpenApi();

        group.MapPut("/{id}", async Task<Results<Ok, NotFound>> (int idmonster, Monster monster, GamebookDbContext db) =>
        {
            var affected = await db.Monsters
                .Where(model => model.IdMonster == idmonster)
                .ExecuteUpdateAsync(setters => setters
                  .SetProperty(m => m.IdMonster, monster.IdMonster)
                  .SetProperty(m => m.Name, monster.Name)
                  .SetProperty(m => m.Hitpoints, monster.Hitpoints)
                  .SetProperty(m => m.Damage, monster.Damage)
                  .SetProperty(m => m.Image, monster.Image)
                  .SetProperty(m => m.IdRoom, monster.IdRoom)
                  );
            return affected == 1 ? TypedResults.Ok() : TypedResults.NotFound();
        })
        .WithName("UpdateMonster")
        .WithOpenApi();

        group.MapPost("/", async (Monster monster, GamebookDbContext db) =>
        {
            db.Monsters.Add(monster);
            await db.SaveChangesAsync();
            return TypedResults.Created($"/api/Monster/{monster.IdMonster}",monster);
        })
        .WithName("CreateMonster")
        .WithOpenApi();

        group.MapDelete("/{id}", async Task<Results<Ok, NotFound>> (int idmonster, GamebookDbContext db) =>
        {
            var affected = await db.Monsters
                .Where(model => model.IdMonster == idmonster)
                .ExecuteDeleteAsync();
            return affected == 1 ? TypedResults.Ok() : TypedResults.NotFound();
        })
        .WithName("DeleteMonster")
        .WithOpenApi();
    }
	public static void MapPlayerItemEndpoints (this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/api/PlayerItem").WithTags(nameof(PlayerItem));

        group.MapGet("/", async (GamebookDbContext db) =>
        {
            return await db.PlayerItems.ToListAsync();
        })
        .WithName("GetAllPlayerItems")
        .WithOpenApi();

        group.MapGet("/{id}", async Task<Results<Ok<PlayerItem>, NotFound>> (int idplayeritem, GamebookDbContext db) =>
        {
            return await db.PlayerItems.AsNoTracking()
                .FirstOrDefaultAsync(model => model.IdPlayerItem == idplayeritem)
                is PlayerItem model
                    ? TypedResults.Ok(model)
                    : TypedResults.NotFound();
        })
        .WithName("GetPlayerItemById")
        .WithOpenApi();

        group.MapPut("/{id}", async Task<Results<Ok, NotFound>> (int idplayeritem, PlayerItem playerItem, GamebookDbContext db) =>
        {
            var affected = await db.PlayerItems
                .Where(model => model.IdPlayerItem == idplayeritem)
                .ExecuteUpdateAsync(setters => setters
                  .SetProperty(m => m.IdPlayerItem, playerItem.IdPlayerItem)
                  .SetProperty(m => m.BaseStat, playerItem.BaseStat)
                  .SetProperty(m => m.BasePrice, playerItem.BasePrice)
                  .SetProperty(m => m.SpecEffectStat, playerItem.SpecEffectStat)
                  .SetProperty(m => m.SpecEffect, playerItem.SpecEffect)
                  );
            return affected == 1 ? TypedResults.Ok() : TypedResults.NotFound();
        })
        .WithName("UpdatePlayerItem")
        .WithOpenApi();

        group.MapPost("/", async (PlayerItem playerItem, GamebookDbContext db) =>
        {
            db.PlayerItems.Add(playerItem);
            await db.SaveChangesAsync();
            return TypedResults.Created($"/api/PlayerItem/{playerItem.IdPlayerItem}",playerItem);
        })
        .WithName("CreatePlayerItem")
        .WithOpenApi();

        group.MapDelete("/{id}", async Task<Results<Ok, NotFound>> (int idplayeritem, GamebookDbContext db) =>
        {
            var affected = await db.PlayerItems
                .Where(model => model.IdPlayerItem == idplayeritem)
                .ExecuteDeleteAsync();
            return affected == 1 ? TypedResults.Ok() : TypedResults.NotFound();
        })
        .WithName("DeletePlayerItem")
        .WithOpenApi();
    }
	public static void MapQuestEndpoints (this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/api/Quest").WithTags(nameof(Quest));

        group.MapGet("/", async (GamebookDbContext db) =>
        {
            return await db.Quests.ToListAsync();
        })
        .WithName("GetAllQuests")
        .WithOpenApi();

        group.MapGet("/{id}", async Task<Results<Ok<Quest>, NotFound>> (int idquest, GamebookDbContext db) =>
        {
            return await db.Quests.AsNoTracking()
                .FirstOrDefaultAsync(model => model.IdQuest == idquest)
                is Quest model
                    ? TypedResults.Ok(model)
                    : TypedResults.NotFound();
        })
        .WithName("GetQuestById")
        .WithOpenApi();

        group.MapPut("/{id}", async Task<Results<Ok, NotFound>> (int idquest, Quest quest, GamebookDbContext db) =>
        {
            var affected = await db.Quests
                .Where(model => model.IdQuest == idquest)
                .ExecuteUpdateAsync(setters => setters
                  .SetProperty(m => m.IdQuest, quest.IdQuest)
                  .SetProperty(m => m.Description, quest.Description)
                  .SetProperty(m => m.QuestCondition, quest.QuestCondition)
                  .SetProperty(m => m.QuestParametr, quest.QuestParametr)
                  .SetProperty(m => m.IdDungeon, quest.IdDungeon)
                  );
            return affected == 1 ? TypedResults.Ok() : TypedResults.NotFound();
        })
        .WithName("UpdateQuest")
        .WithOpenApi();

        group.MapPost("/", async (Quest quest, GamebookDbContext db) =>
        {
            db.Quests.Add(quest);
            await db.SaveChangesAsync();
            return TypedResults.Created($"/api/Quest/{quest.IdQuest}",quest);
        })
        .WithName("CreateQuest")
        .WithOpenApi();

        group.MapDelete("/{id}", async Task<Results<Ok, NotFound>> (int idquest, GamebookDbContext db) =>
        {
            var affected = await db.Quests
                .Where(model => model.IdQuest == idquest)
                .ExecuteDeleteAsync();
            return affected == 1 ? TypedResults.Ok() : TypedResults.NotFound();
        })
        .WithName("DeleteQuest")
        .WithOpenApi();
    }
	public static void MapRoomEndpoints (this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/api/Room").WithTags(nameof(Room));

        group.MapGet("/", async (GamebookDbContext db) =>
        {
            return await db.Rooms.ToListAsync();
        })
        .WithName("GetAllRooms")
        .WithOpenApi();

        group.MapGet("/{id}", async Task<Results<Ok<Room>, NotFound>> (int idroom, GamebookDbContext db) =>
        {
            return await db.Rooms.AsNoTracking()
                .FirstOrDefaultAsync(model => model.IdRoom == idroom)
                is Room model
                    ? TypedResults.Ok(model)
                    : TypedResults.NotFound();
        })
        .WithName("GetRoomById")
        .WithOpenApi();

        group.MapPut("/{id}", async Task<Results<Ok, NotFound>> (int idroom, Room room, GamebookDbContext db) =>
        {
            var affected = await db.Rooms
                .Where(model => model.IdRoom == idroom)
                .ExecuteUpdateAsync(setters => setters
                  .SetProperty(m => m.IdRoom, room.IdRoom)
                  .SetProperty(m => m.Type, room.Type)
                  .SetProperty(m => m.Image, room.Image)
                  .SetProperty(m => m.Description, room.Description)
                  .SetProperty(m => m.IdDungeon, room.IdDungeon)
                  );
            return affected == 1 ? TypedResults.Ok() : TypedResults.NotFound();
        })
        .WithName("UpdateRoom")
        .WithOpenApi();

        group.MapPost("/", async (Room room, GamebookDbContext db) =>
        {
            db.Rooms.Add(room);
            await db.SaveChangesAsync();
            return TypedResults.Created($"/api/Room/{room.IdRoom}",room);
        })
        .WithName("CreateRoom")
        .WithOpenApi();

        group.MapDelete("/{id}", async Task<Results<Ok, NotFound>> (int idroom, GamebookDbContext db) =>
        {
            var affected = await db.Rooms
                .Where(model => model.IdRoom == idroom)
                .ExecuteDeleteAsync();
            return affected == 1 ? TypedResults.Ok() : TypedResults.NotFound();
        })
        .WithName("DeleteRoom")
        .WithOpenApi();
    }
	public static void MapTownEndpoints (this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/api/Town").WithTags(nameof(Town));

        group.MapGet("/", async (GamebookDbContext db) =>
        {
            return await db.Towns.ToListAsync();
        })
        .WithName("GetAllTowns")
        .WithOpenApi();

        group.MapGet("/{id}", async Task<Results<Ok<Town>, NotFound>> (int id, GamebookDbContext db) =>
        {
            return await db.Towns.AsNoTracking()
                .FirstOrDefaultAsync(model => model.IdTown == id)
                is Town model
                    ? TypedResults.Ok(model)
                    : TypedResults.NotFound();
        })
        .WithName("GetTownById")
        .WithOpenApi();

        group.MapPut("/{id}", async Task<Results<Ok, NotFound>> (int id, Town town, GamebookDbContext db) =>
        {
            var affected = await db.Towns
                .Where(model => model.IdTown == id)
                .ExecuteUpdateAsync(setters => setters
                  .SetProperty(m => m.IdTown, town.IdTown)
                  .SetProperty(m => m.Name, town.Name)
                  .SetProperty(m => m.Image, town.Image)
                  );
            return affected == 1 ? TypedResults.Ok() : TypedResults.NotFound();
        })
        .WithName("UpdateTown")
        .WithOpenApi();

        group.MapPost("/", async (Town town, GamebookDbContext db) =>
        {
            db.Towns.Add(town);
            await db.SaveChangesAsync();
            return TypedResults.Created($"/api/Town/{town.IdTown}",town);
        })
        .WithName("CreateTown")
        .WithOpenApi();

        group.MapDelete("/{id}", async Task<Results<Ok, NotFound>> (int id, GamebookDbContext db) =>
        {
            var affected = await db.Towns
                .Where(model => model.IdTown == id)
                .ExecuteDeleteAsync();
            return affected == 1 ? TypedResults.Ok() : TypedResults.NotFound();
        })
        .WithName("DeleteTown")
        .WithOpenApi();
    }
	public static void MapHallEndpoints (this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/api/Hall").WithTags(nameof(Hall));

        group.MapGet("/", async (GamebookDbContext db) =>
        {
            return await db.Halls.ToListAsync();
        })
        .WithName("GetAllHalls")
        .WithOpenApi();

        group.MapGet("/{id}", async Task<Results<Ok<Hall>, NotFound>> (int idhall, GamebookDbContext db) =>
        {
            return await db.Halls.AsNoTracking()
                .FirstOrDefaultAsync(model => model.IdHall == idhall)
                is Hall model
                    ? TypedResults.Ok(model)
                    : TypedResults.NotFound();
        })
        .WithName("GetHallById")
        .WithOpenApi();

        group.MapPut("/{id}", async Task<Results<Ok, NotFound>> (int idhall, Hall hall, GamebookDbContext db) =>
        {
            var affected = await db.Halls
                .Where(model => model.IdHall == idhall)
                .ExecuteUpdateAsync(setters => setters
                  .SetProperty(m => m.IdHall, hall.IdHall)
                  .SetProperty(m => m.Type, hall.Type)
                  .SetProperty(m => m.Description, hall.Description)
                  .SetProperty(m => m.Room, hall.Room)
                  );
            return affected == 1 ? TypedResults.Ok() : TypedResults.NotFound();
        })
        .WithName("UpdateHall")
        .WithOpenApi();

        group.MapPost("/", async (Hall hall, GamebookDbContext db) =>
        {
            db.Halls.Add(hall);
            await db.SaveChangesAsync();
            return TypedResults.Created($"/api/Hall/{hall.IdHall}",hall);
        })
        .WithName("CreateHall")
        .WithOpenApi();

        group.MapDelete("/{id}", async Task<Results<Ok, NotFound>> (int idhall, GamebookDbContext db) =>
        {
            var affected = await db.Halls
                .Where(model => model.IdHall == idhall)
                .ExecuteDeleteAsync();
            return affected == 1 ? TypedResults.Ok() : TypedResults.NotFound();
        })
        .WithName("DeleteHall")
        .WithOpenApi();
    }
    public static void MapImageEndpoints(this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/api/Image").WithTags(nameof(Image));

        group.MapGet("/", async (GamebookDbContext db) =>
        {
            return await db.Images.ToListAsync();
        })
        .WithName("GetAllImages")
        .WithOpenApi();

        group.MapGet("/{id}", async Task<Results<Ok<Image>, NotFound>> (string idimage, GamebookDbContext db) =>
        {
            return await db.Images.AsNoTracking()
                .FirstOrDefaultAsync(model => model.IdImage == idimage)
                is Image model
                    ? TypedResults.Ok(model)
                    : TypedResults.NotFound();
        })
        .WithName("GetImageById")
        .WithOpenApi();

        group.MapPut("/{id}", async Task<Results<Ok, NotFound>> (string idimage, Image image, GamebookDbContext db) =>
        {
            var existingImage = await db.Images.FindAsync(idimage);
            if (existingImage == null)
            {
                return TypedResults.NotFound();
            }
            existingImage.Name = image.Name;
            existingImage.ContentType = image.ContentType;
            existingImage.Data = image.Data;
            var affected = await db.SaveChangesAsync();


            return affected > 0 ? TypedResults.Ok() : TypedResults.NotFound();
        })
        .WithName("UpdateImage")
        .WithOpenApi();

        group.MapPost("/", async Task<Results<Created<Image>, BadRequest>> (IFormFile file, GamebookDbContext db) =>
        {
            if (file == null || file.Length == 0)
            {
                return TypedResults.BadRequest();
            }
            if (file.ContentType == null || !file.ContentType.StartsWith("image/"))
            {
                return TypedResults.BadRequest();
            }

            using var memoryStream = new MemoryStream();
            await file.CopyToAsync(memoryStream);

            var image = new Image
            {
                IdImage = Guid.NewGuid().ToString(),
                Name = file.FileName,
                Data = memoryStream.ToArray(),
                ContentType = file.ContentType,
            };

            db.Images.Add(image);
            await db.SaveChangesAsync();

            return TypedResults.Created($"/api/Image/{image.IdImage}", image);
        })
        .WithName("CreateImage")
        .WithOpenApi();


        group.MapDelete("/{id}", async Task<Results<Ok, NotFound>> (string idimage, GamebookDbContext db) =>
        {
            var affected = await db.Images
                .Where(model => model.IdImage == idimage)
                .ExecuteDeleteAsync();
            return affected == 1 ? TypedResults.Ok() : TypedResults.NotFound();
        })
        .WithName("DeleteImage")
        .WithOpenApi();
    }
    public static void MapFullDungeonEndpoints(this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/api/Room").WithTags(nameof(Room));

        // Endpoint pro získání řetězce místností na základě názvu dungeonu
        group.MapGet("/chain/{dungeonName}", GetRoomChain)
            .WithName("GetRoomChain")
            .WithOpenApi();
    }

    // Statická metoda pro logiku výběru místností
    static async Task<IResult> GetRoomChain(string dungeonName, GamebookDbContext db)
    {
        // Validace vstupního parametru
        if (string.IsNullOrWhiteSpace(dungeonName))
        {
            return Results.BadRequest("Dungeon name is required.");
        }

        // Načtení místností s vazbami na Hall a Dungeon podle zadaného názvu dungeonu
        var rooms = await db.Rooms
            .Include(r => r.Dungeon)
            .Include(r => r.Hall)    // Správné načítání vazby na Hall
            .Where(r => r.Dungeon.Name == dungeonName)
            .OrderBy(r => EF.Functions.Random())
            .Take(10)
            .ToListAsync();

        // Pokud nebyly nalezeny žádné místnosti
        if (!rooms.Any())
        {
            return Results.NotFound($"No rooms found for dungeon '{dungeonName}'");
        }

        // Vytvoření datové struktury pro návrat dat
        var roomChain = new List<RoomChainDto>();

        for (int i = 0; i < rooms.Count; i++)
        {
            var currentRoom = rooms[i];
            var nextRoom = (i < rooms.Count - 1) ? rooms[i + 1] : null;

            var hallDto = new HallDto
            {
                IdHall = currentRoom.Hall?.IdHall ?? 0,
                NextRoom = nextRoom != null ? new RoomChainDto
                {
                    IdRoom = nextRoom.IdRoom,
                    RoomDescription = nextRoom.Description
                } : null
            };

            roomChain.Add(new RoomChainDto
            {
                IdRoom = currentRoom.IdRoom,
                RoomDescription = currentRoom.Description,
                LinkedHall = hallDto
            });
        }

        // Vrácení výsledku
        return Results.Ok(roomChain);
    }


}