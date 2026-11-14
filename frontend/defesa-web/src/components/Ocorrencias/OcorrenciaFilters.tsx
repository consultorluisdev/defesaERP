import { OcorrenciaFiltros, StatusOcorrencia, PrioridadeOcorrencia } from "../../types/ocorrencia";

interface Props {
    filtros: OcorrenciaFiltros;
    onChange: (filtros: OcorrenciaFiltros) => void;
}

const STATUSES: (StatusOcorrencia | "Todas")[] = ["Todas", "Aberta", "Em Andamento", "Concluída", "Cancelada"];
const PRIORIDADES: (PrioridadeOcorrencia | "Todas")[] = ["Todas", "Crítica", "Alta", "Média", "Baixa"];

export function OcorrenciaFilters({ filtros, onChange }: Props) {
    return (
        <div className="flex flex-wrap gap-3 mb-6">
            <input
                type="text"
                placeholder="Buscar por protocolo, endereço, cidade..."
                value={filtros.busca ?? ""}
                onChange={(e) => onChange({ ...filtros, busca: e.target.value })}
                className="bg-white border border-gray-300 text-gray-900 placeholder-gray-400 dark:bg-[#111a2c] dark:border-[#1e293b] dark:text-gray-200 dark:placeholder-gray-500 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 flex-1 min-w-[200px]"
            />

            <select
                value={filtros.status ?? "Todas"}
                onChange={(e) => onChange({ ...filtros, status: e.target.value as StatusOcorrencia | "Todas" })}
                className="bg-white border border-gray-300 text-gray-900 dark:bg-[#111a2c] dark:border-[#1e293b] dark:text-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
            >
                {STATUSES.map((s) => (
                    <option key={s} value={s}>{s === "Todas" ? "Todos os status" : s}</option>
                ))}
            </select>

            <select
                value={filtros.prioridade ?? "Todas"}
                onChange={(e) => onChange({ ...filtros, prioridade: e.target.value as PrioridadeOcorrencia | "Todas" })}
                className="bg-white border border-gray-300 text-gray-900 dark:bg-[#111a2c] dark:border-[#1e293b] dark:text-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
            >
                {PRIORIDADES.map((p) => (
                    <option key={p} value={p}>{p === "Todas" ? "Todas as prioridades" : p}</option>
                ))}
            </select>
        </div>
    );
}
