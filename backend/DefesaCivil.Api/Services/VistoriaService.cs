using DefesaCivil.Api.Common;
using DefesaCivil.Api.Data;
using DefesaCivil.Api.DTOs.Vistoria;
using DefesaCivil.Api.Entities;
using Microsoft.EntityFrameworkCore;

namespace DefesaCivil.Api.Services;

public class VistoriaService
{
    private readonly AppDbContext _context;

    public VistoriaService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<VistoriaResponseDto>> GetAll(
        string? search = null,
        TipoVistoria? tipo = null,
        StatusVistoria? status = null,
        PrioridadeVistoria? prioridade = null,
        CancellationToken cancellationToken = default)
    {
        var query = _context.Vistorias.AsNoTracking();

        if (!string.IsNullOrWhiteSpace(search))
        {
            var term = search.Trim();
            query = query.Where(v =>
                EF.Functions.ILike(v.Protocolo, $"%{term}%") ||
                EF.Functions.ILike(v.Solicitante, $"%{term}%") ||
                EF.Functions.ILike(v.Municipio, $"%{term}%") ||
                EF.Functions.ILike(v.Endereco, $"%{term}%"));
        }

        if (tipo.HasValue)
            query = query.Where(v => v.Tipo == tipo.Value);

        if (status.HasValue)
            query = query.Where(v => v.Status == status.Value);

        if (prioridade.HasValue)
            query = query.Where(v => v.Prioridade == prioridade.Value);

        var vistorias = await query
            .OrderByDescending(v =>
                v.Prioridade == PrioridadeVistoria.Urgente ? 4
                : v.Prioridade == PrioridadeVistoria.Alta ? 3
                : v.Prioridade == PrioridadeVistoria.Media ? 2
                : 1)
            .ThenByDescending(v => v.CreatedAt)
            .ToListAsync(cancellationToken);

        return vistorias.Select(VistoriaResponseDto.FromEntity).ToList();
    }

    public async Task<VistoriaResponseDto?> GetById(
        int id,
        CancellationToken cancellationToken = default)
    {
        var vistoria = await _context.Vistorias
            .AsNoTracking()
            .FirstOrDefaultAsync(v => v.Id == id, cancellationToken);

        return vistoria is null ? null : VistoriaResponseDto.FromEntity(vistoria);
    }

    public async Task<VistoriaResponseDto> Create(
        CreateVistoriaDto dto,
        CancellationToken cancellationToken = default)
    {
        var vistoria = new Vistoria
        {
            Protocolo = await GerarProtocoloAsync(cancellationToken),
            Solicitante = dto.Solicitante.Trim(),
            Telefone = dto.Telefone.Trim(),
            Tipo = dto.Tipo,
            Descricao = dto.Descricao.Trim(),
            Endereco = dto.Endereco.Trim(),
            Bairro = string.IsNullOrWhiteSpace(dto.Bairro) ? null : dto.Bairro.Trim(),
            Municipio = dto.Municipio.Trim(),
            Status = StatusVistoria.Agendada,
            Prioridade = dto.Prioridade,
            Responsavel = string.IsNullOrWhiteSpace(dto.Responsavel) ? null : dto.Responsavel.Trim(),
            Observacoes = string.IsNullOrWhiteSpace(dto.Observacoes) ? null : dto.Observacoes.Trim(),
            DataAgendamento = DateTimeUtc.Normalize(dto.DataAgendamento),
            CreatedAt = DateTime.UtcNow
        };

        _context.Vistorias.Add(vistoria);
        await _context.SaveChangesAsync(cancellationToken);

        return VistoriaResponseDto.FromEntity(vistoria);
    }

    public async Task<VistoriaResponseDto?> Update(
        int id,
        UpdateVistoriaDto dto,
        CancellationToken cancellationToken = default)
    {
        var vistoria = await _context.Vistorias
            .FirstOrDefaultAsync(v => v.Id == id, cancellationToken);

        if (vistoria is null)
            return null;

        if (dto.Solicitante is not null)
            vistoria.Solicitante = dto.Solicitante.Trim();

        if (dto.Telefone is not null)
            vistoria.Telefone = dto.Telefone.Trim();

        if (dto.Tipo.HasValue)
            vistoria.Tipo = dto.Tipo.Value;

        if (dto.Descricao is not null)
            vistoria.Descricao = dto.Descricao.Trim();

        if (dto.Endereco is not null)
            vistoria.Endereco = dto.Endereco.Trim();

        if (dto.Bairro is not null)
            vistoria.Bairro = string.IsNullOrWhiteSpace(dto.Bairro) ? null : dto.Bairro.Trim();

        if (dto.Municipio is not null)
            vistoria.Municipio = dto.Municipio.Trim();

        if (dto.Status.HasValue)
            vistoria.Status = dto.Status.Value;

        if (dto.Prioridade.HasValue)
            vistoria.Prioridade = dto.Prioridade.Value;

        if (dto.Responsavel is not null)
            vistoria.Responsavel = string.IsNullOrWhiteSpace(dto.Responsavel) ? null : dto.Responsavel.Trim();

        if (dto.Observacoes is not null)
            vistoria.Observacoes = string.IsNullOrWhiteSpace(dto.Observacoes) ? null : dto.Observacoes.Trim();

        if (dto.DataAgendamento.HasValue)
            vistoria.DataAgendamento = DateTimeUtc.Normalize(dto.DataAgendamento.Value);

        if (dto.DataRealizacao.HasValue)
            vistoria.DataRealizacao = DateTimeUtc.Normalize(dto.DataRealizacao.Value);

        if (vistoria.Status == StatusVistoria.Concluida && vistoria.DataRealizacao is null)
            vistoria.DataRealizacao = DateTime.UtcNow;

        vistoria.UpdatedAt = DateTime.UtcNow;
        await _context.SaveChangesAsync(cancellationToken);

        return VistoriaResponseDto.FromEntity(vistoria);
    }

    public async Task<bool> Delete(int id, CancellationToken cancellationToken = default)
    {
        var vistoria = await _context.Vistorias
            .FirstOrDefaultAsync(v => v.Id == id, cancellationToken);

        if (vistoria is null)
            return false;

        _context.Vistorias.Remove(vistoria);
        await _context.SaveChangesAsync(cancellationToken);
        return true;
    }

    private async Task<string> GerarProtocoloAsync(CancellationToken cancellationToken)
    {
        var sequencial = await _context.Database
            .SqlQueryRaw<long>("SELECT nextval('vistoria_protocolo_seq') AS \"Value\"")
            .SingleAsync(cancellationToken);

        return $"VT-{DateTime.UtcNow:yyyyMMdd}-{sequencial:D4}";
    }
}
