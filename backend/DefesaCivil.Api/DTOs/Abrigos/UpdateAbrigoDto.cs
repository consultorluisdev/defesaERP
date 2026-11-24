using System.ComponentModel.DataAnnotations;

namespace DefesaCivil.Api.DTOs.Abrigos
{
    public class UpdateAbrigoDto
    {
        [StringLength(100)]
        public string? Nome { get; set; }

        public bool? Disponivel { get; set; }

        [Range(1, 10000)]
        public int? Capacidade { get; set; }
    }
}
