using DefesaCivil.Api.DTOs.Dashboard;
using DefesaCivil.Api.Data;
using DefesaCivil.Api.Entities;
using Microsoft.EntityFrameworkCore;

namespace DefesaCivil.Api.Services
{
    public interface IDashboardService
    {
        Task<DashboardResponseDto> GetDashboardDataAsync();
    }

    public class DashboardService : IDashboardService
    {
        private readonly AppDbContext _context;

        public DashboardService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<DashboardResponseDto> GetDashboardDataAsync()
        {
            var alertasAtivos = await _context.Alertas
                .Where(a => a.Status == StatusAlerta.Ativo || a.Status == StatusAlerta.Monitorando)
                .CountAsync();

            var ocorrenciasAbertas = await _context.Ocorrencias
                .Where(o => o.Status == "Aberto" || o.Status == "EmAndamento")
                .CountAsync();

            var equipesEmCampo = await _context.Equipes
                .Where(e => e.Status == "Em Campo" || e.Status == "EmAndamento")
                .Select(e => e.Nome)
                .ToListAsync();

            var abrigosDisponiveis = await _context.Abrigos
                .Where(a => a.Disponivel == true)
                .CountAsync();

            var ultimosAlertas = await _context.Alertas
                .OrderByDescending(a => a.CreatedAt)
                .Take(5)
                .Select(a => new UltimoAlertaDto
                {
                    Id = a.Id,
                    Alerta = a.Descricao,
                    Tempo = a.CreatedAt.ToString("g"),
                    Cidade = a.Cidade,
                    Nivel = a.Nivel.ToString(),
                    DataHora = a.CreatedAt
                })
                .ToListAsync();

            var equipesDb = await _context.Equipes
                .Where(e => e.Status == "Em Campo" || e.Status == "EmAndamento")
                .Select(e => new EquipeCampoDto
                {
                    Id = e.Id,
                    Nome = e.Nome,
                    Status = e.Status,
                    Local = e.LocalizacaoAtual,
                    Icone = GetEquipeIcone(e.Nome)
                })
                .ToListAsync();

            var riscoGeral = CalcularRiscoGeral(alertasAtivos, ocorrenciasAbertas);
            var indiceRisco = CalcularIndiceRisco(alertasAtivos, ocorrenciasAbertas);

            return new DashboardResponseDto
            {
                AlertasAtivos = alertasAtivos,
                OcorrenciaAbertas = ocorrenciasAbertas,
                EquipesEmCampo = string.Join(", ", equipesEmCampo),
                AbrigosDisponiveis = abrigosDisponiveis,
                UltimosAlertas = ultimosAlertas.Any() ? ultimosAlertas : GetUltimosAlertas(),
                Equipes = equipesDb.Any() ? equipesDb : GetMockEquipes(),
                RiscoGeral = riscoGeral,
                IndiceRisco = indiceRisco,
                Umidade = 65,
                VelocidadeVento = 15,
                Temperatura = 28.5,
                Cidades = GetMockCidades()
            };
        }

        private string CalcularRiscoGeral(int alertas, int ocorrencias)
        {
            var total = alertas + ocorrencias;
            if (total >= 10) return "Critico";
            if (total >= 5) return "Alto";
            if (total >= 2) return "Moderado";
            return "Baixo";
        }

        private double CalcularIndiceRisco(int alertas, int ocorrencias)
        {
            var total = alertas + ocorrencias;
            var maximo = 20.0;
            var indice = (total / maximo) * 100;
            return Math.Round(indice, 1);
        }

        private string GetEquipeIcone(string nome)
        {
            if (nome.Contains("Alpha")) return "🚑";
            if (nome.Contains("Bravo")) return "🚒";
            if (nome.Contains("Charlie")) return "🚓";
            if (nome.Contains("Delta")) return "🚁";
            return "🚒";
        }

        private List<CidadeMonitoramentoDto> GetMockCidades()
        {
            return new List<CidadeMonitoramentoDto>
            {
                new() { Nome = "Brusque", Clima = "Chuva Forte", Temperatura = "22°C", Risco = "Alto" },
                new() { Nome = "Blumenau", Clima = "Nublado", Temperatura = "24°C", Risco = "Moderado" },
                new() { Nome = "Itajaí", Clima = "Temporal", Temperatura = "21°C", Risco = "Alto" },
                new() { Nome = "Guabiruba", Clima = "Instável", Temperatura = "23°C", Risco = "Baixo" },
                new() { Nome = "Gaspar", Clima = "Chuva Leve", Temperatura = "22°C", Risco = "Moderado" },
                new() { Nome = "Camboriú", Clima = "Ventania", Temperatura = "20°C", Risco = "Alto" }
            };
        }

        private List<UltimoAlertaDto> GetUltimosAlertas()
        {
            return new List<UltimoAlertaDto>
            {
                new() { Id = 1, Alerta = "Alerta de Inundação", Tempo = "10 min atrás", Cidade = "Brusque", Nivel = "Alto", DataHora = DateTime.UtcNow.AddMinutes(-10) },
                new() { Id = 2, Alerta = "Deslizamento de Terra", Tempo = "30 min atrás", Cidade = "Blumenau", Nivel = "Moderado", DataHora = DateTime.UtcNow.AddMinutes(-30) },
                new() { Id = 3, Alerta = "Alerta de Vento Forte", Tempo = "1 hora atrás", Cidade = "Itajaí", Nivel = "Alto", DataHora = DateTime.UtcNow.AddHours(-1) },
                new() { Id = 4, Alerta = "Alerta de Chuva Intensa", Tempo = "2 horas atrás", Cidade = "Guabiruba", Nivel = "Baixo", DataHora = DateTime.UtcNow.AddHours(-2) },
                new() { Id = 5, Alerta = "Alerta de Temporal", Tempo = "3 horas atrás", Cidade = "Gaspar", Nivel = "Moderado", DataHora = DateTime.UtcNow.AddHours(-3) }
            };
        }

        private List<EquipeCampoDto> GetMockEquipes()
        {
            return new List<EquipeCampoDto>
            {
                new() { Id = 1, Nome = "Equipe Alpha", Status = "Em Campo", Local = "Brusque", Icone = "🚑" },
                new() { Id = 2, Nome = "Equipe Bravo", Status = "Em Campo", Local = "Blumenau", Icone = "🚒" },
                new() { Id = 3, Nome = "Equipe Charlie", Status = "Em Campo", Local = "Itajaí", Icone = "🚓" },
                new() { Id = 4, Nome = "Equipe Delta", Status = "Em Campo", Local = "Guabiruba", Icone = "🚁" }
            };
        }
    }
}
