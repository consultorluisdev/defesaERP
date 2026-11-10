using System.ComponentModel.DataAnnotations;

namespace DefesaCivil.DTOs
{
    public class UpdateOcorrenciaDto
    {
        [StringLength(50)]
        public string? TipoOcorrencia { get; set; }

        [StringLength(500)]
        public string? Descricao { get; set; }

        [StringLength(100)]
        public string? Cidade { get; set; }

        [StringLength(100)]
        public string? Bairro { get; set; }

        [StringLength(200)]
        public string? Endereco { get; set; }

        [StringLength(20)]
        public string? Latitude { get; set; }

        [StringLength(20)]
        public string? Longitude { get; set; }

        [StringLength(20)]
        public string? Status { get; set; }

        [StringLength(20)]
        public string? Prioridade { get; set; }

        [StringLength(100)]
        public string? Responsavel { get; set; }

        [StringLength(20)]
        public string? TelefoneSolicitante { get; set; }

        [StringLength(100)]
        public string? NomeSolicitante { get; set; }

        [StringLength(500)]
        public string? Observacoes { get; set; }

        public DateTime? DataOcorrencia { get; set; }
    }
}
