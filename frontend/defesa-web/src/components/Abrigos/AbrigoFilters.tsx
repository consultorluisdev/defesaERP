import { Search } from 'lucide-react';
import type { AbrigoStatus } from '../../types/abrigo';

interface Props {
  busca: string;
  cidade: string;
  status: AbrigoStatus | '';
  cidades: string[];
  onBusca: (v: string) => void;
  onCidade: (v: string) => void;
  onStatus: (v: AbrigoStatus | '') => void;
}

export function AbrigoFilters({
  busca,
  cidade,
  status,
  cidades,
  onBusca,
  onCidade,
  onStatus,
}: Props) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
      <div className="grid gap-3 md:grid-cols-3">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={busca}
            onChange={(e) => onBusca(e.target.value)}
            placeholder="Buscar por nome, bairro..."
            className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          />
        </div>
        <select
          value={cidade}
          onChange={(e) => onCidade(e.target.value)}
          className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
        >
          <option value="">Todas as cidades</option>
          {cidades.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          value={status}
          onChange={(e) => onStatus(e.target.value as AbrigoStatus | '')}
          className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
        >
          <option value="">Todos os status</option>
          <option value="Disponivel">Disponível</option>
          <option value="Lotado">Lotado</option>
          <option value="EmManutencao">Em Manutenção</option>
          <option value="Fechado">Fechado</option>
        </select>
      </div>
    </div>
  );
}
