using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.Logging;

namespace DefesaCivil.Api.Data;

/// <summary>
/// Aplica as migrations do EF Core no startup.
/// O banco SQLite de desenvolvimento foi criado originalmente com EnsureCreated,
/// entao ele nao possui __EFMigrationsHistory. Nesse caso, marcamos as migrations
/// que representam o schema atual como aplicadas antes de rodar Migrate(),
/// evitando tentar recriar tabelas que ja existem.
/// </summary>
public static class DatabaseInitializer
{
    // Migrations existentes quando o banco de dev foi criado por EnsureCreated.
    // Se novas migrations forem adicionadas depois, elas continuam pendentes e
    // serao aplicadas normalmente pelo Migrate().
    private static readonly string[] LegacyBaselineMigrations =
    {
        "20261101175213_InitialCreate",
        "20261120022101_AddSolicitacoes",
        "20261124024857_AddVistorias",      // ajuste para o ID real da migration
        "20261124_AddViaturas"        // ajuste para o ID real da migration
    };

    public static async Task InitializeAsync(
        AppDbContext db,
        ILogger logger,
        bool allowLegacySqliteBaseline)
    {
        var creator = db.GetService<IRelationalDatabaseCreator>();
        var history = db.GetService<IHistoryRepository>();

        var databaseExists = await creator.ExistsAsync();
        var hasTables = databaseExists && await creator.HasTablesAsync();

        if (allowLegacySqliteBaseline && hasTables && !await HasAppliedMigrationsAsync(db, history))
        {
            var hasLegacyOcorrencias = await db.Database
                .SqlQueryRaw<long>(
                    "SELECT COUNT(*) AS \"Value\" FROM sqlite_master WHERE type = 'table' AND name = 'ocorrencias'")
                .SingleAsync() > 0;

            if (hasLegacyOcorrencias)
            {
                logger.LogInformation(
                    "Banco SQLite existente sem historico de migrations. Criando baseline...");

                await db.Database.ExecuteSqlRawAsync(history.GetCreateIfNotExistsScript());

                foreach (var migrationId in LegacyBaselineMigrations)
                {
                    await db.Database.ExecuteSqlRawAsync(
                        history.GetInsertScript(new HistoryRow(migrationId, ProductInfo.GetVersion())));
                }
            }
        }

        await db.Database.MigrateAsync();
    }

    private static async Task<bool> HasAppliedMigrationsAsync(
        AppDbContext db,
        IHistoryRepository history)
    {
        if (!history.Exists())
            return false;

        var applied = await db.Database.GetAppliedMigrationsAsync();
        return applied.Any();
    }
}
