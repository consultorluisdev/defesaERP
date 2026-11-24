use serde::{Deserialize, Serialize};
use utoipa::ToSchema;

/// Cidade monitorada e suas coordenadas.
#[derive(Debug, Clone, Deserialize)]
pub struct City {
    pub name: String,
    pub latitude: f64,
    pub longitude: f64,
}

/// Nivel de risco calculado a partir dos dados climaticos.
#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Serialize)]
pub enum RiskLevel {
    Baixo,
    Moderado,
    Alto,
    Critico,
}

impl RiskLevel {
    pub fn as_str(self) -> &'static str {
        match self {
            Self::Baixo => "Baixo",
            Self::Moderado => "Moderado",
            Self::Alto => "Alto",
            Self::Critico => "Critico",
        }
    }
}

/// Dados normalizados de clima de uma cidade.
#[derive(Debug, Clone)]
pub struct WeatherSnapshot {
    pub city: String,
    pub temperature_c: f64,
    pub humidity: f64,
    pub wind_kmh: f64,
    pub rain_mm: f64,
    pub weather_code: u16,
    pub observed_at: String,
    pub description: String,
}

/// Item retornado por `GET /monitoramento`.
#[derive(Debug, Clone, Serialize)]
pub struct CityMonitoring {
    pub cidade: String,
    pub risco: String,
    pub clima: String,
    pub temperatura: f64,
    pub umidade: f64,
    pub vento: f64,
    pub chuva: f64,
    #[serde(rename = "atualizadoEm")]
    pub atualizado_em: String,
}

impl CityMonitoring {
    /// Monta o item do contrato a partir do clima coletado.
    pub fn from_weather(weather: WeatherSnapshot) -> Self {
        let risk = crate::risk::classify(weather.rain_mm, weather.wind_kmh, weather.weather_code);

        Self {
            cidade: weather.city,
            risco: risk.as_str().to_string(),
            clima: weather.description,
            temperatura: round1(weather.temperature_c),
            umidade: round1(weather.humidity),
            vento: round1(weather.wind_kmh),
            chuva: round1(weather.rain_mm),
            atualizado_em: weather.observed_at,
        }
    }
}

fn round1(value: f64) -> f64 {
    (value * 10.0).round() / 10.0
}
