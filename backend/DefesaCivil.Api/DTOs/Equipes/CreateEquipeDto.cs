using System;
using System.ComponentModel.DataAnnotations;

namespace DefesaERP.DTOs
{
  public class CreateEquipeDto
  {
    [Required]
    [StringLength(100)]
    public string Nome { get; set; }

    [StringLength(500)]
    public string? Descricao { get; set; }

    [Required]
    
  }
}
