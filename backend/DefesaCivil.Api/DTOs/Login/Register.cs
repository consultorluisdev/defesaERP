using System.ComponentModel.DataAnnotations;

namespace DefesaCivil.Api.DTOs;

public class RegisterDTO
{
    [Required]
    [EmailAddress]
    [StringLength(256)]
    public string Email { get; set; } = null!;

    [Required]
    [StringLength(100, MinimumLength = 6)]
    public string PasswordHash { get; set; } = null!;
}
