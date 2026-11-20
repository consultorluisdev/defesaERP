import type { Risco } from '../../types/risco';
import { RiscoCard } from './RiscoCard';

interface Props {
  riscos: Risco[];
  onDetails: (r: Risco) => void;
}

export function RiscoList({ riscos, onDetails }: Props) {
  if (riscos.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400">
        Nenhum risco encontrado.
      </div>
    );
  }
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {riscos.map((r) => (
        <RiscoCard key={r.id} risco={r} onDetails={onDetails} />
      ))}
    </div>
  );
}
