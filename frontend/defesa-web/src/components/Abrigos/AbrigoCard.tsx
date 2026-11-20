import { Building2, Eye, MapPin, Phone, User } from 'lucide-react';
import type { Abrigo } from '../../types/abrigo';

const statusStyles: Record<Abrigo['status'], string> = {
  Disponivel: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  Lotado: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
  EmManutencao: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300',
  Fechado: 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
};

const statusLabels: Record<Abrigo['status'], string> = {
  Disponivel: 'Disponível',
  Lotado: 'Lotado',
  EmManutencao: 'Em Manutenção',
  Fechado: 'Fechado',
};

interface Props {
  abrigo: Abrigo;
  onDetails: (abrigo: Abrigo) => void;
}

export function AbrigoCard({ abrigo, onDetails }: Props) {
  const pct = Math.min(100, Math.round((abrigo.ocupacao / abrigo.capacidade) * 100));
  const barColor = pct >= 90 ? 'bg-red-500' : pct >= 70 ? 'bg-yellow-500' : 'bg-green-500';

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-blue-50 p-2 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300">
            <Building2 size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">{abrigo.nome}</h3>
            <p className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
              <MapPin size={14} /> {abrigo.bairro}, {abrigo.cidade}
            </p>
          </div>
        </div>
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[abrigo.status]}`}
        >
          {statusLabels[abrigo.status]}
        </span>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <span>Ocupação</span>
          <span className="font-medium text-gray-700 dark:text-gray-300">
            {abrigo.ocupacao}/{abrigo.capacidade} ({pct}%)
          </span>
        </div>
        <div className="mt-1 h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800">
          <div className={`h-2 rounded-full ${barColor}`} style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2 text-sm text-gray-500 dark:text-gray-400">
        <span className="flex items-center gap-1">
          <User size={14} /> {abrigo.responsavel}
        </span>
        <span className="flex items-center gap-1">
          <Phone size={14} /> {abrigo.telefone}
        </span>
      </div>

      <button
        onClick={() => onDetails(abrigo)}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
      >
        <Eye size={16} /> Ver detalhes
      </button>
    </div>
  );
}
