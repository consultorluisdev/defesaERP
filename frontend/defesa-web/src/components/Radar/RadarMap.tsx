import { FaMapMarkerAlt } from "react-icons/fa";
import type { RadarEvent } from "../../types/radar";

const POSITIONS = [
    { left: "24%", top: "30%" },
    { left: "58%", top: "42%" },
    { left: "72%", top: "68%" },
    { left: "38%", top: "72%" },
];

interface RadarMapProps {
    events: RadarEvent[];
    loading?: boolean;
    selectedEventId?: number | null;
    onSelectEvent?: (event: RadarEvent) => void;
}

export default function RadarMap({
    events,
    loading = false,
    selectedEventId,
    onSelectEvent,
}: RadarMapProps) {
    return (
        <div className="relative min-h-[500px] overflow-hidden rounded-xl border border-gray-200 bg-gray-100 shadow-sm dark:border-gray-700 dark:bg-gray-900">
            <div className="absolute inset-0 opacity-40">
                <div className="radar-grid h-full w-full" />
            </div>

            <div className="absolute left-4 top-4 rounded-lg border border-gray-200 bg-white/90 px-3 py-2 shadow-sm backdrop-blur dark:border-gray-700 dark:bg-gray-800/90">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Área de monitoramento
                </p>

                <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Radar operacional
                </p>
            </div>

            {events.map((event, index) => {
                const position = POSITIONS[index % POSITIONS.length];
                const selected = selectedEventId === event.id;

                return (
                    <button
                        key={event.id}
                        type="button"
                        onClick={() => onSelectEvent?.(event)}
                        className={`absolute flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white shadow-lg transition hover:scale-110 dark:border-gray-900 ${
                            selected
                                ? "bg-blue-600 text-white ring-4 ring-blue-500/30"
                                : "bg-red-500 text-white"
                        }`}
                        style={position}
                        title={event.titulo}
                        aria-label={`Selecionar evento ${event.titulo}`}
                        aria-pressed={selected}
                    >
                        <FaMapMarkerAlt size={14} />
                    </button>
                );
            })}

            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm dark:bg-gray-900/60">
                    <div className="flex items-center gap-3 rounded-lg bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm dark:bg-gray-800 dark:text-gray-200">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 dark:border-gray-700 dark:border-t-blue-400" />
                        Carregando eventos...
                    </div>
                </div>
            )}

            {!loading && events.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="max-w-sm text-center">
                        <FaMapMarkerAlt className="mx-auto mb-3 text-3xl text-gray-400 dark:text-gray-500" />

                        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                            Nenhum evento no radar
                        </h3>

                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Os eventos monitorados aparecerão nesta área quando
                            houver dados disponíveis.
                        </p>
                    </div>
                </div>
            )}

            <div className="absolute bottom-4 left-4 rounded-lg bg-white/90 px-3 py-2 text-xs text-gray-500 shadow-sm backdrop-blur dark:bg-gray-800/90 dark:text-gray-400">
                Mapa preparado para integração geográfica
            </div>
        </div>
    );
}