using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using DefesaCivil.Api.Models;

namespace DefesaCivil.Api.Services;

public class TokenService
{
    private const string AccessTokenTypeClaim = "token_type";
    private const string AccessTokenTypeValue = "access";
    private const string RefreshTokenTypeValue = "refresh";

    private readonly IConfiguration _configuration;

    public TokenService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public string GenerateAccessToken(User user)
    {
        var claims = new[]
        {
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(AccessTokenTypeClaim, AccessTokenTypeValue),
        };

        var expireMinutes = int.Parse(_configuration["Jwt:AccessTokenMinutes"] ?? "30");
        return GenerateToken(user, claims, expireMinutes);
    }

    public string GenerateRefreshToken(User user)
    {
        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(AccessTokenTypeClaim, RefreshTokenTypeValue),
        };

        var expireDays = int.Parse(_configuration["Jwt:RefreshTokenDays"] ?? "7");
        return GenerateToken(user, claims, expireDays * 24 * 60);
    }

    public ClaimsPrincipal? ValidateToken(string token)
    {
        var jwtKey = _configuration["Jwt:Key"] ??
            throw new InvalidOperationException("Jwt:Key não configurada.");
        var jwtIssuer = _configuration["Jwt:Issuer"] ?? "DefesaCivilApi";
        var jwtAudience = _configuration["Jwt:Audience"] ?? "DefesaCivilApiUsers";

        var tokenValidationParameters = new TokenValidationParameters
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

        try
        {
            return new JwtSecurityTokenHandler().ValidateToken(token, tokenValidationParameters, out _);
        }
        catch
        {
            return null;
        }
    }

    private string GenerateToken(User user, Claim[] claims, int expireMinutes)
    {
        var jwtKey = _configuration["Jwt:Key"] ??
            throw new InvalidOperationException("Jwt:Key não configurada.");
        var jwtIssuer = _configuration["Jwt:Issuer"] ?? "DefesaCivilApi";
        var jwtAudience = _configuration["Jwt:Audience"] ?? "DefesaCivilApiUsers";

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: jwtIssuer,
            audience: jwtAudience,
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(expireMinutes),
            signingCredentials: creds
        );
        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
