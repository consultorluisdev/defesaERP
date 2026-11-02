# Relatório de varredura de segredos

> Data: 02/11/2026  
> Escopo: arquivos rastreados e histórico do Git.  
> Ferramenta: `gitleaks` não estava instalado; varredura manual com `git grep` e `git log -p`.

## Resumo

- Nenhum segredo real foi encontrado nos arquivos atuais.
- Foram encontradas credenciais hardcoded no histórico do Git, já removidas do código atual.
- Valores não são reproduzidos neste relatório.

## Arquivos atuais

| Arquivo | Situação |
|---|---|
| `.env.example` | Somente placeholders |
| `docker-compose.yml` | Usa variáveis de ambiente obrigatórias |
| `docker-compose.dev.yml` | Usa variáveis de ambiente com padrão local |
| `backend/DefesaCivil.Api/appsettings.json` | Campos de conexão e JWT vazios |
| `backend/DefesaCivil.Api/appsettings.Development.json` | Apenas configuração de logging |

## Histórico do Git

| Commit | Arquivo | Achado | Situação |
|---|---|---|---|
| `50cb1b0` | `backend/DefesaCivil.Api/Program.cs` | Connection string hardcoded com senha não-placeholder | Removida em `e40ce60` |
| `50cb1b0` | `backend/DefesaCivil.Api/Services/TokenServices.cs` | Chave JWT hardcoded não-placeholder | Substituída por configuração em `e40ce60` |

Os commits de baseline `125c9bc`, `915826b` e `c91a095` apenas repetem o estado já existente.

Ocorrências em `backend/monitoramento-api/venv/` são código de terceiros e foram tratadas como falso positivo.

## Recomendação

1. Rotacionar `POSTGRES_PASSWORD` e `JWT_KEY` caso tenham sido usados fora do ambiente local.
2. Manter os valores reais apenas em `.env` ou em variáveis de ambiente do deploy.
3. Não reescrever o histórico sem uma decisão explícita, pois a operação exige force push.
4. Ativar secret scanning no GitHub para impedir novos commits com credenciais.
