export type RadarEventType =
    | "Alerta"
    | "Ocorrência"
    | "Risco"
    | "Monitoramento"
    | "Outro";

export type RadarEventLevel =
    | "Baixo"
    | "Moderado"
    | "Alto"
    | "Crítico";

export type RadarEventStatus =
    | "Ativo"
    | "Em acompanhamento"
    | "Resolvido";

export interface RadarLocation {
    latitude: number;
    longitude: number;
    municipio: string;
    endereco?: string | null;
}

export interface RadarEvent {
    id: number;
    titulo: string;
    tipo: RadarEventType;
    nivel: RadarEventLevel;
    status: RadarEventStatus;
    descricao?: string | null;
    dataHora: string;
    localizacao: RadarLocation;
}

export interface RadarFilters {
    busca: string;
    tipo: RadarEventType | "";
    nivel: RadarEventLevel | "";
    status: RadarEventStatus | "";
    municipio: string;
}