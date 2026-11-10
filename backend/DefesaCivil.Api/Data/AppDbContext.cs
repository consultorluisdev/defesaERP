using Microsoft.EntityFrameworkCore;
using DefesaCivil.Api.Entities;
using DefesaCivil.Api.Models;
using DefesaERP.Entities;
using DefesaERP.DTOs;

namespace DefesaCivil.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) :
    base(options)
    { }

    public DbSet<User> Users { get; set; }
    public DbSet<Ocorrencias> Ocorrencias { get; set; }
    public DbSet<Alerta> Alertas { get; set; }
    public DbSet<Equipe> Equipes { get; set; }
    public DbSet<Abrigo> Abrigos { get; set; }
    public DbSet<Cidade> Cidades { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.HasSequence<long>("ocorrencia_protocolo_seq")
            .StartsAt(1)
            .IncrementsBy(1);

        modelBuilder.Entity<User>(entity =>
        {
            entity.Property(u => u.Email).HasMaxLength(256).IsRequired();
            entity.Property(u => u.Role).HasMaxLength(50).IsRequired();
            entity.HasIndex(u => u.Email).IsUnique();
        });

        modelBuilder.Entity<Ocorrencias>()
        .HasIndex(o => o.NumeroProtocolo)
        .IsUnique();

        modelBuilder.Entity<Ocorrencias>()
        .HasIndex(o => o.Status);

        modelBuilder.Entity<Ocorrencias>()
        .HasIndex(o => o.Cidade);

        modelBuilder.Entity<Ocorrencias>()
        .HasIndex(o => o.Prioridade);

        // Configuraçoes de Alerta
        modelBuilder.Entity<Alerta>()
        .HasIndex(a => a.Cidade);

        modelBuilder.Entity<Alerta>()
       .HasIndex(a => a.Status);

        modelBuilder.Entity<Alerta>()
        .HasIndex(a => a.Nivel);

        // configurações de equipes
        modelBuilder.Entity<Equipe>()
       .HasIndex(e => e.Municipio);

        modelBuilder.Entity<Equipe>()
        .HasIndex(e => e.Status);

        modelBuilder.Entity<Equipe>()
       .HasIndex(e => e.Tipo);

        modelBuilder.Entity<Alerta>(entity =>
        {
            entity.Property(a => a.Tipo).HasConversion<string>();
            entity.Property(a => a.Nivel).HasConversion<string>();
            entity.Property(a => a.Status).HasConversion<string>();
        });
    }
}
