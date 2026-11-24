using System.ComponentModel.DataAnnotations;

namespace DefesaERP.DTOs
{
  public class UpdateEquipeDto
  {
    [StringLength(100, ErrorMessage = "Nome deve ter no máximo 100 caracteres")]

    public string? Nome { get; set;}

    [StringLength(500, ErrorMessage = "Descrição deve ter no maximo 500 caracteres")]

    public string? Descricao { get; set;}

    public string? Tipo { get; set;}

    public string? Status { get; set; }

    [StringLength(100, ErrorMessage = "Responsavel deve ter no máximo 100 caracteres")]
    public string? Responsavel { get; set; }

    [StringLength(20, ErrorMessage = "Telefone deve ter no máximo 20 caracteres")]
    [Phone(ErrorMessage = "Telefone informado não é válido")]
    public string? Telefone { get; set; }

    [StringLength(100, ErrorMessage = "Email deve ter no máximo 100 caracteres")]
    [EmailAddress(ErrorMessage = "Email informado não é válido")]
    public string? Email { get; set; }

    [StringLength(100, ErrorMessage = "Municipio deve ter no máximo 100 caracteres")]
    public string? Municipio { get; set; }

    [StringLength(200, ErrorMessage = "Endereco deve ter no máximo 200 caracteres")]
    public string? Endereco { get; set; }

    [Range(1, int.MaxValue, ErrorMessage = "Quantidade de membros deve ser maior que zero")]
    public int? QuantidadeMembros { get; set; }

    [StringLength(100, ErrorMessage = "Localizacao atual deve ter no máximo 100 caracteres")]
    public string? LocalizacaoAtual { get; set; }

    [StringLength(500, ErrorMessage = "Observacoes deve ter no máximo 500 caracteres")]
    public string? Observacoes { get; set; }
    
  }
}
