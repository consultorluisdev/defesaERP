using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Threading.Tasks;
using DefesaCivil.Api.DTOs.Ocorrencia;
using DefesaCivil.Api.Tests.Infrastructure;
using Xunit;

namespace DefesaCivil.Api.Tests
{
    public class OcorrenciaUpdateParcialTests : IClassFixture<SolicitacoesApiFactory>
    {
        private readonly SolicitacoesApiFactory _factory;
        private readonly HttpClient _client;

        public OcorrenciaUpdateParcialTests(SolicitacoesApiFactory factory)
        {
            _factory = factory;
            _client = factory.CreateClient();
        }

        [Fact]
        public async Task Update_ApenasStatus_Retorna200EPreservaDemaisCampos()
        {
            // Arrange: cria uma ocorrência completa
            var ocorrenciaId = await CriarOcorrenciaCompleta();

            // Act: envia payload parcial (só status)
            var payload = new
            {
                status = "Em Andamento"
            };

            var response = await _client.PutAsJsonAsync($"/api/Ocorrencias/{ocorrenciaId}", payload);

            // Assert: 200 OK
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);

            var atualizada = await response.Content.ReadFromJsonAsync<OcorrenciaResponseDto>();
            Assert.NotNull(atualizada);
            Assert.Equal("Em Andamento", atualizada!.Status);
            // Campos preservados
            Assert.Equal("Alagamento", atualizada.TipoOcorrencia);
            Assert.Equal("Rua A", atualizada.Cidade);
            Assert.Equal("Centro", atualizada.Bairro);
            Assert.Equal("Rua das Flores, 123", atualizada.Endereco);
            Assert.NotEqual(default, atualizada.CreatedAt);
        }

        [Fact]
        public async Task Create_ComDataUnspecified_PersisteUtc()
        {
            var dto = new CreateOcorrenciaDto
            {
                TipoOcorrencia = "Alagamento",
                Descricao = "Teste de data sem timezone",
                DataHora = new DateTime(2026, 11, 21, 22, 0, 0, DateTimeKind.Unspecified),
                Cidade = "Brusque",
                Prioridade = "Média"
            };

            var response = await _client.PostAsJsonAsync("/api/Ocorrencias", dto);
            response.EnsureSuccessStatusCode();

            var criada = await response.Content.ReadFromJsonAsync<OcorrenciaResponseDto>();
            Assert.NotNull(criada);
            Assert.Equal(DateTimeKind.Utc, criada!.DataHora.Kind);
            Assert.Equal(new DateTime(2026, 11, 21, 22, 0, 0, DateTimeKind.Utc), criada.DataHora);
        }

        [Fact]
        public async Task Update_ComDataHora_Retorna200()
        {
            var ocorrenciaId = await CriarOcorrenciaCompleta();

            var payload = new
            {
                dataHora = "2026-11-21T22:00:00Z"
            };

            var response = await _client.PutAsJsonAsync($"/api/Ocorrencias/{ocorrenciaId}", payload);

            Assert.Equal(HttpStatusCode.OK, response.StatusCode);

            var atualizada = await response.Content.ReadFromJsonAsync<OcorrenciaResponseDto>();
            Assert.NotNull(atualizada);
            Assert.Equal(DateTimeKind.Utc, atualizada!.DataHora.Kind);
        }

        [Fact]
        public async Task Update_SemDataHora_PreservaDataOriginal()
        {
            var ocorrenciaId = await CriarOcorrenciaCompleta();

            // pega a data original
            var getResponse = await _client.GetAsync($"/api/Ocorrencias/{ocorrenciaId}");
            var original = await getResponse.Content.ReadFromJsonAsync<OcorrenciaResponseDto>();

            // atualiza só o status
            var payload = new { status = "Concluída" };
            await _client.PutAsJsonAsync($"/api/Ocorrencias/{ocorrenciaId}", payload);

            var getResponse2 = await _client.GetAsync($"/api/Ocorrencias/{ocorrenciaId}");
            var atualizada = await getResponse2.Content.ReadFromJsonAsync<OcorrenciaResponseDto>();

            Assert.Equal(original!.DataHora, atualizada!.DataHora);
        }

        private async Task<int> CriarOcorrenciaCompleta()
        {
            var dto = new CreateOcorrenciaDto
            {
                TipoOcorrencia = "Alagamento",
                Descricao = "Alagamento na rua principal",
                DataHora = new DateTime(2026, 11, 21, 22, 0, 0, DateTimeKind.Utc),
                Cidade = "Rua A",
                Bairro = "Centro",
                Endereco = "Rua das Flores, 123",
                Prioridade = "Alta",
                Responsavel = "João",
                TelefoneSolicitante = "11999999999",
                NomeSolicitante = "Maria"
            };

            var response = await _client.PostAsJsonAsync("/api/Ocorrencias", dto);
            response.EnsureSuccessStatusCode();
            var criada = await response.Content.ReadFromJsonAsync<OcorrenciaResponseDto>();
            return criada!.Id;
        }
    }
}
