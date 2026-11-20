import { Eye, Shield, Users } from 'lucide-react';
import type { Perfil, PerfilNivel } from '../../types/perfil';

const nivelStyles: Record<PerfilNivel, string> = {
  Administrador: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
  Gestor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  Operador: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  Visualizador: 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
};

interface Props {
  perfil: Perfil;
  onDetails: (p: Perfil) => void;
}

export function PerfilCard({ perfil, onDetails }: Props) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-purple-50 p-2 text-purple-600 dark:bg-purple-900/40 dark:text-purple-300">
            <Shield size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">{perfil.nome}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{perfil.descricao}</p>
          </div>
        </div>
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${nivelStyles[perfil.nivel]}`}
        >
          {perfil.nivel}
        </span>
      </div>
      <div className="mt-3 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
        <Users size={14} /> {perfil.usuarios} usuário(s)
        {!perfil.ativo && (
          <span className="ml-2 rounded bg-red-100 px-2 py-0.5 text-xs text-red-700 dark:bg-red-900/40 dark:text-red-300">
            Inativo
          </span>
        )}
      </div>
      <div className="mt-3 flex flex-wrap gap-1">
        {perfil.permissoes.slice(0, 3).map((p) => (
          <span
            key={p}
            className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-300"
          >
            {p}
          </span>
        ))}
        {perfil.permissoes.length > 3 && (
          <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-300">
            +{perfil.permissoes.length - 3}
          </span>
        )}
      </div>
      <button
        onClick={() => onDetails(perfil)}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
      >
        <Eye size={16} /> Ver detalhes
      </button>
    </div>
  );
}
