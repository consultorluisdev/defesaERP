export type ViaturaStatus = 'Disponivel' | 'EmOperacao' | 'EmManutencao' | 'Inativa';
export type ViaturaTipo = 'Ambulancia' | 'Caminhao' | 'Pickup' | 'Van' | 'Motocicleta';

export interface Viatura {
  id: string;
  prefixo: string;
  modelo: string;
  marca: string;
  placa: string;
  tipo: ViaturaTipo;
  status: ViaturaStatus;
  kmAtual: number;
  proximaManutencao: string;
  responsavel: string;
  base: string;
}

export type ViaturaFormData = Omit<Viatura, 'id'>;
