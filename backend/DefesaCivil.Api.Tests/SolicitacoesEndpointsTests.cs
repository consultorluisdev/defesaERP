using System.Net;
using System.Net.Http.Json;
using System.Text.Json;
using DefesaCivil.Api.Tests.Infrastructure;

namespace DefesaCivil.Api.Tests;

public class SolicitacoesEndpointsTests : IClassFixture<SolicitacoesApiFactory>
{
    private readonly HttpClient _client;

    public SolicitacoesEndpointsTests(SolicitacoesApiFactory factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task Post_ComDadosValidos_DeveRetornar201ComContratoCamelCase()
    {
        var response = await _client.PostAsJsonAsync("/api/Solicitacoes", CreatePayload.Valid());

        Assert.Equal(HttpStatusCode.Created, response.StatusCode);
        Assert.NotNull(response.Headers.Location);

        using var json = JsonDocument.Parse(await response.Content.ReadAsStringAsync());
        var root = json.RootElement;

        var id = root.GetProperty("id").GetInt32();
        var protocolo = root.GetProperty("protocolo").GetString();

        Assert.True(id > 0);
        Assert.StartsWith("SOL-", protocolo);
        Assert.Equal("Aberta", root.GetProperty("status").GetString());
        Assert.Equal("Media", root.GetProperty("prioridade").GetString());
        Assert.Equal("Informacao", root.GetProperty("tipo").GetString());
        Assert.Equal("Maria Silva", root.GetProperty("solicitante").GetString());
        Assert.Equal("Florianópolis", root.GetProperty("municipio").GetString());
        Assert.Equal(JsonValueKind.Null, root.GetProperty("updatedAt").ValueKind);

        Assert.True(root.GetProperty("createdAt").TryGetDateTime(out var createdAt));
        Assert.Equal(DateTimeKind.Utc, createdAt.Kind);

        Assert.Equal($"/api/Solicitacoes/{id}", response.Headers.Location!.AbsolutePath);
    }

    [Fact]
    public async Task Post_ComEmailVazio_DeveAceitarEArmazenarNull()
    {
        var payload = CreatePayload.Valid() with { Email = "" };

        var response = await _client.PostAsJsonAsync("/api/Solicitacoes", payload);

        Assert.Equal(HttpStatusCode.Created, response.StatusCode);

        using var json = JsonDocument.Parse(await response.Content.ReadAsStringAsync());
        Assert.Equal(JsonValueKind.Null, json.RootElement.GetProperty("email").ValueKind);
    }

    [Fact]
    public async Task Post_ComDadosInvalidos_DeveRetornar400()
    {
        var payload = new
        {
            solicitante = "",
            telefone = "",
            tipo = "TipoInexistente",
            descricao = "",
            endereco = "",
            municipio = "",
            prioridade = "PrioridadeInexistente"
        };

        var response = await _client.PostAsJsonAsync("/api/Solicitacoes", payload);

        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Fact]
    public async Task Post_ComEmailInvalido_DeveRetornar400()
    {
        var payload = CreatePayload.Valid() with { Email = "email-invalido" };

        var response = await _client.PostAsJsonAsync("/api/Solicitacoes", payload);

        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Fact]
    public async Task Post_DeveGerarProtocolosUnicos()
    {
        var first = await CreateAsync();
        var second = await CreateAsync();

        Assert.NotEqual(first.Protocolo, second.Protocolo);
    }

    [Fact]
    public async Task GetById_Inexistente_DeveRetornar404()
    {
        var response = await _client.GetAsync("/api/Solicitacoes/999999");

        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }

    [Fact]
    public async Task Put_DeveAtualizarCamposEUpdatedAtUtc()
    {
        var created = await CreateAsync();

        var payload = new
        {
            solicitante = "Maria Silva Atualizada",
            telefone = "(48) 98888-1111",
            email = "maria.atualizada@example.com",
            tipo = "Vistoria",
            descricao = "Solicitação atualizada pelos testes.",
            endereco = "Rua Nova, 456",
            bairro = "Trindade",
            municipio = "Florianópolis",
            status = "EmAtendimento",
            prioridade = "Alta",
            responsavel = "Equipe Alpha",
            observacoes = "Atualizado nos testes."
        };

        var response = await _client.PutAsJsonAsync($"/api/Solicitacoes/{created.Id}", payload);

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);

        using var json = JsonDocument.Parse(await response.Content.ReadAsStringAsync());
        var root = json.RootElement;

        Assert.Equal(created.Protocolo, root.GetProperty("protocolo").GetString());
        Assert.Equal("Maria Silva Atualizada", root.GetProperty("solicitante").GetString());
        Assert.Equal("EmAtendimento", root.GetProperty("status").GetString());
        Assert.Equal("Alta", root.GetProperty("prioridade").GetString());
        Assert.Equal("Equipe Alpha", root.GetProperty("responsavel").GetString());

        Assert.True(root.GetProperty("updatedAt").TryGetDateTime(out var updatedAt));
        Assert.Equal(DateTimeKind.Utc, updatedAt.Kind);

        var persisted = await _client.GetFromJsonAsync<JsonElement>($"/api/Solicitacoes/{created.Id}");
        Assert.Equal("EmAtendimento", persisted.GetProperty("status").GetString());
        Assert.Equal("Maria Silva Atualizada", persisted.GetProperty("solicitante").GetString());
    }

    [Fact]
    public async Task Put_Inexistente_DeveRetornar404()
    {
        var payload = new
        {
            solicitante = "Fantasma",
            telefone = "(48) 90000-0000",
            tipo = "Outros",
            descricao = "Não existe.",
            endereco = "Rua Nenhuma, 0",
            municipio = "Florianópolis",
            status = "Aberta",
            prioridade = "Baixa"
        };

        var response = await _client.PutAsJsonAsync("/api/Solicitacoes/999999", payload);

        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }

    [Fact]
    public async Task Delete_DeveRetornar204ERemoverRegistro()
    {
        var created = await CreateAsync();

        var response = await _client.DeleteAsync($"/api/Solicitacoes/{created.Id}");

        Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);

        var getResponse = await _client.GetAsync($"/api/Solicitacoes/{created.Id}");
        Assert.Equal(HttpStatusCode.NotFound, getResponse.StatusCode);

        var deleteAgain = await _client.DeleteAsync($"/api/Solicitacoes/{created.Id}");
        Assert.Equal(HttpStatusCode.NotFound, deleteAgain.StatusCode);
    }

    [Fact]
    public async Task GetAll_DeveOrdenarPorDataDescendente()
    {
        var first = await CreateAsync();
        var second = await CreateAsync();

        var response = await _client.GetFromJsonAsync<JsonElement>("/api/Solicitacoes");

        var ids = response.EnumerateArray()
            .Select(item => item.GetProperty("id").GetInt32())
            .ToList();

        var secondIndex = ids.IndexOf(second.Id);
        var firstIndex = ids.IndexOf(first.Id);

        Assert.True(secondIndex >= 0);
        Assert.True(firstIndex >= 0);
        Assert.True(secondIndex < firstIndex);
    }

    private async Task<CreatedSolicitacao> CreateAsync()
    {
        var response = await _client.PostAsJsonAsync("/api/Solicitacoes", CreatePayload.Valid());
        response.EnsureSuccessStatusCode();

        using var json = JsonDocument.Parse(await response.Content.ReadAsStringAsync());
        var root = json.RootElement;

        return new CreatedSolicitacao(
            root.GetProperty("id").GetInt32(),
            root.GetProperty("protocolo").GetString()!);
    }

    private sealed record CreatedSolicitacao(int Id, string Protocolo);

    private sealed record CreatePayload(
        string Solicitante,
        string Telefone,
        string? Email,
        string Tipo,
        string Descricao,
        string Endereco,
        string? Bairro,
        string Municipio,
        string Prioridade,
        string? Observacoes)
    {
        public static CreatePayload Valid() => new(
            "Maria Silva",
            "(48) 99999-0000",
            "maria@example.com",
            "Informacao",
            "Solicitação de informação sobre abrigos.",
            "Rua das Flores, 123",
            "Centro",
            "Florianópolis",
            "Media",
            "Sem observações.");
    }
}
