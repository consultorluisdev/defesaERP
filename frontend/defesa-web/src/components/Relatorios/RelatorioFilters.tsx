import { Search } from 'lucide-react';
import type { RelatorioFormato, RelatorioStatus, RelatorioTipo } from '../../types/relatorio';

interface Props {
  busca: string;
  tipo: RelatorioTipo | '';
  status: RelatorioStatus | '';
  formato: RelatorioFormato | '';
  onBusca: (v: string) => void;
  onTipo: (v: RelatorioTipo | '') => void;
  onStatus: (v: RelatorioStatus | '') => void;
  onFormato: (v: RelatorioFormato | '') => void;
}

export function RelatorioFilters({
  busca,
  tipo,
  status,
  formato,
  onBusca,
  onTipo,
  onStatus,
  onFormato,
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
            placeholder="Buscar relatório..."
            className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          />
        </div>
        <select
          value={tipo}
          onChange={(e) => onTipo(e.target.value as RelatorioTipo | '')}
          className={cls}
        >
          <option value="">Todos os tipos</option>
          {(
            [
              'Ocorrencias',
              'Alertas',
              'Equipes',
              'Abrigos',
              'Viaturas',
              'Riscos',
            ] as RelatorioTipo[]
          ).map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <select
          value={status}
          onChange={(e) => onStatus(e.target.value as RelatorioStatus | '')}
          className={cls}
        >
          <option value="">Todos os status</option>
          {(['Gerado', 'Processando', 'Falhou'] as RelatorioStatus[]).map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select
          value={formato}
          onChange={(e) => onFormato(e.target.value as RelatorioFormato | '')}
          className={cls}
        >
          <option value="">Todos os formatos</option>
          {(['PDF', 'CSV', 'XLSX'] as RelatorioFormato[]).map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
