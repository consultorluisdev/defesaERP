using System.ComponentModel.DataAnnotations;

namespace DefesaCivil.Api.DTOs.Abrigos
{
    public class CreateAbrigoDto
    {
        [Required]
        [StringLength(100)]
        public string Nome { get; set; } = string.Empty;

        public bool Disponivel { get; set; } = true;

        [Range(1, 10000)]
        public int Capacidade { get; set; }
    }
}
