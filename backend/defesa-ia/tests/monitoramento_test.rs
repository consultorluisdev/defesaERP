use std::{
    sync::{
        Arc,
        atomic::{AtomicUsize, Ordering},
    },
    time::Duration,
};

use async_trait::async_trait;
use axum::{
    body::{Body, to_bytes},
    http::{Request, StatusCode},
};
use defesa_ia::{
    domain::{City, WeatherSnapshot},
    error::AppError,
    routes::{AppState, router},
    weather::{MonitorService, WeatherProvider},
};
use serde_json::Value;
use tower::ServiceExt;

struct MockProvider {
    calls: Arc<AtomicUsize>,
    fail: bool,
}

#[async_trait]
impl WeatherProvider for MockProvider {
    async fn fetch(&self, city: &City) -> Result<WeatherSnapshot, AppError> {
        self.calls.fetch_add(1, Ordering::SeqCst);

        if self.fail {
            return Err(AppError::Upstream("falha simulada".to_string()));
        }

        Ok(WeatherSnapshot {
            city: city.name.clone(),
            temperature_c: 22.46,
            humidity: 81.24,
            wind_kmh: 12.04,
            rain_mm: 5.0,
            weather_code: 61,
            observed_at: "2026-11-23T18:00:00Z".to_string(),
            description: "Chuva leve".to_string(),
        })
    }
}

fn brusque() -> City {
    City {
        name: "Brusque".to_string(),
        latitude: -27.097,
        longitude: -48.910,
    }
}

fn app_with(provider: MockProvider, ttl: Duration) -> axum::Router {
    let monitor = Arc::new(MonitorService::new(
        Arc::new(provider),
        vec![brusque()],
        ttl,
    ));

    router(AppState { monitor })
}

async fn get(app: axum::Router, uri: &str) -> (StatusCode, Value) {
    let response = app
        .oneshot(
            Request::builder()
                .uri(uri)
                .body(Body::empty())
                .expect("request valida"),
        )
        .await
        .expect("router respondeu");

    let status = response.status();
    let bytes = to_bytes(response.into_body(), usize::MAX)
        .await
        .expect("corpo legivel");
    let json = serde_json::from_slice(&bytes).expect("resposta e JSON");

    (status, json)
}

#[tokio::test]
async fn health_responde_healthy() {
    let provider = MockProvider {
        calls: Arc::new(AtomicUsize::new(0)),
        fail: false,
    };

    let (status, body) = get(app_with(provider, Duration::from_secs(600)), "/health").await;

    assert_eq!(status, StatusCode::OK);
    assert_eq!(body["status"], "healthy");
}

#[tokio::test]
async fn monitoramento_respeita_o_contrato_do_dashboard() {
    let provider = MockProvider {
        calls: Arc::new(AtomicUsize::new(0)),
        fail: false,
    };

    let (status, body) = get(
        app_with(provider, Duration::from_secs(600)),
        "/monitoramento",
    )
    .await;

    assert_eq!(status, StatusCode::OK);

    let cidades = body.as_array().expect("lista de cidades");
    assert_eq!(cidades.len(), 1);

    let cidade = &cidades[0];
    assert_eq!(cidade["cidade"], "Brusque");
    assert_eq!(cidade["risco"], "Moderado");
    assert_eq!(cidade["clima"], "Chuva leve");
    assert_eq!(cidade["temperatura"], 22.5);
    assert_eq!(cidade["umidade"], 81.2);
    assert_eq!(cidade["vento"], 12.0);
    assert_eq!(cidade["chuva"], 5.0);
    assert_eq!(cidade["atualizadoEm"], "2026-11-23T18:00:00Z");
}

#[tokio::test]
async fn monitoramento_usa_cache() {
    let calls = Arc::new(AtomicUsize::new(0));
    let provider = MockProvider {
        calls: Arc::clone(&calls),
        fail: false,
    };
    let app = app_with(provider, Duration::from_secs(600));

    let (first_status, _) = get(app.clone(), "/monitoramento").await;
    let (second_status, _) = get(app, "/monitoramento").await;

    assert_eq!(first_status, StatusCode::OK);
    assert_eq!(second_status, StatusCode::OK);
    assert_eq!(calls.load(Ordering::SeqCst), 1);
}

#[tokio::test]
async fn cache_expirado_busca_novamente() {
    let calls = Arc::new(AtomicUsize::new(0));
    let provider = MockProvider {
        calls: Arc::clone(&calls),
        fail: false,
    };
    let app = app_with(provider, Duration::ZERO);

    get(app.clone(), "/monitoramento").await;
    get(app, "/monitoramento").await;

    assert_eq!(calls.load(Ordering::SeqCst), 2);
}

#[tokio::test]
async fn falha_do_provedor_retorna_503() {
    let provider = MockProvider {
        calls: Arc::new(AtomicUsize::new(0)),
        fail: true,
    };

    let (status, body) = get(
        app_with(provider, Duration::from_secs(600)),
        "/monitoramento",
    )
    .await;

    assert_eq!(status, StatusCode::SERVICE_UNAVAILABLE);
    assert!(
        body["error"]
            .as_str()
            .unwrap_or_default()
            .contains("falha simulada")
    );
}
