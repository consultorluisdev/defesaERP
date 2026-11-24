use std::{net::SocketAddr, sync::Arc};

use defesa_ia::{
    config::Config,
    routes::{AppState, router, swagger_router},
    weather::{MonitorService, OpenMeteoProvider},
};
use tracing_subscriber::EnvFilter;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    tracing_subscriber::fmt()
        .with_env_filter(
            EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| {
                    EnvFilter::new("defesa_ia=info,tower_http=info")
                }),
        )
        .init();

    let config = Config::from_env()?;

    let client = reqwest::Client::builder()
        .timeout(config.request_timeout)
        .user_agent(concat!("defesa-ia/", env!("CARGO_PKG_VERSION")))
        .build()?;

    let provider = Arc::new(OpenMeteoProvider::new(
        client,
        config.open_meteo_url.clone(),
    ));

    let monitor = Arc::new(MonitorService::new(
        provider,
        config.cities.clone(),
        config.cache_ttl,
    ));

    let app = router(AppState { monitor })
        .merge(swagger_router());

    let addr = SocketAddr::from(([0, 0, 0, 0], config.port));
    let listener = tokio::net::TcpListener::bind(addr).await?;

    tracing::info!(
        %addr,
        cidades = config.cities.len(),
        cache_segundos = config.cache_ttl.as_secs(),
        "defesa-ia iniciado"
    );

    axum::serve(listener, app).await?;

    Ok(())
}
