using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using DefesaCivil.Api.Models;

namespace DefesaCivil.Api.Services;

public class TokenService
{
    public string GenerateToken(User user)
    {
        
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("DEFESA_CIVIL_SUPER_SECRETA_2026_123456"));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(ClaimTypes.Email, user.Email),
        };

        var token = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.Now.AddMinutes(30),
            signingCredentials: creds
        );
        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}   