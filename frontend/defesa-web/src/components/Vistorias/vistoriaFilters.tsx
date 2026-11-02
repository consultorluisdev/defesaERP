import {
  TiposVistoria,
  StatusVistoria,
  PrioridadesVistoria,
} from "../../types/vistoria";

interface VistoriaFiltersProps {
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

export default function VistoriaFilters({
  busca,
  tipo,
  status,
  prioridade,
  onBuscaChange,
  onTipoChange,
  onStatusChange,
  onPrioridadeChange,
  onLimpar,
}: VistoriaFiltersProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div>
          <label
            htmlFor="vistoria-busca"
            className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Buscar
          </label>

          <input
            id="vistoria-busca"
            type="text"
            value={busca}
            onChange={(e) => onBuscaChange(e.target.value)}
            placeholder="Protocolo, solicitante ou município..."
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label
            htmlFor="vistoria-tipo"
            className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Tipo
          </label>

          <select
            id="vistoria-tipo"
            value={tipo}
            onChange={(e) => onTipoChange(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            <option value="">Todos os tipos</option>
            {Object.values(TiposVistoria).map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="vistoria-status"
            className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Status
          </label>

          <select
            id="vistoria-status"
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            <option value="">Todos os status</option>
            {Object.values(StatusVistoria).map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="vistoria-prioridade"
            className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Prioridade
          </label>

          <select
            id="vistoria-prioridade"
            value={prioridade}
            onChange={(e) => onPrioridadeChange(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            <option value="">Todas as prioridades</option>
            {Object.values(PrioridadesVistoria).map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          type="button"
          onClick={onLimpar}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          Limpar filtros
        </button>
      </div>
    </div>
  );
}