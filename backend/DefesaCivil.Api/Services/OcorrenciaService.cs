using DefesaCivil.Api.Common;
using DefesaCivil.Api.Data;
using DefesaCivil.Api.DTOs.Ocorrencia;
using DefesaCivil.DTOs;
using DefesaCivil.Api.Entities;
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

        public async Task<List<OcorrenciaResponseDto>> GetAll()
        {
            var ocorrencias = await _context.Ocorrencias
                .OrderByDescending(o => o.CreateAt)
                .ToListAsync();


            return ocorrencias.Select(ToResponseDto).ToList();
        }

        public async Task<OcorrenciaResponseDto?> GetById(int id)
        {
            var ocorrencia = await _context.Ocorrencias
                .FirstOrDefaultAsync(o => o.Id == id);
            
            if(ocorrencia == null)
                return null;
            return ToResponseDto(ocorrencia);
        }
        public async Task<OcorrenciaResponseDto> Create(CreateOcorrenciaDto dto)
        {
            var ocorrencia = new Ocorrencias
            {
                NumeroProtocolo = await GerarNumeroProtocoloAsync(),
                TipoOcorrencia = dto.TipoOcorrencia,
                Descricao = dto.Descricao,
                Cidade = dto.Cidade,
                Bairro = dto.Bairro,
                Endereco = dto.Endereco,
                Latitude = dto.Latitude ?? string.Empty,
                Longitude = dto.Longitude ?? string.Empty,
                Status = OcorrenciaStatus.Aberta,
                Prioridade = dto.Prioridade,
                Responsavel = dto.Responsavel ?? string.Empty,
                TelefoneSolicitante = dto.TelefoneSolicitante ?? string.Empty,
                NomeSolicitante = dto.NomeSolicitante ?? string.Empty,
                Observacoes = dto.Observacoes ?? string.Empty,
                DataHora = DateTimeUtc.Normalize(dto.DataHora!.Value),
                CreateAt = DateTime.UtcNow,
                UpdateAt = DateTime.UtcNow
            };

            _context.Ocorrencias.Add(ocorrencia);
            await _context.SaveChangesAsync();

            return ToResponseDto(ocorrencia);
        }
        public async Task<OcorrenciaResponseDto?> Update(int id, UpdateOcorrenciaDto dto)
        {
            var ocorrencia = await _context.Ocorrencias
            .FirstOrDefaultAsync(o => o.Id == id);

            if(ocorrencia == null)
                return null;

            ocorrencia.TipoOcorrencia = dto.TipoOcorrencia ?? ocorrencia.TipoOcorrencia;
            ocorrencia.Descricao = dto.Descricao ?? ocorrencia.Descricao;
            ocorrencia.Cidade = dto.Cidade ?? ocorrencia.Cidade;
            ocorrencia.Bairro = dto.Bairro ?? ocorrencia.Bairro;
            ocorrencia.Endereco = dto.Endereco ?? ocorrencia.Endereco;
            ocorrencia.Latitude = dto.Latitude ?? ocorrencia.Latitude;
            ocorrencia.Longitude = dto.Longitude ?? ocorrencia.Longitude;
            ocorrencia.Status = dto.Status ?? ocorrencia.Status;
            ocorrencia.Prioridade = dto.Prioridade ?? ocorrencia.Prioridade;
            ocorrencia.Responsavel = dto.Responsavel ?? ocorrencia.Responsavel;
            ocorrencia.TelefoneSolicitante = dto.TelefoneSolicitante ?? ocorrencia.TelefoneSolicitante;
            ocorrencia.NomeSolicitante = dto.NomeSolicitante ?? ocorrencia.NomeSolicitante;
            ocorrencia.Observacoes = dto.Observacoes ?? ocorrencia.Observacoes;

            if (dto.DataOcorrencia.HasValue)
                ocorrencia.DataHora = DateTimeUtc.Normalize(dto.DataOcorrencia.Value);

            ocorrencia.UpdateAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return ToResponseDto(ocorrencia);
        }
        public async Task<bool> Delete(int id)
        {
            var ocorrencia = await _context.Ocorrencias
                .FirstOrDefaultAsync(o => o.Id == id);

            if(ocorrencia == null)
                return false;

            _context.Ocorrencias.Remove(ocorrencia);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<List<OcorrenciaResponseDto>> GetByStatus(string status)
        {
            var ocorrencias = await _context.Ocorrencias
                .Where(o => o.Status == status)
                .OrderByDescending(o => o.CreateAt)
                .ToListAsync();

            return ocorrencias.Select(ToResponseDto).ToList();
        }
        public async Task<List<OcorrenciaResponseDto>> GetByCidade(string cidade)
        {
            var ocorrencias = await _context.Ocorrencias
                .Where(o => o.Cidade.ToLower() == cidade.ToLower())
                .OrderByDescending(o => o.CreateAt)
                .ToListAsync();

            return ocorrencias.Select(ToResponseDto).ToList();
        }
        public async Task<List<OcorrenciaResponseDto>> GetByPrioridade(string prioridade)
        {
            var ocorrencias = await _context.Ocorrencias
                .Where(o => o.Prioridade == prioridade)
                .OrderByDescending(o => o.CreateAt)
                .ToListAsync();
            
            return ocorrencias.Select(ToResponseDto).ToList();
        }
         
        public async Task<List<OcorrenciaResponseDto>> GetOcorrenciasAbertas()
        {
            var ocorrencias = await _context.Ocorrencias
                .Where(o => o.Status == OcorrenciaStatus.Aberta || 
                            o.Status == OcorrenciaStatus.EmAndamento)
                .OrderByDescending(o => o.Prioridade == OcorrenciaPrioridade.Critica ? 4
                    : o.Prioridade == OcorrenciaPrioridade.Alta ? 3
                    : o.Prioridade == OcorrenciaPrioridade.Media ? 2
                    : o.Prioridade == OcorrenciaPrioridade.Baixa ? 1 : 0)
                .ThenByDescending(o => o.CreateAt)
                .ToListAsync();

            return ocorrencias.Select(ToResponseDto).ToList();
        }
        
        public async Task<List<OcorrenciaResponseDto>> GetUltimasOcorrencias(int quantidade)
        {
            var ocorrencias = await _context.Ocorrencias
                .OrderByDescending(o => o.CreateAt)
                .Take(quantidade)
                .ToListAsync();

            return ocorrencias.Select(ToResponseDto).ToList();
        }
        private async Task<string> GerarNumeroProtocoloAsync()
        {
            var sequencial = await _context.Database
                .SqlQueryRaw<long>("SELECT nextval('ocorrencia_protocolo_seq') AS \"Value\"")
                .SingleAsync();

            var agora = DateTime.UtcNow;

            return $"OC-{agora:yyyyMMdd}-{sequencial:D4}";
        }
        private OcorrenciaResponseDto ToResponseDto(Ocorrencias ocorrencia)
        {
            return new OcorrenciaResponseDto
            {
                Id = ocorrencia.Id,
                NumeroProtocolo = ocorrencia.NumeroProtocolo,
                TipoOcorrencia = ocorrencia.TipoOcorrencia,
                Descricao = ocorrencia.Descricao,
                Cidade = ocorrencia.Cidade,
                Bairro = ocorrencia.Bairro,
                Endereco = ocorrencia.Endereco,
                Latitude = ocorrencia.Latitude,
                Longitude = ocorrencia.Longitude,
                Status = ocorrencia.Status,
                Prioridade = ocorrencia.Prioridade,
                Responsavel = ocorrencia.Responsavel,
                TelefoneSolicitante = ocorrencia.TelefoneSolicitante,
                NomeSolicitante = ocorrencia.NomeSolicitante,
                Observacoes = ocorrencia.Observacoes,
                DataHora = ocorrencia.DataHora,
                CreatedAt = ocorrencia.CreateAt,
                UpdatedAt = ocorrencia.UpdateAt
            };
        }
        
    }

}