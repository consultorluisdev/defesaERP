import { X } from 'lucide-react';
import type { Perfil } from '../../types/perfil';

interface Props {
  perfil: Perfil;
  onClose: () => void;
}

export function PerfilDetails({ perfil, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl dark:bg-gray-900">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{perfil.nome}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{perfil.descricao}</p>
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-gray-500 dark:text-gray-400">Nível</p>
            <p className="font-medium text-gray-900 dark:text-gray-100">{perfil.nivel}</p>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400">Usuários</p>
            <p className="font-medium text-gray-900 dark:text-gray-100">{perfil.usuarios}</p>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400">Status</p>
            <p className="font-medium text-gray-900 dark:text-gray-100">
              {perfil.ativo ? 'Ativo' : 'Inativo'}
            </p>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Permissões</p>
          <div className="mt-2 flex flex-wrap gap-1">
            {perfil.permissoes.map((p) => (
              <span
                key={p}
                className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
        <button
          onClick={onClose}
          className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          Fechar
        </button>
      </div>
    </div>
  );
}
