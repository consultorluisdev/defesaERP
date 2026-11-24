using DefesaCivil.Api.DTOs.Viaturas;
using DefesaCivil.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DefesaCivil.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ViaturasController : ControllerBase
    {
        private readonly ViaturaService _service;

        public ViaturasController(ViaturaService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<List<ViaturaResponseDto>>> GetAll()
        {
            var viaturas = await _service.GetAll();
            return Ok(viaturas);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ViaturaResponseDto>> GetById(int id)
        {
            var viatura = await _service.GetById(id);

            if (viatura == null)
                return NotFound($"Viatura com Id {id} não encontrada.");

            return Ok(viatura);
        }

        [HttpGet("prefixo/{prefixo}")]
        public async Task<ActionResult<ViaturaResponseDto>> GetByPrefixo(string prefixo)
        {
            var viatura = await _service.GetByPrefixo(prefixo);

            if (viatura == null)
                return NotFound($"Viatura com prefixo {prefixo} não encontrada.");

            return Ok(viatura);
        }

        [HttpPost]
        public async Task<ActionResult<ViaturaResponseDto>> Create([FromBody] CreateViaturaDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var viatura = await _service.Create(dto);
            return CreatedAtAction(nameof(GetById), new { id = viatura.Id }, viatura);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ViaturaResponseDto>> Update(int id, [FromBody] UpdateViaturaDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var viatura = await _service.Update(id, dto);

            if (viatura == null)
                return NotFound($"Viatura com Id {id} não encontrada.");

            return Ok(viatura);
        }

        [HttpPatch("{id}/status")]
        public async Task<ActionResult<ViaturaResponseDto>> ChangeStatus(int id, [FromBody] ChangeViaturaStatusDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Status))
                return BadRequest("Status é obrigatório.");

            var viatura = await _service.ChangeStatus(id, dto.Status);

            if (viatura == null)
                return NotFound($"Viatura com Id {id} não encontrada.");

            return Ok(viatura);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var result = await _service.Delete(id);

            if (!result)
                return NotFound($"Viatura com Id {id} não encontrada.");

            return NoContent();
        }

        [HttpGet("status/{status}")]
        public async Task<ActionResult<List<ViaturaResponseDto>>> GetByStatus(string status)
        {
            var viaturas = await _service.GetByStatus(status);
            return Ok(viaturas);
        }

        [HttpGet("tipo/{tipo}")]
        public async Task<ActionResult<List<ViaturaResponseDto>>> GetByTipo(string tipo)
        {
            var viaturas = await _service.GetByTipo(tipo);
            return Ok(viaturas);
        }

        [HttpGet("dashboard/disponiveis")]
        public async Task<ActionResult<List<ViaturaResponseDto>>> GetDisponiveis()
        {
            var viaturas = await _service.GetDisponiveis();
            return Ok(viaturas);
        }

        [HttpGet("dashboard/manutencao-vencida")]
        public async Task<ActionResult<List<ViaturaResponseDto>>> GetManutencaoVencida()
        {
            var viaturas = await _service.GetManutencaoVencida();
            return Ok(viaturas);
        }
    }
}
