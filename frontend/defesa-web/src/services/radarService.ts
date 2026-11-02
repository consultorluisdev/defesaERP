import type { RadarEvent } from "../types/radar";

const mockRadarEvents: RadarEvent[] = [
    {
        id: 1,
        titulo: "Nível do rio acima do normal",
        tipo: "Alerta",
        nivel: "Alto",
        status: "Ativo",
        descricao:
            "Monitoramento do nível do rio após chuva intensa na região central.",
        dataHora: "2026-11-02T08:30:00Z",
        localizacao: {
            latitude: -27.0989,
            longitude: -48.9128,
            municipio: "Brusque",
            endereco: "Rio Itajaí-Mirim",
        },
    },
    {
        id: 2,
        titulo: "Vistoria em área de encosta",
        tipo: "Ocorrência",
        nivel: "Moderado",
        status: "Em acompanhamento",
        descricao:
            "Equipe técnica verificando sinais de movimentação em encosta.",
        dataHora: "2026-11-02T09:15:00Z",
        localizacao: {
            latitude: -27.1054,
            longitude: -48.9217,
            municipio: "Brusque",
            endereco: "Bairro Azambuja",
        },
    },
    {
        id: 3,
        titulo: "Ponto de alagamento monitorado",
        tipo: "Risco",
        nivel: "Crítico",
        status: "Ativo",
        descricao:
            "Acúmulo de água em via com histórico de alagamento.",
        dataHora: "2026-11-02T10:05:00Z",
        localizacao: {
            latitude: -27.0876,
            longitude: -48.9043,
            municipio: "Brusque",
            endereco: "Rua das Palmeiras",
        },
    },
    {
        id: 4,
        titulo: "Estação de monitoramento ativa",
        tipo: "Monitoramento",
        nivel: "Baixo",
        status: "Resolvido",
        descricao: "Estação pluviométrica operando sem ocorrências.",
        dataHora: "2026-11-02T11:40:00Z",
        localizacao: {
            latitude: -27.1122,
            longitude: -48.9301,
            municipio: "Brusque",
            endereco: "Bairro Ribeirão do Mafra",
        },
    },
];

export const radarService = {
    isDemo: true,

    async getEvents(): Promise<RadarEvent[]> {
        return [...mockRadarEvents];
    },

    async getEventById(id: number): Promise<RadarEvent | null> {
        const events = await this.getEvents();
        return events.find((event) => event.id === id) || null;
    },
};
