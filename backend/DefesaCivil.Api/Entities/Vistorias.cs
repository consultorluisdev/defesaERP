using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DefesaCivil.Api.Entities;

public enum TipoVistoria
{
    Preventiva,
    Estrutural,
    AreaDeRisco,
    PosEvento,
    Denuncia,
    Outros
}

public enum StatusVistoria
{
    Agendada,
    EmAndamento,
    Concluida,
    Cancelada
}

public enum PrioridadeVistoria
{
    Baixa,
    Media,
    Alta,
    Urgente
}

[Table("Vistorias")]
public class Vistoria
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

    [Required]
    public TipoVistoria Tipo { get; set; }

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
    public StatusVistoria Status { get; set; } = StatusVistoria.Agendada;

    [Required]
    public PrioridadeVistoria Prioridade { get; set; } = PrioridadeVistoria.Media;

    [StringLength(100)]
    public string? Responsavel { get; set; }

    [StringLength(500)]
    public string? Observacoes { get; set; }

    public DateTime? DataAgendamento { get; set; }

    public DateTime? DataRealizacao { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public DateTime? UpdatedAt { get; set; }
}
