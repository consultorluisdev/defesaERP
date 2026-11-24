using System;
using System.ComponentModel.DataAnnotations;

namespace DefesaCivil.Api.DTOs.Vistorias
{
    /// <summary>
    /// DTO de update parcial. Todos os campos são opcionais.
    /// </summary>
    public class UpdateVistoriaDto
    {
        [StringLength(50)]
        public string? TipoVistoria { get; set; }

        [StringLength(30)]
        public string? Status { get; set; }

        [StringLength(20)]
        public string? Prioridade { get; set; }

        public int? OcorrenciaId { get; set; }
        public int? SolicitacaoId { get; set; }
        public int? EquipeId { get; set; }

        [StringLength(200)]
        public string? Endereco { get; set; }

        [StringLength(50)]
        public string? Bairro { get; set; }

        [StringLength(100)]
        public string? Cidade { get; set; }

        [StringLength(20)]
        public string? Latitude { get; set; }

        [StringLength(20)]
        public string? Longitude { get; set; }

        [StringLength(500)]
        public string? Descricao { get; set; }

        [StringLength(1000)]
        public string? Parecer { get; set; }

        [StringLength(20)]
        public string? NivelRisco { get; set; }

        [StringLength(1000)]
        public string? Recomendacoes { get; set; }

        public DateTime? DataAgendamento { get; set; }
        public DateTime? DataInicio { get; set; }
        public DateTime? DataConclusao { get; set; }

        [StringLength(100)]
        public string? Responsavel { get; set; }

        [StringLength(500)]
        public string? Observacoes { get; set; }
    }
}
