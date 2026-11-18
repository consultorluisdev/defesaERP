# Auditoria DefesaERP — Backend + Frontend

> Data: 22/10/2026  
> Escopo: `backend/DefesaCivil.Api` (.NET 8), `backend/DefesaIA-api` (FastAPI), `frontend/defesa-web` (React 19 + Vite), Docker/Postgres.  
> Tipo: revisão estática. Não foram executados build, testes ou aplicação.  
> Regra desta auditoria: **nenhum código-fonte foi alterado**; este documento é o único artefato criado.

---

## Como usar este documento com o ChatGPT

Cada achado tem um ID (`P0-01`, `P1-07`, etc.), arquivos/linhas de referência, impacto, correção esperada e critérios de aceite. Para trabalhar um item por vez, use o prompt mestre abaixo e depois cole o bloco do achado.

### Prompt mestre

```text
Contexto: projeto DefesaERP — API ASP.NET Core 8 + EF Core 8 + PostgreSQL, frontend React 19/TypeScript/Vite,
e um agente FastAPI. O código está em backend/DefesaCivil.Api, backend/DefesaIA-api e frontend/defesa-web.

Objetivo: corrigir UM achado da auditoria por vez, com mudanças mínimas e seguras.

Regras:
- Não alterar contratos públicos sem atualizar o frontend e os DTOs.
- Não introduzir secrets no código.
- Manter o padrão existente (controllers -> services -> DbContext).
- Apresentar: causa raiz, arquivos alterados, diff completo e como testar.
- Se a correção exigir decisão de produto/arquitetura, perguntar antes de implementar.

Achado: <colar o bloco do achado>
```

---

## Resumo dos achados

| ID | Severidade | Tema | Status |
|---|---|---|---|
| P0-01 | Crítica | Schema do banco divergente das entidades / `EnsureCreated` | Aberto |
| P0-02 | Crítica | Datas sem UTC quebram gravação em `timestamptz` | Aberto |
| P0-03 | Crítica | Atualização parcial de ocorrência retorna 400 | Aberto |
| P0-04 | Crítica | Integração de monitoramento quebrada (porta/endpoint) | Aberto |
| P0-05 | Crítica | Geração de protocolo com `Count() + 1` | Aberto |
| P1-06 | Alta | Módulo de Equipes incompleto no frontend | Aberto |
| P1-07 | Alta | Refresh token ignorado pelo frontend | Aberto |
| P1-08 | Alta | Rate limit global atrás do Nginx | Aberto |
| P1-09 | Alta | Dashboard e indicadores com dados fictícios | Aberto |
| P1-10 | Alta | Autenticação sem índice único/normalização de e-mail | Aberto |
| P1-11 | Alta | Sem tratamento global de erros e health checks | Aberto |
| P1-12 | Alta | Ordenação de prioridade lexicográfica | Aberto |
| P2-13 | Média | Contratos frontend/backend inconsistentes | Aberto |
| P2-14 | Média | Build/lint não validam TypeScript | Aberto |
| P2-15 | Média | Riscos de infraestrutura Docker/Nginx | Aberto |
| P2-16 | Média | Falta de paginação e limites de consulta | Aberto |
| P2-17 | Média | Sem testes/CI e com código morto | Aberto |
| P2-18 | Média | Inconsistências de UX e tema | Aberto |

---

# P0 — Críticos

## P0-01 — Schema do banco divergente das entidades

**Arquivos**
- `backend/DefesaCivil.Api/Program.cs:120`
- `backend/DefesaCivil.Api/Migrations/20260706231538_CriarTabelaOcorrencias.cs:44`
- `backend/DefesaCivil.Api/Data/AppDbContext.cs:22`

**Problema**
O startup usa `db.Database.EnsureCreated()`. As migrations existentes são antigas e não representam o modelo atual: `Ocorrencias` foi criada com `Titulo/Nivel/DataAbertura`, `Equipes` com apenas `Nome/LocalizacaoAtual/Status` e `Alertas` com `CidadeId`. O modelo atual usa outras colunas e `Cidade` como string.

**Impacto**
- `EnsureCreated` não altera banco existente: colunas novas de Equipes/Ocorrências não são criadas.
- Em banco criado por migrations antigas, as consultas falham com 500.
- As migrations atuais são código morto e não podem ser aplicadas com segurança.
- `dotnet ef database update` criaria um schema incompatível com o código.

**Correção esperada**
1. Escolher a estratégia: recriar o schema (sem dados relevantes) ou criar migration corretiva a partir do modelo atual.
2. Remover `EnsureCreated` do startup e aplicar migrations (`Database.Migrate()` ou pipeline de deploy).
3. Alinhar `AppDbContext` e migrations; validar todos os `DbSet`.
4. Falhar o startup se o banco não estiver acessível (hoje o loop engole o erro após 10 tentativas).

**Critérios de aceite**
- [ ] Banco novo sobe com todas as tabelas/colunas do modelo atual.
- [ ] Banco existente é migrado sem perda de dados (ou recriado de forma documentada).
- [ ] Startup falha explicitamente se o banco não responder.
- [ ] `dotnet ef migrations add` a partir do estado atual não gera diferenças inesperadas.

**Prompt para o ChatGPT**
```text
Corrija P0-01. O projeto usa EnsureCreated() em Program.cs:120 e tem migrations obsoletas.
Compare as entidades atuais (Ocorrencias, Alerta, Equipe, Abrigo, Cidade, User) com as migrations e proponha
uma estratégia segura (recriar schema ou migration corretiva). Remova EnsureCreated, aplique migrations no
startup e faça o startup falhar se o banco não conectar. Entregue os comandos EF e os arquivos alterados.
```

---

## P0-02 — Datas sem UTC quebram gravação no PostgreSQL

**Arquivos**
- `backend/DefesaCivil.Api/Services/AlertaService.cs:44`
- `backend/DefesaCivil.Api/Services/OcorrenciaService.cs:59,90`
- `frontend/defesa-web/src/components/Alertas/AlertaForm.tsx:102-113`
- `frontend/defesa-web/src/components/Ocorrencias/OcorrenciaForm.tsx:19`

**Problema**
O frontend envia `datetime-local` sem timezone (`2026-10-22T14:30`). O `System.Text.Json` cria `DateTime` com `Kind=Unspecified`. O Npgsql 8 rejeita `Unspecified` em colunas `timestamp with time zone`, que é o mapeamento padrão de `DateTime` no EF Core/Npgsql.

**Impacto**
Provável erro 500 ao criar/editar alertas e ocorrências pela interface, mesmo com o banco correto.

**Correção esperada**
1. Padronizar datas como UTC no backend (converter com `DateTime.SpecifyKind(..., DateTimeKind.Utc)` ou `DateTimeOffset`).
2. No frontend, enviar ISO com `Z` (`new Date(valor).toISOString()`) ou `DateTimeOffset` no DTO.
3. Exibir datas no fuso local apenas na apresentação.
4. Adicionar testes de persistência para os dois fluxos.

**Critérios de aceite**
- [ ] Criar e editar alerta pela UI persiste sem erro.
- [ ] Criar e editar ocorrência pela UI persiste sem erro.
- [ ] Datas no banco ficam em UTC.
- [ ] A API aceita ISO com e sem offset de forma controlada.

**Prompt para o ChatGPT**
```text
Corrija P0-02. Datas vindas de input datetime-local chegam como DateTimeKind.Unspecified e o Npgsql 8
rejeita isso em timestamp with time zone. Ajuste AlertaService/OcorrenciaService e os formulários React
para enviar/salvar UTC (ou DateTimeOffset), mantendo exibição em horário local. Inclua testes.
```

---

## P0-03 — Atualização parcial de ocorrência retorna 400

**Arquivos**
- `backend/DefesaCivil.Api/DTOs/Ocorrencia/UpdateOcorrenciaDto.cs:15-55`
- `backend/DefesaCivil.Api/Services/OcorrenciaService.cs:77`
- `frontend/defesa-web/src/pages/OcorrenciaPage.tsx:50-53`

**Problema**
`UpdateOcorrenciaDto` marca `Cidade`, `Bairro`, `Endereco`, `Responsavel`, `TelefoneSolicitante` e `NomeSolicitante` como `[Required]`. O frontend, ao mudar apenas o status, envia somente `status` e `dataOcorrencia`.

**Impacto**
A ação “Marcar como Em Andamento/Concluída/Cancelada” falha com 400 e não há tratamento de erro visível.

**Correção esperada**
1. Adequar o DTO para atualização parcial (remover `[Required]` dos campos opcionais ou criar DTO específico de status).
2. Validar apenas o que foi enviado.
3. Tratar erro no frontend com feedback ao usuário.

**Critérios de aceite**
- [ ] Alterar status funciona enviando apenas `{ status, dataOcorrencia }`.
- [ ] Edição completa continua funcionando.
- [ ] Erros aparecem na UI.

**Prompt para o ChatGPT**
```text
Corrija P0-03. UpdateOcorrenciaDto exige campos que o frontend não envia ao mudar status (OcorrenciaPage.tsx:50).
Torne a atualização parcial válida (ou crie um DTO de mudança de status), mantenha a edição completa e adicione
tratamento de erro no frontend. Entregue diff e casos de teste.
```

---

## P0-04 — Integração de monitoramento quebrada

**Arquivos**
- `backend/DefesaCivil.Api/Controllers/MonitoramentoController.cs:22`
- `backend/DefesaIA-api/monitor-agent/Dockerfile:10`
- `backend/DefesaIA-api/monitor-agent/app/main.py:8`
- `docker-compose.yml:41-48`

**Problema**
- O backend chama `http://defesa-ia:8000/monitoramento`.
- O container realmente construído (`monitor-agent`) escuta na porta **8001**.
- O `monitor-agent` não possui a rota `/monitoramento`; possui apenas `/` e `/health`.
- O `main.py` da raiz, que tem `/monitoramento`, não é usado pelo compose.
- O controller não verifica `IsSuccessStatusCode` nem captura exceções.

**Impacto**
`GET /api/Monitoramento` falha sempre. O Dashboard cai no fallback estático e a integração “tempo real” não existe.

**Correção esperada**
1. Definir uma única aplicação Python (usar o `monitor-agent` e adicionar `/monitoramento`, ou containerizar o `main.py`).
2. Alinhar porta e hostname no compose e no backend (ou usar configuração `Monitoramento:BaseUrl`).
3. Tratar timeout, status HTTP e falha de rede, retornando erro apropriado.
4. Proteger o endpoint com `[Authorize]` se for interno.
5. Substituir os dados simulados por dados reais quando disponível.

**Critérios de aceite**
- [ ] `GET /api/Monitoramento` retorna 200 com a lista de cidades.
- [ ] Indisponibilidade do agente retorna 502/503 claro, não corpo de erro como 200.
- [ ] Dashboard mostra dados reais ou estado de erro explícito.
- [ ] Porta/hostname consistentes entre compose, Dockerfile e backend.

**Prompt para o ChatGPT**
```text
Corrija P0-04. O MonitoramentoController chama defesa-ia:8000/monitoramento, mas o container monitor-agent
escuta em 8001 e não tem essa rota. Unifique a aplicação Python, alinhe porta/hostname via configuração,
valide status HTTP e trate erros. Explique a escolha entre main.py e monitor-agent.
```

---

## P0-05 — Geração de protocolo com `Count() + 1`

**Arquivos**
- `backend/DefesaCivil.Api/Services/OcorrenciaService.cs:45,165`
- `backend/DefesaCivil.Api/DTOs/Ocorrencia/CreateOcorrenciaDto.cs:7-9`
- `frontend/defesa-web/src/components/Ocorrencias/OcorrenciaForm.tsx:52-58`

**Problema**
O backend ignora `NumeroProtocolo` recebido e gera com `Count() + 1`, usando chamada síncrona dentro de fluxo assíncrono. Sob concorrência, dois pedidos podem gerar o mesmo número; após exclusões, o número pode repetir. Existe índice único em `NumeroProtocolo`, então a colisão vira erro 500.

**Impacto**
Perda de requisições em uso concorrente e UX confusa: a UI exige um protocolo que será descartado.

**Correção esperada**
1. Usar sequence do PostgreSQL ou contador atômico no banco para gerar o número.
2. Remover a exigência de protocolo do DTO/UI, ou permitir informar apenas em importação.
3. Manter formato `OC-AAAAMMDD-XXXX` com garantia de unicidade.
4. Tratar conflito com retry seguro quando aplicável.

**Critérios de aceite**
- [ ] Criação concorrente não gera protocolo duplicado.
- [ ] Exclusões não reutilizam protocolo.
- [ ] UI não pede protocolo manual.
- [ ] Teste de concorrência cobre o cenário.

**Prompt para o ChatGPT**
```text
Corrija P0-05. OcorrenciaService gera protocolo com Count()+1 e ignora o valor enviado pelo frontend.
Implemente geração atômica (sequence do Postgres ou equivalente), mantenha o formato OC-AAAAMMDD-XXXX e
remova o campo obrigatório da UI. Inclua teste de concorrência.
```

---

# P1 — Altos

## P1-06 — Módulo de Equipes incompleto no frontend

**Arquivos**
- `frontend/defesa-web/src/components/Equipes/EquipeForm.tsx` (vazio)
- `frontend/defesa-web/src/components/Equipes/EquipeDetails.tsx` (vazio)
- `frontend/defesa-web/src/components/Equipes/EquipeList.tsx` (vazio)
- `frontend/defesa-web/src/App.tsx:44`
- `frontend/defesa-web/src/components/Equipes/EquipeFilters.tsx:11,18,25,29`
- `frontend/defesa-web/src/components/Equipes/EquipeCard.tsx:81`
- `frontend/defesa-web/src/types/equipe.ts:50-67`

**Problema**
O backend de Equipes está implementado, mas a rota `/equipes` é placeholder e os três componentes principais estão vazios. `EquipeFilters` não compila: prop `onFilter` vs `onFilters`, `setFilters` redeclarado para `hasFilters`, `onSubmit` tipado como `FocusEvent` e chamada a `onFilters` inexistente. `EquipeCard` usa `equipe.reponsavel` (typo). Os enums do frontend divergem do backend.

**Impacto**
Funcionalidade principal inacessível pela interface; código morto e erros de TypeScript quando o módulo for ativado.

**Correção esperada**
1. Alinhar tipos/enums de equipe com `Entities/Equipes.cs`.
2. Implementar `EquipeList`, `EquipeCard`, `EquipeFilters`, `EquipeForm` e `EquipeDetails`.
3. Criar `EquipesPage` e registrar a rota real em `App.tsx`.
4. Corrigir tipagem do formulário de filtros e o typo do card.

**Critérios de aceite**
- [ ] `/equipes` lista, filtra, cria, edita e exclui equipes.
- [ ] Nenhum erro de TypeScript/lint nos componentes de Equipes.
- [ ] Enums e validações alinhados ao backend.

**Prompt para o ChatGPT**
```text
Implemente P1-06. O backend de Equipes já existe, mas EquipeForm/EquipeDetails/EquipeList estão vazios e
a rota é placeholder. Crie a página completa (listar, filtrar, criar, editar, excluir), corrija EquipeFilters
e EquipeCard e alinhe os enums com Entities/Equipes.cs. Entregue os arquivos completos.
```

---

## P1-07 — Refresh token ignorado pelo frontend

**Arquivos**
- `frontend/defesa-web/src/contexts/AuthContext.tsx:67`
- `frontend/defesa-web/src/services/api.ts:23-35`
- `frontend/defesa-web/src/routes/PrivateRoute.tsx:5`
- `backend/DefesaCivil.Api/Controllers/AuthController.cs:69-96`

**Problema**
O login retorna `{ token, refreshToken }`, mas o frontend salva apenas `token` e descarta `refreshToken`. O interceptor apenas remove o token e redireciona no 401. `PrivateRoute` não verifica expiração.

**Impacto**
Sessão encerra após 30 minutos sem renovação, contrariando o fluxo implementado no backend.

**Correção esperada**
1. Persistir `refreshToken` com segurança.
2. No 401, tentar `/Auth/refresh` uma vez e repetir a requisição original.
3. Evitar loop de refresh e concorrência de múltiplas renovações.
4. Considerar rotação/revogação e armazenamento em cookie `httpOnly`.
5. Redirecionar para login apenas quando o refresh falhar.

**Critérios de aceite**
- [ ] Após expirar o access token, a requisição é renovada automaticamente.
- [ ] Refresh inválido desloga e limpa a sessão.
- [ ] Não há loops nem múltiplas chamadas simultâneas de refresh.
- [ ] Token não fica exposto em logs.

**Prompt para o ChatGPT**
```text
Implemente P1-07. O backend já retorna refreshToken, mas AuthContext/api.ts ignoram. Adicione persistência,
interceptor de resposta com fila para múltiplos 401, chamada única a /Auth/refresh e repetição da requisição
original. Explique riscos de localStorage e proponha cookie httpOnly se viável.
```

---

## P1-08 — Rate limit global atrás do Nginx

**Arquivos**
- `backend/DefesaCivil.Api/Program.cs:58-71`
- `frontend/defesa-web/nginx.conf:12-18`

**Problema**
O rate limit particiona por `context.Connection.RemoteIpAddress`. O Nginx faz proxy de `/api/` e envia `X-Forwarded-For`, mas a API não chama `UseForwardedHeaders`. Assim, todos os clientes passam a ser o IP do container Nginx.

**Impacto**
O limite de 5 requisições/min para autenticação passa a ser global entre todos os usuários.

**Correção esperada**
1. Configurar `ForwardedHeadersOptions` (`XForwardedFor | XForwardedProto`) com proxies conhecidos.
2. Aplicar antes do rate limiter.
3. Validar o comportamento em Docker e em produção.
4. Opcionalmente, usar partição combinada IP + e-mail no login.

**Critérios de aceite**
- [ ] IP real do cliente aparece no rate limiter.
- [ ] Um cliente não consome o limite de outro.
- [ ] HTTPS/proxy continuam funcionando.

**Prompt para o ChatGPT**
```text
Corrija P1-08. A API está atrás do Nginx e usa RemoteIpAddress no rate limiter sem UseForwardedHeaders.
Configure ForwardedHeaders de forma segura e valide o limite por IP real, sem confiar cegamente em headers
de qualquer origem. Entregue o diff de Program.cs e nginx.conf se necessário.
```

---

## P1-09 — Dashboard e indicadores com dados fictícios

**Arquivos**
- `backend/DefesaCivil.Api/Services/DashboardService.cs:87-90,120-154`
- `frontend/defesa-web/src/pages/Dashboard.tsx:117-121,134,145,196`
- `frontend/defesa-web/src/components/Layout/Sidebar/Sidebar.tsx:43-46`
- `frontend/defesa-web/src/components/Layout/Topbar/Topbar.tsx:86`

**Problema**
Clima (`65/15/28.5`), cidades, equipes e alertas de fallback são fixos. A UI exibe “Sistema Online” permanentemente, “+2 nas últimas 24h”, “5 aguardando atendimento”, “Capacidade: 450”, badges fixos “7/12/3” e notificação “7”.

**Impacto**
Indicadores enganosos para operação real; difícil distinguir falha de integração de dados válidos.

**Correção esperada**
1. Remover mocks do caminho de produção ou rotulá-los explicitamente como demonstração.
2. Integrar clima/monitoramento real ou retornar “indisponível”.
3. Calcular deltas, capacidade e badges a partir do banco.
4. Exibir estado de erro quando o Dashboard falhar.

**Critérios de aceite**
- [ ] Nenhum número fixo no Dashboard em produção.
- [ ] Badges refletem contagens reais.
- [ ] Falha do backend é visível para o usuário.
- [ ] Dados mockados só existem em ambiente de demonstração.

**Prompt para o ChatGPT**
```text
Corrija P1-09. DashboardService retorna clima/cidades/equipes mockados e o frontend tem textos e badges fixos.
Remova os mocks do fluxo real, calcule indicadores do banco, trate indisponibilidade e atualize Sidebar/Topbar
para dados reais. Se mantiver demo, proteja com flag de ambiente.
```

---

## P1-10 — Autenticação sem índice único/normalização de e-mail

**Arquivos**
- `backend/DefesaCivil.Api/Data/AppDbContext.cs:22-65`
- `backend/DefesaCivil.Api/Controllers/AuthController.cs:25-48`
- `backend/DefesaCivil.Api/Models/User.cs:3`

**Problema**
`User.Email` não tem índice único nem normalização. O cadastro verifica duplicidade com `AnyAsync` e depois insere; duas requisições simultâneas podem duplicar. Diferenças de maiúsculas/minúsculas também permitem duplicatas. O modelo não tem `Role`, `Ativo`, `CreatedAt`. O registro é público e sem validação de e-mail.

**Impacto**
Contas duplicadas, login ambíguo, dificuldade de auditoria e ausência de controle de acesso por perfil.

**Correção esperada**
1. Normalizar e-mail (trim + lowercase) e criar índice único.
2. Tratar violação de unicidade como 409.
3. Adicionar `Role`, `Ativo` e `CreatedAt` ao usuário.
4. Restringir registro público ou proteger criação de usuários.
5. Aplicar política mínima de senha e validação de e-mail.
6. Adicionar autorização por perfil nas rotas sensíveis.

**Critérios de aceite**
- [ ] Não é possível criar e-mails duplicados, inclusive com caixa diferente.
- [ ] Concorrência não gera 500 por constraint.
- [ ] Rotas sensíveis exigem perfil adequado.
- [ ] Registro público pode ser desativado por configuração.

**Prompt para o ChatGPT**
```text
Corrija P1-10. Normalize User.Email, crie índice único, trate corrida de cadastro e adicione Role/Ativo/CreatedAt.
Proponha política de senha e proteja o registro público e rotas sensíveis com autorização por perfil.
Inclua migration e testes.
```

---

## P1-11 — Sem tratamento global de erros e health checks

**Arquivos**
- `backend/DefesaCivil.Api/Program.cs`
- `backend/DefesaCivil.Api/Controllers/DashboardController.cs:28`
- `docker-compose.yml:1-63`

**Problema**
Não há middleware global de exceções. O Dashboard captura qualquer erro e devolve mensagem genérica. Não há endpoint `/health` próprio, healthchecks no compose, logs estruturados ou `depends_on: condition: service_healthy`.

**Impacto**
Diagnóstico difícil, respostas inconsistentes e containers considerados saudáveis mesmo com banco indisponível.

**Correção esperada**
1. Adicionar `UseExceptionHandler`/ProblemDetails.
2. Criar `/health` (liveness/readiness) e healthchecks no compose.
3. Usar `ILogger` estruturado em vez de `Console.WriteLine`.
4. Configurar `depends_on` com condição de saúde.
5. Remover try/catch genérico do controller.

**Critérios de aceite**
- [ ] Erros retornam ProblemDetails sem stack trace em produção.
- [ ] `/health` reflete banco/API.
- [ ] Compose só inicia dependentes quando o serviço está saudável.
- [ ] Logs incluem correlação e nível adequado.

**Prompt para o ChatGPT**
```text
Implemente P1-11. Adicione middleware global de exceções/ProblemDetails, endpoint /health, healthchecks no
docker-compose e logging estruturado. Remova o catch genérico do DashboardController e configure dependências
com condition: service_healthy.
```

---

## P1-12 — Ordenação de prioridade lexicográfica

**Arquivos**
- `backend/DefesaCivil.Api/Services/OcorrenciaService.cs:139-149`

**Problema**
`OrderByDescending(o => o.Prioridade)` ordena strings alfabeticamente. A ordem resultante não representa criticidade (`Baixa`, `Alta`, `Média`, `Crítica`).

**Impacto**
Fila de ocorrências exibida em ordem incorreta, podendo esconder casos críticos.

**Correção esperada**
1. Mapear prioridade para valor numérico no banco ou em memória.
2. Ordenar por criticidade (Crítica > Alta > Média > Baixa) e depois por data.
3. Aplicar a mesma regra em outras listagens/filtros.

**Critérios de aceite**
- [ ] Lista “abertas” coloca Crítica primeiro.
- [ ] Empate é resolvido por data de criação decrescente.
- [ ] Teste cobre todas as prioridades.

**Prompt para o ChatGPT**
```text
Corrija P1-12. OcorrenciaService ordena prioridade como string. Implemente ordenação por criticidade
(Crítica > Alta > Média > Baixa) seguida de CreateAt desc, preferencialmente traduzível pelo EF Core.
Inclua teste.
```

---

# P2 — Médios

## P2-13 — Contratos frontend/backend inconsistentes

**Arquivos**
- `backend/DefesaCivil.Api/DTOs/Ocorrencia/OcorrenciaResponseDto.cs:21`
- `frontend/defesa-web/src/types/ocorrencia.ts:32`
- `backend/DefesaCivil.Api/DTOs/Alerta/AlertaDtos.cs:21-42`
- `frontend/defesa-web/src/components/Alertas/AlertaForm.tsx:247-258`
- `frontend/defesa-web/src/types/equipe.ts:50-67`
- `backend/DefesaCivil.Api/Entities/Equipes.cs:7-32`

**Problema**
- Backend retorna `CreateAt`; frontend espera `createdAt`.
- `UpdateAlertaDto` não possui `dataInicio`, mas o formulário permite editá-la.
- `CriarOcorrenciaDto` exige protocolo/status que o backend ignora.
- Enums de equipe divergem (`Operacoes` no frontend; `Bombeiros/DefesaCivil/Outros` no backend).
- `UpdateOcorrenciaDto` usa `DataOcorrencia` enquanto o restante usa `DataHora`.

**Impacto**
Campos silenciosamente ignorados, dados `undefined` e futuras falhas de integração.

**Correção esperada**
1. Padronizar nomes (`createAt`/`createdAt`, `dataHora`/`dataOcorrencia`).
2. Adicionar `dataInicio` ao update de alerta ou tornar o campo somente leitura.
3. Remover do DTO/UI campos que o backend não usa.
4. Compartilhar ou documentar enums.

**Critérios de aceite**
- [ ] Nenhum campo exibido na UI é ignorado pelo backend.
- [ ] Tipos TypeScript refletem exatamente as respostas da API.
- [ ] Enums de equipe alinhados.

**Prompt para o ChatGPT**
```text
Corrija P2-13. Alinhe os contratos: CreateAt/createdAt, dataInicio no update de alerta, protocolo/status na
criação de ocorrência e enums de equipe. Atualize DTOs, services, tipos TypeScript e formulários. Entregue uma
tabela antes/depois dos contratos.
```

---

## P2-14 — Build/lint não validam TypeScript

**Arquivos**
- `frontend/defesa-web/package.json:8`
- `frontend/defesa-web/tsconfig.app.json`
- `frontend/defesa-web/vite.config.js`

**Problema**
`npm run build` executa apenas `vite build`, que remove tipos sem checá-los. `tsconfig.app.json` está órfão (`noEmit:false`, `outDir:dist`) e não é usado por script algum. Erros como os de `EquipeFilters` não bloqueiam o build.

**Impacto**
TypeScript estrito configurado, mas sem efeito prático no CI.

**Correção esperada**
1. Adicionar `tsc -b`/`tsc --noEmit` ao script de build e ao CI.
2. Corrigir/remover `tsconfig.app.json`.
3. Rodar ESLint no CI.

**Critérios de aceite**
- [ ] `npm run build` falha em erro de tipo.
- [ ] `npm run lint` passa.
- [ ] Configuração de TS é única e documentada.

**Prompt para o ChatGPT**
```text
Corrija P2-14. O build usa apenas vite build e não valida tipos. Ajuste scripts para tsc --noEmit (ou tsc -b),
limpe tsconfig.app.json e garanta lint no CI. Mostre os comandos e possíveis erros encontrados.
```

---

## P2-15 — Riscos de infraestrutura Docker/Nginx

**Arquivos**
- `docker-compose.yml:10-11,50-59`
- `docker-compose.dev.yml:10-11,54-63`
- `frontend/defesa-web/nginx.conf`
- `backend/DefesaCivil.Api/Dockerfile`
- `frontend/defesa-web/Dockerfile`
- `backend/DefesaIA-api/monitor-agent/Dockerfile`

**Problema**
- Postgres exposto em `5432` no host.
- Portainer exposto em `9000/9443` com `/var/run/docker.sock`.
- Sem healthchecks, sem `.dockerignore`, containers rodando como root.
- Nginx sem TLS e sem headers de segurança.
- `UseHttpsRedirection` em container HTTP-only.
- `AllowedHosts: localhost` limita acesso por domínio.

**Impacto**
Superfície de ataque maior, builds lentos e comportamento incorreto em produção.

**Correção esperada**
1. Não publicar portas de banco; usar rede interna.
2. Mover Portainer para profile opcional e restringir acesso.
3. Adicionar `.dockerignore`, usuários non-root e healthchecks.
4. Configurar TLS/headers no Nginx (ou proxy externo).
5. Parametrizar `AllowedHosts` e CORS por ambiente.
6. Reavaliar `UseHttpsRedirection` atrás do proxy.

**Critérios de aceite**
- [ ] Postgres não acessível externamente em produção.
- [ ] Portainer não exposto por padrão.
- [ ] Containers non-root e com healthcheck.
- [ ] HTTPS/headers configurados no edge.
- [ ] Nenhum warning de HTTPS no startup em produção.

**Prompt para o ChatGPT**
```text
Corrija P2-15. Ajuste docker-compose/Dockerfiles/nginx para produção: remover exposição de Postgres e Portainer,
adicionar .dockerignore, usuários non-root, healthchecks, TLS/security headers e configurar AllowedHosts/CORS por
ambiente. Explique o impacto de UseHttpsRedirection atrás do proxy.
```

---

## P2-16 — Falta de paginação e limites de consulta

**Arquivos**
- `backend/DefesaCivil.Api/Services/AlertaService.cs:17`
- `backend/DefesaCivil.Api/Services/OcorrenciaService.cs:22`
- `backend/DefesaCivil.Api/Services/EquipeService.cs:17`

**Problema**
Todos os `GetAll` carregam a tabela inteira. As buscas usam `ToLower().Contains` sem índices funcionais. Não há `CancellationToken` nos endpoints.

**Impacto**
Consumo de memória e latência crescem com o volume; buscas ficam lentas.

**Correção esperada**
1. Adicionar paginação (`page`, `pageSize`, total) e limites máximos.
2. Criar índices adequados ou usar `citext`/`ILIKE` com trigram.
3. Propagar `CancellationToken`.
4. Filtrar no servidor em vez de carregar tudo e filtrar no cliente.

**Critérios de aceite**
- [ ] Nenhum endpoint retorna conjunto ilimitado por padrão.
- [ ] Filtros são aplicados no banco.
- [ ] Consultas cancelam quando o cliente desconecta.

**Prompt para o ChatGPT**
```text
Implemente P2-16. Adicione paginação com limite máximo em Alertas/Ocorrências/Equipes, filtros no servidor,
índices apropriados e CancellationToken. Atualize os services e os tipos/serviços do frontend.
```

---

## P2-17 — Sem testes/CI e com código morto

**Arquivos**
- Repositório inteiro
- `backend/DefesaIA-api/main.py`
- `backend/DefesaIA-api/requirements.txt`
- `backend/DefesaIA-api/monitor-agent/requirements.txt`
- `frontend/defesa-web/src/components/Equipes/*` (arquivos vazios)

**Problema**
Não há testes (xUnit, Vitest/RTL, pytest) nem CI. Há duas aplicações Python sobrepostas, uma sem uso e com encoding corrompido. Requirements Python não são fixados.

**Impacto**
Regressões silenciosas, baixa confiança para refatorar e builds não reproduzíveis.

**Correção esperada**
1. Criar projetos de teste e pipeline (build, lint, typecheck, test).
2. Remover ou integrar o `main.py` duplicado.
3. Fixar dependências Python.
4. Remover arquivos vazios/dead code.
5. Adicionar README raiz com setup e arquitetura.

**Critérios de aceite**
- [ ] CI executa build/lint/test em PR.
- [ ] Cobertura mínima definida e cumprida nos fluxos críticos.
- [ ] Apenas uma aplicação Python ativa.
- [ ] README permite subir o projeto do zero.

**Prompt para o ChatGPT**
```text
Implemente P2-17. Proponha a estrutura de testes (xUnit, Vitest/RTL, pytest), pipeline de CI e remoção do
código Python duplicado. Fixe dependências e entregue um README com setup local e Docker.
```

---

## P2-18 — Inconsistências de UX e tema

**Arquivos**
- `frontend/defesa-web/src/pages/AlertasPage.tsx:60`
- `frontend/defesa-web/src/pages/OcorrenciaPage.tsx:59`
- `frontend/defesa-web/src/components/Ocorrencias/OcorrenciaForm.tsx:27-36`
- `frontend/defesa-web/src/pages/OcorrenciaPage.tsx:47-56`
- `frontend/defesa-web/src/components/Alertas/AlertaList.tsx:13-39`

**Problema**
Alertas/Ocorrências fixam tema escuro (`bg-[#0b1222]`) ignorando o ThemeToggle. O formulário de ocorrência engole erros sem feedback. `handleChangeStatus` não tem try/catch. Estados vazios usam vermelho (parecem erro). Cards clicáveis não são acessíveis por teclado.

**Impacto**
Experiência inconsistente e difícil de operar; falhas parecem sucesso.

**Correção esperada**
1. Usar classes de tema consistentes (`dark:`).
2. Exibir erros de formulário e de mudança de status.
3. Diferenciar vazio de erro.
4. Melhorar acessibilidade (botão/link, foco, aria).

**Critérios de aceite**
- [ ] Alternância claro/escuro funciona em todas as telas.
- [ ] Toda falha de operação é visível.
- [ ] Estados vazios e de erro são distintos.
- [ ] Ações principais são acessíveis por teclado.

**Prompt para o ChatGPT**
```text
Corrija P2-18. Padronize o tema nas páginas de Alertas/Ocorrências, adicione feedback de erro nos formulários
e na mudança de status, diferencie estado vazio de erro e melhore acessibilidade dos cards/ações.
```

---

# Plano de correção sugerido

## Fase 0 — Baseline
- Instalar dependências e rodar build/lint/typecheck/testes existentes.
- Registrar os erros reais antes de alterar código.

## Fase 1 — Bloqueadores (P0)
- Schema/migrations e startup fail-fast.
- Datas UTC.
- Update parcial de ocorrência.
- Monitoramento.
- Protocolo atômico.

## Fase 2 — Segurança e confiabilidade (P1)
- Refresh token/rotação/revogação.
- Forwarded headers e rate limit real.
- E-mail único/normalizado e perfis.
- Erros globais/health/logs.
- Remoção de mocks e ordenação de prioridade.

## Fase 3 — Qualidade (P2)
- Contratos, typecheck/CI, paginação, índices, infra, testes e limpeza.

## Fase 4 — UX
- Tema, feedback de erro, acessibilidade e estados.

---

# Referências rápidas por arquivo

| Arquivo | IDs |
|---|---|
| `backend/DefesaCivil.Api/Program.cs` | P0-01, P1-08, P1-11 |
| `backend/DefesaCivil.Api/Data/AppDbContext.cs` | P0-01, P1-10 |
| `backend/DefesaCivil.Api/Migrations/20260706231538_CriarTabelaOcorrencias.cs` | P0-01 |
| `backend/DefesaCivil.Api/Services/AlertaService.cs` | P0-02 |
| `backend/DefesaCivil.Api/Services/OcorrenciaService.cs` | P0-02, P0-03, P0-05, P1-12, P2-16 |
| `backend/DefesaCivil.Api/Services/EquipeService.cs` | P2-16 |
| `backend/DefesaCivil.Api/Services/DashboardService.cs` | P1-09 |
| `backend/DefesaCivil.Api/Controllers/AuthController.cs` | P1-07, P1-10 |
| `backend/DefesaCivil.Api/Controllers/MonitoramentoController.cs` | P0-04 |
| `backend/DefesaCivil.Api/Controllers/DashboardController.cs` | P1-11 |
| `backend/DefesaCivil.Api/DTOs/Ocorrencia/UpdateOcorrenciaDto.cs` | P0-03, P2-13 |
| `backend/DefesaCivil.Api/DTOs/Ocorrencia/CreateOcorrenciaDto.cs` | P0-05, P2-13 |
| `backend/DefesaCivil.Api/DTOs/Ocorrencia/OcorrenciaResponseDto.cs` | P2-13 |
| `backend/DefesaCivil.Api/DTOs/Alerta/AlertaDtos.cs` | P2-13 |
| `backend/DefesaCivil.Api/Entities/Equipes.cs` | P1-06, P2-13 |
| `backend/DefesaIA-api/monitor-agent/Dockerfile` | P0-04 |
| `backend/DefesaIA-api/monitor-agent/app/main.py` | P0-04 |
| `backend/DefesaIA-api/main.py` | P0-04, P2-17 |
| `frontend/defesa-web/src/App.tsx` | P1-06 |
| `frontend/defesa-web/src/components/Equipes/*` | P1-06 |
| `frontend/defesa-web/src/contexts/AuthContext.tsx` | P1-07 |
| `frontend/defesa-web/src/services/api.ts` | P1-07 |
| `frontend/defesa-web/src/routes/PrivateRoute.tsx` | P1-07 |
| `frontend/defesa-web/src/pages/Dashboard.tsx` | P1-09 |
| `frontend/defesa-web/src/pages/AlertasPage.tsx` | P2-18 |
| `frontend/defesa-web/src/pages/OcorrenciaPage.tsx` | P0-03, P2-18 |
| `frontend/defesa-web/src/components/Alertas/AlertaForm.tsx` | P0-02, P2-13 |
| `frontend/defesa-web/src/components/Ocorrencias/OcorrenciaForm.tsx` | P0-02, P0-05, P2-18 |
| `frontend/defesa-web/src/types/ocorrencia.ts` | P2-13 |
| `frontend/defesa-web/src/types/equipe.ts` | P1-06, P2-13 |
| `frontend/defesa-web/package.json` | P2-14 |
| `frontend/defesa-web/tsconfig.app.json` | P2-14 |
| `frontend/defesa-web/nginx.conf` | P1-08, P2-15 |
| `docker-compose.yml` | P0-04, P1-11, P2-15 |
| `docker-compose.dev.yml` | P2-15 |

---

# Decisões pendentes

1. **Banco:** preservar dados existentes (migration corretiva) ou recriar o schema?
2. **Autenticação:** manter JWT em `localStorage` ou migrar para cookie `httpOnly` com refresh persistido?
3. **Registro público:** manter aberto, exigir aprovação ou restringir a administradores?
4. **Monitoramento:** evoluir o `monitor-agent` ou containerizar o `main.py` da raiz?
5. **Dados mockados:** remover por completo ou manter atrás de uma flag de demonstração?
6. **Deploy:** TLS será terminado no Nginx do projeto ou em um proxy externo?

---

# Observação final

Esta auditoria é estática. Antes de corrigir, rode:

```bash
cd backend/DefesaCivil.Api && dotnet build
cd frontend/defesa-web && npm install && npm run lint && npx tsc --noEmit
```

Os resultados podem revelar erros adicionais de compilação/tipagem além dos apontados aqui.
