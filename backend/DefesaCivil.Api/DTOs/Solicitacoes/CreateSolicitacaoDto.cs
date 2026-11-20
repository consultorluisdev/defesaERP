using System.ComponentModel.DataAnnotations;
using DefesaCivil.Api.Entities;

namespace DefesaCivil.Api.DTOs.Solicitacoes
{
    public class CreateSolicitacaoDto
    {
        [Required(ErrorMessage = "O solicitante é obrigatório.")]
        [StringLength(100, ErrorMessage = "O solicitante deve ter no máximo 100 caracteres.")]
        public string Solicitante { get; set; } = string.Empty;

        [Required(ErrorMessage = "O telefone é obrigatório.")]
        [StringLength(20, ErrorMessage = "O telefone deve ter no máximo 20 caracteres.")]
        public string Telefone { get; set; } = string.Empty;

        [OptionalEmailAddress(ErrorMessage = "E-mail inválido.")]
        [StringLength(100, ErrorMessage = "O e-mail deve ter no máximo 100 caracteres.")]
        public string? Email { get; set; }

        [Required(ErrorMessage = "O tipo é obrigatório.")]
        [EnumDataType(typeof(TipoSolicitacao), ErrorMessage = "Tipo inválido.")]
        public TipoSolicitacao? Tipo { get; set; }

        [Required(ErrorMessage = "A descrição é obrigatória.")]
        [StringLength(500, ErrorMessage = "A descrição deve ter no máximo 500 caracteres.")]
        public string Descricao { get; set; } = string.Empty;

        [Required(ErrorMessage = "O endereço é obrigatório.")]
        [StringLength(200, ErrorMessage = "O endereço deve ter no máximo 200 caracteres.")]
        public string Endereco { get; set; } = string.Empty;

        [StringLength(50, ErrorMessage = "O bairro deve ter no máximo 50 caracteres.")]
        public string? Bairro { get; set; }

        [Required(ErrorMessage = "O município é obrigatório.")]
        [StringLength(100, ErrorMessage = "O município deve ter no máximo 100 caracteres.")]
        public string Municipio { get; set; } = string.Empty;

        [Required(ErrorMessage = "A prioridade é obrigatória.")]
        [EnumDataType(typeof(PrioridadeSolicitacao), ErrorMessage = "Prioridade inválida.")]
        public PrioridadeSolicitacao? Prioridade { get; set; }

        [StringLength(500, ErrorMessage = "As observações devem ter no máximo 500 caracteres.")]
        public string? Observacoes { get; set; }
    }
}
