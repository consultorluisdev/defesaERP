namespace DefesaCivil.Api.Models;

public class User
{
    public int Id { get; set; }
    public string Email { get; set; } = string.Empty;

    public string PasswordHash { get; set; } = string.Empty;

    public string Role { get; set; } = "Usuario";

    public bool Ativo { get; set; } = true;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
