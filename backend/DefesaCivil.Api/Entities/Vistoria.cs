using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DefesaCivil.Api.Entities
{
    [Table("vistorias")]
    public class Vistoria
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("protocolo")]
        [StringLength(20)]
        public string Protocolo { get; set; } = string.Empty;

        [Column("tipo_vistoria")]
        [StringLength(50)]
        public string TipoVistoria { get; set; } = string.Empty;

        [Column("status")]
        [StringLength(30)]
        public string Status { get; set; } = VistoriaStatus.Pendente;

        [Column("prioridade")]
        [StringLength(20)]
        public string Prioridade { get; set; } = VistoriaPrioridade.Media;

        // Vínculos opcionais
        [Column("ocorrencia_id")]
        public int? OcorrenciaId { get; set; }

        [Column("solicitacao_id")]
        public int? SolicitacaoId { get; set; }

        [Column("equipe_id")]
        public int? EquipeId { get; set; }

        // Localização
        [Column("endereco")]
        [StringLength(200)]
        public string Endereco { get; set; } = string.Empty;

        [Column("bairro")]
        [StringLength(50)]
        public string Bairro { get; set; } = string.Empty;

        [Column("cidade")]
        [StringLength(100)]
        public string Cidade { get; set; } = string.Empty;

        [Column("latitude")]
        [StringLength(20)]
        public string? Latitude { get; set; }

        [Column("longitude")]
        [StringLength(20)]
        public string? Longitude { get; set; }

        // Avaliação
        [Column("descricao")]
        [StringLength(500)]
        public string? Descricao { get; set; }

        [Column("parecer")]
        [StringLength(1000)]
        public string? Parecer { get; set; }

        [Column("nivel_risco")]
        [StringLength(20)]
        public string? NivelRisco { get; set; }

        [Column("recomendacoes")]
        [StringLength(1000)]
        public string? Recomendacoes { get; set; }

        // Datas
        [Column("data_agendamento")]
        public DateTime DataAgendamento { get; set; }

        [Column("data_inicio")]
        public DateTime? DataInicio { get; set; }

        [Column("data_conclusao")]
        public DateTime? DataConclusao { get; set; }

        [Column("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Column("updated_at")]
        public DateTime? UpdatedAt { get; set; }

        [Column("responsavel")]
        [StringLength(100)]
        public string? Responsavel { get; set; }

        [Column("observacoes")]
        [StringLength(500)]
        public string? Observacoes { get; set; }
    }

    public static class VistoriaStatus
    {
        public const string Pendente = "Pendente";
        public const string EmAndamento = "Em Andamento";
        public const string Concluida = "Concluída";
        public const string Cancelada = "Cancelada";
    }

    public static class VistoriaPrioridade
    {
        public const string Baixa = "Baixa";
        public const string Media = "Média";
        public const string Alta = "Alta";
        public const string Critica = "Crítica";
    }

    public static class VistoriaTipo
    {
        public const string Emergencial = "Emergencial";
        public const string Preventiva = "Preventiva";
        public const string Rotina = "Rotina";
    }

    public static class VistoriaNivelRisco
    {
        public const string Baixo = "Baixo";
        public const string Moderado = "Moderado";
        public const string Alto = "Alto";
        public const string Critico = "Crítico";
    }
}
