import { Ocorrencia } from "../../types/ocorrencia";
import { MapPin, Clock } from "lucide-react";

interface Props {
    ocorrencia: Ocorrencia;
    onClick: () => void;
}

const PRIORIDADE_STYLES: Record<string, string> = {
    "Crítica": "bg-red-500/20 text-red-400 border-red-500/30",
    Alta: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    "Média": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    Baixa: "bg-green-500/20 text-green-400 border-green-500/30",
};

const STATUS_STYLES: Record<string, string> = {
    Aberta: "bg-blue-500/20 text-blue-400",
    "Em Andamento": "bg-yellow-500/20 text-yellow-400",
    Concluída: "bg-green-500/20 text-green-400",
    Cancelada: "bg-gray-500/20 text-gray-400",
};

export function OcorrenciaCard({ ocorrencia: o, onClick }: Props) {
    const data = new Date(o.dataHora).toLocaleDateString("pt-BR");

    return (
        <button
            onClick={onClick}
            className="bg-[#111a2c] border border-[#1e293b] rounded-xl p-4 text-left hover:border-blue-500/50 transition-colors w-full"
        >
            <div className="flex items-start justify-between mb-2">
                <h3 className="text-sm font-semibold text-gray-100 line-clamp-1">{o.numeroProtocolo}</h3>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${PRIORIDADE_STYLES[o.prioridade] ?? "bg-gray-500/20 text-gray-400"}`}>
                    {o.prioridade}
                </span>
            </div>

            <p className="text-xs text-gray-400 line-clamp-2 mb-3">{o.descricao}</p>

            <div className="flex items-center gap-3 text-[10px] text-gray-500">
                <span className="flex items-center gap-1">
                    <MapPin size={10} />
                    {o.cidade}
                </span>
                <span className="flex items-center gap-1">
                    <Clock size={10} />
                    {data}
                </span>
            </div>

            <div className="mt-2">
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${STATUS_STYLES[o.status] ?? ""}`}>
                    {o.status}
                </span>
            </div>
        </button>
    );
}
