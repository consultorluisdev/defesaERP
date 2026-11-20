import { Search } from 'lucide-react';
import type { RiscoNivel, RiscoStatus, RiscoTipo } from '../../types/risco';

interface Props {
  busca: string;
  tipo: RiscoTipo | '';
  nivel: RiscoNivel | '';
  status: RiscoStatus | '';
  onBusca: (v: string) => void;
  onTipo: (v: RiscoTipo | '') => void;
  onNivel: (v: RiscoNivel | '') => void;
  onStatus: (v: RiscoStatus | '') => void;
}

export function RiscoFilters({
  busca,
  tipo,
  nivel,
  status,
  onBusca,
  onTipo,
  onNivel,
  onStatus,
}: Props) {
  const cls =
    'rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100';
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
      <div className="grid gap-3 md:grid-cols-4">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={busca}
            onChange={(e) => onBusca(e.target.value)}
            placeholder="Buscar risco..."
            className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          />
        </div>
        <select
          value={tipo}
          onChange={(e) => onTipo(e.target.value as RiscoTipo | '')}
          className={cls}
        >
          <option value="">Todos os tipos</option>
          <option value="Enchente">Enchente</option>
          <option value="Deslizamento">Deslizamento</option>
          <option value="Desabamento">Desabamento</option>
          <option value="Incendio">Incêndio</option>
          <option value="Vendaval">Vendaval</option>
          <option value="Outro">Outro</option>
        </select>
        <select
          value={nivel}
          onChange={(e) => onNivel(e.target.value as RiscoNivel | '')}
          className={cls}
        >
          <option value="">Todos os níveis</option>
          <option value="Baixo">Baixo</option>
          <option value="Moderado">Moderado</option>
          <option value="Alto">Alto</option>
          <option value="Critico">Crítico</option>
        </select>
        <select
          value={status}
          onChange={(e) => onStatus(e.target.value as RiscoStatus | '')}
          className={cls}
        >
          <option value="">Todos os status</option>
          <option value="Monitorando">Monitorando</option>
          <option value="Ativo">Ativo</option>
          <option value="Resolvido">Resolvido</option>
        </select>
      </div>
    </div>
  );
}
