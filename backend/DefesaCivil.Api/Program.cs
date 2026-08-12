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
if (string.IsNullOrWhiteSpace(connectionString))
    throw new InvalidOperationException("Connection string 'Default' não configurada. Defina em appsettings ou ConnectionStrings__Default (ENV).");

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString));

builder.Services.AddScoped<TokenService>();
builder.Services.AddScoped<IDashboardService, DashboardService>();
builder.Services.AddScoped<OcorrenciaService>();
builder.Services.AddScoped<AlertaService>();
builder.Services.AddScoped<EquipeService>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var jwtKey = builder.Configuration["Jwt:Key"];
var jwtIssuer = builder.Configuration["Jwt:Issuer"] ?? "DefesaCivilApi";
var jwtAudience = builder.Configuration["Jwt:Audience"] ?? "DefesaCivilApiUsers";

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

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

    for (int i = 0; i < 10; i++)
    {
        try
        {
            db.Database.EnsureCreated();
            Console.WriteLine("Banco conectado com sucesso.");
            break;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Tentativa {i + 1}: {ex.Message}");
            Thread.Sleep(3000);
        }
    }
}

app.Run();
