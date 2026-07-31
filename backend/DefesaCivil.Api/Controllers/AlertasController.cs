using DefesaCivil.Api.DTOs;
using DefesaCivil.Api.Entities;
using DefesaCivil.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DefesaCivil.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class AlertasController : ControllerBase
{
  private readonly AlertaService _service;

  public AlertasController(AlertaService service)
  {
    _service = service;
  }

  [HttpGet]
  public async Task<ActionResult<List<AlertaResponseDto>>> GetAll()
  {
    var alertas = await _service.GetAll();
    return Ok(alertas);
  }

  [HttpGet("{id}")]
  public async Task<ActionResult<AlertaResponseDto>> GetById(int id)
  {
    var alerta = await _service.GetById(id);

    if (alerta == null)
      return NotFound($"Alerta com Id {id} não encontrado.");

    return Ok(alerta);
  }

  [HttpPost]
  public async Task<ActionResult<AlertaResponseDto>> Create([FromBody] CreatedAlertaDto dto)
  {
    if (!ModelState.IsValid)
      return BadRequest(ModelState);

    var alerta = await _service.Create(dto);
    return CreatedAtAction(nameof(GetById), new { id = alerta.Id }, alerta);
  }

  [HttpPut("{id}")]
  public async Task<ActionResult<AlertaResponseDto>> Update(int id, [FromBody] UpdateAlertaDto dto)
  {
    if (!ModelState.IsValid)
      return BadRequest(ModelState);

    var alerta = await _service.Update(id, dto);

    if (alerta == null)
      return NotFound($"Alerta com Id {id} não encontrado.");

    return Ok(alerta);
  }

  [HttpDelete("{id}")]
  public async Task<ActionResult> Delete(int id)
  {
    var result = await _service.Delete(id);

    if (!result)
      return NotFound($"Alerta com Id {id} não encontrado.");

    return NoContent();
  }

  [HttpGet("ativos")]
  public async Task<ActionResult<List<AlertaResponseDto>>> GetAtivos()
  {
    var alertas = await _service.GetAtivos();
    return Ok(alertas);
  }

  [HttpGet("encerrados")]
  public async Task<ActionResult<List<AlertaResponseDto>>> GetEncerrados()
  {
    var alertas = await _service.GetEncerrados();
    return Ok(alertas);
  }

  [HttpGet("cidade/{cidade}")]
  public async Task<ActionResult<List<AlertaResponseDto>>> GetByCidade(string cidade)
  {
    var alertas = await _service.GetByCidade(cidade);
    return Ok(alertas);
  }

  [HttpGet("nivel/{nivel}")]
  public async Task<ActionResult<List<AlertaResponseDto>>> GetByNivel(NivelAlerta nivel)
  {
    var alertas = await _service.GetByNivel(nivel);
    return Ok(alertas);
  }
}
