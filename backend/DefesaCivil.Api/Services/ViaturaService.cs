using DefesaCivil.Api.Common;
using DefesaCivil.Api.Data;
using DefesaCivil.Api.DTOs.Viaturas;
using DefesaCivil.Api.Entities;
using Microsoft.EntityFrameworkCore;

namespace DefesaCivil.Api.Services
{
    public class ViaturaService
    {
        private readonly AppDbContext _context;

        public ViaturaService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<ViaturaResponseDto>> GetAll()
        {
            var viaturas = await _context.Viaturas
                .OrderBy(v => v.Prefixo)
                .ToListAsync();

            return viaturas.Select(ToResponseDto).ToList();
        }

        public async Task<ViaturaResponseDto?> GetById(int id)
        {
            var viatura = await _context.Viaturas
                .FirstOrDefaultAsync(v => v.Id == id);

            return viatura == null ? null : ToResponseDto(viatura);
        }

        public async Task<ViaturaResponseDto?> GetByPrefixo(string prefixo)
        {
            var viatura = await _context.Viaturas
                .FirstOrDefaultAsync(v => v.Prefixo == prefixo);

            return viatura == null ? null : ToResponseDto(viatura);
        }

        public async Task<ViaturaResponseDto> Create(CreateViaturaDto dto)
        {
            var viatura = new Viatura
            {
                Prefixo = dto.Prefixo,
                Placa = dto.Placa,
                Modelo = dto.Modelo,
                Marca = dto.Marca,
                Ano = dto.Ano,
                Tipo = dto.Tipo,
                Status = ViaturaStatus.Disponivel,
                KmAtual = dto.KmAtual,
                CapacidadeCombustivel = dto.CapacidadeCombustivel,
                NivelCombustivel = dto.NivelCombustivel,
                UltimaManutencao = DateTimeUtc.Normalize(dto.UltimaManutencao),
                ProximaManutencao = DateTimeUtc.Normalize(dto.ProximaManutencao),
                LocalizacaoAtual = dto.LocalizacaoAtual,
                Responsavel = dto.Responsavel,
                Observacoes = dto.Observacoes,
                CreatedAt = DateTime.UtcNow
            };

            _context.Viaturas.Add(viatura);
            await _context.SaveChangesAsync();

            return ToResponseDto(viatura);
        }

        public async Task<ViaturaResponseDto?> Update(int id, UpdateViaturaDto dto)
        {
            var viatura = await _context.Viaturas
                .FirstOrDefaultAsync(v => v.Id == id);

            if (viatura == null)
                return null;

            viatura.Prefixo = dto.Prefixo ?? viatura.Prefixo;
            viatura.Placa = dto.Placa ?? viatura.Placa;
            viatura.Modelo = dto.Modelo ?? viatura.Modelo;
            viatura.Marca = dto.Marca ?? viatura.Marca;
            viatura.Ano = dto.Ano ?? viatura.Ano;
            viatura.Tipo = dto.Tipo ?? viatura.Tipo;
            viatura.Status = dto.Status ?? viatura.Status;
            viatura.KmAtual = dto.KmAtual ?? viatura.KmAtual;
            viatura.CapacidadeCombustivel = dto.CapacidadeCombustivel ?? viatura.CapacidadeCombustivel;
            viatura.NivelCombustivel = dto.NivelCombustivel ?? viatura.NivelCombustivel;
            viatura.LocalizacaoAtual = dto.LocalizacaoAtual ?? viatura.LocalizacaoAtual;
            viatura.Responsavel = dto.Responsavel ?? viatura.Responsavel;
            viatura.Observacoes = dto.Observacoes ?? viatura.Observacoes;

            if (dto.UltimaManutencao.HasValue)
                viatura.UltimaManutencao = DateTimeUtc.Normalize(dto.UltimaManutencao.Value);

            if (dto.ProximaManutencao.HasValue)
                viatura.ProximaManutencao = DateTimeUtc.Normalize(dto.ProximaManutencao.Value);

            viatura.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return ToResponseDto(viatura);
        }

        public async Task<ViaturaResponseDto?> ChangeStatus(int id, string novoStatus)
        {
            var viatura = await _context.Viaturas
                .FirstOrDefaultAsync(v => v.Id == id);

            if (viatura == null)
                return null;

            viatura.Status = novoStatus;
            viatura.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return ToResponseDto(viatura);
        }

        public async Task<bool> Delete(int id)
        {
            var viatura = await _context.Viaturas
                .FirstOrDefaultAsync(v => v.Id == id);

            if (viatura == null)
                return false;

            _context.Viaturas.Remove(viatura);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<List<ViaturaResponseDto>> GetByStatus(string status)
        {
            var viaturas = await _context.Viaturas
                .Where(v => v.Status == status)
                .OrderBy(v => v.Prefixo)
                .ToListAsync();

            return viaturas.Select(ToResponseDto).ToList();
        }

        public async Task<List<ViaturaResponseDto>> GetByTipo(string tipo)
        {
            var viaturas = await _context.Viaturas
                .Where(v => v.Tipo == tipo)
                .OrderBy(v => v.Prefixo)
                .ToListAsync();

            return viaturas.Select(ToResponseDto).ToList();
        }

        public async Task<List<ViaturaResponseDto>> GetDisponiveis()
        {
            var viaturas = await _context.Viaturas
                .Where(v => v.Status == ViaturaStatus.Disponivel)
                .OrderBy(v => v.Prefixo)
                .ToListAsync();

            return viaturas.Select(ToResponseDto).ToList();
        }

        public async Task<List<ViaturaResponseDto>> GetManutencaoVencida()
        {
            var hoje = DateTime.UtcNow;

            var viaturas = await _context.Viaturas
                .Where(v => v.ProximaManutencao != null && v.ProximaManutencao <= hoje)
                .OrderBy(v => v.ProximaManutencao)
                .ToListAsync();

            return viaturas.Select(ToResponseDto).ToList();
        }

        private ViaturaResponseDto ToResponseDto(Viatura viatura)
        {
            return new ViaturaResponseDto
            {
                Id = viatura.Id,
                Prefixo = viatura.Prefixo,
                Placa = viatura.Placa,
                Modelo = viatura.Modelo,
                Marca = viatura.Marca,
                Ano = viatura.Ano,
                Tipo = viatura.Tipo,
                Status = viatura.Status,
                KmAtual = viatura.KmAtual,
                CapacidadeCombustivel = viatura.CapacidadeCombustivel,
                NivelCombustivel = viatura.NivelCombustivel,
                UltimaManutencao = viatura.UltimaManutencao,
                ProximaManutencao = viatura.ProximaManutencao,
                LocalizacaoAtual = viatura.LocalizacaoAtual,
                Responsavel = viatura.Responsavel,
                Observacoes = viatura.Observacoes,
                CreatedAt = viatura.CreatedAt,
                UpdatedAt = viatura.UpdatedAt
            };
        }
    }
}
