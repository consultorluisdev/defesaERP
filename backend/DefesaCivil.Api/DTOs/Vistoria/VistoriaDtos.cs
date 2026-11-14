using System.ComponentModel.DataAnnotations;
using DefesaCivil.Api.Entities;

namespace DefesaCivil.Api.DTOs.Vistoria;

public class CreateVistoriaDto : IValidatableObject
{
    [Required(ErrorMessage = "O solicitante é obrigatório.")]
    [StringLength(100)]
    public string Solicitante { get; set; } = string.Empty;

    [Required(ErrorMessage = "O telefone é obrigatório.")]
    [StringLength(20)]
    public string Telefone { get; set; } = string.Empty;

    public TipoVistoria Tipo { get; set; }

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

    public PrioridadeVistoria Prioridade { get; set; } = PrioridadeVistoria.Media;

    [StringLength(100)]
    public string? Responsavel { get; set; }

    [StringLength(500)]
    public string? Observacoes { get; set; }

    public DateTime? DataAgendamento { get; set; }

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        if (DataAgendamento.HasValue && DataAgendamento.Value == default)
        {
            yield return new ValidationResult(
                "A data de agendamento é inválida.",
                new[] { nameof(DataAgendamento) });
        }
    }
}

public class UpdateVistoriaDto
{
    [StringLength(100)]
    public string? Solicitante { get; set; }

    [StringLength(20)]
    public string? Telefone { get; set; }

    public TipoVistoria? Tipo { get; set; }

    [StringLength(500)]
    public string? Descricao { get; set; }

    [StringLength(200)]
    public string? Endereco { get; set; }

    [StringLength(50)]
    public string? Bairro { get; set; }

    [StringLength(100)]
    public string? Municipio { get; set; }

    public StatusVistoria? Status { get; set; }

    public PrioridadeVistoria? Prioridade { get; set; }

    [StringLength(100)]
    public string? Responsavel { get; set; }

    [StringLength(500)]
    public string? Observacoes { get; set; }

    public DateTime? DataAgendamento { get; set; }

    public DateTime? DataRealizacao { get; set; }
}

public class VistoriaResponseDto
{
    public int Id { get; set; }
    public string Protocolo { get; set; } = string.Empty;
    public string Solicitante { get; set; } = string.Empty;
    public string Telefone { get; set; } = string.Empty;
    public string Tipo { get; set; } = string.Empty;
    public string Descricao { get; set; } = string.Empty;
    public string Endereco { get; set; } = string.Empty;
    public string? Bairro { get; set; }
    public string Municipio { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public string Prioridade { get; set; } = string.Empty;
    public string? Responsavel { get; set; }
    public string? Observacoes { get; set; }
    public DateTime? DataAgendamento { get; set; }
    public DateTime? DataRealizacao { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }

    public static VistoriaResponseDto FromEntity(DefesaCivil.Api.Entities.Vistoria vistoria) => new()
    {
        Id = vistoria.Id,
        Protocolo = vistoria.Protocolo,
        Solicitante = vistoria.Solicitante,
        Telefone = vistoria.Telefone,
        Tipo = vistoria.Tipo.ToString(),
        Descricao = vistoria.Descricao,
        Endereco = vistoria.Endereco,
        Bairro = vistoria.Bairro,
        Municipio = vistoria.Municipio,
        Status = vistoria.Status.ToString(),
        Prioridade = vistoria.Prioridade.ToString(),
        Responsavel = vistoria.Responsavel,
        Observacoes = vistoria.Observacoes,
        DataAgendamento = vistoria.DataAgendamento,
        DataRealizacao = vistoria.DataRealizacao,
        CreatedAt = vistoria.CreatedAt,
        UpdatedAt = vistoria.UpdatedAt
    };
}
