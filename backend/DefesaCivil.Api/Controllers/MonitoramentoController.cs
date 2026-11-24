using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class MonitoramentoController : ControllerBase
{
    private static readonly TimeSpan RequestTimeout = TimeSpan.FromSeconds(10);

    private readonly IHttpClientFactory _httpClientFactory;
    private readonly ILogger<MonitoramentoController> _logger;
    private readonly string _defesaIAUrl;

    public MonitoramentoController(
        IHttpClientFactory httpClientFactory,
        IConfiguration configuration,
        ILogger<MonitoramentoController> logger)
    {
        _httpClientFactory = httpClientFactory;
        _logger = logger;
        _defesaIAUrl = configuration["Services:DefesaIAUrl"] ?? "http://defesa-ia:8000";
    }

    [HttpGet]
    public async Task<IActionResult> Get(CancellationToken cancellationToken)
    {
        var http = _httpClientFactory.CreateClient();
        http.Timeout = Timeout.InfiniteTimeSpan;

        using var cts = CancellationTokenSource.CreateLinkedTokenSource(cancellationToken);
        cts.CancelAfter(RequestTimeout);

        try
        {
            var response = await http.GetAsync($"{_defesaIAUrl.TrimEnd('/')}/monitoramento", cts.Token);
            var content = await response.Content.ReadAsStringAsync(cts.Token);

            if (!response.IsSuccessStatusCode)
            {
                _logger.LogWarning(
                    "Agente defesa-ia respondeu {StatusCode}: {Body}",
                    (int)response.StatusCode,
                    Truncate(content));

                return StatusCode(StatusCodes.Status502BadGateway, new { message = "Serviço de IA indisponível" });
            }

            return Content(content, "application/json", Encoding.UTF8);
        }
        catch (OperationCanceledException) when (!cancellationToken.IsCancellationRequested)
        {
            _logger.LogWarning(
                "Timeout de {Timeout}s ao consultar o agente defesa-ia em {Url}",
                RequestTimeout.TotalSeconds,
                _defesaIAUrl);

            return StatusCode(StatusCodes.Status504GatewayTimeout, new { message = "Serviço de IA não respondeu a tempo" });
        }
        catch (HttpRequestException exception)
        {
            _logger.LogError(
                exception,
                "Falha de rede ao consultar o agente defesa-ia em {Url}",
                _defesaIAUrl);

            return StatusCode(StatusCodes.Status502BadGateway, new { message = "Serviço de IA indisponível" });
        }
    }

    private static string Truncate(string value, int maxLength = 300) =>
        value.Length <= maxLength ? value : value[..maxLength];
}
