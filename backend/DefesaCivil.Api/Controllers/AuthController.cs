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
    public async Task<IActionResult> Register(User dto)
    {
        if (await _context.Users.AnyAsync(x => x.Email == dto.Email))
            return BadRequest("Email já registrado");

        dto.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.PasswordHash);

        _context.Users.Add(dto);
        await _context.SaveChangesAsync();

        return Ok();
    }
    [HttpPost("login")]
    public async Task<IActionResult> Login(User dto)        
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(x => x.Email == dto.Email);

        if (user == null || !BCrypt.Net.BCrypt.Verify(dto.PasswordHash, user.PasswordHash))
            return Unauthorized("credenciais invalidas");

        var token = _tokenService.GenerateToken(user);

        return Ok(new { token });
    }
}