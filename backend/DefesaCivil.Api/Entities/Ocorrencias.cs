public class Ocorrencia
{
    public int Id { get; set; }
    public string Titulo { get; set; } = string.Empty;
    public string Descricao { get; set; } = string.Empty;
    public DateTime DataHora { get; set; }
    public string Cidade { get; set; } = string.Empty;
    public string Nivel { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public DateTime DataAbertura { get; set; } = DateTime.UtcNow;
}
