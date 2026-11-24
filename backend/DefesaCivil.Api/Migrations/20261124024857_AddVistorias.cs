using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace DefesaCivil.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddVistorias : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "viaturas",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    prefixo = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    placa = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: false),
                    modelo = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    marca = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    ano = table.Column<int>(type: "integer", nullable: false),
                    tipo = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    status = table.Column<string>(type: "character varying(30)", maxLength: 30, nullable: false),
                    km_atual = table.Column<int>(type: "integer", nullable: false),
                    capacidade_combustivel = table.Column<double>(type: "double precision", nullable: false),
                    nivel_combustivel = table.Column<double>(type: "double precision", nullable: false),
                    ultima_manutencao = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    proxima_manutencao = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    localizacao_atual = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    responsavel = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    observacoes = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_viaturas", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "vistorias",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    protocolo = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    tipo_vistoria = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    status = table.Column<string>(type: "character varying(30)", maxLength: 30, nullable: false),
                    prioridade = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    ocorrencia_id = table.Column<int>(type: "integer", nullable: true),
                    solicitacao_id = table.Column<int>(type: "integer", nullable: true),
                    equipe_id = table.Column<int>(type: "integer", nullable: true),
                    endereco = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    bairro = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    cidade = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    latitude = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    longitude = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    descricao = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    parecer = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    nivel_risco = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    recomendacoes = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    data_agendamento = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    data_inicio = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    data_conclusao = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    responsavel = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    observacoes = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_vistorias", x => x.id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "viaturas");

            migrationBuilder.DropTable(
                name: "vistorias");
        }
    }
}
