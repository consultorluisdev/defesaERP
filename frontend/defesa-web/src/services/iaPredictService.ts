import type { DadosIAPredict } from '../types/iaPredict';

const delay = (ms = 200) => new Promise<void>((r) => setTimeout(r, ms));

const dados: DadosIAPredict = {
  status: { online: true, ultimaAtualizacao: '2026-11-19T08:30:00', confianca: 87 },
  previsao: {
    probabilidadeEnchente: 72,
    riscoDeslizamento: 58,
    indiceGeralRisco: 64,
    tendencia7d: 'Subindo',
  },
  ranking: [
    { cidade: 'São Paulo', indice: 82 },
    { cidade: 'Santos', indice: 74 },
    { cidade: 'Osasco', indice: 68 },
    { cidade: 'Campinas', indice: 55 },
    { cidade: 'Guarulhos', indice: 48 },
  ],
  previsao7d: [
    { dia: 'Seg', indice: 58 },
    { dia: 'Ter', indice: 62 },
    { dia: 'Qua', indice: 70 },
    { dia: 'Qui', indice: 75 },
    { dia: 'Sex', indice: 68 },
    { dia: 'Sáb', indice: 60 },
    { dia: 'Dom', indice: 55 },
  ],
  recomendacoes: [
    {
      id: '1',
      titulo: 'Reforçar monitoramento em São Paulo',
      descricao: 'Probabilidade elevada de enchente nas próximas 48h.',
      prioridade: 'Alta',
    },
    {
      id: '2',
      titulo: 'Inspecionar encostas em Santos',
      descricao: 'Risco de deslizamento aumentando após chuvas.',
      prioridade: 'Alta',
    },
    {
      id: '3',
      titulo: 'Preparar abrigos em Osasco',
      descricao: 'Manter abrigos prontos para possível evacuação.',
      prioridade: 'Média',
    },
    {
      id: '4',
      titulo: 'Comunicar moradores',
      descricao: 'Enviar alertas SMS para áreas de risco.',
      prioridade: 'Média',
    },
    {
      id: '5',
      titulo: 'Revisar rotas de fuga',
      descricao: 'Atualizar mapas de evacuação nas cidades críticas.',
      prioridade: 'Baixa',
    },
  ],
};

export const iaPredictService = {
  async obter(): Promise<DadosIAPredict> {
    await delay();
    return structuredClone(dados);
  },
};
