using System.Text.Json;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class MonitoramentoController : ControllerBase
{
    private readonly IHttpClientFactory _httpClientFactory;

    public MonitoramentoController(IHttpClientFactory httpClientFactory)
    {
        _httpClientFactory = httpClientFactory;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var http = _httpClientFactory.CreateClient();

        var response = await http.GetAsync("http://defesa-ia:8000/monitoramento");
        var content = await response.Content.ReadAsStringAsync();

        return Content(content, "application/json", System.Text.Encoding.UTF8);
    }
}
