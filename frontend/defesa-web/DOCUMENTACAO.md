# DefesaERP - Documentacao do Sistema

> Sistema de Gestao da Defesa Civil - Brusque/SC
> Ultima atualizacao: Julho 2026

---

## Visao Geral

O **DefesaERP** e um sistema operacional para a Defesa Civil de Brusque/SC, projetado para gerenciar ocorrencias, alertas climaticos, equipes de campo, abrigos e monitoramento por IA.

---

## Stack Tecnologica

```
┌─────────────────────────────────────────────────┐
│                  INFRAESTRUTURA                  │
│         Docker Compose + Portainer CE            │
├─────────────────┬───────────────────────────────┤
│    FRONTEND     │          BACKEND              │
│  React 19       │   ASP.NET Core 8.0            │
│  TypeScript     │   Entity Framework Core 8     │
│  Vite 8         │   JWT Auth (HMAC-SHA256)      │
│  Tailwind CSS 4 │   BCrypt Password Hashing     │
│  Axios          │   Swagger/OpenAPI             │
├─────────────────┴───────────────────────────────┤
│                    DATABASE                      │
│              PostgreSQL 17                       │
├─────────────────────────────────────────────────┤
│                  IA / PYTHON                     │
│        FastAPI Monitor Agent (port 8001)         │
└─────────────────────────────────────────────────┘
```

---

## Arquitetura do Sistema

```
defesaERP/
├── backend/
│   └── DefesaCivil.Api/
│       ├── Controllers/        # Endpoints REST
│       │   ├── AuthController.cs
│       │   ├── OcorrenciasController.cs
│       │   ├── DashboardController.cs
│       │   └── MonitoramentoController.cs
│       ├── Entities/           # Modelos de dominio
│       │   ├── Ocorrencias.cs
│       │   ├── Alerta.cs
│       │   ├── Equipes.cs
│       │   ├── Abrigos.cs
│       │   └── Cidade.cs
│       ├── Models/             # Modelos de usuario
│       │   └── User.cs
│       ├── Services/           # Logica de negocio
│       │   ├── OcorrenciaService.cs
│       │   ├── AlertaService.cs
│       │   ├── DashboardService.cs
│       │   └── TokenServices.cs
│       ├── DTOs/               # Data Transfer Objects
│       │   ├── Login.cs
│       │   ├── Register.cs
│       │   ├── Alerta/
│       │   ├── Ocorrencia/
│       │   └── Dashboard/
│       ├── Data/
│       │   └── AppDbContext.cs
│       └── Migrations/
│
├── frontend/
│   └── defesa-web/
│       └── src/
│           ├── pages/          # Paginas principais
│           ├── components/     # Componentes React
│           │   ├── Layout/     # Sidebar + Topbar
│           │   ├── Ocorrencias/
│           │   ├── Alertas/
│           │   └── auth/
│           ├── services/       # Chamadas API
│           ├── types/          # Types TypeScript
│           ├── contexts/       # React Context (Auth, Theme)
│           └── routes/         # Rotas protegidas
│
├── docker-compose.yml          # Producao
├── docker-compose.dev.yml      # Desenvolvimento
└── CHECKLIST.md                # TODO do projeto
```

---

## Entidades do Dominio

### Ocorrencia
| Campo | Tipo | Descricao |
|-------|------|-----------|
| id | int | PK auto-increment |
| numeroProtocolo | string | Formato: `OC-YYYYMMDD-NNNN` (unico) |
| tipoOcorrencia | enum | Alagamento, Deslizamento, Incendio, Queda de Arvore, Microexplosao, Resgate, Interdicao, Outros |
| descricao | string | Max 500 chars |
| dataHora | DateTime | Data/hora da ocorrencia |
| cidade | string | Cidade (indexada) |
| bairro | string | Bairro |
| endereco | string | Endereco completo |
| latitude / longitude | string | Coordenadas GPS |
| status | enum | Aberta, Em Andamento, Concluida, Cancelada |
| prioridade | enum | Baixa, Media, Alta, Critica |
| responsavel | string | Responsavel pelo atendimento |
| telefoneSolicitante | string | Telefone de contato |
| nomeSolicitante | string | Nome de quem reportou |
| observacoes | string | Observacoes gerais |
| createdAt | DateTime | UTC auto-set |
| updatedAt | DateTime | UTC auto-set |

### Alerta
| Campo | Tipo | Descricao |
|-------|------|-----------|
| id | int | PK auto-increment |
| titulo | string | Titulo do alerta |
| descricao | string | Descricao detalhada |
| tipo | enum | ChuvaIntensa, Enchente, Alagamento, Enxurrada, Deslizamento, Vendaval, Microexplosao, Granizo, Incendio, Outros |
| nivel | enum | Baixo, Moderado, Alto, Critico |
| status | enum | Ativo, Monitorando, Encerrado, Cancelado |
| cidade | string | Cidade afetada |
| latitude / longitude | double? | Coordenadas GPS |
| dataInicio | DateTime | Inicio do alerta |
| dataFim | DateTime? | Fim do alerta |
| responsavel | string? | Responsavel |
| observacoes | string? | Observacoes |
| createdAt | DateTime | UTC auto-set |
| updatedAt | DateTime? | UTC auto-set |

### Outras Entidades
| Entidade | Descricao |
|----------|-----------|
| **Equipe** | Equipes de campo (nome, localizacao, status) |
| **Abrigo** | Abrigos (nome, capacidade, disponivel) |
| **Cidade** | Cidades do municipio (nome, estado) |
| **User** | Usuarios do sistema (email, passwordHash) |

---

## Endpoints da API

### Autenticacao
| Metodo | Rota | Descricao |
|--------|------|-----------|
| POST | `/api/Auth/register` | Registrar usuario |
| POST | `/api/Auth/login` | Login, retorna JWT |

### Ocorrencias
| Metodo | Rota | Descricao |
|--------|------|-----------|
| GET | `/api/Ocorrencias` | Listar todas |
| GET | `/api/Ocorrencias/{id}` | Buscar por ID |
| POST | `/api/Ocorrencias` | Criar nova |
| PUT | `/api/Ocorrencias/{id}` | Atualizar |
| DELETE | `/api/Ocorrencias/{id}` | Deletar |
| GET | `/api/Ocorrencias/status/{status}` | Filtrar por status |
| GET | `/api/Ocorrencias/prioridade/{prioridade}` | Filtrar por prioridade |
| GET | `/api/Ocorrencias/dashboard/abertas` | Ocorrencias abertas |

### Dashboard
| Metodo | Rota | Descricao |
|--------|------|-----------|
| GET | `/api/Dashboard` | Dados agregados do dashboard |

### Monitoramento (IA)
| Metodo | Rota | Descricao |
|--------|------|-----------|
| GET | `/api/Monitoramento` | Proxy para servico Python IA |

### Alertas
| Metodo | Rota | Descricao |
|--------|------|-----------|
| GET | `/api/Alertas` | Listar todos |
| GET | `/api/Alertas/{id}` | Buscar por ID |
| POST | `/api/Alertas` | Criar |
| PUT | `/api/Alertas/{id}` | Atualizar |
| DELETE | `/api/Alertas/{id}` | Deletar |
| GET | `/api/Alertas/ativos` | Listar ativos |
| GET | `/api/Alertas/cidade/{cidade}` | Filtrar por cidade |
| GET | `/api/Alertas/nivel/{nivel}` | Filtrar por nivel |
| GET | `/api/Alertas/encerrados` | Listar encerrados |

---

## Fluxo de Autenticacao

```
┌──────────┐     POST /api/Auth/login      ┌──────────┐
│ FRONTEND │  ───────────────────────────►  │ BACKEND  │
│          │  { email, password }           │          │
│          │                                │ Verifica │
│          │  ◄───────────────────────────  │ BCrypt   │
│          │  { token: "eyJ..." }           │          │
├──────────┤                                ├──────────┤
│ Armazena │  localStorage.setItem(         │          │
│ token em │    'token', jwt)               │          │
│ localStorage│                             │          │
├──────────┤                                ├──────────┤
│ Requests │  Authorization: Bearer <token> │ Valida   │
│ futuros  │  ───────────────────────────►  │ JWT      │
└──────────┘                                └──────────┘
```

**Config JWT:**
- Secret: `JWT_KEY_DEFINIDA_VIA_AMBIENTE`
- Expiracao: 7 dias
- Algoritmo: HMAC-SHA256

---

## Rotas do Frontend

| Rota | Componente | Auth |
|------|-----------|------|
| `/` | Redirect → `/login` | Nao |
| `/login` | Login.tsx | Nao |
| `/register` | Register.tsx | Nao |
| `/dashboard` | Dashboard.tsx | Sim |
| `/ocorrencias` | OcorrenciaPage.tsx | Sim |
| `/alertas` | AlertasPage.tsx | Sim |
| `/radar` | Placeholder | Sim |
| `/riscos` | Placeholder | Sim |
| `/equipes` | Placeholder | Sim |
| `/abrigo` | Placeholder | Sim |
| `/viaturas` | Placeholder | Sim |
| `/relatorios` | Placeholder | Sim |
| `/analises` | Placeholder | Sim |
| `/ia-predict-ia` | Placeholder | Sim |
| `/perfis` | Placeholder | Sim |
| `/configuracoes` | Placeholder | Sim |

---

## Docker

### Servicos (Producao)

| Servico | Imagem | Porta | Descricao |
|---------|--------|-------|-----------|
| postgres | postgres:17 | 5432 | Banco de dados |
| backend | .NET 8 build | 8080 | API REST |
| frontend | Node + Nginx | 3000 | SPA + proxy reverso |
| defesa-ia | Python FastAPI | 8001 | Servico de IA |
| portainer | portainer-ce | 9000 | Gerenciador de containers |

### Comandos

```bash
# Desenvolvimento
docker compose -f docker-compose.dev.yml up -d

# Producao
docker compose up -d --build

# Ver logs
docker compose logs -f backend
docker compose logs -f frontend
```

---

## O Que Ja Foi Feito

- [x] Autenticacao completa (registro + login + JWT)
- [x] CRUD de Ocorrencias (service, controller, DTOs, filtros)
- [x] Geracao automatica de protocolo (OC-YYYYMMDD-NNNN)
- [x] Dashboard com dados agregados
- [x] Layout completo (Sidebar colapsavel + Topbar com relogio)
- [x] Pagina de Ocorrencias (cards, filtros, formulario, detalhes)
- [x] Sistema de tema (dark/light com persistencia)
- [x] Infraestrutura Docker (dev + producao)
- [x] PostgreSQL com EF Core + migrations
- [x] Types e Services de Alertas (frontend)
- [x] Componentes de Alertas (Card, Form, Filters, List, Details)
- [x] AlertasController + Service (backend) com JsonStringEnumConverter
- [x] Enum TipoAlerta corrigido (Enxurrada, Alagamento)
- [x] Pagina de Alertas (AlertasPage.tsx) na rota `/alertas`

---

## O Que Falta Fazer

### Urgente
- [ ] Testar fluxo completo de Alertas (criar, editar, filtrar, excluir)
- [ ] `date-fns` removido do AlertaDetails — conferir que nada mais importa
- [ ] Corrigir erro pre-existente no `main.tsx` (`getElementById('root')` pode ser null)

### Proximo Plantao
- [ ] Pagina de Equipes (listar equipes de campo)
- [ ] Pagina de Abrigos (capacidade, disponibilidade)
- [ ] Pagina de Relatorios (exportar dados)
- [ ] Conectar Dashboard com dados reais (remover mocks)

### Backlog
- [ ] Pagina de Radar (mapa com ocorrencias)
- [ ] Pagina de Riscos (calculo de risco por regiao)
- [ ] Pagina de Viaturas (rastreamento)
- [ ] Pagina de Analises (graficos e metricas)
- [ ] Pagina de IA Predict (previsoes)
- [ ] Sistema de perfis (RBAC: admin, operador, visualizador)
- [ ] Pagina de Configuracoes
- [ ] Health checks no Docker
- [ ] CI/CD pipeline
- [ ] Testes unitarios e de integracao
- [ ] Rate limiting nos endpoints de auth
- [ ] Middleware de tratamento de erros global
- [ ] Refresh tokens
- [ ] Logging estruturado
- [ ] README no repositorio

---

## Notas de Desenvolvimento

### Regra de Trabalho (combinado com o Luis)
- O **Luis programa** — a IA NAO reescreve o codigo que ele ja fez.
- A IA **aponta o que falta / o que esta errado** e ele codifica.
- A IA so corrige quando ele pedir explicitamente (ex.: corrigir bug que quebra build).
- Ao dar feedback, listar os pontos e deixar ele decidir o que fazer.

### Cuidados
- A `api` Axios ja tem `baseURL: ".../api"`, entao os services devem usar paths相对 como `"/alertas"` e NAO `"/api/alertas"`
- Os types do frontend devem bater EXATAMENTE com os enums do backend (cuidado com acentos)
- `localStorage` pode ter JSON corrompido, sempre usar try-catch em `JSON.parse`

### Padroes de Codigo
- Services seguem o padrao: `listar()`, `buscarPorId()`, `criar()`, `update()`, `excluir()`
- Components usam `React.FC<Props>` ou funcao nomeada com export
- CSS usa Tailwind CSS com classes customizadas em `index.css`
- Dark mode usa classes `dark:` do Tailwind
