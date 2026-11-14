using DefesaCivil.Api.DTOs.Vistoria;
using DefesaCivil.Api.Entities;
using DefesaCivil.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DefesaCivil.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class VistoriasController : ControllerBase
{
    private readonly VistoriaService _service;

    public VistoriasController(VistoriaService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<List<VistoriaResponseDto>>> GetAll(
        [FromQuery] string? search,
        [FromQuery] TipoVistoria? tipo,
        [FromQuery] StatusVistoria? status,
        [FromQuery] PrioridadeVistoria? prioridade,
        CancellationToken cancellationToken)
    {
        var vistorias = await _service.GetAll(search, tipo, status, prioridade, cancellationToken);
        return Ok(vistorias);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<VistoriaResponseDto>> GetById(
        int id,
        CancellationToken cancellationToken)
    {
        var vistoria = await _service.GetById(id, cancellationToken);
        if (vistoria is null)
            return NotFound($"Vistoria com Id {id} não encontrada.");

        return Ok(vistoria);
    }

    [HttpPost]
    public async Task<ActionResult<VistoriaResponseDto>> Create(
        [FromBody] CreateVistoriaDto dto,
        CancellationToken cancellationToken)
    {
        if(!ModelState.IsValid)
            return BadRequest(ModelState);

        var vistoria = await _service.Create(dto, cancellationToken);
        return CreatedAtAction(nameof(GetById), new { id = vistoria.Id }, vistoria);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<VistoriaResponseDto>> Update(
        int id,
        [FromBody] UpdateVistoriaDto dto,
        CancellationToken cancellationToken)
    {
        if(!ModelState.IsValid)
            return BadRequest(ModelState);

        var vistoria = await _service.Update(id, dto, cancellationToken);
        if (vistoria is null)
            return NotFound($"Vistoria com Id {id} não encontrada.");

        return Ok(vistoria);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id, CancellationToken cancellationToken)
    {
        var deleted = await _service.Delete(id, cancellationToken);
        if (!deleted)
            return NotFound($"Vistoria com Id {id} não encontrada.");

        return NoContent();
    }
}
