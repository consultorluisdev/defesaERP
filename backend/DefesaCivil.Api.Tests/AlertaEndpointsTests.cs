using System;
using System.Net;
using System.Net.Http.Json;
using System.Threading.Tasks;
using DefesaCivil.Api.DTOs;
using DefesaCivil.Api.Entities;
using DefesaCivil.Api.Tests.Infrastructure;
using Xunit;

namespace DefesaCivil.Api.Tests
{
    public class AlertasEndpointsTests : IClassFixture<SolicitacoesApiFactory>
    {
        private readonly HttpClient _client;

        public AlertasEndpointsTests(SolicitacoesApiFactory factory)
        {
            _client = factory.CreateClient();
        }

        [Fact]
        public async Task Create_Alerta_Retorna201()
        {
            var dto = new CreatedAlertaDto
            {
                Titulo = "Alerta de Chuva Forte",
                Descricao = "Previsão de chuvas intensas nas próximas 24h",
                Tipo = TipoAlerta.ChuvaIntensa,
                Nivel = NivelAlerta.Alto,
                Cidade = "Florianópolis",
                DataInicio = DateTime.UtcNow
            };

            var response = await _client.PostAsJsonAsync("/api/Alertas", dto);

            Assert.Equal(HttpStatusCode.Created, response.StatusCode);

            var criado = await response.Content.ReadFromJsonAsync<AlertaResponseDto>();
            Assert.NotNull(criado);
            Assert.Equal("Alerta de Chuva Forte", criado!.Titulo);
            Assert.Equal("Ativo", criado.Status);
        }

        [Fact]
        public async Task GetAtivos_RetornaApenasAtivos()
        {
            // Cria um alerta
            var dto = new CreatedAlertaDto
            {
                Titulo = "Alerta Teste",
                Descricao = "Teste",
                Tipo = TipoAlerta.Enchente,
                Nivel = NivelAlerta.Moderado,
                Cidade = "São José",
                DataInicio = DateTime.UtcNow
            };
            await _client.PostAsJsonAsync("/api/Alertas", dto);

            var response = await _client.GetAsync("/api/Alertas/ativos");
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);

            var lista = await response.Content.ReadFromJsonAsync<List<AlertaResponseDto>>();
            Assert.NotNull(lista);
            Assert.All(lista!, a => Assert.True(a.Status == "Ativo" || a.Status == "Monitorando"));
        }

        [Fact]
        public async Task Update_Alerta_Retorna200()
        {
            var id = await CriarAlerta();

            var payload = new
            {
                titulo = "Alerta Atualizado",
                descricao = "Descrição atualizada",
                tipo = TipoAlerta.Alagamento,
                nivel = NivelAlerta.Critico,
                status = StatusAlerta.Monitorando,
                cidade = "Florianópolis"
            };

            var response = await _client.PutAsJsonAsync($"/api/Alertas/{id}", payload);
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);

            var atualizado = await response.Content.ReadFromJsonAsync<AlertaResponseDto>();
            Assert.NotNull(atualizado);
            Assert.Equal("Alerta Atualizado", atualizado!.Titulo);
            Assert.Equal("Monitorando", atualizado.Status);
        }

        [Fact]
        public async Task EncerrarAlerta_DefineDataFim()
        {
            var id = await CriarAlerta();

            var payload = new
            {
                titulo = "Alerta para Encerrar",
                descricao = "Teste",
                tipo = TipoAlerta.ChuvaIntensa,
                nivel = NivelAlerta.Baixo,
                status = StatusAlerta.Encerrado,
                cidade = "Florianópolis"
            };

            var response = await _client.PutAsJsonAsync($"/api/Alertas/{id}", payload);
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);

            var atualizado = await response.Content.ReadFromJsonAsync<AlertaResponseDto>();
            Assert.NotNull(atualizado);
            Assert.Equal("Encerrado", atualizado!.Status);
            Assert.NotNull(atualizado.DataFim);
        }

        private async Task<int> CriarAlerta()
        {
            var dto = new CreatedAlertaDto
            {
                Titulo = "Alerta Base",
                Descricao = "Teste",
                Tipo = TipoAlerta.Outros,
                Nivel = NivelAlerta.Baixo,
                Cidade = "Florianópolis",
                DataInicio = DateTime.UtcNow
            };

            var response = await _client.PostAsJsonAsync("/api/Alertas", dto);
            response.EnsureSuccessStatusCode();
            var criado = await response.Content.ReadFromJsonAsync<AlertaResponseDto>();
            return criado!.Id;
        }
    }
}
