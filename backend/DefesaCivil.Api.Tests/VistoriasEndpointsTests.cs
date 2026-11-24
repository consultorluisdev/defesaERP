using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using DefesaCivil.Api.DTOs.Vistorias;
using DefesaCivil.Api.Tests.Infrastructure;
using Xunit;

namespace DefesaCivil.Api.Tests
{
    public class VistoriasEndpointsTests : IClassFixture<SolicitacoesApiFactory>
    {
        private readonly HttpClient _client;

        public VistoriasEndpointsTests(SolicitacoesApiFactory factory)
        {
            _client = factory.CreateClient();
        }

        [Fact]
        public async Task Create_Vistoria_Retorna201EProtocolo()
        {
            var dto = new CreateVistoriaDto
            {
                TipoVistoria = "Emergencial",
                Prioridade = "Alta",
                Endereco = "Rua A, 123",
                Bairro = "Centro",
                Cidade = "Florianópolis",
                DataAgendamento = DateTime.UtcNow.AddDays(1),
                Responsavel = "João"
            };

            var response = await _client.PostAsJsonAsync("/api/Vistorias", dto);

            Assert.Equal(HttpStatusCode.Created, response.StatusCode);

            var criada = await response.Content.ReadFromJsonAsync<VistoriaResponseDto>();
            Assert.NotNull(criada);
            Assert.StartsWith("VST-", criada!.Protocolo);
            Assert.Equal("Pendente", criada.Status);
        }

        [Fact]
        public async Task Update_Parcial_Retorna200()
        {
            var id = await CriarVistoria();

            var payload = new { status = "Em Andamento" };
            var response = await _client.PutAsJsonAsync($"/api/Vistorias/{id}", payload);

            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [Fact]
        public async Task ChangeStatus_Concluida_DefineDataConclusao()
        {
            var id = await CriarVistoria();

            var response = await _client.PatchAsJsonAsync(
                $"/api/Vistorias/{id}/status",
                new { status = "Concluída" });

            Assert.Equal(HttpStatusCode.OK, response.StatusCode);

            var atualizada = await response.Content.ReadFromJsonAsync<VistoriaResponseDto>();
            Assert.NotNull(atualizada);
            Assert.Equal("Concluída", atualizada!.Status);
            Assert.NotNull(atualizada.DataConclusao);
        }

        [Fact]
        public async Task GetPendentes_OrdenaPorPrioridade()
        {
            await CriarVistoria("Baixa");
            await CriarVistoria("Média");
            await CriarVistoria("Alta");
            await CriarVistoria("Crítica");

            var response = await _client.GetAsync("/api/Vistorias/dashboard/pendentes");
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);

            var lista = await response.Content.ReadFromJsonAsync<List<VistoriaResponseDto>>();
            Assert.NotNull(lista);
            // A mais crítica deve vir primeiro
            Assert.Equal("Crítica", lista![0].Prioridade);
        }

        private async Task<int> CriarVistoria(string prioridade = "Média")
        {
            var dto = new CreateVistoriaDto
            {
                TipoVistoria = "Rotina",
                Prioridade = prioridade,
                Endereco = "Rua Teste",
                Bairro = "Centro",
                Cidade = "Florianópolis",
                DataAgendamento = DateTime.UtcNow.AddDays(1),
                Responsavel = "Teste"
            };

            var response = await _client.PostAsJsonAsync("/api/Vistorias", dto);
            response.EnsureSuccessStatusCode();
            var criada = await response.Content.ReadFromJsonAsync<VistoriaResponseDto>();
            return criada!.Id;
        }
    }
}
