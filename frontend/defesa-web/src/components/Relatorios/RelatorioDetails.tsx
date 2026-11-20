import { X } from 'lucide-react';
import type { Relatorio } from '../../types/relatorio';

interface Props {
  relatorio: Relatorio;
  onClose: () => void;
}

export function RelatorioDetails({ relatorio, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl dark:bg-gray-900">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {relatorio.titulo}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
        <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
          {[
            ['Tipo', relatorio.tipo],
            ['Formato', relatorio.formato],
            ['Status', relatorio.status],
            ['Tamanho', relatorio.tamanho],
            ['Período início', relatorio.periodoInicio],
            ['Período fim', relatorio.periodoFim],
            ['Criado por', relatorio.criadoPor],
            ['Criado em', relatorio.criadoEm.slice(0, 16).replace('T', ' ')],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="text-gray-500 dark:text-gray-400">{k}</dt>
              <dd className="font-medium text-gray-900 dark:text-gray-100">{v}</dd>
            </div>
          ))}
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
