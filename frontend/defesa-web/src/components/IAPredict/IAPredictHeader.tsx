import { Activity, Cpu, Gauge } from 'lucide-react';
import type { StatusModelo } from '../../types/iaPredict';

interface Props {
  status: StatusModelo;
}

export function IAPredictHeader({ status }: Props) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Cpu size={20} className="text-blue-600 dark:text-blue-300" />
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Status do modelo</p>
            <p
              className={`text-sm font-semibold ${status.online ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}
            >
              {status.online ? 'Online' : 'Offline'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Activity size={20} className="text-indigo-600 dark:text-indigo-300" />
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Última atualização</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              {status.ultimaAtualizacao.slice(0, 16).replace('T', ' ')}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Gauge size={20} className="text-emerald-600 dark:text-emerald-300" />
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Confiança</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              {status.confianca}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
