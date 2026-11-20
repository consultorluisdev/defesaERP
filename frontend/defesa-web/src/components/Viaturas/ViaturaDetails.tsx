import { X } from 'lucide-react';
import type { Viatura } from '../../types/viatura';

interface Props {
  viatura: Viatura;
  onClose: () => void;
}

export function ViaturaDetails({ viatura, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl dark:bg-gray-900">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {viatura.prefixo}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
        <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div>
            <dt className="text-gray-500 dark:text-gray-400">Marca/Modelo</dt>
            <dd className="font-medium text-gray-900 dark:text-gray-100">
              {viatura.marca} {viatura.modelo}
            </dd>
          </div>
          <div>
            <dt className="text-gray-500 dark:text-gray-400">Placa</dt>
            <dd className="font-medium text-gray-900 dark:text-gray-100">{viatura.placa}</dd>
          </div>
          <div>
            <dt className="text-gray-500 dark:text-gray-400">Tipo</dt>
            <dd className="font-medium text-gray-900 dark:text-gray-100">{viatura.tipo}</dd>
          </div>
          <div>
            <dt className="text-gray-500 dark:text-gray-400">Status</dt>
            <dd className="font-medium text-gray-900 dark:text-gray-100">{viatura.status}</dd>
          </div>
          <div>
            <dt className="text-gray-500 dark:text-gray-400">KM Atual</dt>
            <dd className="font-medium text-gray-900 dark:text-gray-100">
              {viatura.kmAtual.toLocaleString('pt-BR')}
            </dd>
          </div>
          <div>
            <dt className="text-gray-500 dark:text-gray-400">Próx. Manutenção</dt>
            <dd className="font-medium text-gray-900 dark:text-gray-100">
              {viatura.proximaManutencao}
            </dd>
          </div>
          <div>
            <dt className="text-gray-500 dark:text-gray-400">Responsável</dt>
            <dd className="font-medium text-gray-900 dark:text-gray-100">{viatura.responsavel}</dd>
          </div>
          <div>
            <dt className="text-gray-500 dark:text-gray-400">Base</dt>
            <dd className="font-medium text-gray-900 dark:text-gray-100">{viatura.base}</dd>
          </div>
        </dl>
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
