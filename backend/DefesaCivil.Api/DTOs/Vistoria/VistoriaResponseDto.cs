using System;

namespace DefesaCivil.Api.DTOs.Vistorias
{
    public class VistoriaResponseDto
    {
        public int Id { get; set; }
        public string Protocolo { get; set; } = string.Empty;
        public string TipoVistoria { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public string Prioridade { get; set; } = string.Empty;

        public int? OcorrenciaId { get; set; }
        public int? SolicitacaoId { get; set; }
        public int? EquipeId { get; set; }

        public string Endereco { get; set; } = string.Empty;
        public string Bairro { get; set; } = string.Empty;
        public string Cidade { get; set; } = string.Empty;
        public string? Latitude { get; set; }
        public string? Longitude { get; set; }

        public string? Descricao { get; set; }
        public string? Parecer { get; set; }
        public string? NivelRisco { get; set; }
        public string? Recomendacoes { get; set; }

        public DateTime DataAgendamento { get; set; }
        public DateTime? DataInicio { get; set; }
        public DateTime? DataConclusao { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        public string? Responsavel { get; set; }
        public string? Observacoes { get; set; }
    }
}
