import type { AnalisePeriodo, DadosAnalise } from '../types/analise';

const delay = (ms = 200) => new Promise<void>((r) => setTimeout(r, ms));

function gerar(periodo: AnalisePeriodo): DadosAnalise {
  const fator = periodo === '7d' ? 1 : periodo === '30d' ? 4 : periodo === '90d' ? 12 : 48;
  const base = 40 * fator;
  const dias = periodo === '7d' ? 7 : periodo === '30d' ? 30 : periodo === '90d' ? 90 : 12;

  const tendencia = Array.from({ length: Math.min(dias, 12) }, (_, i) => ({
    dia: `D${i + 1}`,
    total: Math.round((base / Math.min(dias, 12)) * (0.7 + Math.random() * 0.6)),
  }));

  return {
    periodo,
    indicadores: {
      totalOcorrencias: base,
      tempoMedioAtendimento: 42 + Math.round(Math.random() * 10),
      taxaResolucao: 85 + Math.round(Math.random() * 8),
      equipesMobilizadas: 12 + Math.round(Math.random() * 6),
    },
    porTipo: [
      { tipo: 'Enchente', total: Math.round(base * 0.35) },
      { tipo: 'Deslizamento', total: Math.round(base * 0.25) },
      { tipo: 'Incêndio', total: Math.round(base * 0.2) },
      { tipo: 'Vendaval', total: Math.round(base * 0.12) },
      { tipo: 'Outros', total: Math.round(base * 0.08) },
    ],
    porCidade: [
      { cidade: 'São Paulo', total: Math.round(base * 0.45) },
      { cidade: 'Campinas', total: Math.round(base * 0.2) },
      { cidade: 'Santos', total: Math.round(base * 0.15) },
      { cidade: 'Guarulhos', total: Math.round(base * 0.12) },
      { cidade: 'Osasco', total: Math.round(base * 0.08) },
    ],
    tendencia,
  };
}

export const analiseService = {
  async obter(periodo: AnalisePeriodo): Promise<DadosAnalise> {
    await delay();
    return gerar(periodo);
  },
};
