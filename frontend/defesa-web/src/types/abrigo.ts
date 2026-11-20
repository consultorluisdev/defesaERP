export type AbrigoStatus = 'Disponivel' | 'Lotado' | 'EmManutencao' | 'Fechado';

export interface Abrigo {
  id: string;
  nome: string;
  endereco: string;
  bairro: string;
  cidade: string;
  capacidade: number;
  ocupacao: number;
  status: AbrigoStatus;
  responsavel: string;
  telefone: string;
  observacoes: string;
}

export type AbrigoFormData = Omit<Abrigo, 'id'>;
