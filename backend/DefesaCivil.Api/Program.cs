using System.Text;
using System.Text.Json.Serialization;
using System.Threading.RateLimiting;
using DefesaCivil.Api.Data;
using DefesaCivil.Api.Services;
using DefesaERP.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers()
    .AddJsonOptions(options =>
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()));

var connectionString = builder.Configuration.GetConnectionString("Default");
var useSqlite = string.IsNullOrWhiteSpace(connectionString) && builder.Environment.IsDevelopment();

if (string.IsNullOrWhiteSpace(connectionString))
{
    if (!useSqlite)
        throw new InvalidOperationException("Connection string 'Default' não configurada. Defina em appsettings ou ConnectionStrings__Default (ENV).");

    connectionString = "Data Source=defesa-dev.db";
}

builder.Services.AddDbContext<AppDbContext>(options =>
{
    if (useSqlite)
        options.UseSqlite(connectionString);
    else
        options.UseNpgsql(connectionString);
});

builder.Services.AddScoped<TokenService>();
builder.Services.AddScoped<IDashboardService, DashboardService>();
builder.Services.AddScoped<OcorrenciaService>();
builder.Services.AddScoped<AlertaService>();
builder.Services.AddScoped<EquipeService>();
builder.Services.AddScoped<SolicitacaoService>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var jwtKey = builder.Configuration["Jwt:Key"];
var jwtIssuer = builder.Configuration["Jwt:Issuer"] ?? "DefesaCivilApi";
var jwtAudience = builder.Configuration["Jwt:Audience"] ?? "DefesaCivilApiUsers";

if (string.IsNullOrWhiteSpace(jwtKey) && builder.Environment.IsDevelopment())
{
    jwtKey = "defesa-dev-only-jwt-key-com-32-caracteres";
    builder.Configuration["Jwt:Key"] = jwtKey;
}

if (string.IsNullOrWhiteSpace(jwtKey) || jwtKey.Length < 32)
    throw new InvalidOperationException("Jwt:Key não configurada ou muito curta (mínimo 32 caracteres). Defina via ENV Jwt__Key.");

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = jwtIssuer,
            ValidateAudience = true,
            ValidAudience = jwtAudience,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)),
            ValidateLifetime = true,
            ClockSkew = TimeSpan.Zero,
        };
    });

builder.Services.AddAuthorization();

builder.Services.AddRateLimiter(options =>
{
    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;

    options.AddPolicy("auth", context =>
        RateLimitPartition.GetFixedWindowLimiter(
            context.Connection.RemoteIpAddress?.ToString() ?? "unknown",
            _ => new FixedWindowRateLimiterOptions
            {
                PermitLimit = 5,
                Window = TimeSpan.FromMinutes(1),
                QueueLimit = 0
            }));
});

var corsOrigins = (builder.Configuration["Cors:AllowedOrigins"] ?? "")
    .Split(';', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins(corsOrigins)
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        });
});

builder.Services.AddHttpClient();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.UseHsts();
}

app.UseHttpsRedirection();

app.UseCors("AllowFrontend");

app.UseRateLimiter();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// health check (usado pelo Render e por monitoramento)
app.MapGet("/health", () => Results.Ok(new { status = "ok" })).AllowAnonymous();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();

    // Aplica migrations em ambos os providers. O SQLite de desenvolvimento
    // antigo (criado por EnsureCreated) recebe um baseline automatico.
    await DatabaseInitializer.InitializeAsync(db, logger, allowLegacySqliteBaseline: useSqlite);

    logger.LogInformation("Banco conectado e migrations aplicadas com sucesso.");

    if (useSqlite && !db.Users.Any())
    {
        db.Users.Add(new DefesaCivil.Api.Models.User
        {
            Email = "admin@defesa.sc",
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("defesa123")
        });
        db.SaveChanges();
        logger.LogInformation("Usuário demo criado: admin@defesa.sc / defesa123");
    }
}

app.Run();

public partial class Program { }

