using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DefesaCivil.Api.Entities
{
    [Table("ocorrencias")]
    public class Ocorrencias
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("numero_protocolo")]
        [StringLength(20)]
        public string NumeroProtocolo { get; set; } = string.Empty;

        [Column("TipoOcorrencia")]
        [StringLength(50)]
        public string TipoOcorrencia { get; set; } = string.Empty;

        [Column("descricao")]
        [StringLength(500)]
        public string Descricao { get; set; } = string.Empty;

        [Column("data_hora")]
        public DateTime DataHora { get; set; }

        [Column("cidade")]
        [StringLength(100)]
        public string Cidade { get; set; } = string.Empty;

        [Column("bairro")]
        [StringLength(50)]
        public string Bairro { get; set; } = string.Empty;

        [Column("endereco")]
        [StringLength(200)]
        public string Endereco { get; set; } = string.Empty;

        [Column("latitude")]
        [StringLength(20)]
        public string Latitude { get; set; } = string.Empty;

        [Column("longitude")]
        [StringLength(20)]
        public string Longitude { get; set; } = string.Empty;

        [Column("status")]
        [StringLength(20)]
        public string Status { get; set; } = string.Empty;

        [Column("prioridade")]
        [StringLength(20)]
        public string Prioridade { get; set; } = string.Empty;

        [Column("responsavel")]
        [StringLength(100)]
        public string Responsavel { get; set; } = string.Empty;

        [Column("telefone_solicitante")]
        [StringLength(20)]
        public string TelefoneSolicitante { get; set; } = string.Empty;

        [Column("nome_solicitante")]
        [StringLength(100)]
        public string NomeSolicitante { get; set; } = string.Empty;

        [Column("observacoes")]
        [StringLength(500)]
        public string Observacoes { get; set; } = string.Empty;

        [Column("create_at")]
        public DateTime CreateAt { get; set; } = DateTime.UtcNow;


        [Column("update_at")]
        public DateTime UpdateAt { get; set; } = DateTime.UtcNow;
    }
}




public static class OcorrenciaStatus
{
    public const string Aberta = "Aberta";
    public const string EmAndamento = "Em Andamento";
    public const string Concluida = "Concluída";
    public const string Cancelada = "Cancelada";
}


public class OcorrenciaPrioridade
{
    public const string Baixa = "Baixa";
    public const string Media = "Média";
    public const string Alta = "Alta";

    public const string Critica = "Crítica";
}

public static class OcorrenciaTipo
{
    public const string Alagamento = "Alagamento";
    public const string Deslizamento = "Deslizamento";
    public const string Incendio = "Incêndio";
    public const string QuedaDeArvore = "Queda de Árvore";
    public const string Microexplosao = "Microexplosão";
    public const string Resgate = "Resgate";
    public const string Interdicao = "Interdição";
    public const string Outros = "Outros";


}