import React from "react";
import { Vistoria } from "@/types/vistoria";

interface VistoriaCardProps {
    vistoria: Vistoria;
    onSelect: (vistoria: Vistoria) => void;
}

export const VistoriaCard: React.FC<VistoriaCardProps> = ({
    vistoria,
    onSelect,
}) => {
    return (
        <button
            type="button"
            onClick={() => onSelect(vistoria)}
            className="w-full rounded-xl border border-gray-700 bg-gray-900 p-5 text-left transition hover:border-blue-600 hover:bg-gray-800"
        >
            <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                    <p className="text-xs text-gray-500">
                        Protocolo
                    </p>

                    <h3 className="mt-1 font-semibold text-white">
                        {vistoria.protocolo}
                    </h3>
                </div>

                <span className="rounded-full border border-gray-700 bg-gray-800 px-3 py-1 text-xs text-gray-300">
                    {vistoria.status}
                </span>
            </div>

            <div className="space-y-2">
                <p className="text-sm text-gray-300">
                    <span className="text-gray-500">Solicitante:</span>{' '}
                    {vistoria.solicitante}
                </p>

                <p className="text-sm text-gray-300">
                    <span className="text-gray-500">Endereço:</span>{' '}
                    {vistoria.endereco}
                </p>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-gray-800 pt-3">
                <span className="text-xs text-gray-500">
                    Prioridade:{' '}
                    <span className="text-gray-300">{vistoria.prioridade}</span>
                </span>

                <span className="text-xs font-medium text-blue-400">
                    Ver detalhes →
                </span>

            </div>

        </button>
    )
}