namespace DefesaCivil.Api.DTOs.Ocorrencia
{
    public class OcorrenciaResponseDto
    {
        public int Id { get; set; }
        public string NumeroProtocolo { get; set; } = string.Empty;
        public string TipoOcorrencia { get; set; } = string.Empty;
        public string Descricao { get; set; } = string.Empty;
        public DateTime DataHora { get; set; }
        public string Cidade { get; set; } = string.Empty;
        public string Bairro { get; set; } = string.Empty;
        public string Endereco { get; set; } = string.Empty;
        public string? Latitude { get; set; }
        public string? Longitude { get; set; }
        public string Status { get; set; } = string.Empty;
        public string Prioridade { get; set; } = string.Empty;
        public string? Responsavel { get; set; }
        public string? TelefoneSolicitante { get; set; }
        public string? NomeSolicitante { get; set; }
        public string? Observacoes { get; set; }
        public DateTime CreateAt { get; set; }
        public DateTime UpdateAt { get; set; }
    }
}
