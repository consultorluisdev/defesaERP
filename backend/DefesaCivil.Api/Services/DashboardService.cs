using DefesaCivil.Api.DTOs.Dashboard;
using DefesaCivil.Api.Data;
using DefesaCivil.Api.Entities;
using DefesaERP.Entities;
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
                .Where(o => o.Status == OcorrenciaStatus.Aberta || o.Status == OcorrenciaStatus.EmAndamento)
                .CountAsync();

            var equipesEmCampo = await _context.Equipes
                .Where(e => e.Status == StatusEquipe.EmAtendimento.ToString() ||
                            e.Status == StatusEquipe.EmDeslocamento.ToString() ||
                            e.Status == StatusEquipe.EmApoio.ToString())
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

            var equipes = (await _context.Equipes
                .Where(e => e.Status == StatusEquipe.EmAtendimento.ToString() ||
                            e.Status == StatusEquipe.EmDeslocamento.ToString() ||
                            e.Status == StatusEquipe.EmApoio.ToString())
                .Select(e => new { e.Id, e.Nome, e.Status, e.LocalizacaoAtual })
                .ToListAsync())
                .Select(e => new EquipeCampoDto
                {
                    Id = e.Id,
                    Nome = e.Nome ?? string.Empty,
                    Status = e.Status ?? string.Empty,
                    Local = e.LocalizacaoAtual ?? string.Empty,
                    Icone = GetEquipeIcone(e.Nome ?? string.Empty)
                })
                .ToList();

            var cidades = await _context.Cidades
                .OrderBy(c => c.Nome)
                .Select(c => new CidadeMonitoramentoDto
                {
                    Nome = c.Nome,
                    Clima = string.Empty,
                    Temperatura = string.Empty,
                    Risco = string.Empty
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
                UltimosAlertas = ultimosAlertas,
                Equipes = equipes,
                RiscoGeral = riscoGeral,
                IndiceRisco = indiceRisco,
                Umidade = 0,
                VelocidadeVento = 0,
                Temperatura = 0,
                Cidades = cidades
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
    }
}
