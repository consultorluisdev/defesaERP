using DefesaCivil.Api.Data;
using DefesaCivil.Api.DTOs.Abrigos;
using DefesaCivil.Api.Entities;
using Microsoft.EntityFrameworkCore;

namespace DefesaCivil.Api.Services
{
    public class AbrigoService
    {
        private readonly AppDbContext _context;

        public AbrigoService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<AbrigoResponseDto>> GetAll()
        {
            var abrigos = await _context.Abrigos
                .OrderBy(a => a.Nome)
                .ToListAsync();

            return abrigos.Select(ToResponseDto).ToList();
        }

        public async Task<AbrigoResponseDto?> GetById(int id)
        {
            var abrigo = await _context.Abrigos.FirstOrDefaultAsync(a => a.Id == id);
            return abrigo == null ? null : ToResponseDto(abrigo);
        }

        public async Task<AbrigoResponseDto> Create(CreateAbrigoDto dto)
        {
            var abrigo = new Abrigo
            {
                Nome = dto.Nome,
                Disponivel = dto.Disponivel,
                Capacidade = dto.Capacidade
            };

            _context.Abrigos.Add(abrigo);
            await _context.SaveChangesAsync();

            return ToResponseDto(abrigo);
        }

        public async Task<AbrigoResponseDto?> Update(int id, UpdateAbrigoDto dto)
        {
            var abrigo = await _context.Abrigos.FirstOrDefaultAsync(a => a.Id == id);
            if (abrigo == null) return null;

            abrigo.Nome = dto.Nome ?? abrigo.Nome;
            abrigo.Disponivel = dto.Disponivel ?? abrigo.Disponivel;
            abrigo.Capacidade = dto.Capacidade ?? abrigo.Capacidade;

            await _context.SaveChangesAsync();
            return ToResponseDto(abrigo);
        }

        public async Task<bool> Delete(int id)
        {
            var abrigo = await _context.Abrigos.FirstOrDefaultAsync(a => a.Id == id);
            if (abrigo == null) return false;

            _context.Abrigos.Remove(abrigo);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<AbrigoResponseDto>> GetDisponiveis()
        {
            var abrigos = await _context.Abrigos
                .Where(a => a.Disponivel)
                .OrderBy(a => a.Nome)
                .ToListAsync();

            return abrigos.Select(ToResponseDto).ToList();
        }

        private AbrigoResponseDto ToResponseDto(Abrigo abrigo)
        {
            return new AbrigoResponseDto
            {
                Id = abrigo.Id,
                Nome = abrigo.Nome,
                Disponivel = abrigo.Disponivel,
                Capacidade = abrigo.Capacidade
            };
        }
    }
}
