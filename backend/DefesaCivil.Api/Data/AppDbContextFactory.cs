using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace DefesaCivil.Api.Data
{
    /// <summary>
    /// Factory usada apenas pelas ferramentas do EF Core (migrations).
    /// Garante que as migrations sejam geradas para PostgreSQL, mesmo quando
    /// o ambiente de desenvolvimento usa SQLite.
    /// </summary>
    public class AppDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
    {
        public AppDbContext CreateDbContext(string[] args)
        {
            var connectionString =
                Environment.GetEnvironmentVariable("ConnectionStrings__Default")
                ?? "Host=localhost;Port=5432;Database=defesa_db;Username=defesa;Password=defesa";

            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseNpgsql(connectionString)
                .Options;

            return new AppDbContext(options);
        }
    }
}
