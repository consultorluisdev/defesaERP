using DefesaCivil.Api.Common;
using DefesaCivil.Api.Data;
using DefesaCivil.Api.DTOs.Vistorias;
using DefesaCivil.Api.Entities;
using Microsoft.EntityFrameworkCore;

namespace DefesaCivil.Api.Services
{
    public class VistoriaService
    {
        private readonly AppDbContext _context;

        public VistoriaService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<VistoriaResponseDto>> GetAll()
        {
            var vistorias = await _context.Vistorias
                .OrderByDescending(v => v.CreatedAt)
                .ToListAsync();

            return vistorias.Select(ToResponseDto).ToList();
        }

        public async Task<VistoriaResponseDto?> GetById(int id)
        {
            var vistoria = await _context.Vistorias
                .FirstOrDefaultAsync(v => v.Id == id);

            return vistoria == null ? null : ToResponseDto(vistoria);
        }

        public async Task<VistoriaResponseDto> Create(CreateVistoriaDto dto)
        {
            var now = DateTime.UtcNow;

            await using var tx = await _context.Database.BeginTransactionAsync();

            var vistoria = new Vistoria
            {
                // Protocolo temporário único (<= 20 chars)
                Protocolo = "TMP-" + Guid.NewGuid().ToString("N")[..12],
                TipoVistoria = dto.TipoVistoria,
                Status = VistoriaStatus.Pendente,
                Prioridade = dto.Prioridade,
                OcorrenciaId = dto.OcorrenciaId,
                SolicitacaoId = dto.SolicitacaoId,
                EquipeId = dto.EquipeId,
                Endereco = dto.Endereco,
                Bairro = dto.Bairro,
                Cidade = dto.Cidade,
                Latitude = dto.Latitude,
                Longitude = dto.Longitude,
                Descricao = dto.Descricao,
                DataAgendamento = DateTimeUtc.Normalize(dto.DataAgendamento),
                Responsavel = dto.Responsavel,
                Observacoes = dto.Observacoes,
                CreatedAt = now
            };

            _context.Vistorias.Add(vistoria);
            await _context.SaveChangesAsync();

            vistoria.Protocolo = $"VST-{now:yyyyMMdd}-{vistoria.Id:D4}";

            await _context.SaveChangesAsync();
            await tx.CommitAsync();

            return ToResponseDto(vistoria);
        }

        public async Task<VistoriaResponseDto?> Update(int id, UpdateVistoriaDto dto)
        {
            var vistoria = await _context.Vistorias
                .FirstOrDefaultAsync(v => v.Id == id);

            if (vistoria == null)
                return null;

            vistoria.TipoVistoria = dto.TipoVistoria ?? vistoria.TipoVistoria;
            vistoria.Status = dto.Status ?? vistoria.Status;
            vistoria.Prioridade = dto.Prioridade ?? vistoria.Prioridade;
            vistoria.OcorrenciaId = dto.OcorrenciaId ?? vistoria.OcorrenciaId;
            vistoria.SolicitacaoId = dto.SolicitacaoId ?? vistoria.SolicitacaoId;
            vistoria.EquipeId = dto.EquipeId ?? vistoria.EquipeId;
            vistoria.Endereco = dto.Endereco ?? vistoria.Endereco;
            vistoria.Bairro = dto.Bairro ?? vistoria.Bairro;
            vistoria.Cidade = dto.Cidade ?? vistoria.Cidade;
            vistoria.Latitude = dto.Latitude ?? vistoria.Latitude;
            vistoria.Longitude = dto.Longitude ?? vistoria.Longitude;
            vistoria.Descricao = dto.Descricao ?? vistoria.Descricao;
            vistoria.Parecer = dto.Parecer ?? vistoria.Parecer;
            vistoria.NivelRisco = dto.NivelRisco ?? vistoria.NivelRisco;
            vistoria.Recomendacoes = dto.Recomendacoes ?? vistoria.Recomendacoes;
            vistoria.Responsavel = dto.Responsavel ?? vistoria.Responsavel;
            vistoria.Observacoes = dto.Observacoes ?? vistoria.Observacoes;

            if (dto.DataAgendamento.HasValue)
                vistoria.DataAgendamento = DateTimeUtc.Normalize(dto.DataAgendamento.Value);

            if (dto.DataInicio.HasValue)
                vistoria.DataInicio = DateTimeUtc.Normalize(dto.DataInicio.Value);

            if (dto.DataConclusao.HasValue)
                vistoria.DataConclusao = DateTimeUtc.Normalize(dto.DataConclusao.Value);

            vistoria.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return ToResponseDto(vistoria);
        }

        public async Task<VistoriaResponseDto?> ChangeStatus(int id, string novoStatus)
        {
            var vistoria = await _context.Vistorias
                .FirstOrDefaultAsync(v => v.Id == id);

            if (vistoria == null)
                return null;

            vistoria.Status = novoStatus;

            if (novoStatus == VistoriaStatus.EmAndamento && vistoria.DataInicio == null)
                vistoria.DataInicio = DateTime.UtcNow;

            if (novoStatus == VistoriaStatus.Concluida && vistoria.DataConclusao == null)
                vistoria.DataConclusao = DateTime.UtcNow;

            vistoria.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return ToResponseDto(vistoria);
        }

        public async Task<bool> Delete(int id)
        {
            var vistoria = await _context.Vistorias
                .FirstOrDefaultAsync(v => v.Id == id);

            if (vistoria == null)
                return false;

            _context.Vistorias.Remove(vistoria);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<List<VistoriaResponseDto>> GetByStatus(string status)
        {
            var vistorias = await _context.Vistorias
                .Where(v => v.Status == status)
                .OrderByDescending(v => v.CreatedAt)
                .ToListAsync();

            return vistorias.Select(ToResponseDto).ToList();
        }

        public async Task<List<VistoriaResponseDto>> GetByPrioridade(string prioridade)
        {
            var vistorias = await _context.Vistorias
                .Where(v => v.Prioridade == prioridade)
                .OrderByDescending(v => v.CreatedAt)
                .ToListAsync();

            return vistorias.Select(ToResponseDto).ToList();
        }

        public async Task<List<VistoriaResponseDto>> GetPendentes()
        {
            var vistorias = await _context.Vistorias
                .Where(v => v.Status == VistoriaStatus.Pendente)
                .OrderBy(v =>
                    v.Prioridade == VistoriaPrioridade.Critica ? 0 :
                    v.Prioridade == VistoriaPrioridade.Alta ? 1 :
                    v.Prioridade == VistoriaPrioridade.Media ? 2 : 3)
                .ThenByDescending(v => v.DataAgendamento)
                .ToListAsync();

            return vistorias.Select(ToResponseDto).ToList();
        }

        private VistoriaResponseDto ToResponseDto(Vistoria vistoria)
        {
            return new VistoriaResponseDto
            {
                Id = vistoria.Id,
                Protocolo = vistoria.Protocolo,
                TipoVistoria = vistoria.TipoVistoria,
                Status = vistoria.Status,
                Prioridade = vistoria.Prioridade,
                OcorrenciaId = vistoria.OcorrenciaId,
                SolicitacaoId = vistoria.SolicitacaoId,
                EquipeId = vistoria.EquipeId,
                Endereco = vistoria.Endereco,
                Bairro = vistoria.Bairro,
                Cidade = vistoria.Cidade,
                Latitude = vistoria.Latitude,
                Longitude = vistoria.Longitude,
                Descricao = vistoria.Descricao,
                Parecer = vistoria.Parecer,
                NivelRisco = vistoria.NivelRisco,
                Recomendacoes = vistoria.Recomendacoes,
                DataAgendamento = vistoria.DataAgendamento,
                DataInicio = vistoria.DataInicio,
                DataConclusao = vistoria.DataConclusao,
                CreatedAt = vistoria.CreatedAt,
                UpdatedAt = vistoria.UpdatedAt,
                Responsavel = vistoria.Responsavel,
                Observacoes = vistoria.Observacoes
            };
        }
    }
}
