public class Alerta
{
    public int Id { get; set; }
    public string Titulo { get; set; } = string.Empty;
    public string Descricao { get; set; } = string.Empty;
    public DateTime DataHora { get; set; }
    public string Nivel { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public DateTime DataCriacao { get; set; } = DateTime.UtcNow;

    public int CidadeId { get; set; }
    public Cidade? Cidade { get; set; }
}
