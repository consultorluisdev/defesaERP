import { AlertTriangle, Eye, MapPin } from 'lucide-react';
import type { Risco, RiscoNivel } from '../../types/risco';

const nivelStyles: Record<RiscoNivel, string> = {
  Baixo: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  Moderado: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300',
  Alto: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
  Critico: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
};

interface Props {
  risco: Risco;
  onDetails: (r: Risco) => void;
}

export function RiscoCard({ risco, onDetails }: Props) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-orange-50 p-2 text-orange-600 dark:bg-orange-900/40 dark:text-orange-300">
            <AlertTriangle size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">{risco.titulo}</h3>
            <p className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
              <MapPin size={14} /> {risco.bairro}, {risco.cidade}
            </p>
          </div>
        </div>
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${nivelStyles[risco.nivel]}`}
        >
          {risco.nivel}
        </span>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
        <span className="rounded bg-gray-100 px-2 py-0.5 dark:bg-gray-800">{risco.tipo}</span>
        <span className="rounded bg-gray-100 px-2 py-0.5 dark:bg-gray-800">{risco.status}</span>
        <span>{risco.dataOcorrencia}</span>
      </div>
      <button
        onClick={() => onDetails(risco)}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
      >
        <Eye size={16} /> Ver detalhes
      </button>
    </div>
  );
}
