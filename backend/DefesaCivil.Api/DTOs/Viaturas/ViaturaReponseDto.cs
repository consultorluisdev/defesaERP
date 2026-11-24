using System;

namespace DefesaCivil.Api.DTOs.Viaturas
{
    public class ViaturaResponseDto
    {
        public int Id { get; set; }
        public string Prefixo { get; set; } = string.Empty;
        public string Placa { get; set; } = string.Empty;
        public string Modelo { get; set; } = string.Empty;
        public string Marca { get; set; } = string.Empty;
        public int Ano { get; set; }
        public string Tipo { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public int KmAtual { get; set; }
        public double CapacidadeCombustivel { get; set; }
        public double NivelCombustivel { get; set; }
        public DateTime? UltimaManutencao { get; set; }
        public DateTime? ProximaManutencao { get; set; }
        public string? LocalizacaoAtual { get; set; }
        public string? Responsavel { get; set; }
        public string? Observacoes { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}
