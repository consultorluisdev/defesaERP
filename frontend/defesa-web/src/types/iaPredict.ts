export interface StatusModelo {
  online: boolean;
  ultimaAtualizacao: string;
  confianca: number;
}

export interface PrevisaoIA {
  probabilidadeEnchente: number;
  riscoDeslizamento: number;
  indiceGeralRisco: number;
  tendencia7d: 'Subindo' | 'Estável' | 'Caindo';
}

export interface RankingCidade {
  cidade: string;
  indice: number;
}

export interface PrevisaoDia {
  dia: string;
  indice: number;
}

export interface RecomendacaoIA {
  id: string;
  titulo: string;
  descricao: string;
  prioridade: 'Alta' | 'Média' | 'Baixa';
}

export interface DadosIAPredict {
  status: StatusModelo;
  previsao: PrevisaoIA;
  ranking: RankingCidade[];
  previsao7d: PrevisaoDia[];
  recomendacoes: RecomendacaoIA[];
}
