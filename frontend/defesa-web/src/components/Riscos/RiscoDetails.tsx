import { Calendar, Info, MapPin, User, X } from 'lucide-react';
import type { Risco } from '../../types/risco';

interface Props {
  risco: Risco;
  onClose: () => void;
}

export function RiscoDetails({ risco, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl dark:bg-gray-900">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{risco.titulo}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
        <div className="mt-4 space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <p className="flex items-center gap-2">
            <MapPin size={16} /> {risco.bairro}, {risco.cidade} ({risco.latitude.toFixed(3)},{' '}
            {risco.longitude.toFixed(3)})
          </p>
          <p className="flex items-center gap-2">
            <Calendar size={16} /> {risco.dataOcorrencia}
          </p>
          <p className="flex items-center gap-2">
            <User size={16} /> {risco.responsavel}
          </p>
          <p className="flex items-center gap-2">
            <Info size={16} /> {risco.descricao}
          </p>
          <div className="flex gap-2 pt-2">
            <span className="rounded bg-gray-100 px-2 py-0.5 text-xs dark:bg-gray-800">
              {risco.tipo}
            </span>
            <span className="rounded bg-gray-100 px-2 py-0.5 text-xs dark:bg-gray-800">
              {risco.nivel}
            </span>
            <span className="rounded bg-gray-100 px-2 py-0.5 text-xs dark:bg-gray-800">
              {risco.status}
            </span>
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
