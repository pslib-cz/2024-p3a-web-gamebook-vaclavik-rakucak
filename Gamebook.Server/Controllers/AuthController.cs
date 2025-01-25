using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Gamebook.Server.Data;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly GamebookDbContext _context;
    private readonly IConfiguration _configuration;

    public AuthController(GamebookDbContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }
    private string GenerateJwtToken(Admin admin)
    {
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:Key"]));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var claims = new List<Claim> {
             new Claim(JwtRegisteredClaimNames.Sub, admin.Id.ToString()),
             new Claim(ClaimTypes.Name, admin.Username),
             new Claim(ClaimTypes.Role, admin.Role)
        };

        var token = new JwtSecurityToken(_configuration["JwtSettings:Issuer"],
            _configuration["JwtSettings:Audience"],
            claims,
            expires: DateTime.Now.AddHours(1),
            signingCredentials: credentials);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
    [AllowAnonymous]
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterIM register)
    {
        string salt = SaltGenerator.GenerateSalt();
        string hashedPassword = PasswordHasher.HashPassword(register.Password, salt);

        var newAdmin = new Admin
        {
            Username = register.Username,
            Password = hashedPassword,
            Salt = salt,
            Email = register.Email,
        };
        _context.Admins.Add(newAdmin);
        await _context.SaveChangesAsync();

        return Ok();
    }
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginIM login)
    {
        var admin = await _context.Admins.SingleOrDefaultAsync(u => u.Username == login.Username);
        if (admin == null)
        {
            return Unauthorized();
        }
        if (!PasswordHasher.VerifyPassword(login.Password, admin.Salt, admin.Password))
        {
            return Unauthorized();
        }

        var token = GenerateJwtToken(admin);
        return Ok(new AuthResponseVM { Token = token, Role = admin.Role });
    }
}