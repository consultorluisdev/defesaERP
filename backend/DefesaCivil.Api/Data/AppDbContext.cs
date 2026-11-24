using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
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

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        base.OnConfiguring(optionsBuilder);

        // As migrations sao geradas com o provider Npgsql (producao). No SQLite
        // de desenvolvimento/teste o snapshot difere apenas nas annotations do
        // provider, entao suprimimos o aviso para permitir o Migrate() local.
        var isSqlite = optionsBuilder.Options.Extensions.Any(extension =>
            extension.Info.IsDatabaseProvider &&
            extension.GetType().Name == "SqliteOptionsExtension");

        if (isSqlite)
        {
            optionsBuilder.ConfigureWarnings(w =>
                w.Ignore(RelationalEventId.PendingModelChangesWarning));
        }
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Ocorrencias> Ocorrencias { get; set; }
    public DbSet<Vistoria> Vistorias { get; set; }
    public DbSet<Viatura> Viaturas { get; set; }
    public DbSet<Alerta> Alertas { get; set; }
    public DbSet<Equipe> Equipes { get; set; }
    public DbSet<Abrigo> Abrigos { get; set; }
    public DbSet<Cidade> Cidades { get; set; }
    public DbSet<Solicitacao> Solicitacoes { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

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

        // Configuracoes de Solicitacao
        modelBuilder.Entity<Solicitacao>(entity =>
        {
            entity.HasIndex(s => s.Protocolo).IsUnique();
            entity.HasIndex(s => s.Status);
            entity.HasIndex(s => s.Prioridade);

            entity.Property(s => s.Tipo).HasConversion<string>();
            entity.Property(s => s.Status).HasConversion<string>();
            entity.Property(s => s.Prioridade).HasConversion<string>();
        });
    }
}
