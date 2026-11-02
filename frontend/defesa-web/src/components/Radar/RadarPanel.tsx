import { FaMapMarkerAlt } from "react-icons/fa";
import type { RadarEvent } from "../../types/radar";

interface RadarPanelProps {
    event: RadarEvent | null;
}

export default function RadarPanel({ event }: RadarPanelProps) {
    if (!event) {
        return (
            <aside className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <div className="flex min-h-[300px] items-center justify-center text-center">
                    <div>
                        <FaMapMarkerAlt className="mx-auto mb-3 text-2xl text-gray-400" />

                        <h3 className="font-semibold text-gray-900 dark:text-white">
                            Nenhum evento selecionado
                        </h3>

                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            Selecione um evento no radar para visualizar seus
                            detalhes.
                        </p>
                    </div>
                </div>
            </aside>
        );
    }

    return (
        <aside className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="mb-5">
                <span className="text-xs font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
                    Evento selecionado
                </span>

                <h2 className="mt-1 text-lg font-bold text-gray-900 dark:text-white">
                    {event.titulo}
                </h2>
            </div>

            <div className="space-y-4">
                <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        Tipo
                    </p>

                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {event.tipo}
                    </p>
                </div>

                <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        Nível
                    </p>

                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {event.nivel}
                    </p>
                </div>

                <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        Status
                    </p>

                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {event.status}
                    </p>
                </div>

                <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        Localização
                    </p>

                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {event.localizacao.municipio}
                    </p>

                    {event.localizacao.endereco && (
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            {event.localizacao.endereco}
                        </p>
                    )}
                </div>

                {event.descricao && (
                    <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            Descrição
                        </p>

                        <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                            {event.descricao}
                        </p>
                    </div>
                )}
            </div>
        </aside>
    );
}