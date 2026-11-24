# backend/defesa-ia/Dockerfile
FROM rust:1.100-bookworm AS build
WORKDIR /app

# Compila as dependencias antes do codigo-fonte para aproveitar o cache de camadas.
COPY Cargo.toml Cargo.lock ./
RUN mkdir src && printf 'fn main() {}\n' > src/main.rs \
    && cargo build --release \
    && rm -rf src

COPY src ./src
RUN cargo build --release

FROM debian:bookworm-slim AS runtime

RUN apt-get update \
    && apt-get install -y --no-install-recommends ca-certificates curl \
    && rm -rf /var/lib/apt/lists/* \
    && useradd --create-home --uid 10001 defesa

COPY --from=build /app/target/release/defesa-ia /usr/local/bin/defesa-ia

USER defesa
EXPOSE 8000
ENV PORT=8000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD curl -fsS http://127.0.0.1:8000/health || exit 1

ENTRYPOINT ["defesa-ia"]
