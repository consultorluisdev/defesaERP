using System;
using DefesaCivil.Api.Entities;

namespace DefesaCivil.Api.DTOs.Solicitacoes
{
    public class SolicitacaoResponseDto
    {
        public int Id { get; set; }
        public string Protocolo { get; set; } = string.Empty;
        public string Solicitante { get; set; } = string.Empty;
        public string Telefone { get; set; } = string.Empty;
        public string? Email { get; set; }
        public TipoSolicitacao Tipo { get; set; }
        public string Descricao { get; set; } = string.Empty;
        public string Endereco { get; set; } = string.Empty;
        public string? Bairro { get; set; }
        public string Municipio { get; set; } = string.Empty;
        public StatusSolicitacao Status { get; set; }
        public PrioridadeSolicitacao Prioridade { get; set; }
        public string? Responsavel { get; set; }
        public string? Observacoes { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}
