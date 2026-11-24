use std::{
    sync::Arc,
    time::{Duration, Instant},
};

use async_trait::async_trait;
use serde::Deserialize;
use tokio::sync::Mutex;
use tokio::task::JoinSet;

use crate::{
    domain::{City, CityMonitoring, WeatherSnapshot},
    error::AppError,
    risk::describe_weather,
};

/// Fonte de dados climaticos. Permite trocar Open-Meteo por outro provedor
/// sem alterar o contrato de `/monitoramento`.
#[async_trait]
pub trait WeatherProvider: Send + Sync {
    async fn fetch(&self, city: &City) -> Result<WeatherSnapshot, AppError>;
}

/// Provedor Open-Meteo (sem chave de API).
#[derive(Clone)]
pub struct OpenMeteoProvider {
    client: reqwest::Client,
    base_url: String,
}

impl OpenMeteoProvider {
    pub fn new(client: reqwest::Client, base_url: String) -> Self {
        Self { client, base_url }
    }
}

#[async_trait]
impl WeatherProvider for OpenMeteoProvider {
    async fn fetch(&self, city: &City) -> Result<WeatherSnapshot, AppError> {
        let response = self
            .client
            .get(&self.base_url)
            .query(&[
                ("latitude", city.latitude.to_string()),
                ("longitude", city.longitude.to_string()),
                (
                    "current",
                    "temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m"
                        .to_string(),
                ),
                ("timezone", "UTC".to_string()),
                ("wind_speed_unit", "kmh".to_string()),
            ])
            .send()
            .await
            .map_err(|error| {
                AppError::Upstream(format!(
                    "falha ao consultar Open-Meteo para {}: {error}",
                    city.name
                ))
            })?;

        let status = response.status();
        if !status.is_success() {
            let body = response.text().await.unwrap_or_default();
            return Err(AppError::Upstream(format!(
                "Open-Meteo respondeu {status} para {}: {}",
                city.name,
                body.trim()
            )));
        }

        let payload: OpenMeteoResponse = response.json().await.map_err(|error| {
            AppError::Upstream(format!(
                "resposta invalida do Open-Meteo para {}: {error}",
                city.name
            ))
        })?;

        let current = payload.current.ok_or_else(|| {
            AppError::Upstream(format!(
                "Open-Meteo nao retornou o bloco 'current' para {}",
                city.name
            ))
        })?;

        Ok(WeatherSnapshot {
            city: city.name.clone(),
            temperature_c: current.temperature_2m,
            humidity: current.relative_humidity_2m.unwrap_or_default(),
            wind_kmh: current.wind_speed_10m.unwrap_or_default(),
            rain_mm: current.precipitation.unwrap_or_default(),
            weather_code: current.weather_code,
            observed_at: normalize_time(&current.time),
            description: describe_weather(current.weather_code).to_string(),
        })
    }
}

#[derive(Debug, Deserialize)]
struct OpenMeteoResponse {
    current: Option<CurrentWeather>,
}

#[derive(Debug, Deserialize)]
struct CurrentWeather {
    time: String,
    temperature_2m: f64,
    relative_humidity_2m: Option<f64>,
    precipitation: Option<f64>,
    weather_code: u16,
    wind_speed_10m: Option<f64>,
}

/// Open-Meteo devolve `2026-11-23T18:00` quando `timezone=UTC`.
/// Normalizamos para ISO-8601 com `Z` para o frontend.
fn normalize_time(value: &str) -> String {
    let value = value.trim();

    if value.ends_with('Z') {
        value.to_string()
    } else if value.len() == 16 {
        format!("{value}:00Z")
    } else {
        format!("{value}Z")
    }
}

struct CacheEntry {
    stored_at: Instant,
    data: Vec<CityMonitoring>,
}

/// Orquestra a coleta, classificacao de risco e cache em memoria.
pub struct MonitorService {
    provider: Arc<dyn WeatherProvider>,
    cities: Vec<City>,
    cache: Mutex<Option<CacheEntry>>,
    cache_ttl: Duration,
}

impl MonitorService {
    pub fn new(provider: Arc<dyn WeatherProvider>, cities: Vec<City>, cache_ttl: Duration) -> Self {
        Self {
            provider,
            cities,
            cache: Mutex::new(None),
            cache_ttl,
        }
    }

    pub async fn get_monitoramento(&self) -> Result<Vec<CityMonitoring>, AppError> {
        let mut cache = self.cache.lock().await;

        if let Some(entry) = cache.as_ref()
            && entry.stored_at.elapsed() < self.cache_ttl
        {
            return Ok(entry.data.clone());
        }

        let data = self.fetch_all().await?;
        *cache = Some(CacheEntry {
            stored_at: Instant::now(),
            data: data.clone(),
        });

        Ok(data)
    }

    async fn fetch_all(&self) -> Result<Vec<CityMonitoring>, AppError> {
        let mut tasks = JoinSet::new();

        for (index, city) in self.cities.iter().cloned().enumerate() {
            let provider = Arc::clone(&self.provider);
            tasks.spawn(async move {
                let result = provider.fetch(&city).await;
                (index, city.name, result)
            });
        }

        let mut successes = Vec::new();
        let mut first_error = None;

        while let Some(joined) = tasks.join_next().await {
            match joined {
                Ok((index, _, Ok(snapshot))) => {
                    successes.push((index, CityMonitoring::from_weather(snapshot)));
                }
                Ok((_, name, Err(error))) => {
                    tracing::warn!(city = %name, %error, "falha ao buscar clima da cidade");
                    first_error.get_or_insert(error);
                }
                Err(error) => {
                    tracing::error!(%error, "tarefa de clima falhou");
                    first_error.get_or_insert(AppError::Internal(
                        "falha interna ao processar clima".to_string(),
                    ));
                }
            }
        }

        if successes.is_empty() {
            return Err(first_error.unwrap_or_else(|| {
                AppError::Upstream("nenhuma cidade pode ser monitorada".to_string())
            }));
        }

        successes.sort_by_key(|(index, _)| *index);
        Ok(successes.into_iter().map(|(_, item)| item).collect())
    }
}

#[cfg(test)]
mod tests {
    use super::normalize_time;

    #[test]
    fn normaliza_horario_do_open_meteo() {
        assert_eq!(normalize_time("2026-11-23T18:00"), "2026-11-23T18:00:00Z");
        assert_eq!(
            normalize_time("2026-11-23T18:00:00"),
            "2026-11-23T18:00:00Z"
        );
        assert_eq!(
            normalize_time("2026-11-23T18:00:00Z"),
            "2026-11-23T18:00:00Z"
        );
    }
}
