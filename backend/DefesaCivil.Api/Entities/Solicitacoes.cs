using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DefesaCivil.Api.Entities;

public enum TipoSolicitacao
{
    Informacao,
    Ocorrencia,
    Vistoria,
    Apoio,
    Denuncia,
    Outros
}

public enum StatusSolicitacao
{
    Aberta,
    EmAnalise,
    EmAtendimento,
    Concluida,
    Cancelada
}

public enum PrioridadeSolicitacao
{
    Baixa,
    Media,
    Alta,
    Urgente
}

[Table("Solicitacoes")]
public class Solicitacao
{
    [Key]
    public int Id { get; set; }

    [Required]
    [StringLength(20)]
    public string Protocolo { get; set; } = string.Empty;

    [Required]
    [StringLength(100)]
    public string Solicitante { get; set; } = string.Empty;

    [Required]
    [StringLength(20)]
    public string Telefone { get; set; } = string.Empty;

    [StringLength(150)]
    public string? Email { get; set; }

    [Required]
    public TipoSolicitacao Tipo { get; set; }

    [Required]
    [StringLength(500)]
    public string Descricao { get; set; } = string.Empty;

    [Required]
    [StringLength(200)]
    public string Endereco { get; set; } = string.Empty;

    [StringLength(50)]
    public string? Bairro { get; set; }

    [Required]
    [StringLength(100)]
    public string Municipio { get; set; } = string.Empty;

    [Required]
    public StatusSolicitacao Status { get; set; } = StatusSolicitacao.Aberta;

    [Required]
    public PrioridadeSolicitacao Prioridade { get; set; } = PrioridadeSolicitacao.Media;

    [StringLength(100)]
    public string? Responsavel { get; set; }

    [StringLength(500)]
    public string? Observacoes { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public DateTime? UpdatedAt { get; set; }
}
