using DefesaCivil.Api.Data;
using DefesaERP.DTOs;
using DefesaERP.Entities;
using Microsoft.EntityFrameworkCore;

namespace DefesaERP.Services
{
  public class EquipeService
  {
    private readonly AppDbContext _context;

    public EquipeService(AppDbContext context)
    {
      _context = context;
    }

    public async Task<List<EquipesResponseDto>> GetAllEquipesAsync(string? search = null)
    {
      var query = _context.Equipes.AsQueryable();

      if (!string.IsNullOrWhiteSpace(search))
      {
        search = search.Trim().ToLower();
        query = query.Where(e =>
          (e.Nome != null && e.Nome.ToLower().Contains(search)) ||
          (e.Responsavel != null && e.Responsavel.ToLower().Contains(search)) ||
          (e.Municipio != null && e.Municipio.ToLower().Contains(search)));
      }

      var equipes = await query
        .OrderByDescending(e => e.CreatedAt)
        .ToListAsync();

      return equipes.Select(EquipesResponseDto.FromEntity).ToList();
    }

    public async Task<EquipesResponseDto?> GetById(int id)
    {
      var equipe = await _context.Equipes
        .FirstOrDefaultAsync(e => e.Id == id);

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

    public async Task<EquipesResponseDto?> Update(int id, UpdateEquipeDto dto)
    {
      var equipe = await _context.Equipes
        .FirstOrDefaultAsync(e => e.Id == id);

      if (equipe == null)
        return null;

      equipe.Nome = dto.Nome;
      equipe.Descricao = dto.Descricao;
      equipe.Tipo = dto.Tipo;
      equipe.Status = dto.Status;
      equipe.Responsavel = dto.Responsavel;
      equipe.Telefone = dto.Telefone;
      equipe.Email = dto.Email;
      equipe.Municipio = dto.Municipio;
      equipe.Endereco = dto.Endereco;
      equipe.QuantidadeMembros = dto.QuantidadeMembros;
      equipe.LocalizacaoAtual = dto.LocalizacaoAtual;
      equipe.Observacoes = dto.Observacoes;
      equipe.UpdatedAt = DateTime.UtcNow;

      await _context.SaveChangesAsync();

      return EquipesResponseDto.FromEntity(equipe);
    }

    public async Task<bool> Delete(int id)
    {
      var equipe = await _context.Equipes
        .FirstOrDefaultAsync(e => e.Id == id);

      if (equipe == null)
        return false;

      _context.Equipes.Remove(equipe);
      await _context.SaveChangesAsync();

      return true;
    }

    public async Task<List<EquipesResponseDto>> GetEquipesByTipoAsync(string tipo)
    {
      var equipes = await _context.Equipes
        .Where(e => e.Tipo == tipo)
        .OrderByDescending(e => e.CreatedAt)
        .ToListAsync();

      return equipes.Select(EquipesResponseDto.FromEntity).ToList();
    }

    public async Task<List<EquipesResponseDto>> GetEquipesByStatusAsync(string status)
    {
      var equipes = await _context.Equipes
        .Where(e => e.Status == status)
        .OrderByDescending(e => e.CreatedAt)
        .ToListAsync();

      return equipes.Select(EquipesResponseDto.FromEntity).ToList();
    }

    public async Task<int> GetCountByStatus(string status)
    {
      return await _context.Equipes
        .CountAsync(e => e.Status == status);
    }

    public async Task<int> GetCountByTipo(string tipo)
    {
      return await _context.Equipes
        .CountAsync(e => e.Tipo == tipo);
    }

    public async Task<List<EquipesResponseDto>> GetUltimasEquipes(int quantidade)
    {
      var equipes = await _context.Equipes
        .OrderByDescending(e => e.CreatedAt)
        .Take(quantidade)
        .ToListAsync();

      return equipes.Select(EquipesResponseDto.FromEntity).ToList();
    }

    public async Task<int> GetTotalEquipes()
    {
      return await _context.Equipes.CountAsync();
    }

    public async Task<int> GetEquipesDisponiveis()
    {
      return await _context.Equipes
        .CountAsync(e => e.Status == StatusEquipe.Disponivel.ToString());
    }

    public async Task<Dictionary<string, int>> GetEquipesPorMunicipio()
    {
      return await _context.Equipes
        .GroupBy(e => e.Municipio)
        .Select(g => new { Municipio = g.Key, Count = g.Count() })
        .ToDictionaryAsync(x => x.Municipio!, x => x.Count);
    }

    public async Task<List<EquipesResponseDto>> GetUltimasEquipesPorMunicipio()
    {
      var equipes = await _context.Equipes
        .OrderByDescending(e => e.CreatedAt)
        .ToListAsync();

      var ultimasPorMunicipio = equipes
        .GroupBy(e => e.Municipio)
        .Select(g => g.First());

      return ultimasPorMunicipio.Select(EquipesResponseDto.FromEntity).ToList();
    }
  }
}
