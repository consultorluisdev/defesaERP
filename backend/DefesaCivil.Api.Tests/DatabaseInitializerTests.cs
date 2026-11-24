using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using DefesaCivil.Api.Data;
using DefesaCivil.Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging.Abstractions;
using Xunit;

namespace DefesaCivil.Api.Tests;

public class DatabaseInitializerTests
{
    private static DbContextOptions<AppDbContext> CreateOptions(string path) =>
        new DbContextOptionsBuilder<AppDbContext>()
            .UseSqlite($"Data Source={path};Pooling=False")
            .Options;

    private static string CreateTempPath() =>
        Path.Combine(Path.GetTempPath(), $"defesa-migrations-{Guid.NewGuid():N}.db");

    private static void DeleteDatabase(string path)
    {
        foreach (var file in new[] { path, path + "-shm", path + "-wal" })
        {
            try
            {
                if (File.Exists(file))
                    File.Delete(file);
            }
            catch (IOException)
            {
                // Best effort: o SQLite pode manter o arquivo aberto por alguns instantes.
            }
        }
    }

    [Fact]
    public async Task InitializeAsync_FreshDatabase_AppliesAllMigrations()
    {
        var path = CreateTempPath();

        try
        {
            await using var db = new AppDbContext(CreateOptions(path));

            await DatabaseInitializer.InitializeAsync(
                db,
                NullLogger.Instance,
                allowLegacySqliteBaseline: true);

            var applied = (await db.Database.GetAppliedMigrationsAsync()).ToList();
            Assert.Contains("20261101175213_InitialCreate", applied);
            Assert.Contains("20261120022101_AddSolicitacoes", applied);

            // As tabelas do modelo atual existem e sao consultaveis.
            Assert.False(await db.Ocorrencias.AnyAsync());
            Assert.False(await db.Solicitacoes.AnyAsync());
            Assert.False(await db.Users.AnyAsync());
        }
        finally
        {
            DeleteDatabase(path);
        }
    }

    [Fact]
    public async Task InitializeAsync_LegacyEnsureCreatedDatabase_BaselinesAndPreservesData()
    {
        var path = CreateTempPath();

        try
        {
            await using (var legacy = new AppDbContext(CreateOptions(path)))
            {
                await legacy.Database.EnsureCreatedAsync();

                legacy.Users.Add(new User
                {
                    Email = "legado@defesa.sc",
                    PasswordHash = "hash-legado"
                });
                await legacy.SaveChangesAsync();

                Assert.Empty(await legacy.Database.GetAppliedMigrationsAsync());
            }

            await using var db = new AppDbContext(CreateOptions(path));

            await DatabaseInitializer.InitializeAsync(
                db,
                NullLogger.Instance,
                allowLegacySqliteBaseline: true);

            var applied = (await db.Database.GetAppliedMigrationsAsync()).ToList();
            Assert.Contains("20261101175213_InitialCreate", applied);
            Assert.Contains("20261120022101_AddSolicitacoes", applied);

            var user = await db.Users.SingleAsync();
            Assert.Equal("legado@defesa.sc", user.Email);
            Assert.Equal("hash-legado", user.PasswordHash);
        }
        finally
        {
            DeleteDatabase(path);
        }
    }

    [Fact]
    public async Task InitializeAsync_CanRunTwice()
    {
        var path = CreateTempPath();

        try
        {
            await using var db = new AppDbContext(CreateOptions(path));

            await DatabaseInitializer.InitializeAsync(
                db,
                NullLogger.Instance,
                allowLegacySqliteBaseline: true);

            await DatabaseInitializer.InitializeAsync(
                db,
                NullLogger.Instance,
                allowLegacySqliteBaseline: true);

            var applied = (await db.Database.GetAppliedMigrationsAsync()).ToList();
            Assert.True(applied.Count >= 2, $"Esperava pelo menos 2 migrations, mas encontrou {applied.Count}");
            
        }
        finally
        {
            DeleteDatabase(path);
        }
    }
}
