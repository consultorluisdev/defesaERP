export interface Solicitacao {
  id: number;
  protocolo: string;
  solicitante: string;
  telefone: string;
  email?: string | null;
  tipo: string;
  descricao: string;
  endereco: string;
  bairro?: string | null;
  municipio: string;
  status: string;
  prioridade: string;
  responsavel?: string | null;
  observacoes?: string | null;
  createdAt: string;
  updatedAt?: string | null;
}

export interface CreateSolicitacaoDto {
  solicitante: string;
  telefone: string;
  email?: string | null;
  tipo: string;
  descricao: string;
  endereco: string;
  bairro?: string | null;
  municipio: string;
  prioridade: string;
  observacoes?: string | null;
}

export interface UpdateSolicitacaoDto {
  solicitante: string;
  telefone: string;
  email?: string | null;
  tipo: string;
  descricao: string;
  endereco: string;
  bairro?: string | null;
  municipio: string;
  status: string;
  prioridade: string;
  responsavel?: string | null;
  observacoes?: string | null;
}

export const TiposSolicitacao = {
  INFORMACAO: "Informacao",
  OCORRENCIA: "Ocorrencia",
  VISTORIA: "Vistoria",
  APOIO: "Apoio",
  DENUNCIA: "Denuncia",
  OUTROS: "Outros",
} as const;

export const StatusSolicitacao = {
  ABERTA: "Aberta",
  EM_ANALISE: "EmAnalise",
  EM_ATENDIMENTO: "EmAtendimento",
  CONCLUIDA: "Concluida",
  CANCELADA: "Cancelada",
} as const;

export const PrioridadesSolicitacao = {
  BAIXA: "Baixa",
  MEDIA: "Media",
  ALTA: "Alta",
  URGENTE: "Urgente",
} as const;

export type TipoSolicitacaoType =
  typeof TiposSolicitacao[keyof typeof TiposSolicitacao];

export type StatusSolicitacaoType =
  typeof StatusSolicitacao[keyof typeof StatusSolicitacao];

export type PrioridadeSolicitacaoType =
  typeof PrioridadesSolicitacao[keyof typeof PrioridadesSolicitacao];