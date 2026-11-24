using DefesaCivil.Api.DTOs.Abrigos;
using DefesaCivil.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DefesaCivil.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AbrigosController : ControllerBase
    {
        private readonly AbrigoService _service;

        public AbrigosController(AbrigoService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<List<AbrigoResponseDto>>> GetAll()
        {
            var abrigos = await _service.GetAll();
            return Ok(abrigos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AbrigoResponseDto>> GetById(int id)
        {
            var abrigo = await _service.GetById(id);
            if (abrigo == null) return NotFound($"Abrigo {id} não encontrado.");
            return Ok(abrigo);
        }

        [HttpPost]
        public async Task<ActionResult<AbrigoResponseDto>> Create([FromBody] CreateAbrigoDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var abrigo = await _service.Create(dto);
            return CreatedAtAction(nameof(GetById), new { id = abrigo.Id }, abrigo);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<AbrigoResponseDto>> Update(int id, [FromBody] UpdateAbrigoDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var abrigo = await _service.Update(id, dto);
            if (abrigo == null) return NotFound($"Abrigo {id} não encontrado.");
            return Ok(abrigo);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var result = await _service.Delete(id);
            if (!result) return NotFound($"Abrigo {id} não encontrado.");
            return NoContent();
        }

        [HttpGet("dashboard/disponiveis")]
        public async Task<ActionResult<List<AbrigoResponseDto>>> GetDisponiveis()
        {
            var abrigos = await _service.GetDisponiveis();
            return Ok(abrigos);
        }
    }
}
