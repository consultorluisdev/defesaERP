import type { Perfil } from '../../types/perfil';
import { PerfilCard } from './PerfilCard';

interface Props {
  perfis: Perfil[];
  onDetails: (p: Perfil) => void;
}

export function PerfilList({ perfis, onDetails }: Props) {
  if (perfis.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400">
        Nenhum perfil encontrado.
      </div>
    );
  }
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {perfis.map((p) => (
        <PerfilCard key={p.id} perfil={p} onDetails={onDetails} />
      ))}
    </div>
  );
}
