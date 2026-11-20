export type RiscoTipo =
  | 'Enchente'
  | 'Deslizamento'
  | 'Desabamento'
  | 'Incendio'
  | 'Vendaval'
  | 'Outro';
export type RiscoNivel = 'Baixo' | 'Moderado' | 'Alto' | 'Critico';
export type RiscoStatus = 'Monitorando' | 'Ativo' | 'Resolvido';

export interface Risco {
  id: string;
  titulo: string;
  tipo: RiscoTipo;
  nivel: RiscoNivel;
  status: RiscoStatus;
  cidade: string;
  bairro: string;
  latitude: number;
  longitude: number;
  dataOcorrencia: string;
  descricao: string;
  responsavel: string;
}

export type RiscoFormData = Omit<Risco, 'id'>;
