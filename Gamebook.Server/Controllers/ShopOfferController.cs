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
        public async Task<ActionResult<IEnumerable<Equipment>>> GetRandomEquipment()
        {
            var randomEquipment = new List<Equipment>();

            //offerwall
            randomEquipment.AddRange(await GetRandomEquipmentByType("Weapon", 3));
            randomEquipment.AddRange(await GetRandomEquipmentByType("Shield", 3));
            randomEquipment.AddRange(await GetRandomEquipmentByType("Armor", 3));
            randomEquipment.AddRange(await GetRandomEquipmentByType("Miscellaneous", 3));

            return Ok(randomEquipment);
        }

        private async Task<List<Equipment>> GetRandomEquipmentByType(string type, int count)
        {
            var equipment = await _context.Equipments
                .Where(e => e.Type == type /*&& (e.Rarity == "common" || e.Rarity == "rare")*/)
                .Include(e => e.SpecialEffect)
                .Include(e => e.Image)
                .ToListAsync();

            if (equipment.Count == 0) return new List<Equipment>();

            var random = new Random();
            var selectedEquipment = equipment.OrderBy(x => random.Next()).Take(count).ToList();

            return selectedEquipment;
        }
    }
}