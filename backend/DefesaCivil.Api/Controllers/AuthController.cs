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
        if (string.IsNullOrWhiteSpace(dto.Email) || string.IsNullOrWhiteSpace(dto.PasswordHash))
            return BadRequest("Email e senha são obrigatórios");

        if (dto.PasswordHash.Length < 6)
            return BadRequest("A senha deve ter no mínimo 6 caracteres");

        if (await _context.Users.AnyAsync(x => x.Email == dto.Email))
            return BadRequest("Email já registrado");

        var user = new User
        {
            Email = dto.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.PasswordHash),
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return Ok();
    }

    [HttpPost("login")]
    [EnableRateLimiting("auth")]
    public async Task<IActionResult> Login([FromBody] LoginDTO dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Email) || string.IsNullOrWhiteSpace(dto.PasswordHash))
            return BadRequest("Email e senha são obrigatórios");

        var user = await _context.Users
            .FirstOrDefaultAsync(x => x.Email == dto.Email);

        if (user == null || !BCrypt.Net.BCrypt.Verify(dto.PasswordHash, user.PasswordHash))
            return Unauthorized("Credenciais inválidas");

        var token = _tokenService.GenerateAccessToken(user);
        var refreshToken = _tokenService.GenerateRefreshToken(user);

        return Ok(new { token, refreshToken });
    }

    [HttpPost("refresh")]
    [EnableRateLimiting("auth")]
    public async Task<IActionResult> Refresh([FromBody] RefreshDTO dto)
    {
        if (string.IsNullOrWhiteSpace(dto.RefreshToken))
            return BadRequest("Refresh token é obrigatório");

        var principal = _tokenService.ValidateToken(dto.RefreshToken);

        if (principal == null)
            return Unauthorized("Refresh token inválido ou expirado");

        if (principal.FindFirst("token_type")?.Value != "refresh")
            return Unauthorized("Token inválido");

        var userId = principal.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userId == null || !int.TryParse(userId, out var id))
            return Unauthorized("Token inválido");

        var user = await _context.Users.FindAsync(id);
        if (user == null)
            return Unauthorized("Usuário não encontrado");

        var token = _tokenService.GenerateAccessToken(user);
        var refreshToken = _tokenService.GenerateRefreshToken(user);

        return Ok(new { token, refreshToken });
    }
}
