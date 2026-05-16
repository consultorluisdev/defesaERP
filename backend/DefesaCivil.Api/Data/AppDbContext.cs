using Microsoft.EntityFrameworkCore;
using DefesaCivil.Api.Models;
using DefesaCivil.Api.Data;

namespace DefesaCivil.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : 
    base(options) { }

    public DbSet<User> Users { get; set; }
} 