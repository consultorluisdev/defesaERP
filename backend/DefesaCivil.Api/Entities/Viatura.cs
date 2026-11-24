using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DefesaCivil.Api.Entities
{
    [Table("viaturas")]
    public class Viatura
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("prefixo")]
        [StringLength(20)]
        public string Prefixo { get; set; } = string.Empty;

        [Column("placa")]
        [StringLength(10)]
        public string Placa { get; set; } = string.Empty;

        [Column("modelo")]
        [StringLength(100)]
        public string Modelo { get; set; } = string.Empty;

        [Column("marca")]
        [StringLength(50)]
        public string Marca { get; set; } = string.Empty;

        [Column("ano")]
        public int Ano { get; set; }

        [Column("tipo")]
        [StringLength(50)]
        public string Tipo { get; set; } = string.Empty;

        [Column("status")]
        [StringLength(30)]
        public string Status { get; set; } = ViaturaStatus.Disponivel;

        [Column("km_atual")]
        public int KmAtual { get; set; }

        [Column("capacidade_combustivel")]
        public double CapacidadeCombustivel { get; set; }

        [Column("nivel_combustivel")]
        public double NivelCombustivel { get; set; }

        [Column("ultima_manutencao")]
        public DateTime? UltimaManutencao { get; set; }

        [Column("proxima_manutencao")]
        public DateTime? ProximaManutencao { get; set; }

        [Column("localizacao_atual")]
        [StringLength(200)]
        public string? LocalizacaoAtual { get; set; }

        [Column("responsavel")]
        [StringLength(100)]
        public string? Responsavel { get; set; }

        [Column("observacoes")]
        [StringLength(500)]
        public string? Observacoes { get; set; }

        [Column("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Column("updated_at")]
        public DateTime? UpdatedAt { get; set; }
    }

    public static class ViaturaStatus
    {
        public const string Disponivel = "Disponível";
        public const string EmUso = "Em Uso";
        public const string Manutencao = "Manutenção";
        public const string Inativa = "Inativa";
    }

    public static class ViaturaTipo
    {
        public const string Ambulancia = "Ambulância";
        public const string Caminhao = "Caminhão";
        public const string Pickup = "Pick-up";
        public const string Carro = "Carro";
        public const string Van = "Van";
        public const string Motocicleta = "Motocicleta";
        public const string Barco = "Barco";
        public const string Outros = "Outros";
    }
}
