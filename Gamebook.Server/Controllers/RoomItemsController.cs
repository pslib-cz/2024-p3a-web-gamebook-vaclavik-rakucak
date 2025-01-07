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
    public class RoomItemsController : ControllerBase
    {
        private readonly GamebookDbContext _context;

        public RoomItemsController(GamebookDbContext context)
        {
            _context = context;
        }

        // GET: api/RoomItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RoomItem>>> GetRoomItems()
        {
            return await _context.RoomItems.ToListAsync();
        }

        // GET: api/RoomItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RoomItem>> GetRoomItem(int id)
        {
            var roomItem = await _context.RoomItems.FindAsync(id);

            if (roomItem == null)
            {
                return NotFound();
            }

            return roomItem;
        }

        // PUT: api/RoomItems/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRoomItem(int id, RoomItem roomItem)
        {
            if (id != roomItem.Id)
            {
                return BadRequest();
            }

            _context.Entry(roomItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RoomItemExists(id))
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

        // POST: api/RoomItems
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<RoomItem>> PostRoomItem(RoomItem roomItem)
        {
            _context.RoomItems.Add(roomItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRoomItem", new { id = roomItem.Id }, roomItem);
        }

        // DELETE: api/RoomItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRoomItem(int id)
        {
            var roomItem = await _context.RoomItems.FindAsync(id);
            if (roomItem == null)
            {
                return NotFound();
            }

            _context.RoomItems.Remove(roomItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RoomItemExists(int id)
        {
            return _context.RoomItems.Any(e => e.Id == id);
        }
    }
}
