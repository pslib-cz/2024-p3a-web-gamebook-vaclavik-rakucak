using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Gamebook.Server.Data;
using Gamebook.Server.Models;

namespace Gamebook.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DungeonsController : ControllerBase
    {
        private readonly GamebookDbContext _context;

        public DungeonsController(GamebookDbContext context)
        {
            _context = context;
        }

        // GET: api/Dungeons
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Dungeon>>> GetDungeons()
        {
            return await _context.Dungeons.ToListAsync();
        }

        // GET: api/Dungeons/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Dungeon>> GetDungeon(int id)
        {
            var dungeon = await _context.Dungeons.FindAsync(id);

            if (dungeon == null)
            {
                return NotFound();
            }

            return dungeon;
        }

        // PUT: api/Dungeons/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDungeon(int id, Dungeon dungeon)
        {
            if (id != dungeon.Id)
            {
                return BadRequest();
            }

            _context.Entry(dungeon).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DungeonExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Dungeons
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Dungeon>> PostDungeon(Dungeon dungeon)
        {
            _context.Dungeons.Add(dungeon);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDungeon", new { id = dungeon.Id }, dungeon);
        }

        // DELETE: api/Dungeons/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDungeon(int id)
        {
            var dungeon = await _context.Dungeons.FindAsync(id);
            if (dungeon == null)
            {
                return NotFound();
            }

            _context.Dungeons.Remove(dungeon);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DungeonExists(int id)
        {
            return _context.Dungeons.Any(e => e.Id == id);
        }
    }
}
