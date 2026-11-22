using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using DefesaCivil.Api.DTOs.Ocorrencia;
using DefesaCivil.Api.Tests.Infrastructure;
using Xunit;

namespace DefesaCivil.Api.Tests
{
    public class ProtocoloOcorrenciaTests : IClassFixture<SqliteFileApiFactory>
    {
        private readonly HttpClient _client;
        private static readonly Regex ProtocoloRegex = new(@"^OC-\d{8}-\d{4,}$");

        public ProtocoloOcorrenciaTests(SqliteFileApiFactory factory)
        {
            _client = factory.CreateClient();
        }

        [Fact]
        public async Task Criar_Excluir_Recriar_NaoReutilizaProtocolo()
        {
            var a = await Criar();
            var b = await Criar();

            // exclui a última
            var del = await _client.DeleteAsync($"/api/Ocorrencias/{b.Id}");
            Assert.Equal(HttpStatusCode.NoContent, del.StatusCode);

            // cria outra
            var c = await Criar();

            // protocolos distintos
            Assert.NotEqual(a.NumeroProtocolo, b.NumeroProtocolo);
            Assert.NotEqual(a.NumeroProtocolo, c.NumeroProtocolo);
            Assert.NotEqual(b.NumeroProtocolo, c.NumeroProtocolo);

            // formato
            Assert.Matches(ProtocoloRegex, a.NumeroProtocolo);
            Assert.Matches(ProtocoloRegex, b.NumeroProtocolo);
            Assert.Matches(ProtocoloRegex, c.NumeroProtocolo);
        }

        [Fact]
        public async Task Criar_10Paralelos_TodosUnicos()
        {
            const int n = 10;
            var tasks = Enumerable.Range(0, n)
                .Select(_ => Criar())
                .ToArray();

            var resultados = await Task.WhenAll(tasks);

            Assert.Equal(n, resultados.Length);

            var protocolos = resultados.Select(r => r.NumeroProtocolo).ToHashSet();
            Assert.Equal(n, protocolos.Count); // todos únicos

            foreach (var r in resultados)
                Assert.Matches(ProtocoloRegex, r.NumeroProtocolo);
        }

        private async Task<OcorrenciaResponseDto> Criar()
        {
            var dto = new CreateOcorrenciaDto
            {
                TipoOcorrencia = "Alagamento",
                Descricao = "Teste",
                DataHora = DateTime.UtcNow,
                Cidade = "Cidade Teste",
                Bairro = "Centro",
                Endereco = "Rua X",
                Prioridade = "Média",
                Responsavel = "Teste",
                TelefoneSolicitante = "11999999999",
                NomeSolicitante = "Teste"
            };

            var response = await _client.PostAsJsonAsync("/api/Ocorrencias", dto);
            Assert.Equal(HttpStatusCode.Created, response.StatusCode);

            var criada = await response.Content.ReadFromJsonAsync<OcorrenciaResponseDto>();
            Assert.NotNull(criada);
            return criada!;
        }
    }
}
