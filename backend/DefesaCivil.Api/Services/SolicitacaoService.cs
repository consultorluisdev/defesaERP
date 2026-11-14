using DefesaCivil.Api.Data;
using DefesaCivil.Api.DTOs.Solicitacao;
using DefesaCivil.Api.Entities;
using Microsoft.EntityFrameworkCore;

namespace DefesaCivil.Api.Services;

public class SolicitacaoService
{
    private readonly AppDbContext _context;

    public SolicitacaoService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<SolicitacaoResponseDto>> GetAll(
        string? search = null,
        TipoSolicitacao? tipo = null,
        StatusSolicitacao? status = null,
        PrioridadeSolicitacao? prioridade = null,
        CancellationToken cancellationToken = default)
    {
        var query = _context.Solicitacoes.AsNoTracking();

        if (!string.IsNullOrWhiteSpace(search))
        {
            var term = search.Trim();
            query = query.Where(s =>
                EF.Functions.ILike(s.Protocolo, $"%{term}%") ||
                EF.Functions.ILike(s.Solicitante, $"%{term}%") ||
                EF.Functions.ILike(s.Municipio, $"%{term}%") ||
                EF.Functions.ILike(s.Endereco, $"%{term}%"));
        }

        if (tipo.HasValue)
            query = query.Where(s => s.Tipo == tipo.Value);

        if (status.HasValue)
            query = query.Where(s => s.Status == status.Value);

        if (prioridade.HasValue)
            query = query.Where(s => s.Prioridade == prioridade.Value);

        var solicitacoes = await query
            .OrderByDescending(s =>
                s.Prioridade == PrioridadeSolicitacao.Urgente ? 4
                : s.Prioridade == PrioridadeSolicitacao.Alta ? 3
                : s.Prioridade == PrioridadeSolicitacao.Media ? 2
                : 1)
            .ThenByDescending(s => s.CreatedAt)
            .ToListAsync(cancellationToken);

        return solicitacoes.Select(SolicitacaoResponseDto.FromEntity).ToList();
    }

    public async Task<SolicitacaoResponseDto?> GetById(
        int id,
        CancellationToken cancellationToken = default)
    {
        var solicitacao = await _context.Solicitacoes
            .AsNoTracking()
            .FirstOrDefaultAsync(s => s.Id == id, cancellationToken);

        return solicitacao is null ? null : SolicitacaoResponseDto.FromEntity(solicitacao);
    }

    public async Task<SolicitacaoResponseDto> Create(
        CreateSolicitacaoDto dto,
        CancellationToken cancellationToken = default)
    {
        var solicitacao = new Solicitacao
        {
            Protocolo = await GerarProtocoloAsync(cancellationToken),
            Solicitante = dto.Solicitante.Trim(),
            Telefone = dto.Telefone.Trim(),
            Email = string.IsNullOrWhiteSpace(dto.Email) ? null : dto.Email.Trim(),
            Tipo = dto.Tipo,
            Descricao = dto.Descricao.Trim(),
            Endereco = dto.Endereco.Trim(),
            Bairro = string.IsNullOrWhiteSpace(dto.Bairro) ? null : dto.Bairro.Trim(),
            Municipio = dto.Municipio.Trim(),
            Status = StatusSolicitacao.Aberta,
            Prioridade = dto.Prioridade,
            Observacoes = string.IsNullOrWhiteSpace(dto.Observacoes) ? null : dto.Observacoes.Trim(),
            CreatedAt = DateTime.UtcNow
        };

        _context.Solicitacoes.Add(solicitacao);
        await _context.SaveChangesAsync(cancellationToken);

        return SolicitacaoResponseDto.FromEntity(solicitacao);
    }

    public async Task<SolicitacaoResponseDto?> Update(
        int id,
        UpdateSolicitacaoDto dto,
        CancellationToken cancellationToken = default)
    {
        var solicitacao = await _context.Solicitacoes
            .FirstOrDefaultAsync(s => s.Id == id, cancellationToken);

        if (solicitacao is null)
            return null;

        if (dto.Solicitante is not null)
            solicitacao.Solicitante = dto.Solicitante.Trim();

        if (dto.Telefone is not null)
            solicitacao.Telefone = dto.Telefone.Trim();

        if (dto.Email is not null)
            solicitacao.Email = string.IsNullOrWhiteSpace(dto.Email) ? null : dto.Email.Trim();

        if (dto.Tipo.HasValue)
            solicitacao.Tipo = dto.Tipo.Value;

        if (dto.Descricao is not null)
            solicitacao.Descricao = dto.Descricao.Trim();

        if (dto.Endereco is not null)
            solicitacao.Endereco = dto.Endereco.Trim();

        if (dto.Bairro is not null)
            solicitacao.Bairro = string.IsNullOrWhiteSpace(dto.Bairro) ? null : dto.Bairro.Trim();

        if (dto.Municipio is not null)
            solicitacao.Municipio = dto.Municipio.Trim();

        if (dto.Status.HasValue)
            solicitacao.Status = dto.Status.Value;

        if (dto.Prioridade.HasValue)
            solicitacao.Prioridade = dto.Prioridade.Value;

        if (dto.Responsavel is not null)
            solicitacao.Responsavel = string.IsNullOrWhiteSpace(dto.Responsavel) ? null : dto.Responsavel.Trim();

        if (dto.Observacoes is not null)
            solicitacao.Observacoes = string.IsNullOrWhiteSpace(dto.Observacoes) ? null : dto.Observacoes.Trim();

        solicitacao.UpdatedAt = DateTime.UtcNow;
        await _context.SaveChangesAsync(cancellationToken);

        return SolicitacaoResponseDto.FromEntity(solicitacao);
    }

    public async Task<bool> Delete(int id, CancellationToken cancellationToken = default)
    {
        var solicitacao = await _context.Solicitacoes
            .FirstOrDefaultAsync(s => s.Id == id, cancellationToken);

        if (solicitacao is null)
            return false;

        _context.Solicitacoes.Remove(solicitacao);
        await _context.SaveChangesAsync(cancellationToken);
        return true;
    }

    private async Task<string> GerarProtocoloAsync(CancellationToken cancellationToken)
    {
        var sequencial = await _context.Database
            .SqlQueryRaw<long>("SELECT nextval('solicitacao_protocolo_seq') AS \"Value\"")
            .SingleAsync(cancellationToken);

        return $"SC-{DateTime.UtcNow:yyyyMMdd}-{sequencial:D4}";
    }
}
