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
    public class EquipeService
    {
        private readonly AppDbContext _context;

        public EquipeService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<EquipesResponseDto>> GetAllEquipesAsync(string? tipo = null)
        {
            var query = _context.Equipes.AsQueryable();

            if (!string.IsNullOrWhiteSpace(search))
            {
              search = search.Trim().ToLower();
                query = query.Where(e =>
                e.Nome.ToLower().Contains(search) ||
                e.Responsavel.ToLower().Contains(search) ||
                (e.Municipio != null && e.Municipio.ToLower().Contains(search)) ||
                );
            }

            var equipes = await query
              .OrderByDescending(e => e.CreatedAt)
              .ToListAsync();
            return equipes.Select(Equipe => EquipesResponseDto.FromEntity(Equipe)).ToList();
        }

        public async Task<EquipesResponseDto> GetEquipeByIdAsync(int id)
        {
            var equipe = await _context.Equipes
              .FindDefaultAsync(e => e.Id == id);

            return equipe == null ? null : EquipesResponseDto.FromEntity(equipe);
        }

        public async Task<EquipesResponseDto> Create(CreateEquipeDto dto)
      {
        var equipe = new Equipe
        {
          Nome = dto.Nome,
          Descricao = dto.Descricao,
          Tipo = dto.Tipo,
          Status = dto.Status,
          Responsavel = dto.Responsavel,
          Telefone = dto.Telefone,
          Email = dto.Email,
          Municipio = dto.Municipio,
          Endereco = dto.Endereco,
          QuantidadeMembros = dto.QuantidadeMembros,
          LocalizacaoAtual = dto.LocalizacaoAtual,
          Observacoes = dto.Observacoes,
          CreatedAt = DateTime.UtcNow,
          UpdatedAt = null
        };
        _context.Equipes.Add(equipe);
        await _context.SaveChangesAsync();

        return EquipesResponseDto.FromEntity(equipe);

      }
    }
}
