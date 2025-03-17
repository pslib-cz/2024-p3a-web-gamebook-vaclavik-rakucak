﻿using System;
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
    public class HallsController : ControllerBase
    {
        private readonly GamebookDbContext _context;

        public HallsController(GamebookDbContext context)
        {
            _context = context;
        }

        // GET: api/Halls
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Hall>>> GetHalls()
        {
            return await _context.Halls.ToListAsync();
        }

        // GET: api/Halls/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Hall>> GetHall(int id)
        {
            var hall = await _context.Halls.FindAsync(id);

            if (hall == null)
            {
                return NotFound();
            }

            return hall;
        }

        // PUT: api/Halls/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHall(int id, Hall hall)
        {
            if (id != hall.Id)
            {
                return BadRequest();
            }

            _context.Entry(hall).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HallExists(id))
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

        // POST: api/Halls
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Hall>> PostHall(Hall hall)
        {
            _context.Halls.Add(hall);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetHall", new { id = hall.Id }, hall);
        }

        // DELETE: api/Halls/5
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHall(int id)
        {
            var hall = await _context.Halls.FindAsync(id);
            if (hall == null)
            {
                return NotFound();
            }

            _context.Halls.Remove(hall);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool HallExists(int id)
        {
            return _context.Halls.Any(e => e.Id == id);
        }
    }
}
