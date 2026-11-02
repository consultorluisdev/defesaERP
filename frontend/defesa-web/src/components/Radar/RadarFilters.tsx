import {
    RadarEventLevel,
    RadarEventStatus,
    RadarEventType,
    RadarFilters as RadarFiltersType,
} from "../../types/radar";

interface RadarFiltersProps {
    filters: RadarFiltersType;
    onChange: (filters: RadarFiltersType) => void;
    onClear: () => void;
}

const tipos: RadarEventType[] = [
    "Alerta",
    "Ocorrência",
    "Risco",
    "Monitoramento",
    "Outro",
];

const niveis: RadarEventLevel[] = [
    "Baixo",
    "Moderado",
    "Alto",
    "Crítico",
];

const status: RadarEventStatus[] = [
    "Ativo",
    "Em acompanhamento",
    "Resolvido",
];

export default function RadarFilters({
    filters,
    onChange,
    onClear,
}: RadarFiltersProps) {
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
                <div>
                    <label
                        htmlFor="radar-busca"
                        className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Buscar
                    </label>

                    <input
                        id="radar-busca"
                        type="text"
                        value={filters.busca}
                        onChange={(event) =>
                            onChange({
                                ...filters,
                                busca: event.target.value,
                            })
                        }
                        placeholder="Buscar evento..."
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                </div>

                <div>
                    <label
                        htmlFor="radar-tipo"
                        className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Tipo
                    </label>

                    <select
                        id="radar-tipo"
                        value={filters.tipo}
                        onChange={(event) =>
                            onChange({
                                ...filters,
                                tipo: event.target.value as RadarEventType | "",
                            })
                        }
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    >
                        <option value="">Todos</option>

                        {tipos.map((tipo) => (
                            <option key={tipo} value={tipo}>
                                {tipo}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label
                        htmlFor="radar-nivel"
                        className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Nível
                    </label>

                    <select
                        id="radar-nivel"
                        value={filters.nivel}
                        onChange={(event) =>
                            onChange({
                                ...filters,
                                nivel: event.target.value as RadarEventLevel | "",
                            })
                        }
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    >
                        <option value="">Todos</option>

                        {niveis.map((nivel) => (
                            <option key={nivel} value={nivel}>
                                {nivel}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label
                        htmlFor="radar-status"
                        className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Status
                    </label>

                    <select
                        id="radar-status"
                        value={filters.status}
                        onChange={(event) =>
                            onChange({
                                ...filters,
                                status: event.target.value as RadarEventStatus | "",
                            })
                        }
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    >
                        <option value="">Todos</option>

                        {status.map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label
                        htmlFor="radar-municipio"
                        className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Município
                    </label>

                    <input
                        id="radar-municipio"
                        type="text"
                        value={filters.municipio}
                        onChange={(event) =>
                            onChange({
                                ...filters,
                                municipio: event.target.value,
                            })
                        }
                        placeholder="Município..."
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                </div>
            </div>

            <div className="mt-4 flex justify-end">
                <button
                    type="button"
                    onClick={onClear}
                    className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                    Limpar filtros
                </button>
            </div>
        </div>
    );
}