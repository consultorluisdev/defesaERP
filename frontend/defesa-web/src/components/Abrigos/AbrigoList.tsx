import type { Abrigo } from '../../types/abrigo';
import { AbrigoCard } from './AbrigoCard';

interface Props {
  abrigos: Abrigo[];
  onDetails: (a: Abrigo) => void;
}

export function AbrigoList({ abrigos, onDetails }: Props) {
  if (abrigos.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400">
        Nenhum abrigo encontrado com os filtros atuais.
      </div>
    );
  }
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {abrigos.map((a) => (
        <AbrigoCard key={a.id} abrigo={a} onDetails={onDetails} />
      ))}
    </div>
  );
}
