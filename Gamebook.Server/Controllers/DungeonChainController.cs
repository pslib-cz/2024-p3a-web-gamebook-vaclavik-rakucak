using Gamebook.Server.Data;
using Gamebook.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Gamebook.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
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
        int chainLength = 10;

        var rooms = await _context.Rooms
            .Where(r => r.DungeonId == dungeonId)
            .ToListAsync();

        var halls = await _context.Halls
            .Include(h => h.Room)
            .Where(h => h.DungeonId == dungeonId)
            .ToListAsync();

        if (rooms.Count == 0)
        {
            return NotFound("No rooms found for this dungeon.");
        }

        var chain = new List<ChainElement>();
        var currentRoom = rooms[random.Next(rooms.Count)];

        for (int i = 0; i < chainLength; i++)
        {
            if (i < chainLength - 2 && random.Next(100) < 0) //nejsou data v databazi zaze sance na fork je 0
            {
                var availableRooms = rooms.Where(r => r.Id != currentRoom.Id).ToList();
                if (availableRooms.Count >= 2)
                {
                    var forkedRooms = availableRooms.OrderBy(x => random.Next()).Take(2).ToList();
                    bool isFirstRoomDeadEnd = true;
                    bool isSecondRoomDeadEnd = false;

                    var fork = new Fork
                    {
                        DungeonId = dungeonId,
                        Connections = new List<ForkConnection>
                    {
                        new ForkConnection { ConnectedRoom = forkedRooms[0], IsDeadEnd = isFirstRoomDeadEnd },
                        new ForkConnection { ConnectedRoom = forkedRooms[1], IsDeadEnd = isSecondRoomDeadEnd }
                    }
                    };
                    _context.Forks.Add(fork);
                    await _context.SaveChangesAsync();

                    chain.Add(new ForkElement(fork));

                    currentRoom = forkedRooms[1];
                    i++;
                    continue;
                }
            }

            var currentHall = halls.FirstOrDefault(h => h.RoomId == currentRoom.Id);
            if (currentHall != null)
            {
                chain.Add(new HallElement(currentHall));
            }

            chain.Add(new RoomElement(currentRoom));

            var nextRooms = rooms.Where(r => r.Id != currentRoom.Id).ToList();
            if (nextRooms.Count == 0)
            {
                break;
            }
            currentRoom = nextRooms[random.Next(nextRooms.Count)];
        }

        var chainVm = chain.Select<ChainElement, IChainElementVm>(element =>
        {
            switch (element)
            {
                case RoomElement re:
                    return new RoomElementVm(re.Data);
                case HallElement he:
                    return new HallElementVm(he.Data);
                case ForkElement fe:
                    var forkVm = new ForkVm
                    {
                        Id = fe.Data.Id,
                        DungeonId = fe.Data.DungeonId,
                        Connections = fe.Data.Connections.Select(c => new ForkConnectionVm
                        {
                            Id = c.Id,
                            ForkId = fe.Data.Id, // Můžete sem dát ID Forku, pokud ho potřebujete
                            ConnectedRoom = c.ConnectedRoom,
                            IsDeadEnd = c.IsDeadEnd
                        }).ToList()
                    };
                    return new ForkElementVm(forkVm);
                default:
                    return null;
            }
        }).Where(x => x != null).ToList();

        return Ok(chainVm);
    }

}