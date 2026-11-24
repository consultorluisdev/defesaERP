using System.Net;
using System.Threading.Tasks;
using DefesaCivil.Api.Tests.Infrastructure;
using Xunit;

namespace DefesaCivil.Api.Tests
{
    public class DashboardEndpointsTests : IClassFixture<SolicitacoesApiFactory>
    {
        private readonly HttpClient _client;

        public DashboardEndpointsTests(SolicitacoesApiFactory factory)
        {
            _client = factory.CreateClient();
        }

        [Fact]
        public async Task GetResumo_Retorna200()
        {
            var response = await _client.GetAsync("/api/Dashboard");
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [Fact]
        public async Task GetOcorrenciasRecentes_Retorna200()
        {
            var response = await _client.GetAsync("/api/Dashboard/ocorrencias-recentes");
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [Fact]
        public async Task GetAlertasAtivos_Retorna200()
        {
            var response = await _client.GetAsync("/api/Dashboard/alertas-ativos");
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }
    }
}
