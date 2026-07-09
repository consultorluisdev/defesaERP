using DefesaERP.Data;
using DefesaERP.DTOs;
using DefesaERP.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DefesaERP.Services
{
    public class OcorrenciaService
    {
        private readonly AppDbContext _context;

        public OcorrenciaService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<OcorrenciaResponseDto> GetById(int id)
        {
            var ocorrencia = await _context.Ocorrencias
            .FirstOrDefaultAsync(o => o.id == id);

            if(ocorrencia == null)
                return null;

            return ToResponseDto(ocorrencia);
        }

        public async Task<OcorrenciaResponseDto> Create(CreateOcorreciaDto dto)
        {
            var ocorrencia = new Ocorrencia
            {
                
            }
        }
    }

}