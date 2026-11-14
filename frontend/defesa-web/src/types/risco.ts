export type NivelRisco =
    | "Baixo"
    | "Medio"
    | "Alto"
    | "MuitoAlto";

export type TipoRisco =
    | "Inundacao"
    | "Enxurrada"
    | "Deslizamento"
    | "Erosao"
    | "Alagamento"
    | "Vendaval"
    | "Outro";

export type StatusRisco =
    | "Monitorado"
    | "EmAlerta"
    | "Interditado"
    | "Controlado";

export const TiposRisco: TipoRisco[] = [
    "Inundacao",
    "Enxurrada",
    "Deslizamento",
    "Erosao",
    "Alagamento",
    "Vendaval",
    "Outro",
];

export const NiveisRisco: NivelRisco[] = ["Baixo", "Medio", "Alto", "MuitoAlto"];

export const StatusRiscoOptions: StatusRisco[] = [
    "Monitorado",
    "EmAlerta",
    "Interditado",
    "Controlado",
];

export interface CoordenadasRisco {
    latitude: number;
    longitude: number;
}

export interface Risco {
    id: number;
    nome: string;
    descricao: string;
    tipo: TipoRisco;
    nivel: NivelRisco;
    status: StatusRisco;
    municipio: string;
    bairro: string;
    endereco: string;
    coordenadas?: CoordenadasRisco | null;
    populacaoAfetada: number;
    responsavel?: string | null;
    observacoes?: string | null;
    createdAt: string;
    updatedAt?: string | null;
}

export interface CreateRiscoDto {
    nome: string;
    descricao: string;
    tipo: TipoRisco;
    nivel: NivelRisco;
    status: StatusRisco;
    municipio: string;
    bairro: string;
    endereco: string;
    coordenadas?: CoordenadasRisco | null;
    populacaoAfetada: number;
    responsavel?: string;
    observacoes?: string;
}

export interface UpdateRiscoDto {
    nome?: string;
    descricao?: string;
    tipo?: TipoRisco;
    nivel?: NivelRisco;
    status?: StatusRisco;
    municipio?: string;
    bairro?: string;
    endereco?: string;
    coordenadas?: CoordenadasRisco | null;
    populacaoAfetada?: number;
    responsavel?: string | null;
    observacoes?: string | null;
}

export interface RiscoFilters {
    busca: string;
    tipo: TipoRisco | "";
    nivel: NivelRisco | "";
    status: StatusRisco | "";
    municipio: string;
}