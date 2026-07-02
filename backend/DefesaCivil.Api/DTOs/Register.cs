namespace DefesaCivil.Api.DTOs;

public class RegisterDTO
{
    public string Email { get; set; } = null!;
    public string PasswordHash { get; set; } = null!;
}
