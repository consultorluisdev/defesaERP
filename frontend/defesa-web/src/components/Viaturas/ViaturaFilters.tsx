import { Search } from 'lucide-react';
import type { ViaturaStatus, ViaturaTipo } from '../../types/viatura';

interface Props {
  busca: string;
  tipo: ViaturaTipo | '';
  status: ViaturaStatus | '';
  onBusca: (v: string) => void;
  onTipo: (v: ViaturaTipo | '') => void;
  onStatus: (v: ViaturaStatus | '') => void;
}

export function ViaturaFilters({ busca, tipo, status, onBusca, onTipo, onStatus }: Props) {
  const inputCls =
    'rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100';
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
      <div className="grid gap-3 md:grid-cols-3">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={busca}
            onChange={(e) => onBusca(e.target.value)}
            placeholder="Buscar por prefixo, placa..."
            className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          />
        </div>
        <select
          value={tipo}
          onChange={(e) => onTipo(e.target.value as ViaturaTipo | '')}
          className={inputCls}
        >
          <option value="">Todos os tipos</option>
          <option value="Ambulancia">Ambulância</option>
          <option value="Caminhao">Caminhão</option>
          <option value="Pickup">Pickup</option>
          <option value="Van">Van</option>
          <option value="Motocicleta">Motocicleta</option>
        </select>
        <select
          value={status}
          onChange={(e) => onStatus(e.target.value as ViaturaStatus | '')}
          className={inputCls}
        >
          <option value="">Todos os status</option>
          <option value="Disponivel">Disponível</option>
          <option value="EmOperacao">Em Operação</option>
          <option value="EmManutencao">Em Manutenção</option>
          <option value="Inativa">Inativa</option>
        </select>
      </div>
    </div>
  );
}
