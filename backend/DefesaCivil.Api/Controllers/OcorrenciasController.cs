using DefesaCivil.Api.DTOs.Ocorrencia;
using DefesaCivil.DTOs;
using DefesaERP.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DefesaERP.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    
    public class OcorrenciasController : ControllerBase
    {
        private readonly OcorrenciaService _service;

        public OcorrenciasController(OcorrenciaService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<List<OcorrenciaResponseDto>>> GetAll()
        {
            var ocorrencia = await _service.GetAll();
            return Ok(ocorrencia);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OcorrenciaResponseDto>> GetById(int id)
        {
            var ocorrencia = await _service.GetById(id);

            if(ocorrencia == null)
                return NotFound($"Ocorrencia com Id {id} não encontrada.");

            return Ok(ocorrencia);
        }
        [HttpPost]
        public async Task<ActionResult<OcorrenciaResponseDto>> Create([FromBody] CreateOcorrenciaDto dto)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            var ocorrencia = await _service.Create(dto);
            return CreatedAtAction(nameof(GetById), new { id = ocorrencia.Id }, ocorrencia);
        }
        [HttpPut("{id}")]
        public async Task<ActionResult<OcorrenciaResponseDto>> Update(int id, [FromBody] UpdateOcorrenciaDto dto)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            var ocorrencia = await _service.Update(id, dto);

            if(ocorrencia == null)
                return NotFound($"Ocorrencia com ID {id} não encontrada.");
            
            return Ok(ocorrencia);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var result = await _service.Delete(id);

            if(!result)
                return NotFound($"Ocorrencia com ID {id} não encontrada.");

            return NoContent();
        }
        [HttpGet("status/{status}")]
        public async Task<ActionResult<List<OcorrenciaResponseDto>>> GetByStatus(string status)
        {
            var ocorrencias = await _service.GetByStatus(status);
            return Ok(ocorrencias);
        }
        [HttpGet("prioridade/{prioridade}")]
        public async Task<ActionResult<List<OcorrenciaResponseDto>>> GetByPrioridade(string prioridade)
        {
            var ocorrencia = await _service.GetByPrioridade(prioridade);
            return Ok(ocorrencia);
        }
        [HttpGet("dashboard/abertas")]
        public async Task<ActionResult<List<OcorrenciaResponseDto>>> GetOcorrenciasAberta()
        {
            var ocorrencias = await _service.GetOcorrenciasAbertas();
            return Ok(ocorrencias);
        }
    }


}