using System;
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
        Bombeiros,
        DefesaCivil,
        Voluntarios,
        Administrativa,
        Outros
    }

    public enum StatusEquipe
    {
        Disponivel,
        EmAtendimento,
        EmDeslocamento,
        EmApoio,

        Indisponivel,
        Ocupada,
        EmManutencao,
        ForaDeServico
    }

    [Table("Equipes")]
    public class Equipe
    {
        [Key]
        [Column("Id")]
        public int Id {get; set;}

        [Column("Nome")]
        [Required]
        [StringLength(100)]
        public string? Nome {get; set;}

        [Column("Descricao")]
        [Required]
        [StringLength(200)]
        public string? Descricao { get; set; }

        [Column("Tipo")]
        [Required]
        public string? Tipo { get; set; }

        [Column("Status")]
        [Required]
        public string? Status { get; set; }

        [Column("Responsavel")]
        [Required]
        [StringLength(100)]
        public string? Responsavel { get; set; }

        [Column("Telefone")]
        [Required]
        [StringLength(20)]
        public string? Telefone { get; set; }

        [Column("Email")]
        [Required]
        [StringLength(100)]
        public string? Email { get; set; }

        [Column("Municipio")]
        [Required]
        [StringLength(100)]
        public string? Municipio { get; set; }

        [Column("Endereco")]
        [Required]
        [StringLength(200)]
        public string? Endereco { get; set; }

        [Column("QuantidadeMembros")]
        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "A quantidade de membros deve ser maior que zero.")]
        public int? QuantidadeMembros { get; set; }

        [Column("LocalizacaoAtual")]
        [Required]
        [StringLength(100)]
        public string? LocalizacaoAtual { get; set;}

        [Column("Observacoes")]
        [StringLength(500)]
        public string? Observacoes { get; set;}

        [Column("CreatedAt")]
        [Required]
        public DateTime? CreatedAt { get; set; }

        [Column("UpdatedAt")]
        public DateTime? UpdatedAt { get; set; }

        [NotMapped]
        public bool Disponivel => Status == StatusEquipe.Disponivel.ToString();

    }
}
