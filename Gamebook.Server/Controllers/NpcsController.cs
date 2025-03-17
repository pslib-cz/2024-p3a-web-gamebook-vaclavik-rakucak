using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Gamebook.Server.Data;
using Gamebook.Server.Models;
using Microsoft.AspNetCore.Authorization;

namespace Gamebook.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NpcsController : ControllerBase
    {
        private readonly GamebookDbContext _context;

        public NpcsController(GamebookDbContext context)
        {
            _context = context;
        }

        // GET: api/Npcs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Npc>>> GetNpc()
        {
            return await _context.Npcs.ToListAsync();
        }

        // GET: api/Npcs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Npc>> GetNpc(int id)
        {
            var npc = await _context.Npcs.FindAsync(id);

            if (npc == null)
            {
                return NotFound();
            }

            return npc;
        }

        // PUT: api/Npcs/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutNpc(int id, Npc npc)
        {
            if (id != npc.Id)
            {
                return BadRequest();
            }

            _context.Entry(npc).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NpcExists(id))
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

        // POST: api/Npcs
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Npc>> PostNpc(Npc npc)
        {
            _context.Npcs.Add(npc);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetNpc", new { id = npc.Id }, npc);
        }

        // DELETE: api/Npcs/5
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNpc(int id)
        {
            var npc = await _context.Npcs.FindAsync(id);
            if (npc == null)
            {
                return NotFound();
            }

            _context.Npcs.Remove(npc);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool NpcExists(int id)
        {
            return _context.Npcs.Any(e => e.Id == id);
        }
    }
}
