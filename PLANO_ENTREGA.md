# Plano de Entrega - Backend + Frontend

> **Projeto:** DefesaERP  
> **Data:** 01/11/2026  
> **Objetivo:** criar/corrigir backend e frontend na Defesa, commitar e testar/revisar em casa.

---

## 1. Escopo

### Entra nesta etapa

- Criar o backend de **Solicitações**.
- Criar o backend de **Vistorias**.
- Corrigir contratos de **Ocorrências** e **Equipes**.
- Integrar as telas de Solicitações e Vistorias ao backend real.
- Completar o formulário de Equipes.
- Corrigir a mudança de status de Ocorrências.
- Revisar Alertas, Dashboard, Layout e estados vazios.
- Gerar migrations e aplicar no banco.
- Validar build, lint e TypeScript.
- Commitar e dar push.
- Testar tudo manualmente em casa.

### Não entra nesta etapa

- Testes xUnit completos.
- Testes automatizados de frontend.
- Deploy no Render.
- Permissões/roles avançadas.
- Refresh token automático no frontend.
- Integração real com API de clima.
- Paginação e filtros server-side.
- Refatorações grandes.

---

## 2. Estado atual

### Ambiente local

| Serviço | URL |
|---------|-----|
| Frontend produção | http://localhost:3000 |
| Frontend dev (Vite) | http://localhost:5173 |
| API | http://localhost:8080 |
| API health | http://localhost:8080/health |
| IA | http://localhost:8001 |
| IA docs | http://localhost:8001/docs |
| Postgres | localhost:5435 |
| Portainer | http://localhost:9001 |

### Banco

- Banco local está vazio: sem usuários, ocorrências, equipes ou alertas.
- Criar a primeira conta em `/register`.

### Git

- Branch atual: `main`.
- Antes deste documento, `main` estava 2 commits à frente de `origin/main`.
- Este documento adiciona mais um commit.
- Alterações de Render/Docker e `AUDITORIA_COMPLETA.md` permanecem fora deste commit.

### Testes

- **Não existe projeto de testes no backend.**
- `backend/backend.sln` contém apenas `DefesaCivil.Api`.
- Não há referência a xUnit, NUnit ou MSTest.
- O frontend não tem script `test`, Vitest, Jest ou Playwright.
- O `README.md` menciona `dotnet test` e xUnit, mas isso ainda não existe na prática.
- O teste em casa será **smoke test manual**.

---

## 3. Pré-requisitos na Defesa

- Git e acesso ao GitHub.
- Docker + Docker Compose.
- .NET 10 SDK.
- `dotnet-ef` instalado.
- Node.js e npm.
- Navegador.
- Internet para `git pull`, NuGet, npm e imagens Docker.
- Permissão para rodar Docker.
- Portas livres: `3000`, `5173`, `8080`, `8001` e `5435`.

Verificação rápida:

```bash
git --version
docker --version
docker compose version
dotnet --version
dotnet ef --version
node -v
npm -v
```

---

## 4. Setup na Defesa

```bash
git pull origin main
cp .env.example .env
```

Editar `.env` e definir:

```text
POSTGRES_PASSWORD=uma-senha-forte
JWT_KEY=uma-chave-com-pelo-menos-32-caracteres
```

Subir o stack:

```bash
docker compose up -d --build
docker compose ps
```

Validar:

```bash
curl http://localhost:8080/health
curl http://localhost:8001/health
```

Rodar o frontend com hot reload:

```bash
cd frontend/defesa-web
VITE_API_URL=http://localhost:8080/api npm run dev -- --host 0.0.0.0 --port 5173
```

Acessar:

```text
http://localhost:5173
```

Criar a primeira conta em `/register`.

---

## 5. Backend - P0

### 5.1 Criar módulo de Solicitações

Criar:

- `backend/DefesaCivil.Api/Entities/Solicitacoes.cs`
- DTOs em `backend/DefesaCivil.Api/DTOs/Solicitacoes/`
- `backend/DefesaCivil.Api/Services/SolicitacaoService.cs`
- `backend/DefesaCivil.Api/Controllers/SolicitacoesController.cs`
- `DbSet<Solicitacao>` em `AppDbContext.cs`
- Configuração de índices e migration

Contrato esperado pelo frontend:

**Resposta**

```text
id
protocolo
solicitante
telefone
email
tipo
descricao
endereco
bairro
municipio
status
prioridade
responsavel
observacoes
createdAt
updatedAt
```

**Criação**

```text
solicitante
telefone
email
tipo
descricao
endereco
bairro
municipio
prioridade
observacoes
```

**Atualização**

```text
solicitante
telefone
email
tipo
descricao
endereco
bairro
municipio
status
prioridade
responsavel
observacoes
```

Regras:

- Backend gera o protocolo.
- Status inicial: `Aberta`.
- Enums devem bater com o frontend:
  - Tipo: `Informacao`, `Ocorrencia`, `Vistoria`, `Apoio`, `Denuncia`, `Outros`
  - Status: `Aberta`, `EmAnalise`, `EmAtendimento`, `Concluida`, `Cancelada`
  - Prioridade: `Baixa`, `Media`, `Alta`, `Urgente`

Endpoints mínimos:

```text
GET    /api/Solicitacoes
GET    /api/Solicitacoes/{id}
POST   /api/Solicitacoes
PUT    /api/Solicitacoes/{id}
DELETE /api/Solicitacoes/{id}
```

### 5.2 Criar módulo de Vistorias

Criar:

- `backend/DefesaCivil.Api/Entities/Vistorias.cs`
- DTOs em `backend/DefesaCivil.Api/DTOs/Vistorias/`
- `backend/DefesaCivil.Api/Services/VistoriaService.cs`
- `backend/DefesaCivil.Api/Controllers/VistoriasController.cs`
- `DbSet<Vistoria>` em `AppDbContext.cs`
- Configuração de índices e migration

Contrato esperado:

**Resposta**

```text
id
protocolo
solicitante
telefone
tipo
descricao
endereco
bairro
municipio
status
prioridade
responsavel
observacoes
dataAgendamento
dataRealizacao
createdAt
updatedAt
```

**Criação**

```text
solicitante
telefone
tipo
descricao
endereco
bairro
municipio
prioridade
responsavel
observacoes
dataAgendamento
```

**Atualização**

```text
todos os campos de criação
status
dataRealizacao
```

Regras:

- Backend gera o protocolo.
- Status inicial: `Agendada`.
- Enums devem bater com o frontend:
  - Tipo: `Preventiva`, `Estrutural`, `AreaDeRisco`, `PosEvento`, `Denuncia`, `Outros`
  - Status: `Agendada`, `EmAndamento`, `Concluida`, `Cancelada`
  - Prioridade: `Baixa`, `Media`, `Alta`, `Urgente`

Endpoints mínimos:

```text
GET    /api/Vistorias
GET    /api/Vistorias/{id}
POST   /api/Vistorias
PUT    /api/Vistorias/{id}
DELETE /api/Vistorias/{id}
```

### 5.3 Corrigir update de Ocorrências

Problema atual:

- `UpdateOcorrenciaDto` exige campos como `TipoOcorrencia`, `Cidade`, `Bairro`, `Endereco`, `Responsavel`, `TelefoneSolicitante` e `NomeSolicitante`.
- O frontend envia apenas `status` e `dataOcorrencia`.
- Resultado: `400 Bad Request`.

Opções:

1. Criar endpoint específico:
   ```text
   PATCH /api/Ocorrencias/{id}/status
   ```
   Body:
   ```json
   { "status": "Em Andamento" }
   ```

2. Ou tornar o DTO de update parcial, sem `[Required]` nos campos que não precisam ser enviados.

Recomendação: criar o endpoint de status e manter o PUT completo para edição geral.

### 5.4 Alinhar contrato de Equipes

Problema atual:

- O banco exige `Email`, `Municipio`, `Endereco` e `LocalizacaoAtual`.
- Os DTOs de criação/atualização tratam esses campos como opcionais.
- O frontend envia `quantidadeMembros: 0` e campos vazios.
- Criação de equipe pode falhar com `400` ou erro de banco.

Corrigir:

- Validar campos obrigatórios no DTO.
- Garantir `QuantidadeMembros >= 1`.
- Validar `Tipo` e `Status` contra os enums reais.
- Alinhar o formulário do frontend.
- Validar e-mail quando informado; se o banco exige e-mail, tratar como obrigatório.

Enums do backend:

```text
TipoEquipe:
BuscaESalvamento, Atendimento, Vistoria, Logistica, Resgate,
Bombeiros, DefesaCivil, Voluntarios, Administrativa, Outros

StatusEquipe:
Disponivel, EmAtendimento, EmDeslocamento, EmApoio,
Indisponivel, Ocupada, EmManutencao, ForaDeServico
```

### 5.5 Validação mínima

Adicionar validação para:

- Campos obrigatórios vazios.
- Enums inválidos.
- Quantidade de membros menor que 1.
- Status inválido em ocorrências, alertas, solicitações e vistorias.
- Datas inválidas ou incoerentes.

Usar DataAnnotations, que já é o padrão do projeto. Não adicionar nova biblioteca sem necessidade.

### 5.6 Tratamento global de erros

Adicionar tratamento para retornar erros padronizados:

- `400` para validação.
- `401` para autenticação.
- `403` para autorização.
- `404` para recurso não encontrado.
- `409` para conflito.
- `500` sem expor detalhes internos.

### 5.7 Migrations

Depois de criar as entidades:

```bash
cd backend/DefesaCivil.Api
dotnet ef migrations add AddSolicitacoesVistorias
```

O backend aplica migrations automaticamente no startup. Depois:

```bash
docker compose up -d --build backend
docker compose logs -f backend
```

Atenção:

- Não usar `docker compose down -v` sem confirmar que pode apagar os dados.
- Se a migration falhar, verificar connection string e logs do backend.

---

## 6. Frontend - P0

### 6.1 Vistorias

Criar:

- `frontend/defesa-web/src/services/vistoriaService.ts`
- Implementar `VistoriaPage.tsx`, que hoje está vazio.
- Reutilizar os componentes existentes em `components/Vistorias/`.
- Adicionar rota `/vistorias` em `App.tsx`.
- Adicionar link no menu, se ainda não existir.

### 6.2 Solicitações

- O `solicitacaoService` já existe e chama `/Solicitacoes`.
- Integrar a página ao backend real.
- Ajustar tipos se o backend usar campos diferentes.
- Garantir que criação, listagem, filtros e detalhes funcionem.

### 6.3 Equipes

- Completar `EquipeForm` com todos os campos.
- Adicionar estado controlado com `setForm`.
- Validar:
  - nome
  - descrição
  - tipo
  - status
  - responsável
  - telefone
  - e-mail
  - município
  - endereço
  - quantidade de membros >= 1
  - localização atual
- Alinhar `TiposEquipe` e `StatusEquipe` com o backend.
- Exibir `localizacaoAtual` e `observacoes` no `EquipeDetails`.
- Ajustar busca por município.

### 6.4 Ocorrências

- Ajustar a chamada de mudança de status conforme o backend corrigido.
- Se o backend não ficar pronto, esconder ou desabilitar a ação de status com aviso claro.
- Revisar lista, filtros, criação e detalhes.

### 6.5 Alertas

- Revisar criação, edição, exclusão, filtros e detalhes.
- Verificar se o campo `dataInicio` é preservado no update; hoje o backend ignora esse campo no update.
- Se necessário, ajustar o DTO do backend para aceitar `DataInicio`.

### 6.6 Dashboard e Layout

- Validar cards, navegação, responsividade e estados vazios.
- Lembrar que o backend usa dados mock em algumas situações:
  - cidades
  - últimos alertas
  - equipes
- Não tratar esses dados como reais em produção.

---

## 7. Ordem de execução na noite

| Ordem | Bloco | Tempo estimado |
|------|-------|----------------|
| 1 | Setup, pull, `.env`, subir stack | 20-30 min |
| 2 | Backend Solicitações | 1,5-2 h |
| 3 | Backend Vistorias | 1,5-2 h |
| 4 | Correções de contratos (Ocorrências/Equipes) | 1 h |
| 5 | Migrations e validação da API | 30 min |
| 6 | Integração frontend (Solicitações/Vistorias) | 1,5-2 h |
| 7 | EquipeForm, Ocorrências e revisões | 1-1,5 h |
| 8 | Build, lint, commit e push | 30-45 min |

Total estimado: **7-9 horas**. É uma noite longa e apertada.

Se o tempo acabar, priorizar:

1. Backend de Solicitações e Vistorias.
2. Migrations.
3. Integração mínima do frontend.
4. Correções de contrato.
5. Polimento visual.

---

## 8. Validação antes de sair da Defesa

Backend:

```bash
dotnet build backend/backend.sln
```

Frontend:

```bash
cd frontend/defesa-web
npm run lint
npx tsc --noEmit
npm run build
```

API:

```bash
curl http://localhost:8080/health
curl http://localhost:8001/health
```

Se possível, testar rapidamente:

```bash
curl -X POST http://localhost:8080/api/Auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"teste@defesa.local","passwordHash":"senha123"}'
```

---

## 9. Commit e push

Não commitar:

- `.env`
- `node_modules`
- `dist`
- `bin`
- `obj`
- segredos

Sugestão de commits:

```bash
git add backend/DefesaCivil.Api
git commit -m "feat: adiciona backend de solicitacoes e vistorias"

git add frontend/defesa-web
git commit -m "feat: integra telas de solicitacoes e vistorias"

git add .
git commit -m "fix: ajusta contratos e formularios"
```

Push:

```bash
git push origin main
```

O push é necessário para conseguir puxar o projeto em casa.

---

## 10. Teste em casa

```bash
git pull origin main
cp .env.example .env
```

Editar `.env` com valores locais.

```bash
docker compose up -d --build
docker compose ps
docker compose logs -f
```

Validar:

```bash
curl http://localhost:8080/health
curl http://localhost:8001/health
```

Abrir:

```text
http://localhost:3000
```

Criar conta em `/register` e testar.

### Checklist manual

#### Autenticação

- [ ] Registrar usuário.
- [ ] Fazer login.
- [ ] Recarregar a página e continuar logado.
- [ ] Fazer logout.

#### Dashboard

- [ ] Dashboard abre sem erro.
- [ ] Cards carregam.
- [ ] Navegação funciona.
- [ ] Layout responsivo.

#### Ocorrências

- [ ] Listar ocorrências.
- [ ] Criar ocorrência.
- [ ] Filtrar por status, prioridade e busca.
- [ ] Abrir detalhes.
- [ ] Alterar status.
- [ ] Verificar persistência após recarregar.

#### Alertas

- [ ] Listar alertas.
- [ ] Criar alerta.
- [ ] Editar alerta.
- [ ] Excluir alerta.
- [ ] Filtrar por status, nível e tipo.
- [ ] Verificar detalhes.

#### Equipes

- [ ] Listar equipes.
- [ ] Criar equipe com todos os campos.
- [ ] Validar quantidade de membros.
- [ ] Abrir detalhes.
- [ ] Filtrar por status e tipo.
- [ ] Verificar exibição de localização e observações.

#### Solicitações

- [ ] Listar solicitações.
- [ ] Criar solicitação.
- [ ] Filtrar.
- [ ] Abrir detalhes.
- [ ] Verificar protocolo gerado.
- [ ] Verificar persistência.

#### Vistorias

- [ ] Abrir `/vistorias`.
- [ ] Listar vistorias.
- [ ] Criar vistoria.
- [ ] Filtrar.
- [ ] Abrir detalhes.
- [ ] Verificar status e datas.
- [ ] Verificar persistência.

#### Infraestrutura

- [ ] Reiniciar containers e confirmar que os dados continuam.
- [ ] Verificar logs sem erros graves.
- [ ] Verificar CORS.
- [ ] Verificar que o frontend usa a API correta.

Comando para reiniciar:

```bash
docker compose restart
```

Atenção: o banco é local de cada máquina. Dados criados na Defesa não aparecem em casa.

---

## 11. Critério de pronto

Considerar pronto quando:

- [ ] Backend de Solicitações e Vistorias existir e responder.
- [ ] Migrations aplicadas.
- [ ] Frontend integrado com backend real.
- [ ] Equipes criar/listar/editar sem erro.
- [ ] Ocorrências alterar status sem `400`.
- [ ] `dotnet build` sem erros.
- [ ] `npm run lint`, `tsc` e `build` sem erros.
- [ ] Push feito.
- [ ] Teste manual em casa concluído.
- [ ] Pendências restantes registradas.

---

## 12. Riscos e plano B

### Se o backend atrasar

- Manter Solicitações/Vistorias com mock no frontend.
- Registrar claramente como pendente.
- Não fingir integração real.

### Se a migration falhar

- Verificar logs do backend.
- Conferir connection string.
- Não apagar o banco sem necessidade.
- Usar `docker compose down -v` apenas se puder perder os dados.

### Se o login falhar

- Conferir `JWT_KEY` com pelo menos 32 caracteres.
- Conferir `ConnectionStrings__Default`.
- Verificar logs do backend.

### Se o frontend não conectar na API

- Conferir `VITE_API_URL`.
- Conferir CORS.
- Testar `http://localhost:8080/health`.
- Testar `http://localhost:3000/api/monitoramento`.

### Se faltar tempo

- Priorizar backend + migrations + integração mínima.
- Deixar polimento visual e testes automatizados para a próxima etapa.

---

## 13. Próxima auditoria

- Testes xUnit no backend.
- Testes de frontend.
- Permissões e roles.
- Refresh token no frontend.
- Health check real de banco e IA.
- Paginação e filtros server-side.
- IA real ou remoção dos dados mock.
- Deploy no Render.

---

## 14. Comandos úteis

Subir stack:

```bash
docker compose up -d --build
```

Ver logs:

```bash
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f defesa-ia
```

Rodar frontend dev:

```bash
cd frontend/defesa-web
VITE_API_URL=http://localhost:8080/api npm run dev -- --host 0.0.0.0 --port 5173
```

Build frontend:

```bash
cd frontend/defesa-web
npm run build
```

Build backend:

```bash
dotnet build backend/backend.sln
```

Criar migration:

```bash
cd backend/DefesaCivil.Api
dotnet ef migrations add NomeDaMigration
```

---

## 15. Plano da semana — 02 a 06/11/2026

> **Branch de portfólio:** `chore/portfolio-cleanup`
> **Meta:** fechar etapas 2, 3, 4, 6 e 7 + 5 telas.
> **Bloqueio:** decisão sobre os segredos encontrados no histórico do Git.

### Segunda — 02/11 — Segurança e organização

- [ ] Decidir segurança: rotacionar `POSTGRES_PASSWORD` e `JWT_KEY` e seguir sem reescrever histórico.
- [ ] Revisar `.gitignore`.
- [ ] Criar `backend/DefesaCivil.Api/appsettings.Example.json`.
- [ ] Mover `AUDITORIA.md` para `docs/`.
- [ ] Confirmar se `CHECKLIST.md` e `PLANO_ENTREGA.md` também vão para `docs/`.
- [ ] Commit: `chore: revisa ignorados e exemplos de configuracao`.

### Terça — 03/11 — README em português

- [ ] Reescrever o `README.md` com funcionalidades reais.
- [ ] Usar `[x]` para pronto e `[ ]` para planejado.
- [ ] Adicionar stack, Mermaid, comandos, variáveis por nome e roadmap.
- [ ] Remover promessas que não existem: xUnit, rate limiting, health checks e refresh completo.
- [ ] Commit: `docs: reescreve README em portugues`.

### Quarta — 04/11 — CI e Vercel

- [ ] Criar `.github/workflows/ci.yml`.
- [ ] Backend: `dotnet restore`, `build` e `test` com .NET 10.
- [ ] Frontend: `npm ci` e `npm run build` com Node 22.
- [ ] Criar `frontend/defesa-web/vercel.json`.
- [ ] Adicionar badge de CI no README.
- [ ] Commit: `ci: adiciona pipeline de build e testes`.

### Quinta — 05/11 — Solicitações e Vistorias

- [ ] Criar backend de Solicitações.
- [ ] Criar backend de Vistorias.
- [ ] Criar migration.
- [ ] Integrar as telas já prontas ao backend real.
- [ ] Commit: `feat: adiciona backend de solicitacoes e vistorias`.

### Sexta — 06/11 — Radar, Abrigos e Riscos

- [ ] Criar backend do Radar.
- [ ] Integrar o Radar ao backend.
- [ ] Criar controller/service de Abrigos.
- [ ] Criar MVP de Riscos.
- [ ] Validar `dotnet build`, `npm run lint`, `tsc` e `npm run build`.
- [ ] Commit: `feat: integra radar e evolui abrigos e riscos`.

### Fora desta semana

- README em inglês (somente frontend).
- Relatórios, Análises, Perfis, Configurações e IA Predict.
- Testes automatizados completos.

### Critério de pronto da semana

- [ ] Etapas 2, 3, 4, 6 e 7 concluídas.
- [ ] 5 telas concluídas ou integradas.
- [ ] Builds passando.
- [ ] Commits separados por etapa.
- [ ] Nenhum segredo novo commitado.
