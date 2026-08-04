using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace DefesaERP.Entities
{
  public enum TipoEquipe
  {
    BuscaESalvamento,
    Atendimento,
    Vistoria,
    Logistica,
    Resgate,
    Operacoes,
    Voluntarios,
    Administrativa

  }
  public enum StatusEquipe
  {
    Disponivel,
    EmAtendimento,
    EmDeslocamento,
    EmApoio,
    Indisponivel
  }
  [Table("equipes")]
  public class Equipe
  {
    [Key]
    [Column("id")]
    public int Id { get; set;}

    [Column("nome")]
    [StringLength(100)]
    [Required]
    public string? Nome { get; set; }

    [Column("descricao")]
    [StringLength(500)]
    public string? Descricao { get; set; }

    [Column("tipo")]
    [Required]
    public string? Tipo { get; set; }

    [Column("status")]
    [Required]
    public string? Status { get; set; }

    [Column("responsavel")]
    [StringLength(100)]
    [Required]
    public string? Responsavel { get; set; }

    [Column("telefone")]
    [StringLength(20)]
    [Required]
    public string? Telefone { get; set; }

    [Column("email")]
    [StringLength(100)]
    public string? Email { get; set; }

    [Column("municipio")]
    [StringLength(100)]
    public string? Municipio { get; set; }

    [Column("endereco")]
    [StringLength(200)]
    public string? Endereco { get; set; }

    [Column("quantidade_membros")]
    [Required]
    public int QuantidadeMembros { get; set; }

    [Column("disponivel")]
    [Required]
    public string? Disponivel { get; set; }

    [Column("observacoes")]
    [StringLength(500)]
    public string? Observacoes { get; set; }

    [Column("created_at")]
    [StringLength(500)]
    public string? CreatedAt { get; set; }

    [Column("updated_at")]
    public string? UpdatedAt { get; set; }

  }
}
