import type { Viatura } from '../../types/viatura';
import { ViaturaCard } from './ViaturaCard';

interface Props {
  viaturas: Viatura[];
  onDetails: (v: Viatura) => void;
}

export function ViaturaList({ viaturas, onDetails }: Props) {
  if (viaturas.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400">
        Nenhuma viatura encontrada.
      </div>
    );
  }
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {viaturas.map((v) => (
        <ViaturaCard key={v.id} viatura={v} onDetails={onDetails} />
      ))}
    </div>
  );
}
