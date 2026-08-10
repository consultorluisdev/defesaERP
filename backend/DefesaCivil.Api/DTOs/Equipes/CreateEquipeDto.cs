using System;
using System.ComponentModel.DataAnnotations;

namespace DefesaERP.DTOs
{
  public class CreateEquipeDto
  {
    [Required(ErrorMessage = "O nome da equipe é obrigátorio")]
    [StringLength(100, ErrorMessage = "O nome da equipe não pode ter mais de 100")]

    public string? Nome { get; set; }

    [StringLength(500, ErrorMessage  = "A descrição deve ter no maximo 500 caracteres.")]

    public  string? Descricao { get; set;}


    [Required(ErrorMessage = "O tipo da equipe é obrigátorio")]
    public string? Tipo { get; set; }

    [Required(ErrorMessage = "O Status da equipe é obrigátorio")]
    public string? Status { get; set; }

    [Required(ErrorMessage = "O Responsavel da equipe é obrigatório")]
    [StringLength(100, ErrorMessage = "O nome do responsavel não pode ter mais de 100")]
    public string? Responsavel { get; set; }

    [Required(ErrorMessage = "O Telefone da equipe é obrigátorio")]
    [StringLength(20, ErrorMessage = "O telefone não pode ter mais de 20 caracteres")]

    [Phone(ErrorMessage = "O telefone informado não é válido")]
    public string? Telefone { get; set; }

    [StringLength(100, ErrorMessage = "O email não pode ter mais de 100 caracteres")]
    [EmailAddress(ErrorMessage = "O email informado não é válido")]
    public string? Email { get; set; }

    [StringLength(100, ErrorMessage = "O municipio não pode ter mais de 100 caracteres")]
    public string? Municipio { get; set; }

    [StringLength(200, ErrorMessage = "O endereço não pode ter mais de 200 caracteres")]

    public string? Endereco { get; set; }

    [Required(ErrorMessage = "A quantidade de membros é obrigátoria")]
    [Range(1, int.MaxValue, ErrorMessage = "A quantidade de membros deve ser maior que zero.")]

    public int? QuantidadeMembros { get; set; }

    [StringLength(100, ErrorMessage = "A localização atual não pode ter mais de 100 caracteres")]
    public string? LocalizacaoAtual { get; set; }

    [StringLength(500, ErrorMessage = "As observações não podem ter mais de 500 caracteres")]
    public string? Observacoes { get; set; }

  }
}
