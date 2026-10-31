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
        Baixa: "border-green-500/30 bg-green-500/10 text-green-400",
        Media: "border-yellow-500/30 bg-yellow-500/10 text-yellow-400",
        Alta: "border-orange-500/30 bg-orange-500/10 text-orange-400",
        Urgente: "border-red-500/30 bg-red-500/10 text-red-400",
    };

    const statusClasses: Record<string, string> = {
        Aberta: "text-blue-400",
        EmAnalise: "text-orange-400",
        EmAtendimento: "text-green-400",
        Concluida: "text-green-500",
        Cancelada: "text-gray-500",
    };

    return (
        <button
            type="button"
            onClick={() => onClick(solicitacao.id)}
            className="w-full rounded-xl border border-[#1e293b] bg-[#111a2c] p-5 text-left transition-colors hover:border-blue-500/40 hover:bg-[#151f33]"
        >
            <div className="mb-4 flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <p className="text-xs text-gray-500">
                        {solicitacao.protocolo}
                    </p>
                    <h3 className="mt-1 truncate text-sm font-semibold text-gray-100">
                        {solicitacao.tipo}
                    </h3>
                </div>

                <span
                    className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-medium ${prioridadeClasses[solicitacao.prioridade] ??
                        "border-gray-600 bg-gray-800 text-gray-300"
                        }`}
                >
                    {solicitacao.prioridade}
                </span>
            </div>

            <p className="mb-4 line-clamp-2 text-sm text-gray-400">
                {solicitacao.descricao}
            </p>

            <div className="space-y-2 text-xs text-gray-500">
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
                        statusClasses[solicitacao.status] ?? "text-gray-400"
                    }
                    >
                        {solicitacao.status}
                    </span>
                </div>
            </div>
            {solicitacao.prioridade === "Urgente" && (
                <div className="mt-4 flex items-center gap-2 text-xs font-medium text-red-400">
                    <AlertTriangle size={14} />
                    Atendimento prioritário
                </div>
            )}
        </button>
    );
};