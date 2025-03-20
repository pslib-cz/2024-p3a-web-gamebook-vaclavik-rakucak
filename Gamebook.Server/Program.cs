using Gamebook.Server.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Gamebook.Server.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Gamebook.Server.Helpers;
using System;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;

// Přidání služeb do kontejneru.
builder.Services.AddControllers();

// Nastavení Swagger pro API dokumentaci
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Připojení k databázi (SQLite)
builder.Services.AddDbContext<GamebookDbContext>(options => 
    options.UseSqlite(configuration.GetConnectionString("DefaultConnection")));

// Povolení CORS pro požadavky z React aplikace
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Konfigurace JWT autentizace
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = configuration["JwtSettings:Issuer"],
            ValidAudience = configuration["JwtSettings:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JwtSettings:Key"])) //Načtení klíče z konfigurace
        };
    });
builder.Services.AddAuthorization();
builder.Services.AddHostedService<DatabaseMigrationService>(); // Registrace DatabaseMigrationService

var app = builder.Build();

GamebookDbContext.SeedData(app.Services);

// Povolení CORS middleware - musí být před 'UseAuthorization'
app.UseCors();

// Povolení statických souborů a souborů index.html
app.UseDefaultFiles();
app.UseStaticFiles();

// Vytvoření mapování pro Swagger, pouze v režimu vývoje
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection(); // Povolení HTTPS

app.UseAuthentication();  // Povolení autentizace

app.UseAuthorization(); // Použití autorizace

// Mapování kontrolerů API
app.MapControllers();

// Pokud žádná cesta neodpovídá, bude směrováno na index.html (pro React SPA)
app.MapFallbackToFile("/index.html");

// Spuštění aplikace
app.Run();


public class DatabaseMigrationService : IHostedService
{
    private readonly IServiceProvider _serviceProvider;

    public DatabaseMigrationService(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    public async Task StartAsync(CancellationToken cancellationToken)
    {
        using (var scope = _serviceProvider.CreateScope())
        {
            var db = scope.ServiceProvider.GetRequiredService<GamebookDbContext>();
            await db.Database.MigrateAsync(cancellationToken);

        }
    }

    public Task StopAsync(CancellationToken cancellationToken) => Task.CompletedTask;
}