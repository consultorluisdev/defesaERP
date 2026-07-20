using Microsoft.EntityFrameworkCore;
using DefesaCivil.Api.Entities;
using DefesaCivil.Api.Models;

namespace DefesaCivil.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) :
    base(options) { }

    public DbSet<User> Users { get; set; }
    public DbSet<Ocorrencias> Ocorrencias { get; set; }
    public DbSet<Alerta> Alertas { get; set; }
    public DbSet<Equipe> Equipes { get; set; }
    public DbSet<Abrigo> Abrigos { get; set; }
    public DbSet<Cidade> Cidades { get; set; }

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
    }
}
