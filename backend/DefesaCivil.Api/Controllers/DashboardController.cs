using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using DefesaCivil.Api.DTOs.Dashboard;
using DefesaCivil.Api.Services;

namespace DefesaCivil.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class DashboardController : ControllerBase
    {
        private readonly IDashboardService _dashboardService;

        public DashboardController(IDashboardService dashboardService)
        {
            _dashboardService = dashboardService;
        }

        [HttpGet]
        [AllowAnonymous]
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
    }
}
