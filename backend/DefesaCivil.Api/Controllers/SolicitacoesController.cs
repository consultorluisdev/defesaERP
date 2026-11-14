using DefesaCivil.Api.DTOs.Solicitacao;
using DefesaCivil.Api.Entities;
using DefesaCivil.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DefesaCivil.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class SolicitacoesController : ControllerBase
{
    private readonly SolicitacaoService _service;

    public SolicitacoesController(SolicitacaoService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<List<SolicitacaoResponseDto>>> GetAll(
        [FromQuery] string? search,
        [FromQuery] TipoSolicitacao? tipo,
        [FromQuery] StatusSolicitacao? status,
        [FromQuery] PrioridadeSolicitacao? prioridade,
        CancellationToken cancellationToken)
    {
        var solicitacoes = await _service.GetAll(search, tipo, status, prioridade, cancellationToken);
        return Ok(solicitacoes);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<SolicitacaoResponseDto>> GetById(
        int id,
        CancellationToken cancellationToken)
    {
        var solicitacao = await _service.GetById(id, cancellationToken);
        if (solicitacao is null)
            return NotFound($"Solicitação com Id {id} não encontrada.");

        return Ok(solicitacao);
    }

    [HttpPost]
    public async Task<ActionResult<SolicitacaoResponseDto>> Create(
        [FromBody] CreateSolicitacaoDto dto,
        CancellationToken cancellationToken)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var solicitacao = await _service.Create(dto, cancellationToken);
        return CreatedAtAction(nameof(GetById), new { id = solicitacao.Id }, solicitacao);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<SolicitacaoResponseDto>> Update(
        int id,
        [FromBody] UpdateSolicitacaoDto dto,
        CancellationToken cancellationToken)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var solicitacao = await _service.Update(id, dto, cancellationToken);
        if (solicitacao is null)
            return NotFound($"Solicitação com Id {id} não encontrada.");

        return Ok(solicitacao);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id, CancellationToken cancellationToken)
    {
        var deleted = await _service.Delete(id, cancellationToken);
        if (!deleted)
            return NotFound($"Solicitação com Id {id} não encontrada.");

        return NoContent();
    }
}
