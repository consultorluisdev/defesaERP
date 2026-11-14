using DefesaCivil.Api.DTOs.Risco;
using DefesaCivil.Api.Entities;
using DefesaCivil.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DefesaCivil.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class RiscosController : ControllerBase
{
    private readonly RiscoService _service;

    public RiscosController(RiscoService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<List<RiscoResponseDto>>> GetAll(
        [FromQuery] string? search,
        [FromQuery] TipoRisco? tipo,
        [FromQuery] NivelRisco? nivel,
        [FromQuery] StatusRisco? status,
        [FromQuery] string? municipio,
        CancellationToken cancellationToken)
    {
        var riscos = await _service.GetAll(search, tipo, nivel, status, municipio, cancellationToken);
        return Ok(riscos);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<RiscoResponseDto>> GetById(
        int id,
        CancellationToken cancellationToken)
    {
        var risco = await _service.GetById(id, cancellationToken);
        if (risco is null)
            return NotFound($"Risco com Id {id} não encontrado.");

        return Ok(risco);
    }

    [HttpPost]
    public async Task<ActionResult<RiscoResponseDto>> Create(
        [FromBody] CreateRiscoDto dto,
        CancellationToken cancellationToken)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var risco = await _service.Create(dto, cancellationToken);
        return CreatedAtAction(nameof(GetById), new { id = risco.Id }, risco);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<RiscoResponseDto>> Update(
        int id,
        [FromBody] UpdateRiscoDto dto,
        CancellationToken cancellationToken)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var risco = await _service.Update(id, dto, cancellationToken);
        if (risco is null)
            return NotFound($"Risco com Id {id} não encontrado.");

        return Ok(risco);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id, CancellationToken cancellationToken)
    {
        var deleted = await _service.Delete(id, cancellationToken);
        if (!deleted)
            return NotFound($"Risco com Id {id} não encontrado.");

        return NoContent();
    }
}
