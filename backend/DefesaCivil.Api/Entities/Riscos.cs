using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DefesaCivil.Api.Entities;

public enum TipoRisco
{
    Inundacao,
    Enxurrada,
    Deslizamento,
    Erosao,
    Alagamento,
    Vendaval,
    Outro
}

public enum NivelRisco
{
    Baixo,
    Medio,
    Alto,
    MuitoAlto
}

public enum StatusRisco
{
    Monitorado,
    EmAlerta,
    Interditado,
    Controlado
}

[Table("Riscos")]
public class Risco
{
    [Key]
    public int Id { get; set; }

    [Required]
    [StringLength(100)]
    public string Nome { get; set; } = string.Empty;

    [Required]
    [StringLength(500)]
    public string Descricao { get; set; } = string.Empty;

    [Required]
    public TipoRisco Tipo { get; set; }

    [Required]
    public NivelRisco Nivel { get; set; }

    [Required]
    public StatusRisco Status { get; set; } = StatusRisco.Monitorado;

    [Required]
    [StringLength(100)]
    public string Municipio { get; set; } = string.Empty;

    [StringLength(50)]
    public string Bairro { get; set; } = string.Empty;

    [StringLength(200)]
    public string Endereco { get; set; } = string.Empty;

    public double? Latitude { get; set; }

    public double? Longitude { get; set; }

    [Range(0, int.MaxValue)]
    public int PopulacaoAfetada { get; set; }

    [StringLength(100)]
    public string? Responsavel { get; set; }

    [StringLength(500)]
    public string? Observacoes { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public DateTime? UpdatedAt { get; set; }
}
