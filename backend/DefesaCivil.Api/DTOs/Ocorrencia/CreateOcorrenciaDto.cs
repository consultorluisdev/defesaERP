using System.ComponentModel.DataAnnotations;

namespace DefesaCivil.Api.DTOs.Ocorrencia
{
    public class CreateOcorrenciaDto
    {
        [Required]
        [StringLength(20)]
        public string NumeroProtocolo { get; set; } = string.Empty;

        [Required]
        [StringLength(50)]
        public string TipoOcorrencia { get; set; } = string.Empty;

        [Required]
        [StringLength(500)]
        public string Descricao { get; set; } = string.Empty;

        [Required]
        public DateTime DataHora { get; set; }

        [Required]
        [StringLength(100)]
        public string Cidade { get; set; } = string.Empty;

        [StringLength(50)]
        public string Bairro { get; set; } = string.Empty;

        [StringLength(200)]
        public string Endereco { get; set; } = string.Empty;

        [StringLength(20)]
        public string? Latitude { get; set; }

        [StringLength(20)]
        public string? Longitude { get; set; }

        [StringLength(20)]
        public string Status { get; set; } = "Aberta";

        [StringLength(20)]
        public string Prioridade { get; set; } = "Média";

        [StringLength(100)]
        public string? Responsavel { get; set; }

        [StringLength(20)]
        public string? TelefoneSolicitante { get; set; }

        [StringLength(100)]
        public string? NomeSolicitante { get; set; }

        [StringLength(500)]
        public string? Observacoes { get; set; }
    }
}
