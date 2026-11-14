using DefesaCivil.Api.Data;
using DefesaCivil.Api.DTOs.Risco;
using DefesaCivil.Api.Entities;
using Microsoft.EntityFrameworkCore;

namespace DefesaCivil.Api.Services;

public class RiscoService
{
    private readonly AppDbContext _context;

    public RiscoService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<RiscoResponseDto>> GetAll(
        string? search = null,
        TipoRisco? tipo = null,
        NivelRisco? nivel = null,
        StatusRisco? status = null,
        string? municipio = null,
        CancellationToken cancellationToken = default)
    {
        var query = _context.Riscos.AsNoTracking();

        if (!string.IsNullOrWhiteSpace(search))
        {
            var term = search.Trim();
            query = query.Where(r =>
                EF.Functions.ILike(r.Nome, $"%{term}%") ||
                EF.Functions.ILike(r.Descricao, $"%{term}%") ||
                EF.Functions.ILike(r.Endereco, $"%{term}%"));
        }

        if (tipo.HasValue)
            query = query.Where(r => r.Tipo == tipo.Value);

        if (nivel.HasValue)
            query = query.Where(r => r.Nivel == nivel.Value);

        if (status.HasValue)
            query = query.Where(r => r.Status == status.Value);

        if (!string.IsNullOrWhiteSpace(municipio))
        {
            var term = municipio.Trim();
            query = query.Where(r => EF.Functions.ILike(r.Municipio, $"%{term}%"));
        }

        var riscos = await query
            .OrderByDescending(r =>
                r.Nivel == NivelRisco.MuitoAlto ? 4
                : r.Nivel == NivelRisco.Alto ? 3
                : r.Nivel == NivelRisco.Medio ? 2
                : 1)
            .ThenByDescending(r => r.CreatedAt)
            .ToListAsync(cancellationToken);

        return riscos.Select(RiscoResponseDto.FromEntity).ToList();
    }

    public async Task<RiscoResponseDto?> GetById(
        int id,
        CancellationToken cancellationToken = default)
    {
        var risco = await _context.Riscos
            .AsNoTracking()
            .FirstOrDefaultAsync(r => r.Id == id, cancellationToken);

        return risco is null ? null : RiscoResponseDto.FromEntity(risco);
    }

    public async Task<RiscoResponseDto> Create(
        CreateRiscoDto dto,
        CancellationToken cancellationToken = default)
    {
        var risco = new Risco
        {
            Nome = dto.Nome.Trim(),
            Descricao = dto.Descricao.Trim(),
            Tipo = dto.Tipo,
            Nivel = dto.Nivel,
            Status = dto.Status,
            Municipio = dto.Municipio.Trim(),
            Bairro = dto.Bairro?.Trim() ?? string.Empty,
            Endereco = dto.Endereco?.Trim() ?? string.Empty,
            Latitude = dto.Coordenadas?.Latitude,
            Longitude = dto.Coordenadas?.Longitude,
            PopulacaoAfetada = dto.PopulacaoAfetada,
            Responsavel = string.IsNullOrWhiteSpace(dto.Responsavel) ? null : dto.Responsavel.Trim(),
            Observacoes = string.IsNullOrWhiteSpace(dto.Observacoes) ? null : dto.Observacoes.Trim(),
            CreatedAt = DateTime.UtcNow
        };

        _context.Riscos.Add(risco);
        await _context.SaveChangesAsync(cancellationToken);

        return RiscoResponseDto.FromEntity(risco);
    }

    public async Task<RiscoResponseDto?> Update(
        int id,
        UpdateRiscoDto dto,
        CancellationToken cancellationToken = default)
    {
        var risco = await _context.Riscos
            .FirstOrDefaultAsync(r => r.Id == id, cancellationToken);

        if (risco is null)
            return null;

        if (dto.Nome is not null)
            risco.Nome = dto.Nome.Trim();

        if (dto.Descricao is not null)
            risco.Descricao = dto.Descricao.Trim();

        if (dto.Tipo.HasValue)
            risco.Tipo = dto.Tipo.Value;

        if (dto.Nivel.HasValue)
            risco.Nivel = dto.Nivel.Value;

        if (dto.Status.HasValue)
            risco.Status = dto.Status.Value;

        if (dto.Municipio is not null)
            risco.Municipio = dto.Municipio.Trim();

        if (dto.Bairro is not null)
            risco.Bairro = dto.Bairro.Trim();

        if (dto.Endereco is not null)
            risco.Endereco = dto.Endereco.Trim();

        if (dto.Coordenadas is not null)
        {
            risco.Latitude = dto.Coordenadas.Latitude;
            risco.Longitude = dto.Coordenadas.Longitude;
        }

        if (dto.PopulacaoAfetada.HasValue)
            risco.PopulacaoAfetada = dto.PopulacaoAfetada.Value;

        if (dto.Responsavel is not null)
            risco.Responsavel = string.IsNullOrWhiteSpace(dto.Responsavel) ? null : dto.Responsavel.Trim();

        if (dto.Observacoes is not null)
            risco.Observacoes = string.IsNullOrWhiteSpace(dto.Observacoes) ? null : dto.Observacoes.Trim();

        risco.UpdatedAt = DateTime.UtcNow;
        await _context.SaveChangesAsync(cancellationToken);

        return RiscoResponseDto.FromEntity(risco);
    }

    public async Task<bool> Delete(int id, CancellationToken cancellationToken = default)
    {
        var risco = await _context.Riscos
            .FirstOrDefaultAsync(r => r.Id == id, cancellationToken);

        if (risco is null)
            return false;

        _context.Riscos.Remove(risco);
        await _context.SaveChangesAsync(cancellationToken);
        return true;
    }
}
