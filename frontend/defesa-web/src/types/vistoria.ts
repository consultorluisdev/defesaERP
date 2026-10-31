export interface Vistoria {
  id: number;
  protocolo: string;
  solicitante: string;
  telefone: string;
  tipo: string;
  descricao: string;
  endereco: string;
  bairro?: string | null;
  municipio: string;
  status: string;
  prioridade: string;
  responsavel?: string | null;
  observacoes?: string | null;
  dataAgendamento?: string | null;
  dataRealizacao?: string | null;
  createdAt: string;
  updatedAt?: string | null;
}

export interface CreateVistoriaDto {
  solicitante: string;
  telefone: string;
  tipo: string;
  descricao: string;
  endereco: string;
  bairro?: string;
  municipio: string;
  prioridade: string;
  responsavel?: string;
  observacoes?: string;
  dataAgendamento?: string;
}

export interface UpdateVistoriaDto extends CreateVistoriaDto {
  status: string;
}

export const TiposVistoria = {
  PREVENTIVA: 'Preventiva',
  ESTRUTURAL: 'Estrutural',
  AREA_DE_RISCO: 'AreaDeRisco',
  POS_EVENTO: 'PosEvento',
  DENUNCIA: 'Denuncia',
  OUTROS: 'Outros',
} as const;

export const StatusVistoria = {
  AGENDADA: 'Agendada',
  EM_ANDAMENTO: 'EmAndamento',
  CONCLUIDA: 'Concluida',
  CANCELADA: 'Cancelada',
} as const;

export const PrioridadesVistoria = {
  BAIXA: 'Baixa',
  MEDIA: 'Media',
  ALTA: 'Alta',
  URGENTE: 'Urgente',
} as const;