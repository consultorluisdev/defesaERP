import { useCallback, useEffect, useMemo, useState } from "react";
import RadarFilters from "../../components/Radar/RadarFilters";
import RadarHeader from "../../components/Radar/RadarHeader";
import RadarLegend from "../../components/Radar/RadarLegend";
import RadarMap from "../../components/Radar/RadarMap";
import RadarPanel from "../../components/Radar/RadarPanel";
import { radarService } from "../../services/radarService";
import type {
    RadarEvent,
    RadarFilters as RadarFiltersType,
} from "../../types/radar";

const initialFilters: RadarFiltersType = {
    busca: "",
    tipo: "",
    nivel: "",
    status: "",
    municipio: "",
};

export default function RadarPage() {
    const [events, setEvents] = useState<RadarEvent[]>([]);
    const [filters, setFilters] = useState<RadarFiltersType>(initialFilters);
    const [selectedEvent, setSelectedEvent] = useState<RadarEvent | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadEvents = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await radarService.getEvents();
            setEvents(data);
        } catch {
            setError("Não foi possível carregar os eventos do radar.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void loadEvents();
    }, [loadEvents]);

    const filteredEvents = useMemo(() => {
        const search = filters.busca.trim().toLowerCase();
        const municipality = filters.municipio.trim().toLowerCase();

        return events.filter((event) => {
            const matchesSearch =
                !search ||
                event.titulo.toLowerCase().includes(search) ||
                (event.descricao?.toLowerCase().includes(search) ?? false);

            const matchesType =
                !filters.tipo || event.tipo === filters.tipo;

            const matchesLevel =
                !filters.nivel || event.nivel === filters.nivel;

            const matchesStatus =
                !filters.status || event.status === filters.status;

            const matchesMunicipality =
                !municipality ||
                event.localizacao.municipio
                    .toLowerCase()
                    .includes(municipality);

            return (
                matchesSearch &&
                matchesType &&
                matchesLevel &&
                matchesStatus &&
                matchesMunicipality
            );
        });
    }, [events, filters]);

    const handleClearFilters = () => {
        setFilters({ ...initialFilters });
        setSelectedEvent(null);
    };

    return (
        <div className="space-y-6">
            <RadarHeader
                onRefresh={loadEvents}
                loading={loading}
            />

            {radarService.isDemo && (
                <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-300">
                    Dados de demonstração. A integração com a API do Radar será
                    implementada posteriormente.
                </div>
            )}

            <RadarFilters
                filters={filters}
                onChange={setFilters}
                onClear={handleClearFilters}
            />

            {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
                <RadarMap
                    events={filteredEvents}
                    loading={loading}
                    selectedEventId={selectedEvent?.id}
                    onSelectEvent={setSelectedEvent}
                />

                <RadarPanel event={selectedEvent} />
            </div>

            <RadarLegend />
        </div>
    );
}
