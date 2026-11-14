import React from "react";
import {
    AlertTriangle,
    Clock,
    MapPin,
    User,
} from "lucide-react";
import { Solicitacao } from "@/types/solicitacao";

interface SolicitacaoCardProps {
    solicitacao: Solicitacao;
    onClick: (id: number) => void;
}

export const SolicitacaoCard: React.FC<SolicitacaoCardProps> = ({
    solicitacao,
    onClick,
}) => {
    const prioridadeClasses: Record<string, string> = {
        Baixa: "border-green-200 bg-green-100 text-green-700 dark:border-green-800 dark:bg-green-900/30 dark:text-green-400",
        Media: "border-yellow-200 bg-yellow-100 text-yellow-700 dark:border-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
        Alta: "border-orange-200 bg-orange-100 text-orange-700 dark:border-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
        Urgente: "border-red-200 bg-red-100 text-red-700 dark:border-red-800 dark:bg-red-900/30 dark:text-red-400",
    };

    const statusClasses: Record<string, string> = {
        Aberta: "text-blue-600 dark:text-blue-400",
        EmAnalise: "text-orange-600 dark:text-orange-400",
        EmAtendimento: "text-green-600 dark:text-green-400",
        Concluida: "text-green-600 dark:text-green-400",
        Cancelada: "text-gray-500 dark:text-gray-400",
    };

    return (
        <button
            type="button"
            onClick={() => onClick(solicitacao.id)}
            className="w-full rounded-xl border border-gray-200 bg-white p-5 text-left transition-colors hover:border-blue-400 hover:shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-500"
        >
            <div className="mb-4 flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        {solicitacao.protocolo}
                    </p>
                    <h3 className="mt-1 truncate text-sm font-semibold text-gray-900 dark:text-white">
                        {solicitacao.tipo}
                    </h3>
                </div>

                <span
                    className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-medium ${prioridadeClasses[solicitacao.prioridade] ??
                        "border-gray-200 bg-gray-100 text-gray-700 dark:border-gray-600 dark:bg-gray-700/40 dark:text-gray-300"
                        }`}
                >
                    {solicitacao.prioridade}
                </span>
            </div>

            <p className="mb-4 line-clamp-2 text-sm text-gray-600 dark:text-gray-300">
                {solicitacao.descricao}
            </p>

            <div className="space-y-2 text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-2">
                    <User size={14} />
                    <span className="truncate">
                        {solicitacao.solicitante}
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <MapPin size={14} />
                    <span className="truncate">
                        {solicitacao.endereco}, {solicitacao.municipio}
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <Clock size={14} />
                    <span className={
                        statusClasses[solicitacao.status] ?? "text-gray-500 dark:text-gray-400"
                    }
                    >
                        {solicitacao.status}
                    </span>
                </div>
            </div>
            {solicitacao.prioridade === "Urgente" && (
                <div className="mt-4 flex items-center gap-2 text-xs font-medium text-red-600 dark:text-red-400">
                    <AlertTriangle size={14} />
                    Atendimento prioritário
                </div>
            )}
        </button>
    );
};