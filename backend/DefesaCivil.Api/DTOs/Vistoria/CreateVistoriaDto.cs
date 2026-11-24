using System;
using System.ComponentModel.DataAnnotations;

namespace DefesaCivil.Api.DTOs.Vistorias
{
    public class CreateVistoriaDto
    {
        [Required]
        [StringLength(50)]
        public string TipoVistoria { get; set; } = string.Empty;

        [StringLength(20)]
        public string Prioridade { get; set; } = "Média";

        public int? OcorrenciaId { get; set; }
        public int? SolicitacaoId { get; set; }
        public int? EquipeId { get; set; }

        [Required]
        [StringLength(200)]
        public string Endereco { get; set; } = string.Empty;

        [StringLength(50)]
        public string Bairro { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        public string Cidade { get; set; } = string.Empty;

        [StringLength(20)]
        public string? Latitude { get; set; }

        [StringLength(20)]
        public string? Longitude { get; set; }

        [StringLength(500)]
        public string? Descricao { get; set; }

        [Required]
        public DateTime DataAgendamento { get; set; }

        [StringLength(100)]
        public string? Responsavel { get; set; }

        [StringLength(500)]
        public string? Observacoes { get; set; }
    }
}
