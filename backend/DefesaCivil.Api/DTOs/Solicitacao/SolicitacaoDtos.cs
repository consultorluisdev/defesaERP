using System.ComponentModel.DataAnnotations;
using DefesaCivil.Api.Entities;

namespace DefesaCivil.Api.DTOs.Solicitacao;

public class CreateSolicitacaoDto
{
    [Required(ErrorMessage = "O solicitante é obrigatório.")]
    [StringLength(100)]
    public string Solicitante { get; set; } = string.Empty;

    [Required(ErrorMessage = "O telefone é obrigatório.")]
    [StringLength(20)]
    public string Telefone { get; set; } = string.Empty;

    [EmailAddress(ErrorMessage = "E-mail inválido.")]
    [StringLength(150)]
    public string? Email { get; set; }

    public TipoSolicitacao Tipo { get; set; }

    [Required(ErrorMessage = "A descrição é obrigatória.")]
    [StringLength(500)]
    public string Descricao { get; set; } = string.Empty;

    [Required(ErrorMessage = "O endereço é obrigatório.")]
    [StringLength(200)]
    public string Endereco { get; set; } = string.Empty;

    [StringLength(50)]
    public string? Bairro { get; set; }

    [Required(ErrorMessage = "O município é obrigatório.")]
    [StringLength(100)]
    public string Municipio { get; set; } = string.Empty;

    public PrioridadeSolicitacao Prioridade { get; set; } = PrioridadeSolicitacao.Media;

    [StringLength(500)]
    public string? Observacoes { get; set; }
}

public class UpdateSolicitacaoDto
{
    [StringLength(100)]
    public string? Solicitante { get; set; }

    [StringLength(20)]
    public string? Telefone { get; set; }

    [EmailAddress(ErrorMessage = "E-mail inválido.")]
    [StringLength(150)]
    public string? Email { get; set; }

    public TipoSolicitacao? Tipo { get; set; }

    [StringLength(500)]
    public string? Descricao { get; set; }

    [StringLength(200)]
    public string? Endereco { get; set; }

    [StringLength(50)]
    public string? Bairro { get; set; }

    [StringLength(100)]
    public string? Municipio { get; set; }

    public StatusSolicitacao? Status { get; set; }

    public PrioridadeSolicitacao? Prioridade { get; set; }

    [StringLength(100)]
    public string? Responsavel { get; set; }

    [StringLength(500)]
    public string? Observacoes { get; set; }
}

public class SolicitacaoResponseDto
{
    public int Id { get; set; }
    public string Protocolo { get; set; } = string.Empty;
    public string Solicitante { get; set; } = string.Empty;
    public string Telefone { get; set; } = string.Empty;
    public string? Email { get; set; }
    public string Tipo { get; set; } = string.Empty;
    public string Descricao { get; set; } = string.Empty;
    public string Endereco { get; set; } = string.Empty;
    public string? Bairro { get; set; }
    public string Municipio { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public string Prioridade { get; set; } = string.Empty;
    public string? Responsavel { get; set; }
    public string? Observacoes { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }

    public static SolicitacaoResponseDto FromEntity(Entities.Solicitacao solicitacao) => new()
    {
        Id = solicitacao.Id,
        Protocolo = solicitacao.Protocolo,
        Solicitante = solicitacao.Solicitante,
        Telefone = solicitacao.Telefone,
        Email = solicitacao.Email,
        Tipo = solicitacao.Tipo.ToString(),
        Descricao = solicitacao.Descricao,
        Endereco = solicitacao.Endereco,
        Bairro = solicitacao.Bairro,
        Municipio = solicitacao.Municipio,
        Status = solicitacao.Status.ToString(),
        Prioridade = solicitacao.Prioridade.ToString(),
        Responsavel = solicitacao.Responsavel,
        Observacoes = solicitacao.Observacoes,
        CreatedAt = solicitacao.CreatedAt,
        UpdatedAt = solicitacao.UpdatedAt
    };
}
