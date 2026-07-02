using Microsoft.EntityFrameworkCore;
using DefesaCivil.Api.Models;
using DefesaCivil.Api.Data;

namespace DefesaCivil.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : 
    base(options) { }

    public DbSet<User> Users { get; set; }
    public DbSet<Alerta> Alertas { get; set; }
    public DbSet<Ocorrencia> Ocorrencias { get; set; }
    public DbSet<Equipe> Equipes { get; set; }
    public DbSet<Abrigo> Abrigos { get; set; }
    public DbSet<Cidade> Cidades { get; set; }
} 