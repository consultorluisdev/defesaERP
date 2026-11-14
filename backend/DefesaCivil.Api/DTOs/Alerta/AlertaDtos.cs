using System;
using System.ComponentModel.DataAnnotations;
using DefesaCivil.Api.Entities;

namespace DefesaCivil.Api.DTOs
{
  public class CreatedAlertaDto
  {
    [Required]
    [StringLength(150)]
    public string Titulo { get; set; } = string.Empty;

    [Required]
    [StringLength(1000)]
    public string Descricao { get; set; } = string.Empty;

    public TipoAlerta Tipo { get; set; }

    public NivelAlerta Nivel { get; set; }

    [Required]
    [StringLength(100)]
    public string Cidade { get; set; } = string.Empty;

    [Range(-90, 90)]
    public double? Latitude { get; set; }

    [Range(-180, 180)]
    public double? Longitude { get; set; }

    public DateTime? DataInicio { get; set; }

    [StringLength(100)]
    public string? Responsavel { get; set; }

    [StringLength(1000)]
    public string? Observacoes { get; set; }
  }

  public class UpdateAlertaDto
  {
    [StringLength(150)]
    public string? Titulo { get; set; }

    [StringLength(1000)]
    public string? Descricao { get; set; }

    public TipoAlerta? Tipo { get; set; }

    public NivelAlerta? Nivel { get; set; }

    public StatusAlerta? Status { get; set; }

    [StringLength(100)]
    public string? Cidade { get; set; }

    [Range(-90, 90)]
    public double? Latitude { get; set; }

    [Range(-180, 180)]
    public double? Longitude { get; set; }

    public DateTime? DataInicio { get; set; }

    public DateTime? DataFim { get; set; }

    [StringLength(100)]
    public string? Responsavel { get; set; }

    [StringLength(1000)]
    public string? Observacoes { get; set; }
  }

  public class AlertaResponseDto
  {
    public int Id { get; set; }
    public string Titulo { get; set; } = string.Empty;
    public string Descricao { get; set; } = string.Empty;

    public string Tipo { get; set; } = string.Empty;
    public string Nivel { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public string Cidade { get; set; } = string.Empty;

    public double? Latitude { get; set; }
    public double? Longitude { get; set; }
    public DateTime DataInicio { get; set; }
    public DateTime? DataFim { get; set; }

    public string? Responsavel { get; set; }

    public string? Observacoes { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public static AlertaResponseDto FromEntity(Alerta a) => new()
    {
      Id = a.Id,
      Titulo = a.Titulo,
      Descricao = a.Descricao,
      Tipo = a.Tipo.ToString(),
      Nivel = a.Nivel.ToString(),
      Status = a.Status.ToString(),
      Cidade = a.Cidade,
      Latitude = a.Latitude,
      Longitude = a.Longitude,
      DataInicio = a.DataInicio,
      DataFim = a.DataFim,
      Responsavel = a.Responsavel,
      Observacoes = a.Observacoes,
      CreatedAt = a.CreatedAt,
      UpdatedAt = a.UpdatedAt,

    };
  }
}
