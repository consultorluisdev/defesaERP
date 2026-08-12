using DefesaERP.DTOs;
using DefesaERP.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DefesaERP.Api.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  [Authorize]
  public class EquipesController : ControllerBase
  {
    private readonly EquipeService _service;

    public EquipesController(EquipeService service)
    {
      _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<List<EquipesResponseDto>>> GetAll([FromQuery] string? search)
    {
      var equipes = await _service.GetAllEquipesAsync(search);
      return Ok(equipes);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<EquipesResponseDto>> GetEquipeById(int id)
    {
      var equipe = await _service.GetById(id);

      if (equipe == null)
      {
        return NotFound($"Equipe com ID {id} não encontrada.");
      }
      return Ok(equipe);
    }

    [HttpPost]
    public async Task<ActionResult<EquipesResponseDto>> Create([FromBody] CreateEquipeDto dto)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      var equipe = await _service.Create(dto);

      return CreatedAtAction(nameof(GetEquipeById), new { id = equipe.Id }, equipe);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<EquipesResponseDto>> Update(int id, [FromBody] UpdateEquipeDto dto)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      var equipe = await _service.Update(id, dto);

      if (equipe == null)
      {
        return NotFound($"Equipe com ID {id} não encontrada.");
      }
      return Ok(equipe);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(int id)
    {
      var result = await _service.Delete(id);

      if (!result)
        return NotFound($"Equipe com ID {id} não encontrada.");

      return NoContent();
    }

    [HttpGet("status/{status}")]
    public async Task<ActionResult<List<EquipesResponseDto>>> GetEquipesByStatus(string status)
    {
      var equipes = await _service.GetEquipesByStatusAsync(status);
      return Ok(equipes);
    }

    [HttpGet("tipo/{tipo}")]
    public async Task<ActionResult<List<EquipesResponseDto>>> GetEquipesByTipo(string tipo)
    {
      var equipes = await _service.GetEquipesByTipoAsync(tipo);
      return Ok(equipes);
    }

    [HttpGet("dashboard/resumo")]
    public async Task<ActionResult> GetResumoDashboard()
    {
      var total = await _service.GetTotalEquipes();
      var disponiveis = await _service.GetEquipesDisponiveis();
      var porMunicipio = await _service.GetEquipesPorMunicipio();
      var ultimas = await _service.GetUltimasEquipesPorMunicipio();

      return Ok(new
      {
        TotalEquipes = total,
        EquipesDisponiveis = disponiveis,
        EquipesPorMunicipio = porMunicipio,
        UltimasEquipesPorMunicipio = ultimas
      });
    }
  }
}
