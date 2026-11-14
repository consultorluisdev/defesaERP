import { Ocorrencia } from "../../types/ocorrencia";
import { MapPin, Clock } from "lucide-react";

interface Props {
    ocorrencia: Ocorrencia;
    onClick: () => void;
}

const PRIORIDADE_STYLES: Record<string, string> = {
    "Crítica": "bg-red-100 text-red-700 border-red-200 dark:bg-red-500/20 dark:text-red-400 dark:border-red-500/30",
    Alta: "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-500/20 dark:text-orange-400 dark:border-orange-500/30",
    "Média": "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-500/20 dark:text-yellow-400 dark:border-yellow-500/30",
    Baixa: "bg-green-100 text-green-700 border-green-200 dark:bg-green-500/20 dark:text-green-400 dark:border-green-500/30",
};

const STATUS_STYLES: Record<string, string> = {
    Aberta: "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400",
    "Em Andamento": "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400",
    Concluída: "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400",
    Cancelada: "bg-gray-100 text-gray-600 dark:bg-gray-500/20 dark:text-gray-400",
};

export function OcorrenciaCard({ ocorrencia: o, onClick }: Props) {
    const data = new Date(o.dataHora).toLocaleDateString("pt-BR");

    return (
        <button
            onClick={onClick}
            className="bg-white border border-gray-200 rounded-xl p-4 text-left hover:border-blue-400 transition-colors w-full dark:bg-[#111a2c] dark:border-[#1e293b] dark:hover:border-blue-500/50"
        >
            <div className="flex items-start justify-between mb-2">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-1">{o.numeroProtocolo}</h3>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${PRIORIDADE_STYLES[o.prioridade] ?? "bg-gray-100 text-gray-600 dark:bg-gray-500/20 dark:text-gray-400"}`}>
                    {o.prioridade}
                </span>
            </div>

            <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">{o.descricao}</p>

            <div className="flex items-center gap-3 text-[10px] text-gray-500 dark:text-gray-400">
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
