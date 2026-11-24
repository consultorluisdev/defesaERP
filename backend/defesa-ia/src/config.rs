use std::{env, time::Duration};

use crate::domain::City;

#[derive(Debug, Clone)]
pub struct Config {
    pub port: u16,
    pub cache_ttl: Duration,
    pub request_timeout: Duration,
    pub open_meteo_url: String,
    pub cities: Vec<City>,
}

impl Config {
    pub fn from_env() -> Result<Self, String> {
        let port = env::var("PORT")
            .ok()
            .and_then(|value| value.parse().ok())
            .unwrap_or(8000);

        let cache_ttl_seconds = env::var("CACHE_TTL_SECONDS")
            .ok()
            .and_then(|value| value.parse().ok())
            .unwrap_or(600);

        let request_timeout_seconds = env::var("REQUEST_TIMEOUT_SECONDS")
            .ok()
            .and_then(|value| value.parse().ok())
            .unwrap_or(10);

        let open_meteo_url = env::var("OPEN_METEO_URL")
            .unwrap_or_else(|_| "https://api.open-meteo.com/v1/forecast".to_string());

        let cities = match env::var("CITIES_JSON") {
            Ok(raw) => serde_json::from_str(&raw)
                .map_err(|error| format!("CITIES_JSON invalido: {error}"))?,
            Err(_) => default_cities(),
        };

        if cities.is_empty() {
            return Err("CITIES_JSON nao pode ser vazio".to_string());
        }

        Ok(Self {
            port,
            cache_ttl: Duration::from_secs(cache_ttl_seconds),
            request_timeout: Duration::from_secs(request_timeout_seconds),
            open_meteo_url,
            cities,
        })
    }
}

/// Cidades iniciais do monitoramento, com coordenadas corrigidas.
pub fn default_cities() -> Vec<City> {
    vec![
        City {
            name: "Brusque".to_string(),
            latitude: -27.097,
            longitude: -48.910,
        },
        City {
            name: "Blumenau".to_string(),
            latitude: -26.919,
            longitude: -49.066,
        },
        City {
            name: "Itajai".to_string(),
            latitude: -26.907,
            longitude: -48.662,
        },
        City {
            name: "Guabiruba".to_string(),
            latitude: -27.086,
            longitude: -48.981,
        },
        City {
            name: "Gaspar".to_string(),
            latitude: -26.931,
            longitude: -48.958,
        },
        City {
            name: "Camboriu".to_string(),
            latitude: -27.025,
            longitude: -48.654,
        },
    ]
}
