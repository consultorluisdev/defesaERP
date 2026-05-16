using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class MonitoramentoController : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var http = new HttpClient();

        var response = await http.GetAsync("https://monitoramento:8000/monitoramento");
        var content = await response.Content.ReadAsStringAsync();

        return Ok(content);

    }   
}