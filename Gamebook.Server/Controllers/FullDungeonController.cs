using Gamebook.Server.Data;
using Gamebook.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Gamebook.Server.Controllers
{
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
            // 1. Získání všech Hallů pro daný Dungeon (včetně těch bez Room)
            var halls = await _context.Halls
                .Include(h => h.Room)
                .ThenInclude(r => r.Image) // Zahrneme i Room, aby se provedl LEFT JOIN
                .Include(h => h.Image)
                .Where(h => h.DungeonId == dungeonId)
                .ToListAsync();

            if (halls == null || halls.Count == 0)
            {
                return NotFound("No halls found for this dungeon.");
            }

            // 2. Náhodné sestavení chainu
            var chain = new List<object>();
            var random = new Random();
            // Vybereme Hall, který má přiřazenou Room
            var validHalls = halls.Where(h => h.Room != null).ToList();
            if (validHalls.Count == 0)
            {
                return NotFound("No halls with rooms found for this dungeon.");
            }

            var currentHall = validHalls[random.Next(validHalls.Count)];

            // Parametry pro chain
            int chainLength = 10;
            bool allowFork = true;

            for (int i = 0; i < chainLength; i++)
            {
                chain.Add(new { type = "hall", data = currentHall });

                // Možnost forku
                if (allowFork && random.Next(2) == 0 && i < chainLength - 1)
                {
                    var availableRooms = halls.Where(h => h.RoomId != currentHall.RoomId && h.Room != null)
                                               .Select(h => h.Room)
                                               .Distinct()
                                               .ToList();
                    if (availableRooms.Count >= 2)
                    {
                        var forkedRooms = availableRooms.OrderBy(x => random.Next()).Take(2).ToList();
                        chain.Add(new { type = "fork", data = forkedRooms });

                        // Ošetření null v currentHall:
                        var selectedRoom = forkedRooms[random.Next(forkedRooms.Count)];
                        currentHall = halls.FirstOrDefault(h => h.RoomId == selectedRoom.Id);
                        if (currentHall == null)
                        {
                            // Vybereme náhodný Hall, který má Room:
                            var hallsWithRooms = halls.Where(h => h.Room != null).ToList();
                            if (hallsWithRooms.Count > 0)
                            {
                                currentHall = hallsWithRooms[random.Next(hallsWithRooms.Count)];
                            }
                            else
                            {
                                break; // Nejsou žádné Hally s Room, ukončíme chain
                            }
                        }
                        continue;
                    }
                }

                // Přidání Room do chainu (pokud existuje)
                if (currentHall.Room != null)
                {
                    chain.Add(new { type = "room", data = currentHall.Room });
                }
                else
                {
                    // Ošetření případu, kdy Hall nemá Room - zde přidáme zprávu o chybě
                    chain.Add(new { type = "error", data = "Hall " + currentHall.Id + " has no assigned Room." });
                }

                // Najdeme další Hall, který má Room a není aktuální Hall
                var nextHalls = halls.Where(h => h.Id != currentHall.Id && h.Room != null).ToList();
                if (nextHalls.Count == 0)
                {
                    break;
                }
                currentHall = nextHalls[random.Next(nextHalls.Count)];
            }

            // 3. Odeslání chainu klientovi
            return Ok(chain);
        }
    }
}