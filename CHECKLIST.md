# ✅ Checklist de Desenvolvimento — DefesaERP

## 📋 Geral / Infraestrutura

- [ ] **README principal** descrever arquitetura, stack, setup local e como contribuir
- [ ] **.gitignore** completo (incluir `appsettings.*.local.json`, `.env`, `venv/`, `__pycache__/`)
- [ ] **docker-compose.yml** com health checks nos serviços (postgres, backend, frontend)
- [ ] **Portainer** opcional ou movido para perfil separado (profiles no compose)
- [ ] **CI/CD** (GitHub Actions: build, test, lint, deploy)

## 🗄️ Backend (.NET 8 / ASP.NET Core)

### Segurança

- [ ] **Remover secrets do código** — JWT Key e passwords devem vir de variáveis de ambiente/user secrets
- [ ] **appsettings.json** genérico (sem credenciais reais); usar `appsettings.Development.json` + `User Secrets`
- [ ] **Senha do PostgreSQL** configurável via variável de ambiente (`POSTGRES_PASSWORD`)
- [ ] **CORS** configurado com origens dinâmicas (via config/ENV), não hardcoded (`localhost:3000`)
- [ ] **Rate limiting** nos endpoints de auth (login/register) para evitar brute force
- [ ] **Refresh token** — JWT atual tem expiração de 30 min, mas sem refresh token

### Arquitetura & Código

- [ ] **Separar responsabilidades** — `Program.cs` está com lógica de startup + wait database + tudo inline
- [ ] **Criar repositórios/Service layer** — controllers acessam `DbContext` diretamente
- [ ] **Exception handling middleware** global (try/catch genérico nos controllers hoje)
- [ ] **Validação de input** com FluentValidation ou DataAnnotations + filtro de validação
- [ ] **Health checks** — endpoint `/health` para o Docker/compose
- [ ] **Serilog ou ILogger** estruturado (hoje usa `Console.WriteLine`)
- [ ] **Migrations** — `EnsureCreated()` no lugar de migrations; usar `dotnet ef migrations` + `database migrate`
- [ ] **DTOs de response** (hoje retorna `Ok(token)` direto sem envelope padronizado)
- [ ] **Modelo User** — adicionar campos: Nome, Role, Ativo, DataCriacao, etc.

### Testes

- [ ] **Projeto de teste unitário** (xUnit) para `TokenService` e `AuthService`
- [ ] **Projeto de teste de integração** para controllers com WebApplicationFactory + banco de teste

## 🧾 Notas de Revisão do Backend — 12/08/2026

### Corrigido nesta revisão

- [x] **Rate limiting** nos endpoints de auth (`/Auth/login`, `/Auth/register`, `/Auth/refresh`) — 5 req/min por IP (429)
- [x] **`Dashboard` sem `[AllowAnonymous]`** — agora exige token (frontend já envia via `api.ts`)
- [x] **JWT com lifetime curto** (30 min) + **refresh token** (7 dias) em `/api/Auth/refresh` (stateless, sem tabela)
- [x] **HttpClient com timeout** de 10s no `MonitoramentoController` (antes podia pendurar)
- [x] **Usuário dedicado `defesa` no Postgres** (prod compose) — senha obrigatória via `${POSTGRES_PASSWORD:?}`; volume existente precisa ser recriado (`docker compose down -v`)
- [x] **`Jwt:Key` e senha do DB fora do código** — ENV obrigatório (startup falha se ausente)
- [x] **CORS via config**, `AllowedHosts` restrito, **HSTS/HTTPS**, **compilação 0 erros/0 warnings**
- [x] **EquipesController/EquipeService** corrigidos e `EquipeService` no DI
- [x] **Warnings de nulidade** eliminados (`OcorrenciaService`, `EquipeService`, `DashboardService`)
- [x] **DashboardService**: comparações de status corrigidas para as constantes reais — antes retornava sempre 0/vazio
- [x] **UpdateOcorrenciaDto**: update parcial preserva valor existente (`dto.X ?? ocorrencia.X`)

### Pendências conhecidas

- [ ] **FRONTEND — implementar fluxo de refresh token no Axios (PRÓXIMA NOITE)**
  - Login já recebe `{ token, refreshToken }`, mas o frontend ignora o `refreshToken` (`AuthContext.tsx`)
  - Access token agora expira em 30 min → usuário será deslogado sem renovação
  - Fazer: guardar `refreshToken`, interceptor no Axios para tentar `/Auth/refresh` ao receber 401 e repetir a requisição original
- [ ] **Refresh token stateless** — sem revogação/rotação persistida; para controle real, criar tabela `RefreshTokens` + migração
- [ ] **Migrations** — `EnsureCreated()` não altera tabelas existentes (colunas/tabelas novas não são aplicadas em DB já criado)

### Pontos de atenção levantados

- [ ] **JWT Key hardcoded** como fallback em `Program.cs:30` e `TokenServices.cs:20` — mover 100% para ENV/user secrets
- [ ] **Namespaces misturados** — `DefesaERP.*` (Equipes) vs `DefesaCivil.Api.*`; padronizar
- [ ] **`GerarNumeroProtocolo`** usa `Count() + 1` — quebra sob concorrência; usar sequence do Postgres
- [ ] **Dados mock** no DashboardService (cidades, equipes, clima) — falta integrar com `DefesaIA-api`
- [ ] **`AuthController.Register`** recebe senha no campo `PasswordHash` — renomear para `Password`
- [ ] **Sem testes** no backend

## 🐍 Monitoramento API (Python/FastAPI)

- [ ] **requirements.txt** ou `pyproject.toml` com dependências fixadas
- [ ] **Usar dados reais** da OpenWeatherMap (hoje retorna dados mockados/hardcoded)
- [ ] **Async/await** consistente (FastAPI suporta nativamente)
- [ ] **Tratamento de erros** HTTP padronizado
- [ ] **Health check** endpoint
- [ ] **Logging** estruturado
- [ ] **Testes** com pytest + httpx

## 🎨 Frontend (React + TypeScript + Vite)

### Qualidade de Código

- [ ] **TypeScript estrito** — revisar `any` soltos e tipos faltantes
- [ ] **Componentes modulares** — `Dashboard.tsx` parece muito grande; quebrar em sub-componentes
- [ ] **Variáveis de ambiente** — `VITE_API_URL` já configurada, verificar uso consistente
- [ ] **Pasta "Siderbar"** — corrigir typo para `Sidebar`
- [ ] **Arquivo `Layout.cs`** dentro de `components/Layout/Siderbar/` — parece arquivo acidental, remover e verificar impactos

### Funcionalidades

- [ ] **Logout** funcional (hoje limpa localStorage mas não invalida token no backend)
- [ ] **Tratamento de erro 401** global (interceptor Axios já redireciona, mas sem feedback ao usuário)
- [ ] **Loading states** em todas as páginas (Login, Register, Dashboard)
- [ ] **Toast/notificações** para sucesso/erro de operações
- [ ] **Responsividade** — testar mobile (sidebar, tabelas, gráficos)
- [ ] **Página 404** personalizada

### Testes

- [ ] **Testes unitários** com Vitest para hooks, contextos e utils
- [ ] **Testes de componente** com Testing Library para páginas principais (Login, Dashboard)
- [ ] **Configurar Vitest** no projeto (hoje não existe)

## 🗃️ Banco de Dados (PostgreSQL)

- [ ] ** Migrations** — usar `dotnet ef migrations` em vez de `EnsureCreated()`
- [ ] **Seed data** — usuário admin inicial, cidades, configurações
- [ ] **Índices** em colunas de busca (Email na tabela Users)
- [ ] **Backup automático** — script ou volume separado para dumps
- [ ] **Migração de dados reais** — planejar transição de mock para dados reais de monitoramento

## 🐳 Docker

- [ ] **Health checks** em todos os serviços no docker-compose
- [ ] **Perfis (profiles)** no compose para serviços opcionais (portainer)
- [ ] **Volumes nomeados** — postgres já tem; verificar se precisa de mais
- [ ] **Dockerfile multi-stage** para produção no frontend (Nginx em vez de Vite dev server)
- [ ] **`depends_on`** com condition: service_healthy

## 🔍 Observabilidade

- [ ] **Logging estruturado** (Serilog no backend, structlog no Python)
- [ ] **Métricas** — Prometheus + dotnet counters / OpenTelemetry
- [ ] **Tracing** — OpenTelemetry distribuído entre .NET e Python
- [ ] **Dashboards** — Grafana ou Portainer monitoring

## 📦 Extras (futuro)

- [ ] **CRUD de usuários** (admin gerenciar usuários)
- [ ] **CRUD de cidades/monitoramento** (configurar quais cidades monitorar)
- [ ] **Alertas/notificações** (email, WhatsApp, push) para condições críticas
- [ ] **Histórico de eventos** — tabela de logs de monitoramento com timeline
- [ ] **Relatórios** exportáveis (PDF, CSV)
- [ ] **Multi-tenancy** (defesas civis de várias cidades/estados)
