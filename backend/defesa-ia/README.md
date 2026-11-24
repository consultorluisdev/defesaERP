# defesa-ia

Agente de monitoramento climatico da Defesa Civil. Servico Rust/Axum que consulta o
[Open-Meteo](https://open-meteo.com/) (sem chave) e expoe o contrato consumido pelo
Dashboard do DefesaERP.

## Endpoints

| Metodo | Rota | Resposta |
|---|---|---|
| `GET` | `/health` | `{ "status": "healthy" }` |
| `GET` | `/monitoramento` | lista de cidades monitoradas |

Exemplo de `GET /monitoramento`:

```json
[
  {
    "cidade": "Brusque",
    "risco": "Moderado",
    "clima": "Chuva leve",
    "temperatura": 22.5,
    "umidade": 81.2,
    "vento": 12.0,
    "chuva": 5.0,
    "atualizadoEm": "2026-11-23T18:00:00Z"
  }
]
```

O campo `risco` usa `Baixo`, `Moderado`, `Alto` ou `Critico`.

## Regras de risco

O risco final e o maior entre chuva, vento e codigo WMO:

| Indicador | Moderado | Alto | Critico |
|---|---|---|---|
| Chuva (mm/h) | >= 4 | >= 10 | >= 20 |
| Vento (km/h) | >= 40 | >= 60 | >= 80 |
| Codigo WMO | 51-57, 61-63, 66, 80-81 | 65, 67, 82 | 95-99 |

## Configuracao

| Variavel | Padrao | Descricao |
|---|---|---|
| `PORT` | `8000` | Porta HTTP |
| `CACHE_TTL_SECONDS` | `600` | Validade do cache em memoria |
| `REQUEST_TIMEOUT_SECONDS` | `10` | Timeout das chamadas ao Open-Meteo |
| `OPEN_METEO_URL` | `https://api.open-meteo.com/v1/forecast` | URL do provedor |
| `CITIES_JSON` | 6 cidades do vale | Lista `[{"name","latitude","longitude"}]` |
| `RUST_LOG` | `defesa_ia=info,tower_http=info` | Filtro de logs |

Cidades padrao: Brusque, Blumenau, Itajai, Guabiruba, Gaspar e Camboriu.

## Desenvolvimento

```bash
cargo run
curl http://localhost:8000/health
curl http://localhost:8000/monitoramento
```

## Qualidade

```bash
cargo fmt --check
cargo clippy -- -D warnings
cargo test
```

## Docker

```bash
docker build -t defesa-ia .
docker run --rm -p 8001:8000 defesa-ia
```

No monorepo, o `docker-compose.yml` sobe o servico como `defesa-ia` na porta interna
`8000`; no compose de desenvolvimento ele fica exposto em `127.0.0.1:8001`.
