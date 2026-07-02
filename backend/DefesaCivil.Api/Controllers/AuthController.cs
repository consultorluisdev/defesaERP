using Microsoft.AspNetCore.Mvc;
using DefesaCivil.Api.Services;
using DefesaCivil.Api.Models;
using DefesaCivil.Api.Data;
using Microsoft.EntityFrameworkCore;
using DefesaCivil.Api.DTOs;

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
    public async Task<IActionResult> Login([FromBody] LoginDTO dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Email) || string.IsNullOrWhiteSpace(dto.PasswordHash))
            return BadRequest("Email e senha são obrigatórios");

        var user = await _context.Users
            .FirstOrDefaultAsync(x => x.Email == dto.Email);

        if (user == null || !BCrypt.Net.BCrypt.Verify(dto.PasswordHash, user.PasswordHash))
            return Unauthorized("Credenciais inválidas");

        var token = _tokenService.GenerateToken(user);

        return Ok(new { token });
    }
}
