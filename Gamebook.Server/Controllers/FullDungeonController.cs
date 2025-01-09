
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Gamebook.Server.Data;
using Gamebook.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Gamebook.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FullDungeonController : ControllerBase
    {
        private readonly GamebookDbContext _context;

        public FullDungeonController(GamebookDbContext context)
        {
            _context = context;
        }

        [HttpGet("dungeon/{dungeonId}")]
        public async Task<ActionResult<List<RoomGraphDto>>> GetRoomGraph(int dungeonId)
        {
            // Načtení místností pro daný dungeon s navigacemi
            var rooms = await _context.Rooms
               .Include(r => r.Hall)
               .Include(r => r.Image)
               .Where(r => r.DungeonId == dungeonId)
               .ToListAsync();
            if (rooms == null || rooms.Count == 0)
            {
                return NotFound("No rooms found for this dungeon.");
            }

            var halls = await _context.Halls
             .Include(h => h.Image)
           .ToListAsync();

            // Vytvoříme mapping z místnosti na místnostDto
            var roomDictionary = rooms.ToDictionary(room => room.Id, room => new RoomGraphDto
            {
                RoomId = room.Id,
                RoomType = room.Type,
                RoomDescription = room.Description,
                ImageId = room.Image?.Id,
                LinkedHall = null
            });

            var hallDictionary = halls.ToDictionary(hall => hall.Id, hall => new HallGraphDto
            {
                HallId = hall.Id,
                HallDescription = "Hall",
                ImageId = hall.Image?.Id,
                NextRoom = null
            });
            // Projdeme všechny místnosti a nastavíme jim propojenou chodbu a další místnost v DTO,
            // pokud tam je.
            foreach (var room in rooms)
            {
                if (room.HallId != 0)
                {
                    var roomDto = roomDictionary[room.Id];
                    var hall = hallDictionary[room.HallId];
                    roomDto.LinkedHall = hall;

                    var nextRoom = rooms.FirstOrDefault(r => r.HallId == room.HallId && r.Id != room.Id);

                    if (nextRoom != null)
                    {
                        hall.NextRoom = roomDictionary[nextRoom.Id];
                    }

                }
            }

            // Vytvoříme finální výstup
            var result = roomDictionary.Values.ToList();
            return Ok(result);
        }
    }
}