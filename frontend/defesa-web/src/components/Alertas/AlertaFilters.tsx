import { AlertaFiltros } from "../../types/alerta";

interface Props{
  filtros: AlertaFiltros;
  onChange: (filtros: AlertaFiltros) => void;
}

export function AlertaFilters({filtros, onChange }: Props){
  return (
    <div className="flex flex-wrap gap-3 items-center mb-4">
      <input
        value={filtros.busca ?? ""}
        onChange={(e) => onChange({ ...filtros, busca: e.target.value })}
        placeholder="Buscar por titulo ou cidade"
        className="bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 dark:bg-[#111a2c] dark:border-[#1e293b] dark:text-gray-200 dark:placeholder:text-gray-500 rounded-lg px-3 py-2 text-sm outline-none focus:border-amber-500"
      />
      <select
        value={filtros.status ?? "Todos"}
        onChange={(e) =>
          onChange({
            ...filtros,
            status: e.target.value as AlertaFiltros["status"],
          })
        }
        className="bg-white border border-gray-300 text-gray-900 dark:bg-[#111a2c] dark:border-[#1e293b] dark:text-gray-200 rounded-lg px-3 py-2 text-sm w-64 outline-none focus:border-amber-500"
      >
        <option value="Todos">Todos os status</option>
        <option value="Ativo">Ativo</option>
        <option value="Monitorando">Monitorando</option>
        <option value="Encerrado">Encerrado</option>
        <option value="Cancelado">Cancelado</option>
      </select>

      <select
        value={filtros.nivel ?? "Todos"}
        onChange={(e) =>
          onChange({ ...filtros, nivel: e.target.value as AlertaFiltros["nivel"] })
        }
        className="bg-white border border-gray-300 text-gray-900 dark:bg-[#111a2c] dark:border-[#1e293b] dark:text-gray-200 rounded-lg px-3 py-2 text-sm w-64 outline-none focus:border-amber-500"
      >
        <option value="Todos">Todos os niveis</option>
        <option value="Baixo">Baixo</option>
        <option value="Moderado">Moderado</option>
        <option value="Alto">Alto</option>
        <option value="Critico">Critico</option>
      </select>

      <select
        value={filtros.tipo ?? "Todos"}
        onChange={(e) =>
          onChange({ ...filtros, tipo: e.target.value as AlertaFiltros["tipo"] })
        }
        className="bg-white border border-gray-300 text-gray-900 dark:bg-[#111a2c] dark:border-[#1e293b] dark:text-gray-200 rounded-lg px-3 py-2 text-sm outline-none cursor-pointer focus:border-amber-500"
      >
        <option value="Todos">Todos os tipos</option>
        <option value="ChuvaIntensa">Chuva Intensa</option>
        <option value="Enchente">Enchente</option>
        <option value="Alagamento">Alagamento</option>
        <option value="Enxurrada">Enxurrada</option>
        <option value="Deslizamento">Deslizamento</option>
        <option value="Vendaval">Vendaval</option>
        <option value="Microexplosao">Microexplosão</option>
        <option value="Granizo">Granizo</option>
        <option value="Incendio">Incêndio</option>
        <option value="Outros">Outros</option>
      </select>
    </div>
  );
}
