export interface Equipe {
    id: number;
    nome: string;
    descricao?: string | null;
    tipo: string;
    status: string;
    responsavel: string;
    telefone: string;
    email?: string | null;
    municipio?: string | null;
    endereco?: string | null;
    quantidadeMembros: number;
    disponivel: boolean;
    localizacaoAtual?: string | null;
    observacoes?: string | null;
    createdAt: string;
    updatedAt?: string | null;
}

export interface CreateEquipeDto {
    nome: string;
    descricao?: string | null;
    tipo: string;
    status: string;
    responsavel: string;
    telefone: string;
    email?: string | null;
    municipio?: string | null;
    endereco?: string | null;
    quantidadeMembros: number;
    localizacaoAtual?: string | null;
    observacoes?: string | null;
}

export interface UpdateEquipeDto {
    nome: string;
    descricao?: string | null;
    tipo: string;
    status: string;
    responsavel: string;
    telefone: string;
    email?: string | null;
    municipio?: string | null;
    endereco?: string | null;
    quantidadeMembros: number;
    localizacaoAtual?: string | null;
    observacoes?: string | null;
}

export const TiposEquipe = {
    BUSCA_E_SALVAMENTO: 'BuscaESalvamento',
    ATENDIMENTO: 'Atendimento',
    VISTORIA: 'Vistoria',
    LOGISTICA: 'Logistica',
    RESGATE: 'Resgate',
    OPERACOES: 'Operacoes',
    VOLUNTARIOS: 'Voluntarios',
    ADMINISTRATIVA: 'Administrativa'
} as const;

export const StatusEquipe = {
    DISPONIVEL: 'Disponivel',
    EM_ATENDIMENTO: 'EmAtendimento',
    EM_DESLOCAMENTO: 'EmDeslocamento',
    EM_APOIO: 'EmApoio',
    INDISPONIVEL: 'Indisponivel'
} as const;

export type TipoEquipeType = typeof TiposEquipe[keyof typeof TiposEquipe];
export type StatusEquipeType = typeof StatusEquipe[keyof typeof StatusEquipe];
