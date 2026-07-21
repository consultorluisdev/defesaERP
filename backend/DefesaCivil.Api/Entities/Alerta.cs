using System;

namespace DefesaCivil.Api.Entities
{
  public class Alerta
  {
    public int Id {get; set;}
    public string Titulo { get; set; } = string.Empty;

    public string Descricao { get; set; } = string.Empty;
    public TipoAlerta Tipo { get; set;}

    public NivelAlerta Nivel { get; set;}

    public StatusAlerta  Status { get; set;} = StatusAlerta.Ativo;

    public string Cidade { get; set; } = string.Empty;

    public double? Latitude { get; set; }
    public double? Longitude { get; set; }

    public DateTime DataInicio { get; set; } = DateTime.UtcNow;
    public DateTime? DataFim { get; set; }

    public string? Responsavel { get; set; }
    public string? Observacoes { get; set; }

    public DateTime CreatedAt { get; set;} = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set;}
  }

  public enum TipoAlerta
    {
      ChuvaIntensa,
      Enchente,
      Enxurada,
      Deslizamento,
      Vendaval,
      Microexplosao,
      Granizo,
      Incendio,
      Outros
    }
    public enum NivelAlerta
  {
    Baixo,
    Moderado,
    Alto,
    Critico
  }
  public enum StatusAlerta
  {
    Ativo,
    Monitorando,
    Encerrado,
    Cancelado
  }
}
