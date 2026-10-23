# 🛡️ DefesaERP

> Sistema de gestão e apoio operacional para a **Defesa Civil**, desenvolvido para centralizar ocorrências, alertas, equipes e informações operacionais em uma única plataforma.

---

## 📌 Sobre o projeto

O **DefesaERP** é uma plataforma web voltada para a gestão operacional da Defesa Civil.

A proposta é substituir processos fragmentados por uma aplicação centralizada, permitindo registrar, acompanhar e organizar informações importantes para a operação.

O projeto está sendo desenvolvido com foco em:

- 🚨 Gestão de ocorrências
- 🔔 Alertas
- 👥 Gestão de equipes
- 📊 Indicadores operacionais
- 🗺️ Monitoramento e localização
- 🏠 Gestão de abrigos
- ⚠️ Gestão de riscos
- 🔐 Autenticação e controle de acesso
- 🤖 Integrações e recursos de apoio à decisão

---

## 🏗️ Arquitetura

O projeto utiliza uma arquitetura separada entre frontend e backend:

```text
DefesaERP
│
├── backend
│   ├── DefesaCivil.Api
│   └── DefesaIA-api
│
├── frontend
│   └── defesa-web
│
└── infraestrutura
    ├── PostgreSQL
    ├── Docker
    └── Nginx
```

---

## 🧰 Stack

### Backend

- **C#**
- **.NET 10**
- ASP.NET Core Web API
- Entity Framework Core
- PostgreSQL
- Npgsql
- JWT
- Swagger / OpenAPI
- BCrypt
- xUnit

### Frontend

- **React**
- **TypeScript**
- Vite
- Tailwind CSS
- React Router
- Axios
- Lucide React

### Infraestrutura

- Docker
- Docker Compose
- PostgreSQL
- Nginx

---

## 📂 Estrutura do Frontend

```text
frontend/defesa-web
│
├── src
│   ├── components
│   │   ├── Alertas
│   │   ├── Equipes
│   │   └── Ocorrencias
│   │
│   ├── contexts
│   ├── pages
│   ├── routes
│   ├── services
│   ├── types
│   └── App.tsx
│
├── public
├── package.json
├── vite.config.ts
└── tsconfig.json
```

---

## 🚨 Módulos

### Ocorrências

Módulo responsável pelo registro e acompanhamento das ocorrências.

Atualmente possui fluxo para:

- Listagem
- Filtros
- Cadastro
- Visualização de detalhes
- Alteração de status
- Busca por informações da ocorrência

Fluxo:

```text
Nova ocorrência
      ↓
Registro
      ↓
Aberta
      ↓
Em andamento
      ↓
Concluída / Cancelada
```

---

### 🔔 Alertas

Módulo destinado ao gerenciamento dos alertas operacionais da Defesa Civil.

O módulo possui estrutura para:

- Listagem
- Cadastro
- Filtros
- Visualização
- Gerenciamento de alertas

---

### 👥 Equipes

Módulo responsável pelo gerenciamento das equipes operacionais.

Estrutura em desenvolvimento:

```text
Equipes
│
├── Filtros
├── Cards
├── Lista
├── Detalhes
├── Cadastro
└── Edição
```

Tipos de equipe previstos:

- Busca e Salvamento
- Atendimento
- Vistoria
- Logística
- Resgate
- Operações
- Voluntários
- Administrativa

Status previstos:

- Disponível
- Em Atendimento
- Em Deslocamento
- Em Apoio
- Indisponível

---

## 🖥️ Telas

O sistema possui atualmente a estrutura de navegação para:

```text
/login
/dashboard
/ocorrencias
/alertas
/radar
/riscos
/equipes
/abrigo
```

Algumas dessas áreas ainda estão em desenvolvimento.

---

## 🔐 Segurança

O sistema utiliza autenticação baseada em JWT.

A arquitetura também considera:

- Controle de acesso
- Proteção de rotas
- Hash de senhas
- Refresh token
- Rate limiting
- Validação de dados
- Tratamento global de erros
- Health checks

Itens de segurança e infraestrutura continuam sendo aprimorados durante a fase de auditoria.

---

## 🧪 Qualidade

O projeto utiliza ferramentas de validação para reduzir problemas antes da publicação.

### Frontend

```bash
npm install
npm run lint
npm run build
```

Verificação TypeScript:

```bash
npx tsc --noEmit
```

### Backend

```bash
dotnet restore
dotnet build
dotnet test
```

Os testes automatizados do backend utilizam **xUnit**.

---

## 🚧 Status do projeto

> **Em desenvolvimento / fase de auditoria e estabilização**

O projeto está passando por uma etapa de revisão técnica antes da evolução das funcionalidades.

Prioridades atuais:

```text
[✓] Auditoria inicial
[✓] Migração do backend para .NET 10
[✓] Build do backend
[✓] Instalação e validação do frontend
[✓] Correção inicial do módulo Equipes
[✓] Lint do frontend sem erros
[✓] Build do frontend

[ ] Migrations / banco de dados
[ ] Correções críticas do backend
[ ] Finalização de Equipes
[ ] Segurança e autenticação
[ ] Health checks
[ ] Testes automatizados completos
[ ] Integração dos dados reais no Dashboard
[ ] Revisão final de UX/UI
[ ] Deploy
```

---

## 🗺️ Roadmap

### Fase 1 — Estabilização

- [ ] Corrigir banco e migrations
- [ ] Validar contratos API
- [ ] Corrigir problemas críticos
- [ ] Finalizar Equipes
- [ ] Revisar autenticação
- [ ] Criar tratamento global de erros

### Fase 2 — Confiabilidade

- [ ] Ampliar testes xUnit
- [ ] Testes do frontend
- [ ] Health checks
- [ ] Logs estruturados
- [ ] Paginação
- [ ] Validação de entradas
- [ ] Rate limiting

### Fase 3 — Operação

- [ ] Dashboard com dados reais
- [ ] Radar
- [ ] Riscos
- [ ] Abrigos
- [ ] Monitoramento
- [ ] Integrações externas

### Fase 4 — Produção

- [ ] Docker
- [ ] PostgreSQL
- [ ] Nginx
- [ ] CI/CD
- [ ] HTTPS
- [ ] Observabilidade
- [ ] Backup
- [ ] Deploy

---

## 🎯 Objetivo

O objetivo do DefesaERP é oferecer uma plataforma moderna para apoiar a **gestão, monitoramento e resposta operacional da Defesa Civil**, reunindo informações importantes em um único ambiente.

A longo prazo, o sistema deverá servir como uma plataforma integrada para:

```text
Ocorrências
     +
Alertas
     +
Equipes
     +
Monitoramento
     +
