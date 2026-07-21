using Microsoft.EntityFrameworkCore;
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
        DataInicio = dto.DataInicio ?? DateTime.UtcNow,
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

      alerta.Titulo = dto.Titulo;
      alerta.Descricao = dto.Descricao;
      alerta.Tipo = dto.Tipo;
      alerta.Nivel = dto.Nivel;
      alerta.Status = dto.Status;
      alerta.Cidade = dto.Cidade;
      alerta.Latitude = dto.Latitude;
      alerta.Longitude = dto.Longitude;
      alerta.DataFim = dto.DataFim;
      alerta.Responsavel = dto.Responsavel;
      alerta.Observacoes = dto.Observacoes;
      alerta.UpdatedAt = DateTime.UtcNow;

      if(dto.Status == StatusAlerta.Encerrado && alerta.DataFim is null)
        alerta.DataFim = DateTime.UtcNow;

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
  }
}
