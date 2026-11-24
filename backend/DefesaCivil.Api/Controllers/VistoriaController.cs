using DefesaCivil.Api.DTOs.Vistorias;
using DefesaCivil.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DefesaCivil.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class VistoriasController : ControllerBase
    {
        private readonly VistoriaService _service;

        public VistoriasController(VistoriaService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<List<VistoriaResponseDto>>> GetAll()
        {
            var vistorias = await _service.GetAll();
            return Ok(vistorias);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<VistoriaResponseDto>> GetById(int id)
        {
            var vistoria = await _service.GetById(id);

            if (vistoria == null)
                return NotFound($"Vistoria com Id {id} não encontrada.");

            return Ok(vistoria);
        }

        [HttpPost]
        public async Task<ActionResult<VistoriaResponseDto>> Create([FromBody] CreateVistoriaDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var vistoria = await _service.Create(dto);
            return CreatedAtAction(nameof(GetById), new { id = vistoria.Id }, vistoria);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<VistoriaResponseDto>> Update(int id, [FromBody] UpdateVistoriaDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var vistoria = await _service.Update(id, dto);

            if (vistoria == null)
                return NotFound($"Vistoria com Id {id} não encontrada.");

            return Ok(vistoria);
        }

        [HttpPatch("{id}/status")]
        public async Task<ActionResult<VistoriaResponseDto>> ChangeStatus(int id, [FromBody] ChangeVistoriaStatusDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Status))
                return BadRequest("Status é obrigatório.");

            var vistoria = await _service.ChangeStatus(id, dto.Status);

            if (vistoria == null)
                return NotFound($"Vistoria com Id {id} não encontrada.");

            return Ok(vistoria);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var result = await _service.Delete(id);

            if (!result)
                return NotFound($"Vistoria com Id {id} não encontrada.");

            return NoContent();
        }

        [HttpGet("status/{status}")]
        public async Task<ActionResult<List<VistoriaResponseDto>>> GetByStatus(string status)
        {
            var vistorias = await _service.GetByStatus(status);
            return Ok(vistorias);
        }

        [HttpGet("prioridade/{prioridade}")]
        public async Task<ActionResult<List<VistoriaResponseDto>>> GetByPrioridade(string prioridade)
        {
            var vistorias = await _service.GetByPrioridade(prioridade);
            return Ok(vistorias);
        }

        [HttpGet("dashboard/pendentes")]
        public async Task<ActionResult<List<VistoriaResponseDto>>> GetPendentes()
        {
            var vistorias = await _service.GetPendentes();
            return Ok(vistorias);
        }
    }
}
