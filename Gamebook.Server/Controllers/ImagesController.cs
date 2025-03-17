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
    public class ImagesController : ControllerBase
    {

        private readonly GamebookDbContext _context; // Doplň DbContext

        public ImagesController(GamebookDbContext context) // Doplň DbContext
        {
            _context = context;
        }

        [Authorize]
        [HttpPost("upload")]
        public async Task<IActionResult> UploadImage(IFormFile image, string name)
        {
            if (image == null || image.Length == 0)
            {
                return BadRequest("No image file provided.");
            }

            if (string.IsNullOrEmpty(name))
            {
                return BadRequest("Name is required");
            }

            using (var memoryStream = new MemoryStream())
            {
                await image.CopyToAsync(memoryStream);

                var imageEntity = new Image
                {
                    Name = name,
                    Data = memoryStream.ToArray(),
                    ContentType = image.ContentType
                };

                _context.Images.Add(imageEntity);
                await _context.SaveChangesAsync();

                return Ok(new { imageEntity.Id }); // Vracíme ID nahraného obrázku
            }
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetImage(int id)
        {
            var imageEntity = await _context.Images.FindAsync(id);

            if (imageEntity == null)
            {
                return NotFound();
            }
            return File(imageEntity.Data, imageEntity.ContentType);
        }
    }
}
