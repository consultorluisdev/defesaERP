using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using DefesaCivil.Api.DTOs.Ocorrencia;
using DefesaCivil.Api.Tests.Infrastructure;
using Xunit;

namespace DefesaCivil.Api.Tests
{
    public class OrdenacaoPrioridadeTests : IClassFixture<SolicitacoesApiFactory>
    {
        private readonly HttpClient _client;

        public OrdenacaoPrioridadeTests(SolicitacoesApiFactory factory)
        {
            _client = factory.CreateClient();
        }

        [Fact]
        public async Task GetOcorrenciasAbertas_OrdenaPorCriticidade()
        {
            // Cria uma de cada prioridade
            await Criar("Baixa");
            await Criar("Média");
            await Criar("Alta");
            await Criar("Crítica");

            var response = await _client.GetAsync("/api/Ocorrencias/dashboard/abertas");
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);

            var lista = await response.Content.ReadFromJsonAsync<List<OcorrenciaResponseDto>>();
            Assert.NotNull(lista);

            // Filtra só as que criamos (evita lixo de outros testes)
            var criadas = lista!
                .Where(o => o.Cidade == "Cidade Ordenacao")
                .ToList();

            Assert.Equal(4, criadas.Count);

            // Ordem esperada: Crítica, Alta, Média, Baixa
            var prioridades = criadas.Select(o => o.Prioridade).ToList();
            Assert.Equal("Crítica", prioridades[0]);
            Assert.Equal("Alta", prioridades[1]);
            Assert.Equal("Média", prioridades[2]);
            Assert.Equal("Baixa", prioridades[3]);
        }

        [Fact]
        public async Task GetOcorrenciasAbertas_Empate_PorCreateAtDesc()
        {
            // Duas da mesma prioridade, com pequeno intervalo
            var primeira = await Criar("Alta", "Cidade Empate");
            await Task.Delay(50);
            var segunda = await Criar("Alta", "Cidade Empate");

            var response = await _client.GetAsync("/api/Ocorrencias/dashboard/abertas");
            var lista = await response.Content.ReadFromJsonAsync<List<OcorrenciaResponseDto>>();

            var criadas = lista!
                .Where(o => o.Cidade == "Cidade Empate")
                .ToList();

            Assert.Equal(2, criadas.Count);

            // A mais recente (CreateAt maior) vem primeiro
            Assert.Equal(segunda.Id, criadas[0].Id);
            Assert.Equal(primeira.Id, criadas[1].Id);
        }

        private async Task<OcorrenciaResponseDto> Criar(string prioridade, string cidade = "Cidade Ordenacao")
        {
            var dto = new CreateOcorrenciaDto
            {
                TipoOcorrencia = "Alagamento",
                Descricao = "Teste",
                DataHora = DateTime.UtcNow,
                Cidade = cidade,
                Bairro = "Centro",
                Endereco = "Rua X",
                Prioridade = prioridade,
                Responsavel = "Teste",
                TelefoneSolicitante = "11999999999",
                NomeSolicitante = "Teste"
            };

            var response = await _client.PostAsJsonAsync("/api/Ocorrencias", dto);
            response.EnsureSuccessStatusCode();
            return (await response.Content.ReadFromJsonAsync<OcorrenciaResponseDto>())!;
        }
    }
}
