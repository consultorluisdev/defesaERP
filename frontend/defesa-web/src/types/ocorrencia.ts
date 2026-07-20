export type StatusOcorrencia = "Aberta" | "Em Andamento" | "Concluída" | "Cancelada";

export type PrioridadeOcorrencia = "Baixa" | "Média" | "Alta" | "Crítica";

export type TipoOcorrencia =
    | "Alagamento"
    | "Deslizamento"
    | "Incêndio"
    | "Queda de Árvore"
    | "Microexplosão"
    | "Resgate"
    | "Interdição"
    | "Outros";

export interface Ocorrencia {
    id: number;
    numeroProtocolo: string;
    tipoOcorrencia: TipoOcorrencia;
    descricao: string;
    dataHora: string;
    cidade: string;
    bairro: string;
    endereco: string;
    latitude: string | null;
    longitude: string | null;
    status: StatusOcorrencia;
    prioridade: PrioridadeOcorrencia;
    responsavel: string | null;
    telefoneSolicitante: string | null;
    nomeSolicitante: string | null;
    observacoes: string | null;
    createAt: string;
    updateAt: string;
}

export interface CriarOcorrenciaDto {
    numeroProtocolo: string;
    tipoOcorrencia: TipoOcorrencia;
    descricao: string;
    dataHora: string;
    cidade: string;
    bairro: string;
    endereco: string;
    latitude?: string;
    longitude?: string;
    status?: StatusOcorrencia;
    prioridade?: PrioridadeOcorrencia;
    responsavel?: string;
    telefoneSolicitante?: string;
    nomeSolicitante?: string;
    observacoes?: string;
}

export interface AtualizarOcorrenciaDto {
    tipoOcorrencia?: TipoOcorrencia;
    descricao?: string;
    cidade?: string;
    bairro?: string;
    endereco?: string;
    latitude?: string;
    longitude?: string;
    status?: StatusOcorrencia;
    prioridade?: PrioridadeOcorrencia;
    responsavel?: string;
    telefoneSolicitante?: string;
    nomeSolicitante?: string;
    observacoes?: string;
    dataOcorrencia: string;
}

export interface OcorrenciaFiltros {
    status?: StatusOcorrencia | "Todas";
    tipo?: TipoOcorrencia | "Todos";
    prioridade?: PrioridadeOcorrencia | "Todas";
    busca?: string;
}
