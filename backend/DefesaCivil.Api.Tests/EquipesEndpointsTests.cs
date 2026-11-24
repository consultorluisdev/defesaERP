using System.Net;
using System.Net.Http.Json;
using System.Threading.Tasks;
using DefesaERP.DTOs;
using DefesaCivil.Api.Entities;
using DefesaCivil.Api.Tests.Infrastructure;
using Xunit;

namespace DefesaCivil.Api.Tests
{
    public class EquipesEndpointsTests : IClassFixture<SolicitacoesApiFactory>
    {
        private readonly HttpClient _client;

        public EquipesEndpointsTests(SolicitacoesApiFactory factory)
        {
            _client = factory.CreateClient();
        }

        [Fact]
        public async Task Create_Equipe_Retorna201()
        {
            var dto = new CreateEquipeDto
            {
                Nome = "Equipe Alpha",
                Descricao = "Equipe de resgate",
                Tipo = "Resgate",
                Status = "Disponível",
                Responsavel = "João Silva",
                Telefone = "48999999999",
                Email = "alpha@defesa.sc",
                Municipio = "Florianópolis",
                Endereco = "Rua A, 123",
                QuantidadeMembros = 5,
                LocalizacaoAtual = "Base Central"
            };

            var response = await _client.PostAsJsonAsync("/api/Equipes", dto);

            Assert.Equal(HttpStatusCode.Created, response.StatusCode);

            var criada = await response.Content.ReadFromJsonAsync<EquipesResponseDto>();
            Assert.NotNull(criada);
            Assert.Equal("Equipe Alpha", criada!.Nome);
            Assert.Equal(5, criada.QuantidadeMembros);
        }

        [Fact]
        public async Task GetByStatus_RetornaEquipesFiltradas()
        {
            // Cria uma equipe disponível
            var dto = new CreateEquipeDto
            {
                Nome = "Equipe Beta",
                Descricao = "Teste",
                Tipo = "Defesa Civil",
                Status = "Disponível",
                Responsavel = "Maria",
                Telefone = "48988888888",
                Email = "beta@defesa.sc",
                Municipio = "São José",
                Endereco = "Rua B, 456",
                QuantidadeMembros = 3,
                LocalizacaoAtual = "Base Sul"
            };
            await _client.PostAsJsonAsync("/api/Equipes", dto);

            var response = await _client.GetAsync("/api/Equipes/status/Disponível");
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);

            var lista = await response.Content.ReadFromJsonAsync<List<EquipesResponseDto>>();
            Assert.NotNull(lista);
            Assert.All(lista!, e => Assert.Equal("Disponível", e.Status));
        }

        [Fact]
        public async Task Update_Equipe_Retorna200()
        {
            var id = await CriarEquipe();

            var payload = new
            {
                status = "Em Campo",
                localizacaoAtual = "Rua C, 789"
            };

            var response = await _client.PutAsJsonAsync($"/api/Equipes/{id}", payload);
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);

            var atualizada = await response.Content.ReadFromJsonAsync<EquipesResponseDto>();
            Assert.NotNull(atualizada);
            Assert.Equal("Em Campo", atualizada!.Status);
        }

        [Fact]
        public async Task Delete_Equipe_Retorna204()
        {
            var id = await CriarEquipe();

            var response = await _client.DeleteAsync($"/api/Equipes/{id}");
            Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
        }

        private async Task<int> CriarEquipe()
        {
            var dto = new CreateEquipeDto
            {
                Nome = "Equipe Teste",
                Descricao = "Teste",
                Tipo = "Resgate",
                Status = "Disponível",
                Responsavel = "Teste",
                Telefone = "48999999999",
                Email = "teste@defesa.sc",
                Municipio = "Florianópolis",
                Endereco = "Rua X",
                QuantidadeMembros = 4,
                LocalizacaoAtual = "Base"
            };

            var response = await _client.PostAsJsonAsync("/api/Equipes", dto);
            response.EnsureSuccessStatusCode();
            var criada = await response.Content.ReadFromJsonAsync<EquipesResponseDto>();
            return criada!.Id;
        }
    }
}
