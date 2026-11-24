using System;
using System.ComponentModel.DataAnnotations;

namespace DefesaCivil.Api.DTOs.Viaturas
{
    public class CreateViaturaDto
    {
        [Required]
        [StringLength(20)]
        public string Prefixo { get; set; } = string.Empty;

        [Required]
        [StringLength(10)]
        public string Placa { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        public string Modelo { get; set; } = string.Empty;

        [Required]
        [StringLength(50)]
        public string Marca { get; set; } = string.Empty;

        [Range(1900, 2100)]
        public int Ano { get; set; }

        [Required]
        [StringLength(50)]
        public string Tipo { get; set; } = string.Empty;

        [Range(0, int.MaxValue)]
        public int KmAtual { get; set; }

        [Range(0, double.MaxValue)]
        public double CapacidadeCombustivel { get; set; }

        [Range(0, double.MaxValue)]
        public double NivelCombustivel { get; set; }

        public DateTime? UltimaManutencao { get; set; }
        public DateTime? ProximaManutencao { get; set; }

        [StringLength(200)]
        public string? LocalizacaoAtual { get; set; }

        [StringLength(100)]
        public string? Responsavel { get; set; }

        [StringLength(500)]
        public string? Observacoes { get; set; }
    }
}
