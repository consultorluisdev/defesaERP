using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using DefesaCivil.Api.DTOs.Viaturas;
using DefesaCivil.Api.Tests.Infrastructure;
using Xunit;

namespace DefesaCivil.Api.Tests
{
    public class ViaturasEndpointsTests : IClassFixture<SolicitacoesApiFactory>
    {
        private readonly HttpClient _client;

        public ViaturasEndpointsTests(SolicitacoesApiFactory factory)
        {
            _client = factory.CreateClient();
        }

        [Fact]
        public async Task Create_Viatura_Retorna201()
        {
            var dto = new CreateViaturaDto
            {
                Prefixo = "VTR-01",
                Placa = "ABC1234",
                Modelo = "Hilux",
                Marca = "Toyota",
                Ano = 2023,
                Tipo = "Pick-up",
                KmAtual = 15000,
                CapacidadeCombustivel = 80,
                NivelCombustivel = 60
            };

            var response = await _client.PostAsJsonAsync("/api/Viaturas", dto);

            Assert.Equal(HttpStatusCode.Created, response.StatusCode);

            var criada = await response.Content.ReadFromJsonAsync<ViaturaResponseDto>();
            Assert.NotNull(criada);
            Assert.Equal("VTR-01", criada!.Prefixo);
            Assert.Equal("Disponível", criada.Status);
        }

        [Fact]
        public async Task Update_Parcial_Retorna200()
        {
            var id = await CriarViatura();

            var payload = new { status = "Em Uso" };
            var response = await _client.PutAsJsonAsync($"/api/Viaturas/{id}", payload);

            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [Fact]
        public async Task ChangeStatus_Manutencao_Retorna200()
        {
            var id = await CriarViatura();

            var response = await _client.PatchAsJsonAsync(
                $"/api/Viaturas/{id}/status",
                new { status = "Manutenção" });

            Assert.Equal(HttpStatusCode.OK, response.StatusCode);

            var atualizada = await response.Content.ReadFromJsonAsync<ViaturaResponseDto>();
            Assert.NotNull(atualizada);
            Assert.Equal("Manutenção", atualizada!.Status);
        }

        [Fact]
        public async Task GetDisponiveis_RetornaSoDisponiveis()
        {
            await CriarViatura("VTR-D1");
            await CriarViatura("VTR-D2");

            var response = await _client.GetAsync("/api/Viaturas/dashboard/disponiveis");
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);

            var lista = await response.Content.ReadFromJsonAsync<List<ViaturaResponseDto>>();
            Assert.NotNull(lista);
            Assert.All(lista!, v => Assert.Equal("Disponível", v.Status));
        }

        private async Task<int> CriarViatura(string prefixo = "VTR-T1")
        {
            var dto = new CreateViaturaDto
            {
                Prefixo = prefixo,
                Placa = "ABC" + new Random().Next(1000, 9999),
                Modelo = "Hilux",
                Marca = "Toyota",
                Ano = 2023,
                Tipo = "Pick-up",
                KmAtual = 15000,
                CapacidadeCombustivel = 80,
                NivelCombustivel = 60
            };

            var response = await _client.PostAsJsonAsync("/api/Viaturas", dto);
            response.EnsureSuccessStatusCode();
            var criada = await response.Content.ReadFromJsonAsync<ViaturaResponseDto>();
            return criada!.Id;
        }
    }
}
