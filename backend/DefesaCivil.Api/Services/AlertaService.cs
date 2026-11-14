using Microsoft.EntityFrameworkCore;
using DefesaCivil.Api.Common;
using DefesaCivil.Api.DTOs;
using DefesaCivil.Api.Entities;
using DefesaCivil.Api.Data;

namespace DefesaCivil.Api.Services
{
  public class AlertaService
  {
    private readonly AppDbContext _context;

    public AlertaService(AppDbContext context)
    {
      _context = context;
    }

    public async Task<List<AlertaResponseDto>> GetAll()
    {
      var alertas = await _context.Alertas
        .OrderByDescending(a => a.CreatedAt)
        .ToListAsync();

      return alertas.Select(AlertaResponseDto.FromEntity).ToList();
    }

    public async Task<AlertaResponseDto?> GetById(int id)
    {
      var alerta = await _context.Alertas.FindAsync(id);
      return alerta is null ? null : AlertaResponseDto.FromEntity(alerta);
    }

    public async Task<AlertaResponseDto> Create(CreatedAlertaDto dto)
    {
      var alerta = new Alerta
      {
        Titulo = dto.Titulo,
        Descricao = dto.Descricao,
        Tipo = dto.Tipo,
        Nivel = dto.Nivel,
        Status = StatusAlerta.Ativo,
        Cidade = dto.Cidade,
        Latitude = dto.Latitude,
        Longitude = dto.Longitude,
        DataInicio = DateTimeUtc.Normalize(dto.DataInicio) ?? DateTime.UtcNow,
        Responsavel = dto.Responsavel,
        Observacoes = dto.Observacoes,
        CreatedAt = DateTime.UtcNow
      };

      _context.Alertas.Add(alerta);
      await _context.SaveChangesAsync();

      return AlertaResponseDto.FromEntity(alerta);
    }

    public async Task<AlertaResponseDto?> Update(int id, UpdateAlertaDto dto)
    {
      var alerta = await _context.Alertas.FindAsync(id);
      if(alerta is null) return null;

      alerta.Titulo = dto.Titulo ?? alerta.Titulo;
      alerta.Descricao = dto.Descricao ?? alerta.Descricao;
      alerta.Tipo = dto.Tipo ?? alerta.Tipo;
      alerta.Nivel = dto.Nivel ?? alerta.Nivel;
      alerta.Status = dto.Status ?? alerta.Status;
      alerta.Cidade = dto.Cidade ?? alerta.Cidade;
      alerta.Latitude = dto.Latitude ?? alerta.Latitude;
      alerta.Longitude = dto.Longitude ?? alerta.Longitude;
      alerta.Responsavel = dto.Responsavel ?? alerta.Responsavel;
      alerta.Observacoes = dto.Observacoes ?? alerta.Observacoes;

      if(dto.DataInicio.HasValue)
        alerta.DataInicio = DateTimeUtc.Normalize(dto.DataInicio.Value);

      if(dto.DataFim.HasValue)
        alerta.DataFim = DateTimeUtc.Normalize(dto.DataFim.Value);

      if(alerta.Status == StatusAlerta.Encerrado && alerta.DataFim is null)
        alerta.DataFim = DateTime.UtcNow;

      alerta.UpdatedAt = DateTime.UtcNow;

      await _context.SaveChangesAsync();
      return AlertaResponseDto.FromEntity(alerta);
    }

    public async Task<List<AlertaResponseDto>> GetAtivos()
    {
      var alertas = await _context.Alertas
        .Where(a => a.Status == StatusAlerta.Ativo || a.Status == StatusAlerta.Monitorando)
        .OrderByDescending(a => a.CreatedAt)
        .ToListAsync();

      return alertas.Select(AlertaResponseDto.FromEntity).ToList();
    }

    public async Task<List<AlertaResponseDto>> GetByNivel(NivelAlerta nivel)
    {
      var alertas = await _context.Alertas
        .Where(a => a.Nivel == nivel)
        .OrderByDescending(a => a.CreatedAt)
        .ToListAsync();

      return alertas.Select(AlertaResponseDto.FromEntity).ToList();
    }

    public async Task<List<AlertaResponseDto>> GetEncerrados()
    {
      var alertas = await _context.Alertas
        .Where(a => a.Status == StatusAlerta.Encerrado || a.Status == StatusAlerta.Cancelado)
        .OrderByDescending(a => a.DataFim)
        .ToListAsync();

      return alertas.Select(AlertaResponseDto.FromEntity).ToList();
    }

    public async Task<List<AlertaResponseDto>> GetByCidade(string cidade)
    {
      var alertas = await _context.Alertas
        .Where(a => a.Cidade.ToLower().Contains(cidade.ToLower()))
        .OrderByDescending(a => a.CreatedAt)
        .ToListAsync();

      return alertas.Select(AlertaResponseDto.FromEntity).ToList();
    }

    public async Task<bool> Delete(int id)
    {
      var alerta = await _context.Alertas.FindAsync(id);
      if (alerta is null) return false;

      _context.Alertas.Remove(alerta);
      await _context.SaveChangesAsync();
      return true;
    }
  }
}
