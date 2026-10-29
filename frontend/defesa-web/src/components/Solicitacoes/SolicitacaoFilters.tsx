import React from "react";
import {
    PrioridadesSolicitacao,
    StatusSolicitacao,
    TiposSolicitacao,
} from "../types/solicitacao";

interface SolicitacaoFiltersProps {
    busca: string;
    tipo: string;
    status: string;
    prioridade: string;
    onBuscaChange: (value: string) => void;
    onTipoChange: (value: string) => void;
    onStatusChange: (value: string) => void;
    onPrioridadeChange: (value: string) => void;
    onLimpar: () => void;
}
export const SolicitacaoFilters: React.FC<SolicitacaoFiltersProps> = ({
    busca,
    tipo,
    status,
    prioridade,
    onBuscaChange,
    onTipoChange,
    onStatusChange,
    onPrioridadeChange,
    onLimpar,
}) => {
    return (

        <div className="mb-6 rounded-lg border-gray-700 bg-gray-900 p-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
                <div className="lg:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-gray-300">
                        Buscar
                    </label>

                    <input type="text"
                        value={busca}
                        onChange={(e) => onBuscaChange(e.target.value)}
                        placeholder="Protocolo, solicitante ou endereço..."
                        className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white outline-none transition focus:border-blue-500" />
                </div>
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-300">
                        Tipo
                    </label>

                    <select
                        value={tipo}
                        onChange={(e) => onTipoChange(e.target.value)}
                        className="w-full rounded-lg border border-gray-700 bg-gray-700 bg-gray-800 px-3 py-2 text-sm text-white outline-none focus:border-blue-500"
                    >
                        <option value="">Todos</option>

                        {Object.entries(TiposSolicitacao).map(([label, value]) => (
                            <option key={value} Value={value}>
                                {label.replace(/_/g, '')}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-300">
                        Status
                    </label>


                    <select
                        value={status}
                        onChange={(e) => onStatusChange(e.target.value)}
                        className="w-full rouded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white outline-none focus:border-blue-500">

                        <option value="">Todos</option>

                        {Object.entries(StatusSolicitacao).map(([label, value]) => (
                            <option Key={value} Value={value}>
                                {label.replace(/_/g, ' ')}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="mt-4 flex justify-end">
                <button
                    type="button"
                    onClick={onLimpar}
                    className="rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-sm font-medium text-gray-300 transition hover"
                >
                    Limpar filtros
                </button>
            </div>
        </div>
    )

}