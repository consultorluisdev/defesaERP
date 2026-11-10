# Plano de Execução — defesaERP

> Documento vivo. Atualizar ao concluir cada lote/fase.
> Ordem acordada: **1 → 2 → 3 → 4 → 5 → 7 → 8 → 6** (Rust/IA por último).

## Status atual

- Ambiente local operacional: PostgreSQL 5436, backend 8080, frontend 5173 (`C:\Users\10392692902\.defesaERP\start.ps1`).
- Migration `20261110013323_EquipeOptionalFields` aplicada; 3 migrations no histórico, 0 pendentes.
- **Lote 1 — Ocorrência** concluído (contrato `createdAt/updatedAt` + validação de `DataHora`).
- **Lote 2 — Equipe** concluído (campos opcionais + `Descricao` 500 + migration aplicada).
- Build do backend: **0 erros**; avisos restantes de pacotes (`NU1902`/`NU1903`) e `ForwardedHeaders` (`ASPDEPR005`).
- Auditoria backend concluída (P0/P1) e plano de 8 fases definido.

## Decisões já tomadas

- CRUD completo de Solicitações, Vistorias e Riscos.
- Seed de administrador via variáveis de ambiente.
- Alvo principal: ambiente local (`start.ps1`); Docker para teste em casa.
- Python/IA será removido; **agentes em Rust**, porém **somente o agente de criação de documentos**.
- **Rust por último de tudo** (Fase 6 no fim).
- O agente de documentos escreve **relatórios sobre as vistorias/auditorias do nosso trabalho** (a confirmar escopo exato).

## Decisões pendentes

1. **Escopo do frontend**: (recomendado) somente módulos com backend — Ocorrências, Alertas, Equipes, Solicitações, Vistorias, Riscos, Dashboard e Auth. Abrigos, Viaturas, Relatórios, Análises, Perfis, Configurações e Radar ficam para depois.
2. **“Vistorias” do agente**: auditorias do nosso trabalho (recomendado) ou o módulo Vistorias (CRUD)?
3. **Agente de documentos**: gerador determinístico (recomendado: offline, barato, reproduzível) ou LLM via Ollama local?
4. **Monitoramento/Radar sem agente de monitoramento**:
   - A) Remover do escopo agora (recomendado, coerente com “só doc agent”);
   - B) Implementar clima direto no .NET (OpenWeatherMap) e aposentar o Python;
   - C) Manter o Python provisoriamente apenas para monitoramento.

## Fase 1 — Fundação/ambiente (concluída)

- `start.ps1`, PostgreSQL local 5436, backend 8080, frontend 5173.
- Fail-fast de configuração (`ConnectionStrings__Default`, `Jwt__Key`).
- `/health`, `ProblemDetails`, `ForwardedHeaders`.

## Fase 2 — Fechar backend P0 (em andamento)

### Lote 3 — Alerta (próximo)

- `DTOs/Alerta/AlertaDtos.cs`: `UpdateAlertaDto` com `Status?`, `DataInicio?`, `[Required]`/`[MaxLength]`.
- `Services/AlertaService.cs`: update parcial (aplicar apenas campos enviados), preservar regra de `DataFim`.
- Smoke: criar alerta, atualizar só `Status`, atualizar `DataInicio`, listar.
- **Pronto**: build 0 erros + smoke ok.

### Lote 4 — Program/segurança

- `Program.cs`: `UseHttpsRedirection` somente fora de Development.
- Rate limit configurável (`RateLimit:AuthPermitLimit`, padrão 5).
- Adicionar `public partial class Program { }` (necessário para testes de integração).
- Revisar `ForwardedHeaders` (aviso `ASPDEPR005`).
- **Pronto**: build 0 erros; `/health` 200; auth sem 429 indevido.

## Fase 3 — CRUD Solicitações / Vistorias / Riscos

### Entities (`backend/DefesaCivil.Api/Entities/`)

- `Solicitacao.cs`, `Vistoria.cs`, `Risco.cs` com enums do frontend, `CreatedAt/UpdatedAt` em UTC, índices (status/prioridade/municipio).
- Sequences `solicitacao_protocolo_seq` e `vistoria_protocolo_seq`.

### DTOs (`backend/DefesaCivil.Api/DTOs/{Solicitacao,Vistoria,Risco}/`)

- Create/Update/Response; campos opcionais nullable; validações (`IValidatableObject` quando necessário).

### Services (`backend/DefesaCivil.Api/Services/`)

- `GetAll(filtros)`, `GetById`, `Create`, `Update` parcial, `Delete`.
- Busca com `EF.Functions.ILike` (Postgres).

### Controllers (`backend/DefesaCivil.Api/Controllers/`)

- `SolicitacoesController` → `api/Solicitacoes`
- `VistoriasController` → `api/Vistorias`
- `RiscoController` → `api/Risco` (casar com o frontend) **ou** padronizar `/Riscos` e ajustar `riscoService.ts`.

### Persistência

- `Data/AppDbContext.cs`: DbSets, sequences e índices.
- Migration `AddSolicitacoesVistoriasRiscos` + `database update`.
- Smoke por módulo (create/list/update/delete).
- **Pronto**: 3 CRUDs funcionando via API + migration aplicada.

## Fase 4 — Robustez/segurança

- `[Authorize]` no `MonitoramentoController` (se ele permanecer).
- Paginação + `CancellationToken` em services/controllers.
- `ILike` em todas as buscas.
- Atualizar pacotes vulneráveis: `Microsoft.OpenApi` e `System.Security.Cryptography.Pkcs` (zerar `NU1902`/`NU1903`).
- Revisar rota singular/plural de Risco e `ForwardedHeaders`.
- **Pronto**: build sem `NU1902`/`NU1903`; endpoints protegidos.

## Fase 5 — Frontend

- `contexts/AuthContext.tsx` + `services/api.ts`: guardar `refreshToken`, decodificar usuário do JWT, refresh automático no 401 (com fila de requisições) e logout se o refresh falhar.
- Alinhar tipos/enums (Risco: nível/status) e ligar a tela de Riscos ao backend.
- Página 404, loading/erro/toasts consistentes, responsividade.
- **Pronto**: login/refresh funcionando; Riscos consumindo API real; `npm run lint`, `tsc --noEmit` e `build` ok.

## Fase 7 — Infra

- `.env` real local; revisar `docker-compose.dev.yml`; healthchecks; Nginx proxy `/api`.
- CORS/portas; `Services__DefesaIAUrl`; `OPENWEATHER_API_KEY` no `.env.example` (se monitoramento ficar).
- Python permanece até a Fase 6.
- **Pronto**: `start.ps1` e compose dev sobem tudo.

### Teste no celular (S24 FE) em casa

- Usar `docker-compose.yml` (produção-like): Nginx serve o front na porta **3000** e faz proxy de `/api` para o backend (mesma origem, sem CORS).
- Criar `.env` com `POSTGRES_PASSWORD` e `JWT_KEY` (mínimo 32 caracteres).
- `docker compose up --build`.
- Liberar a porta **3000** no firewall (perfil Private).
- Acessar `http://<IP-do-PC>:3000` no celular.
- Observações: o compose ainda builda o serviço Python `defesa-ia` (se falhar, o backend não sobe por causa do `depends_on`); Postgres do compose de produção usa a porta **5435** (a local usa 5436).

## Fase 8 — Testes

- Projeto `backend/DefesaCivil.Api.Tests` (xUnit + `Microsoft.AspNetCore.Mvc.Testing` + `coverlet`), adicionado ao `backend.sln`.
- Integração contra Postgres local `defesa_db_test` (Docker não instalado localmente); CI com service `postgres:17`.
- Casos: auth (duplicado case-insensitive, refresh), health, ocorrências, equipes, alertas, dashboard e os 3 módulos novos.
- Frontend: Vitest + RTL para `AuthContext`/interceptor e telas-chave; opcional Playwright E2E.
- **Pronto**: `dotnet test` e `npm test` verdes no CI.

## Fase 6 — Agente de documentos (Rust) — última

Escopo reduzido: **apenas o agente de criação de documentos** (sem monitoramento/risco).

- Serviço/CLI em `backend/DefesaAgents` (Axum ou CLI + Tokio).
- **Entrada**: histórico/diff do Git, `docs/` (auditoria, checklist), resultados de testes, OpenAPI (`/swagger/v1/swagger.json`), migrations e compose.
- **Saída**: `docs/vistorias/<data>-<fase>.md` com seções “o que mudou, arquivos, testes, riscos, pendências”, mais `docs/AGENTES.md`.
- **Modo**: determinístico coleta os fatos; opcionalmente LLM (Ollama local) redige o texto.
- Remover `backend/DefesaIA-api` e ajustar o compose (quando monitoramento for resolvido).
- **Pronto**: gera um relatório completo de uma fase a partir do repositório, de forma reproduzível.

## Cronograma sugerido da semana

- **Hoje/amanhã (provas)**: sem execução.
- **Qua**: Fase 2 completa + início da Fase 3.
- **Qui**: Fase 3 + Fase 4.
- **Sex**: Fase 5 + Fase 7.
- **Sáb**: Fase 8 (testes) + início do agente de documentos.
- **Dom**: Fase 6 completa + docs finais.

## Comandos úteis

```powershell
$env:PATH='C:\Users\10392692902\.dotnet;'+$env:PATH
$env:DOTNET_ROOT='C:\Users\10392692902\.dotnet'
$env:PATH="$env:USERPROFILE\.dotnet\tools;$env:PATH"
# Connection string/JWT: reaproveitar de C:\Users\10392692902\.defesaERP\start.ps1
# (a senha do banco fica em .defesaERP\db-password.txt; não versionar)

dotnet build backend\DefesaCivil.Api\DefesaCivil.Api.csproj
dotnet ef migrations add <Nome> --project backend\DefesaCivil.Api\DefesaCivil.Api.csproj
dotnet ef database update --project backend\DefesaCivil.Api\DefesaCivil.Api.csproj
dotnet ef migrations list --project backend\DefesaCivil.Api\DefesaCivil.Api.csproj
```

## Critérios de “pronto” (DoD)

- Build backend com **0 erros**.
- `dotnet ef migrations list` sem migrations pendentes.
- Smoke manual por endpoint alterado (status esperado).
- `npm run lint`, `tsc -p tsconfig.app.json --noEmit` e `npm run build` ok.
- Testes (`dotnet test` / `npm test`) verdes a partir da Fase 8.
- Nenhum segredo commitado.

## Riscos

- Escopo do frontend “tudo” pode inflar; limitar aos módulos com backend.
- Agente Rust depende das decisões pendentes (itens 2, 3 e 4).
- Testes de integração exigem Postgres local/CI (Docker não instalado localmente).
- Compose de produção depende do serviço Python enquanto ele não for removido.
