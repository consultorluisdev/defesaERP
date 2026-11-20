import type { Relatorio } from '../../types/relatorio';
import { RelatorioCard } from './RelatorioCard';

interface Props {
  relatorios: Relatorio[];
  onDetails: (r: Relatorio) => void;
  onBaixar: (r: Relatorio) => void;
}

export function RelatorioList({ relatorios, onDetails, onBaixar }: Props) {
  if (relatorios.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400">
        Nenhum relatório encontrado.
      </div>
    );
  }
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {relatorios.map((r) => (
        <RelatorioCard key={r.id} relatorio={r} onDetails={onDetails} onBaixar={onBaixar} />
      ))}
    </div>
  );
}
