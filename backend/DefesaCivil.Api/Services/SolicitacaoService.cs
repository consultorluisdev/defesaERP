using DefesaCivil.Api.Data;
using DefesaCivil.Api.DTOs.Solicitacoes;
using DefesaCivil.Api.Entities;
using Microsoft.EntityFrameworkCore;

namespace DefesaCivil.Api.Services
{
    public class SolicitacaoService
    {
        private const int MaxProtocolAttempts = 5;

        private readonly AppDbContext _context;

        public SolicitacaoService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<SolicitacaoResponseDto>> GetAllAsync()
        {
            var solicitacoes = await _context.Solicitacoes
                .AsNoTracking()
                .OrderByDescending(s => s.CreatedAt)
                .ThenByDescending(s => s.Id)
                .ToListAsync();

            return solicitacoes.Select(ToResponseDto).ToList();
        }

        public async Task<SolicitacaoResponseDto?> GetByIdAsync(int id)
        {
            var solicitacao = await _context.Solicitacoes
                .AsNoTracking()
                .FirstOrDefaultAsync(s => s.Id == id);

            return solicitacao is null ? null : ToResponseDto(solicitacao);
        }

        public async Task<SolicitacaoResponseDto> CreateAsync(CreateSolicitacaoDto dto)
        {
            var solicitacao = new Solicitacao
            {
                Solicitante = NormalizeRequired(dto.Solicitante),
                Telefone = NormalizeRequired(dto.Telefone),
                Email = NormalizeOptional(dto.Email),
                Tipo = dto.Tipo!.Value,
                Descricao = NormalizeRequired(dto.Descricao),
                Endereco = NormalizeRequired(dto.Endereco),
                Bairro = NormalizeOptional(dto.Bairro),
                Municipio = NormalizeRequired(dto.Municipio),
                Status = StatusSolicitacao.Aberta,
                Prioridade = dto.Prioridade!.Value,
                Observacoes = NormalizeOptional(dto.Observacoes),
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = null
            };

            for (var attempt = 1; attempt <= MaxProtocolAttempts; attempt++)
            {
                solicitacao.Protocolo = GenerateProtocol();

                _context.Solicitacoes.Add(solicitacao);

                try
                {
                    await _context.SaveChangesAsync();
                    return ToResponseDto(solicitacao);
                }
                catch (DbUpdateException) when (attempt < MaxProtocolAttempts)
                {
                    // O índice único de Protocolo é a garantia final contra concorrência.
                    // Em caso de colisão, descartamos a entidade e tentamos outro protocolo.
                    _context.Entry(solicitacao).State = EntityState.Detached;
                }
            }

            throw new InvalidOperationException("Não foi possível gerar um protocolo único para a solicitação.");
        }

        public async Task<SolicitacaoResponseDto?> UpdateAsync(int id, UpdateSolicitacaoDto dto)
        {
            var solicitacao = await _context.Solicitacoes
                .FirstOrDefaultAsync(s => s.Id == id);

            if (solicitacao is null)
                return null;

            solicitacao.Solicitante = NormalizeRequired(dto.Solicitante);
            solicitacao.Telefone = NormalizeRequired(dto.Telefone);
            solicitacao.Email = NormalizeOptional(dto.Email);
            solicitacao.Tipo = dto.Tipo!.Value;
            solicitacao.Descricao = NormalizeRequired(dto.Descricao);
            solicitacao.Endereco = NormalizeRequired(dto.Endereco);
            solicitacao.Bairro = NormalizeOptional(dto.Bairro);
            solicitacao.Municipio = NormalizeRequired(dto.Municipio);
            solicitacao.Status = dto.Status!.Value;
            solicitacao.Prioridade = dto.Prioridade!.Value;
            solicitacao.Responsavel = NormalizeOptional(dto.Responsavel);
            solicitacao.Observacoes = NormalizeOptional(dto.Observacoes);
            solicitacao.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return ToResponseDto(solicitacao);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var solicitacao = await _context.Solicitacoes
                .FirstOrDefaultAsync(s => s.Id == id);

            if (solicitacao is null)
                return false;

            _context.Solicitacoes.Remove(solicitacao);
            await _context.SaveChangesAsync();

            return true;
        }

        private static string GenerateProtocol()
        {
            var timestamp = DateTime.UtcNow.ToString("yyyyMMddHHmmssfff");
            var suffix = Guid.NewGuid().ToString("N")[..8].ToUpperInvariant();

            return $"SOL-{timestamp}-{suffix}";
        }

        private static string NormalizeRequired(string? value)
            => (value ?? string.Empty).Trim();

        private static string? NormalizeOptional(string? value)
            => string.IsNullOrWhiteSpace(value) ? null : value.Trim();

        private static SolicitacaoResponseDto ToResponseDto(Solicitacao solicitacao)
        {
            return new SolicitacaoResponseDto
            {
                Id = solicitacao.Id,
                Protocolo = solicitacao.Protocolo,
                Solicitante = solicitacao.Solicitante,
                Telefone = solicitacao.Telefone,
                Email = solicitacao.Email,
                Tipo = solicitacao.Tipo,
                Descricao = solicitacao.Descricao,
                Endereco = solicitacao.Endereco,
                Bairro = solicitacao.Bairro,
                Municipio = solicitacao.Municipio,
                Status = solicitacao.Status,
                Prioridade = solicitacao.Prioridade,
                Responsavel = solicitacao.Responsavel,
                Observacoes = solicitacao.Observacoes,
                CreatedAt = DateTime.SpecifyKind(solicitacao.CreatedAt, DateTimeKind.Utc),
                UpdatedAt = solicitacao.UpdatedAt.HasValue
                    ? DateTime.SpecifyKind(solicitacao.UpdatedAt.Value, DateTimeKind.Utc)
                    : null
            };
        }
    }
}
