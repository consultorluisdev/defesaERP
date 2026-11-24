using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using DefesaCivil.Api.DTOs.Dashboard;
using DefesaCivil.Api.Services;
using DefesaERP.Services;

namespace DefesaCivil.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class DashboardController : ControllerBase
    {
        private readonly IDashboardService _dashboardService;
        private readonly OcorrenciaService _ocorrenciaService;
        private readonly AlertaService _alertaService;

        public DashboardController(
            IDashboardService dashboardService,
            OcorrenciaService ocorrenciaService,
            AlertaService alertaService)
        {
            _dashboardService = dashboardService;
            _ocorrenciaService = ocorrenciaService;
            _alertaService = alertaService;
        }

        [HttpGet]
        public async Task<ActionResult<DashboardResponseDto>> GetDashboard()
        {
            try
            {
                var dashboardData = await _dashboardService.GetDashboardDataAsync();
                return Ok(dashboardData);
            }
            catch (System.Exception)
            {
                return StatusCode(500, new { Message = "Ocorreu um erro ao obter os dados do dashboard." });
            }
        }

        [HttpGet("ocorrencias-recentes")]
        public async Task<IActionResult> GetOcorrenciasRecentes()
        {
            var ocorrencias = await _ocorrenciaService.GetUltimasOcorrencias(5);
            return Ok(ocorrencias);
        }

        [HttpGet("alertas-ativos")]
        public async Task<IActionResult> GetAlertasAtivos()
        {
            var alertas = await _alertaService.GetAtivos();
            return Ok(alertas);
        }
    }
}
