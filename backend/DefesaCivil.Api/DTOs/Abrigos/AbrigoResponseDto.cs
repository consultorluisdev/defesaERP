namespace DefesaCivil.Api.DTOs.Abrigos
{
    public class AbrigoResponseDto
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public bool Disponivel { get; set; }
        public int Capacidade { get; set; }
    }
}
