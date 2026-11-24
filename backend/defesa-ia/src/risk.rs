use crate::domain::RiskLevel;

/// Calcula o risco pela pior condicao entre chuva, vento e codigo WMO.
pub fn classify(rain_mm: f64, wind_kmh: f64, weather_code: u16) -> RiskLevel {
    let rain_level = if rain_mm >= 20.0 {
        RiskLevel::Critico
    } else if rain_mm >= 10.0 {
        RiskLevel::Alto
    } else if rain_mm >= 4.0 {
        RiskLevel::Moderado
    } else {
        RiskLevel::Baixo
    };

    let wind_level = if wind_kmh >= 80.0 {
        RiskLevel::Critico
    } else if wind_kmh >= 60.0 {
        RiskLevel::Alto
    } else if wind_kmh >= 40.0 {
        RiskLevel::Moderado
    } else {
        RiskLevel::Baixo
    };

    let code_level = match weather_code {
        95..=99 => RiskLevel::Critico,
        65 | 67 | 82 => RiskLevel::Alto,
        51..=57 | 61..=63 | 66 | 80..=81 => RiskLevel::Moderado,
        _ => RiskLevel::Baixo,
    };

    rain_level.max(wind_level).max(code_level)
}

/// Traduz o codigo WMO para uma descricao em portugues.
pub fn describe_weather(code: u16) -> &'static str {
    match code {
        0 => "Ceu limpo",
        1 => "Predominantemente limpo",
        2 => "Parcialmente nublado",
        3 => "Nublado",
        45 | 48 => "Neblina",
        51 | 53 | 55 => "Garoa",
        56 | 57 => "Garoa congelante",
        61 => "Chuva leve",
        63 => "Chuva moderada",
        65 => "Chuva forte",
        66 | 67 => "Chuva congelante",
        71 | 73 | 75 => "Neve",
        77 => "Graos de neve",
        80 => "Pancadas leves",
        81 => "Pancadas moderadas",
        82 => "Pancadas fortes",
        85 | 86 => "Pancadas de neve",
        95 => "Tempestade",
        96 | 99 => "Tempestade com granizo",
        _ => "Condicao desconhecida",
    }
}
