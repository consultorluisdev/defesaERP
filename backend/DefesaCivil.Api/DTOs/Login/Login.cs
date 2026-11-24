namespace DefesaCivil.Api.DTOs;

public class LoginDTO
{
    public string Email { get; set; } = null!;
    public string? PasswordHash { get; set; }
    public string? Password { get; set; }
}

public class RefreshDTO
{
    public string RefreshToken { get; set; } = null!;
}
