using System.Text.Json;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class MonitoramentoController : ControllerBase
{
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly string _defesaIAUrl;

    public MonitoramentoController(IHttpClientFactory httpClientFactory, IConfiguration configuration)
    {
        _httpClientFactory = httpClientFactory;
        _defesaIAUrl = configuration["Services:DefesaIAUrl"] ?? "http://defesa-ia:8000";
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var http = _httpClientFactory.CreateClient();
        http.Timeout = TimeSpan.FromSeconds(10);

        try
        {
            using var cts = new CancellationTokenSource(TimeSpan.FromSeconds(10));
            var response = await http.GetAsync($"{_defesaIAUrl.TrimEnd('/')}/monitoramento", cts.Token);
            var content = await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
                return StatusCode(StatusCodes.Status502BadGateway, new { message = "Serviço de IA indisponível" });

            return Content(content, "application/json", System.Text.Encoding.UTF8);
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status502BadGateway, new { message = "Serviço de IA indisponível" });
        }
    }
}
