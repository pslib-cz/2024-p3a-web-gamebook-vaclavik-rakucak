using Gamebook.Server.Data;
using Gamebook.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Gamebook.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShopOfferController : ControllerBase
    {
        private readonly GamebookDbContext _context;

        public ShopOfferController(GamebookDbContext context)
        {
            _context = context;
        }

        [HttpGet("random")]
        public async Task<ActionResult<IEnumerable<Equipment>>> GetRandomEquipment([FromQuery] int phase)
        {
            var randomEquipment = new List<Equipment>();

            // Offerwall
            randomEquipment.AddRange(await GetRandomEquipmentByTypeAndPhase("Weapon", 3, phase));
            randomEquipment.AddRange(await GetRandomEquipmentByTypeAndPhase("Shield", 3, phase));
            randomEquipment.AddRange(await GetRandomEquipmentByTypeAndPhase("Armor", 3, phase));
            randomEquipment.AddRange(await GetRandomEquipmentByType("Miscellaneous", 3));

            return Ok(randomEquipment);
        }

        private async Task<List<Equipment>> GetRandomEquipmentByTypeAndPhase(string type, int count, int phase)
        {
            var equipment = await _context.Equipments
                .Where(e => e.Type == type && e.Phase == phase)
                .Include(e => e.SpecialEffect)
                .ToListAsync();

            if (equipment.Count == 0) return new List<Equipment>();

            var random = new Random();
            var selectedEquipment = equipment.OrderBy(x => random.Next()).Take(count).ToList();

            return selectedEquipment;
        }

        private async Task<List<Equipment>> GetRandomEquipmentByType(string type, int count)
        {
            var equipment = await _context.Equipments
                .Where(e => e.Type == type)
                .Include(e => e.SpecialEffect)
                .ToListAsync();

            if (equipment.Count == 0) return new List<Equipment>();

            var random = new Random();
            var selectedEquipment = equipment.OrderBy(x => random.Next()).Take(count).ToList();

            return selectedEquipment;
        }
    }
}