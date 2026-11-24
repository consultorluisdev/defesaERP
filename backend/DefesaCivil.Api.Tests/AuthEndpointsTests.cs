using System.Net;
using System.Net.Http.Json;
using System.Threading.Tasks;
using DefesaCivil.Api.DTOs.Login;
using DefesaCivil.Api.Tests.Infrastructure;
using Xunit;

namespace DefesaCivil.Api.Tests
{
    public class AuthEndpointsTests : IClassFixture<SolicitacoesApiFactory>
    {
        private readonly HttpClient _client;

        public AuthEndpointsTests(SolicitacoesApiFactory factory)
        {
            _client = factory.CreateClient();
        }

        [Fact]
        public async Task Login_CredenciaisValidas_RetornaToken()
        {
            // Cria um usuário (se não existir)
            var registerDto = new RegisterDto
            {
                Email = "teste-auth@defesa.sc",
                Password = "senha123"
            };
            await _client.PostAsJsonAsync("/api/Auth/register", registerDto);

            // Faz login
            var loginDto = new LoginDto
            {
                Email = "teste-auth@defesa.sc",
                Password = "senha123"
            };

            var response = await _client.PostAsJsonAsync("/api/Auth/login", loginDto);
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);

            var result = await response.Content.ReadFromJsonAsync<LoginResponseDto>();
            Assert.NotNull(result);
            Assert.False(string.IsNullOrWhiteSpace(result!.Token));
        }

        [Fact]
        public async Task Login_CredenciaisInvalidas_Retorna401()
        {
            var loginDto = new LoginDto
            {
                Email = "naoexiste@defesa.sc",
                Password = "senhaerrada"
            };

            var response = await _client.PostAsJsonAsync("/api/Auth/login", loginDto);
            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [Fact]
        public async Task Register_EmailDuplicado_Retorna400()
        {
            var registerDto = new RegisterDto
            {
                Email = "duplicado@defesa.sc",
                Password = "senha123"
            };

            // Primeiro registro
            var response1 = await _client.PostAsJsonAsync("/api/Auth/register", registerDto);
            response1.EnsureSuccessStatusCode();

            // Segundo registro (mesmo email)
            var response2 = await _client.PostAsJsonAsync("/api/Auth/register", registerDto);
            Assert.Equal(HttpStatusCode.BadRequest, response2.StatusCode);
        }
    }
}
