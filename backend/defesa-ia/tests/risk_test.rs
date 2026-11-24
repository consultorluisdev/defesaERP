use defesa_ia::{
    domain::RiskLevel,
    risk::{classify, describe_weather},
};

#[test]
fn chuva_escala_por_limiares() {
    assert_eq!(classify(20.0, 0.0, 0), RiskLevel::Critico);
    assert_eq!(classify(19.9, 0.0, 0), RiskLevel::Alto);
    assert_eq!(classify(10.0, 0.0, 0), RiskLevel::Alto);
    assert_eq!(classify(9.9, 0.0, 0), RiskLevel::Moderado);
    assert_eq!(classify(4.0, 0.0, 0), RiskLevel::Moderado);
    assert_eq!(classify(3.9, 0.0, 0), RiskLevel::Baixo);
}

#[test]
fn vento_escala_por_limiares() {
    assert_eq!(classify(0.0, 80.0, 0), RiskLevel::Critico);
    assert_eq!(classify(0.0, 79.9, 0), RiskLevel::Alto);
    assert_eq!(classify(0.0, 60.0, 0), RiskLevel::Alto);
    assert_eq!(classify(0.0, 59.9, 0), RiskLevel::Moderado);
    assert_eq!(classify(0.0, 40.0, 0), RiskLevel::Moderado);
    assert_eq!(classify(0.0, 39.9, 0), RiskLevel::Baixo);
}

#[test]
fn codigo_wmo_tambem_eleva_o_risco() {
    assert_eq!(classify(0.0, 0.0, 95), RiskLevel::Critico);
    assert_eq!(classify(0.0, 0.0, 99), RiskLevel::Critico);
    assert_eq!(classify(0.0, 0.0, 65), RiskLevel::Alto);
    assert_eq!(classify(0.0, 0.0, 82), RiskLevel::Alto);
    assert_eq!(classify(0.0, 0.0, 61), RiskLevel::Moderado);
    assert_eq!(classify(0.0, 0.0, 66), RiskLevel::Moderado);
    assert_eq!(classify(0.0, 0.0, 3), RiskLevel::Baixo);
}

#[test]
fn prevalece_o_pior_indicador() {
    assert_eq!(classify(12.0, 85.0, 0), RiskLevel::Critico);
    assert_eq!(classify(5.0, 0.0, 95), RiskLevel::Critico);
    assert_eq!(classify(11.0, 0.0, 3), RiskLevel::Alto);
}

#[test]
fn descricao_traduz_codigos_conhecidos() {
    assert_eq!(describe_weather(0), "Ceu limpo");
    assert_eq!(describe_weather(2), "Parcialmente nublado");
    assert_eq!(describe_weather(63), "Chuva moderada");
    assert_eq!(describe_weather(95), "Tempestade");
    assert_eq!(describe_weather(999), "Condicao desconhecida");
}
