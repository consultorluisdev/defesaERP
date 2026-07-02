namespace DefesaCivil.Api.DTOs.Dashboard
{
    public class DashboardResponseDto
    {
        public int AlertasAtivos { get; set; }
        public int OcorrenciaAbertas { get; set; }
        public int AbrigosDisponiveis { get; set; }
        public string RiscoGeral { get; set; } = string.Empty;
        public string EquipesEmCampo { get; set; } = string.Empty;

        public double Temperatura { get; set; }
        public int Umidade { get; set; }
        public int VelocidadeVento { get; set; }
        public double IndiceRisco { get; set; }

        public List<CidadeMonitoramentoDto> Cidades { get; set; } = new();
        public List<UltimoAlertaDto> UltimosAlertas { get; set; } = new();
        public List<EquipeCampoDto> Equipes { get; set; } = new();
    }

    public class CidadeMonitoramentoDto
    {
        public string Nome { get; set; } = string.Empty;
        public string Clima { get; set; } = string.Empty;
        public string Temperatura { get; set; } = string.Empty;
        public string Risco { get; set; } = string.Empty;
    }

    public class UltimoAlertaDto
    {
        public int Id { get; set; }
        public string Alerta { get; set; } = string.Empty;
        public string Tempo { get; set; } = string.Empty;
        public string Cidade { get; set; } = string.Empty;
        public string Nivel { get; set; } = string.Empty;
        public DateTime DataHora { get; set; }
    }

    public class EquipeCampoDto
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public string Local { get; set; } = string.Empty;
        public string Icone { get; set; } = string.Empty;
    }
}
