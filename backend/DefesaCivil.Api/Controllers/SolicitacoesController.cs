using DefesaCivil.Api.DTOs.Solicitacoes;
using DefesaCivil.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DefesaCivil.Api.Controllers
{
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
        public async Task<ActionResult<List<SolicitacaoResponseDto>>> GetAll()
        {
            var solicitacoes = await _service.GetAllAsync();
            return Ok(solicitacoes);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<SolicitacaoResponseDto>> GetById(int id)
        {
            var solicitacao = await _service.GetByIdAsync(id);

            if (solicitacao is null)
                return NotFound(new { message = $"Solicitação com ID {id} não encontrada." });

            return Ok(solicitacao);
        }

        [HttpPost]
        public async Task<ActionResult<SolicitacaoResponseDto>> Create([FromBody] CreateSolicitacaoDto dto)
        {
            var solicitacao = await _service.CreateAsync(dto);

            return CreatedAtAction(nameof(GetById), new { id = solicitacao.Id }, solicitacao);
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult<SolicitacaoResponseDto>> Update(int id, [FromBody] UpdateSolicitacaoDto dto)
        {
            var solicitacao = await _service.UpdateAsync(id, dto);

            if (solicitacao is null)
                return NotFound(new { message = $"Solicitação com ID {id} não encontrada." });

            return Ok(solicitacao);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _service.DeleteAsync(id);

            if (!deleted)
                return NotFound(new { message = $"Solicitação com ID {id} não encontrada." });

            return NoContent();
        }
    }
}
