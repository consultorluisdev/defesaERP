import { Activity, CheckCircle, Clock, Users } from 'lucide-react';
import type { Indicadores } from '../../types/analise';

interface Props {
  indicadores: Indicadores;
}

export function AnaliseCards({ indicadores }: Props) {
  const cards = [
    {
      label: 'Total de Ocorrências',
      value: indicadores.totalOcorrencias,
      icon: Activity,
      cor: 'text-blue-600 bg-blue-50 dark:bg-blue-900/40 dark:text-blue-300',
    },
    {
      label: 'Tempo Médio (min)',
      value: indicadores.tempoMedioAtendimento,
      icon: Clock,
      cor: 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/40 dark:text-yellow-300',
    },
    {
      label: 'Taxa de Resolução',
      value: `${indicadores.taxaResolucao}%`,
      icon: CheckCircle,
      cor: 'text-green-600 bg-green-50 dark:bg-green-900/40 dark:text-green-300',
    },
    {
      label: 'Equipes Mobilizadas',
      value: indicadores.equipesMobilizadas,
      icon: Users,
      cor: 'text-purple-600 bg-purple-50 dark:bg-purple-900/40 dark:text-purple-300',
    },
  ];
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((c) => {
        const Icon = c.icon;
        return (
          <div
            key={c.label}
            className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900"
          >
            <div className={`mb-3 inline-flex rounded-lg p-2 ${c.cor}`}>
              <Icon size={20} />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{c.label}</p>
            <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-gray-100">{c.value}</p>
          </div>
        );
      })}
    </div>
  );
}
