using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using DefesaCivil.Api.Services;
using DefesaCivil.Api.Models;
using DefesaCivil.Api.Data;
using Microsoft.EntityFrameworkCore;
using DefesaCivil.Api.DTOs;
using System.Security.Claims;

namespace DefesaCivil.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private const string DefaultRole = "Usuario";

    private readonly AppDbContext _context;
    private readonly TokenService _tokenService;

    public AuthController(AppDbContext context, TokenService tokenService)
    {
        _context = context;
        _tokenService = tokenService;
    }

    [HttpPost("register")]
    [EnableRateLimiting("auth")]
    public async Task<IActionResult> Register([FromBody] RegisterDTO dto)
    {
        if (!ModelState.IsValid)
            return ValidationProblem(ModelState);

        var email = NormalizeEmail(dto.Email);

        if (await _context.Users.AnyAsync(x => x.Email == email))
            return Conflict(new { message = "E-mail já registrado." });

        var user = new User
        {
            Email = email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.PasswordHash),
            Role = DefaultRole,
            Ativo = true,
            CreatedAt = DateTime.UtcNow,
        };

        _context.Users.Add(user);

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateException)
        {
            return Conflict(new { message = "E-mail já registrado." });
        }

        return Ok();
    }

    [HttpPost("login")]
    [EnableRateLimiting("auth")]
    public async Task<IActionResult> Login([FromBody] LoginDTO dto)
    {
        if (!ModelState.IsValid)
            return ValidationProblem(ModelState);

        var email = NormalizeEmail(dto.Email);

        var user = await _context.Users
            .FirstOrDefaultAsync(x => x.Email == email);

        if (user == null || !BCrypt.Net.BCrypt.Verify(dto.PasswordHash, user.PasswordHash))
            return Unauthorized(new { message = "Credenciais inválidas." });

        if (!user.Ativo)
            return Unauthorized(new { message = "Usuário inativo." });

        var token = _tokenService.GenerateAccessToken(user);
        var refreshToken = _tokenService.GenerateRefreshToken(user);

        return Ok(new { token, refreshToken });
    }

    [HttpPost("refresh")]
    [EnableRateLimiting("auth")]
    public async Task<IActionResult> Refresh([FromBody] RefreshDTO dto)
    {
        if (!ModelState.IsValid)
            return ValidationProblem(ModelState);

        var principal = _tokenService.ValidateToken(dto.RefreshToken);

        if (principal == null)
            return Unauthorized(new { message = "Refresh token inválido ou expirado." });

        if (principal.FindFirst("token_type")?.Value != "refresh")
            return Unauthorized(new { message = "Token inválido." });

        var userId = principal.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userId == null || !int.TryParse(userId, out var id))
            return Unauthorized(new { message = "Token inválido." });

        var user = await _context.Users.FindAsync(id);
        if (user == null || !user.Ativo)
            return Unauthorized(new { message = "Usuário não encontrado ou inativo." });

        var token = _tokenService.GenerateAccessToken(user);
        var refreshToken = _tokenService.GenerateRefreshToken(user);

        return Ok(new { token, refreshToken });
    }

    private static string NormalizeEmail(string email) => email.Trim().ToLowerInvariant();
}
