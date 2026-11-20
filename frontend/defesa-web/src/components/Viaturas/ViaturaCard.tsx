import { AlertTriangle, Eye, Truck, Wrench } from 'lucide-react';
import type { Viatura } from '../../types/viatura';

const statusStyles: Record<Viatura['status'], string> = {
  Disponivel: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  EmOperacao: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  EmManutencao: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300',
  Inativa: 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
};

const statusLabels: Record<Viatura['status'], string> = {
  Disponivel: 'Disponível',
  EmOperacao: 'Em Operação',
  EmManutencao: 'Em Manutenção',
  Inativa: 'Inativa',
};

function diasAte(data: string): number {
  const hoje = new Date();
  const alvo = new Date(data);
  return Math.ceil((alvo.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24));
}

interface Props {
  viatura: Viatura;
  onDetails: (v: Viatura) => void;
}

export function ViaturaCard({ viatura, onDetails }: Props) {
  const dias = diasAte(viatura.proximaManutencao);
  const alerta = dias < 0 ? 'atrasada' : dias <= 30 ? 'proxima' : null;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-blue-50 p-2 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300">
            <Truck size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">{viatura.prefixo}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {viatura.marca} {viatura.modelo} â€¢ {viatura.placa}
            </p>
          </div>
        </div>
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[viatura.status]}`}
        >
          {statusLabels[viatura.status]}
        </span>
      </div>

      <div className="mt-3 flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
        <span>{viatura.kmAtual.toLocaleString('pt-BR')} km</span>
        <span className="flex items-center gap-1 text-xs">
          <Wrench size={12} /> {viatura.proximaManutencao}
        </span>
      </div>

      {alerta && (
        <div
          className={`mt-3 flex items-center gap-2 rounded-lg px-3 py-2 text-xs ${alerta === 'atrasada' ? 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300' : 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'}`}
        >
          <AlertTriangle size={14} />
          {alerta === 'atrasada'
            ? `Manutenção atrasada (${Math.abs(dias)} dias)`
            : `Manutenção em ${dias} dias`}
        </div>
      )}

      <button
        onClick={() => onDetails(viatura)}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
      >
        <Eye size={16} /> Ver detalhes
      </button>
    </div>
  );
}
