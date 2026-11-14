using System.ComponentModel.DataAnnotations;
using DefesaCivil.Api.Entities;

namespace DefesaCivil.Api.DTOs.Risco;

public class CoordenadasDto
{
    public double? Latitude { get; set; }
    public double? Longitude { get; set; }
}

public class CreateRiscoDto
{
    [Required(ErrorMessage = "O nome é obrigatório.")]
    [StringLength(100)]
    public string Nome { get; set; } = string.Empty;

    [Required(ErrorMessage = "A descrição é obrigatória.")]
    [StringLength(500)]
    public string Descricao { get; set; } = string.Empty;

    public TipoRisco Tipo { get; set; }

    public NivelRisco Nivel { get; set; } = NivelRisco.Baixo;

    public StatusRisco Status { get; set; } = StatusRisco.Monitorado;

    [Required(ErrorMessage = "O município é obrigatório.")]
    [StringLength(100)]
    public string Municipio { get; set; } = string.Empty;

    [StringLength(50)]
    public string Bairro { get; set; } = string.Empty;

    [StringLength(200)]
    public string Endereco { get; set; } = string.Empty;

    public CoordenadasDto? Coordenadas { get; set; }

    [Range(0, int.MaxValue, ErrorMessage = "A população afetada é inválida.")]
    public int PopulacaoAfetada { get; set; }

    [StringLength(100)]
    public string? Responsavel { get; set; }

    [StringLength(500)]
    public string? Observacoes { get; set; }
}

public class UpdateRiscoDto
{
    [StringLength(100)]
    public string? Nome { get; set; }

    [StringLength(500)]
    public string? Descricao { get; set; }

    public TipoRisco? Tipo { get; set; }

    public NivelRisco? Nivel { get; set; }

    public StatusRisco? Status { get; set; }

    [StringLength(100)]
    public string? Municipio { get; set; }

    [StringLength(50)]
    public string? Bairro { get; set; }

    [StringLength(200)]
    public string? Endereco { get; set; }

    public CoordenadasDto? Coordenadas { get; set; }

    [Range(0, int.MaxValue, ErrorMessage = "A população afetada é inválida.")]
    public int? PopulacaoAfetada { get; set; }

    [StringLength(100)]
    public string? Responsavel { get; set; }

    [StringLength(500)]
    public string? Observacoes { get; set; }
}

public class RiscoResponseDto
{
    public int Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public string Descricao { get; set; } = string.Empty;
    public string Tipo { get; set; } = string.Empty;
    public string Nivel { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public string Municipio { get; set; } = string.Empty;
    public string Bairro { get; set; } = string.Empty;
    public string Endereco { get; set; } = string.Empty;
    public CoordenadasDto? Coordenadas { get; set; }
    public int PopulacaoAfetada { get; set; }
    public string? Responsavel { get; set; }
    public string? Observacoes { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }

    public static RiscoResponseDto FromEntity(Entities.Risco risco) => new()
    {
        Id = risco.Id,
        Nome = risco.Nome,
        Descricao = risco.Descricao,
        Tipo = risco.Tipo.ToString(),
        Nivel = risco.Nivel.ToString(),
        Status = risco.Status.ToString(),
        Municipio = risco.Municipio,
        Bairro = risco.Bairro,
        Endereco = risco.Endereco,
        Coordenadas = risco.Latitude.HasValue || risco.Longitude.HasValue
            ? new CoordenadasDto { Latitude = risco.Latitude, Longitude = risco.Longitude }
            : null,
        PopulacaoAfetada = risco.PopulacaoAfetada,
        Responsavel = risco.Responsavel,
        Observacoes = risco.Observacoes,
        CreatedAt = risco.CreatedAt,
        UpdatedAt = risco.UpdatedAt
    };
}
