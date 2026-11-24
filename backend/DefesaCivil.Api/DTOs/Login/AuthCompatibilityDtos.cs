namespace DefesaCivil.Api.DTOs.Login;

public class LoginDto
{
    public string Email { get; set; } = null!;
    public string Password { get; set; } = null!;
}

public class RegisterDto
{
    public string Email { get; set; } = null!;
    public string Password { get; set; } = null!;
}

public class LoginResponseDto
{
    public string Token { get; set; } = null!;
    public string RefreshToken { get; set; } = null!;
}
