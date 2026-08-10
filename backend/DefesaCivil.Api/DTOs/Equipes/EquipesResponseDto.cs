using System;
using DefesaERP.Entities;


namespace DefesaERP.DTOs
{
  public class EquipesResponseDto
  {
    public int Id { get; set; }
    public string? Nome { get; set; }
    public string? Descricao { get; set; }
    public string? Tipo { get; set; }
    public string? Status { get; set; }
    public string? Responsavel { get; set; }
    public string? Telefone { get; set; }
    public string? Email { get; set; }
    public string? Municipio { get; set; }
    public string? Endereco { get; set; }
    public int? QuantidadeMembros { get; set; }
    public bool Disponivel { get; set; }
    public string? LocalizacaoAtual { get; set; }
    public string? Observacoes { get; set; }
    public DateTime? CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }

    public static EquipesResponseDto FromEntity(Equipe equipe)
    {
      return new EquipesResponseDto
      {
        Id = equipe.Id,
        Nome = equipe.Nome,
        Descricao = equipe.Descricao,
        Tipo = equipe.Tipo,
        Status = equipe.Status,
        Responsavel = equipe.Responsavel,
        Telefone = equipe.Telefone,
        Email = equipe.Email,
        Municipio = equipe.Municipio,
        Endereco = equipe.Endereco,
        QuantidadeMembros = equipe.QuantidadeMembros,
        Disponivel = equipe.Status == StatusEquipe.Disponivel.ToString(),
        LocalizacaoAtual = equipe.LocalizacaoAtual,
        Observacoes = equipe.Observacoes,
        CreatedAt = equipe.CreatedAt,
        UpdatedAt = equipe.UpdatedAt
      };
    }
  }
}
