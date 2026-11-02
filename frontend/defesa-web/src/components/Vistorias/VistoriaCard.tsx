import React from "react";
import type { Vistoria } from "../../types/vistoria";

interface VistoriaCardProps {
    vistoria: Vistoria;
    onSelect: (vistoria: Vistoria) => void;
}

export const VistoriaCard: React.FC<VistoriaCardProps> = ({
    vistoria,
    onSelect,
}) => {
    const getStatusClass = (status: string) => {
        switch (status) {
            case "Agendada":
                return "border-blue-500/40 bg-blue-500/10 text-blue-400";
            case "EmAndamento":
                return "border-yellow-500/40 bg-yellow-500/10 text-yellow-400";
            case "Concluida":
                return "border-green-500/40 bg-green-500/10 text-green-400";
            case "Cancelada":
                return "border-red-500/40 bg-red-500/10 text-red-400";
            default:
                return "border-gray-500/40 bg-gray-500/10 text-gray-400";
        }
    };

    const getPriorityClass = (prioridade: string) => {
        switch (prioridade) {
            case "Urgente":
                return "text-red-400";
            case "Alta":
                return "text-orange-400";
            case "Media":
                return "text-yellow-400";
            case "Baixa":
                return "text-green-400";
            default:
                return "text-gray-400";
        }
    };

    return (
        <button
            type="button"
            onClick={() => onSelect(vistoria)}
            className="w-full rounded-xl border border-gray-200 bg-white p-5 text-left transition hover:border-blue-500 hover:shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:hover:border-blue-500"
        >
            <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                    <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                        Protocolo
                    </p>

                    <h3 className="mt-1 font-semibold text-gray-900 dark:text-white">
                        {vistoria.protocolo}
                    </h3>
                </div>

                <span
                    className={`rounded-full border px-3 py-1 text-xs font-medium ${getStatusClass(
                        vistoria.status,
                    )}`}
                >
                    {vistoria.status}
                </span>
            </div>

            <div className="space-y-2">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                    <span className="text-gray-500 dark:text-gray-400">
                        Solicitante:
                    </span>{" "}
                    {vistoria.solicitante}
                </p>

                <p className="text-sm text-gray-700 dark:text-gray-300">
                    <span className="text-gray-500 dark:text-gray-400">
                        Endereço:
                    </span>{" "}
                    {vistoria.endereco}
                </p>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-3 dark:border-gray-800">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                    Prioridade:{" "}
                    <span className={`font-medium ${getPriorityClass(vistoria.prioridade)}`}>
                        {vistoria.prioridade}
                    </span>
                </span>

                <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                    Ver detalhes →
                </span>
            </div>
        </button>
    );
};
