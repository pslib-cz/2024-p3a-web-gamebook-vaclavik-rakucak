using Gamebook.Server.Data;
using Gamebook.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Gamebook.Server.Controllers;

[ApiController]
[Route("[controller]")]
public class DungeonChainController : ControllerBase
{
    private readonly GamebookDbContext _context;

    public DungeonChainController(GamebookDbContext context)
    {
        _context = context;
    }

    [HttpGet("{dungeonId}")]
    public async Task<IActionResult> GetDungeonChain(int dungeonId)
    {
        var random = Random.Shared;
        int chainLength = 10; // Počet prvků v chainu

        var rooms = await _context.Rooms
            .Include(r => r.Image)
            .Where(r => r.DungeonId == dungeonId)
            .ToListAsync();

        var halls = await _context.Halls
            .Include(h => h.Room)
            .ThenInclude(r => r.Image)
            .Include(h => h.Image)
            .Where(h => h.DungeonId == dungeonId)
            .ToListAsync();

        if (rooms.Count == 0)
        {
            return NotFound("No rooms found for this dungeon.");
        }

        // Vytvoření chainu
        var chain = new List<object>();
        var currentRoom = rooms[random.Next(rooms.Count)];

        for (int i = 0; i < chainLength; i++)
        {

            if (i < chainLength - 2 && random.Next(100) < 0) //sance forku
            {
                var availableRooms = rooms.Where(r => r.Id != currentRoom.Id).ToList();
                if (availableRooms.Count >= 2)
                {
                    var forkedRooms = availableRooms.OrderBy(x => random.Next()).Take(2).ToList();
                    var isFirstRoomDeadEnd = random.Next(2) == 0;

                    var fork = new Fork
                    {
                        DungeonId = dungeonId,
                        Connections = new List<ForkConnection>
                {
                    new ForkConnection { ConnectedRoom = forkedRooms[0], IsDeadEnd = isFirstRoomDeadEnd },
                    new ForkConnection { ConnectedRoom = forkedRooms[1], IsDeadEnd = !isFirstRoomDeadEnd }
                }
                    };

                    var forkDetail = new
                    {
                        Id = fork.Id, // ID forku
                        Type = "fork",
                        Data = fork.Connections.Select(fc => new
                        {
                            Room = new
                            {
                                Id = fc.ConnectedRoom.Id,
                                Type = fc.ConnectedRoom.Type,
                                Description = fc.ConnectedRoom.Description,
                                DungeonId = fc.ConnectedRoom.DungeonId,
                                ImageId = fc.ConnectedRoom.ImageId,
                                IsDeadEnd = fc.IsDeadEnd
                            },
                            IsDeadEnd = fc.IsDeadEnd
                        }).ToList()
                    };

                    chain.Add(forkDetail);

                    currentRoom = isFirstRoomDeadEnd ? forkedRooms[1] : forkedRooms[0];
                    i++;
                    continue;
                }
            }

            var currentHall = halls.FirstOrDefault(h => h.RoomId == currentRoom.Id);
            if (currentHall != null)
            {
                chain.Add(new { type = "hall", data = currentHall });
            }
            chain.Add(new { type = "room", data = currentRoom, isDeadEnd = false });
            var nextRooms = rooms.Where(r => r.Id != currentRoom.Id).ToList();
            if (nextRooms.Count == 0)
            {
                break;
            }
            currentRoom = nextRooms[random.Next(nextRooms.Count)];
        }

        return Ok(chain);
    }
}