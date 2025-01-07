using Gamebook.Server.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Gamebook.Server.Data;

var builder = WebApplication.CreateBuilder(args);

// Přidání služeb do kontejneru.
builder.Services.AddControllers();

// Nastavení Swagger pro API dokumentaci
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Připojení k databázi (SQLite)
builder.Services.AddDbContext<GamebookDbContext>(options =>
    options.UseSqlite("Data Source=gamebook.db"));

// Povolení CORS pro požadavky z React aplikace
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        // Ujisti se, že používáš správnou URL pro tvoji React aplikaci (port 63851)
        policy.WithOrigins("https://localhost:63852")  // URL React aplikace
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

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

app.UseAuthorization(); // Použití autorizace

// Mapování kontrolerů API
app.MapControllers();

// Pokud žádná cesta neodpovídá, bude směrováno na index.html (pro React SPA)
app.MapFallbackToFile("/index.html");

// Spuštění aplikace
app.Run();
