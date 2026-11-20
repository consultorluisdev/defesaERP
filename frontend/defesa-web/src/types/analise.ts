export type AnalisePeriodo = '7d' | '30d' | '90d' | 'ano';

export interface Indicadores {
  totalOcorrencias: number;
  tempoMedioAtendimento: number;
  taxaResolucao: number;
  equipesMobilizadas: number;
}

export interface OcorrenciaPorTipo {
  tipo: string;
  total: number;
}
export interface OcorrenciaPorCidade {
  cidade: string;
  total: number;
}
export interface TendenciaPonto {
  dia: string;
  total: number;
}

export interface DadosAnalise {
  periodo: AnalisePeriodo;
  indicadores: Indicadores;
  porTipo: OcorrenciaPorTipo[];
  porCidade: OcorrenciaPorCidade[];
  tendencia: TendenciaPonto[];
}
