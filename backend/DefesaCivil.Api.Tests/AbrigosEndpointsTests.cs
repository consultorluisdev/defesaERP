using System.Net;
using System.Net.Http.Json;
using DefesaCivil.Api.DTOs.Abrigos;
using DefesaCivil.Api.Tests.Infrastructure;
using Xunit;

namespace DefesaCivil.Api.Tests
{
    public class AbrigosEndpointsTests : IClassFixture<SolicitacoesApiFactory>
    {
        private readonly HttpClient _client;

        public AbrigosEndpointsTests(SolicitacoesApiFactory factory)
        {
            _client = factory.CreateClient();
        }

        [Fact]
        public async Task Create_Abrigo_Retorna201()
        {
            var dto = new CreateAbrigoDto
            {
                Nome = "Escola Municipal",
                Disponivel = true,
                Capacidade = 150
            };

            var response = await _client.PostAsJsonAsync("/api/Abrigos", dto);
            Assert.Equal(HttpStatusCode.Created, response.StatusCode);

            var criado = await response.Content.ReadFromJsonAsync<AbrigoResponseDto>();
            Assert.NotNull(criado);
            Assert.Equal("Escola Municipal", criado!.Nome);
            Assert.Equal(150, criado.Capacidade);
        }

        [Fact]
        public async Task Update_Abrigo_Retorna200()
        {
            var id = await CriarAbrigo();

            var payload = new { capacidade = 200 };
            var response = await _client.PutAsJsonAsync($"/api/Abrigos/{id}", payload);

            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            var atualizado = await response.Content.ReadFromJsonAsync<AbrigoResponseDto>();
            Assert.Equal(200, atualizado!.Capacidade);
        }

        [Fact]
        public async Task Delete_Abrigo_Retorna204()
        {
            var id = await CriarAbrigo();
            var response = await _client.DeleteAsync($"/api/Abrigos/{id}");
            Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
        }

        private async Task<int> CriarAbrigo()
        {
            var dto = new CreateAbrigoDto { Nome = "Abrigo Teste", Disponivel = true, Capacidade = 100 };
            var response = await _client.PostAsJsonAsync("/api/Abrigos", dto);
            response.EnsureSuccessStatusCode();
            var criado = await response.Content.ReadFromJsonAsync<AbrigoResponseDto>();
            return criado!.Id;
        }
    }
}
