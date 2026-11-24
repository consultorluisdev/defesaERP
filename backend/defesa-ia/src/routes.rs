use std::sync::Arc;

use axum::{Json, Router, extract::State, routing::get};
use serde::Serialize;
use tower_http::trace::TraceLayer;
use utoipa::ToSchema;
use utoipa_swagger_ui::SwaggerUi;

use crate::{
    domain::CityMonitoring,
    error::AppError,
    weather::MonitorService,
};

#[derive(Clone)]
pub struct AppState {
    pub monitor: Arc<MonitorService>,
}

#[derive(Debug, Serialize, ToSchema)]
pub struct HealthResponse {
    pub status: String,
}

#[utoipa::path(
    get,
    path = "/health",
    tag = "Monitoramento",
    responses(
        (
            status = 200,
            description = "API funcionando corretamente",
            body = HealthResponse
        )
    )
)]
async fn health() -> Json<HealthResponse> {
    Json(HealthResponse {
        status: "healthy".to_string(),
    })
}

#[utoipa::path(
    get,
    path = "/monitoramento",
    tag = "Monitoramento",
    responses(
        (
            status = 200,
            description = "Lista de cidades e suas condições meteorológicas",
            body = [CityMonitoring]
        ),
        (
            status = 500,
            description = "Erro ao consultar os dados de monitoramento"
        )
    )
)]
async fn monitoramento(
    State(state): State<AppState>,
) -> Result<Json<Vec<CityMonitoring>>, AppError> {
    Ok(Json(state.monitor.get_monitoramento().await?))
}

#[derive(utoipa::OpenApi)]
#[openapi(
    paths(
        health,
        monitoramento
    ),
    components(
        schemas(
            HealthResponse,
            CityMonitoring
        )
    ),
    tags(
        (
            name = "Monitoramento",
            description = "Endpoints do agente de monitoramento climático da Defesa Civil"
        )
    )
)]
pub struct ApiDoc;

pub fn router(state: AppState) -> Router {
    Router::new()
        .route("/health", get(health))
        .route("/monitoramento", get(monitoramento))
        .with_state(state)
        .layer(TraceLayer::new_for_http())
}

pub fn swagger_router() -> Router {
    SwaggerUi::new("/swagger-ui")
        .url("/api-docs/openapi.json", ApiDoc::openapi())
        .into()
}
