import { AlertTriangle, Droplets, Minus, Mountain, TrendingDown, TrendingUp } from 'lucide-react';
import type { PrevisaoIA } from '../../types/iaPredict';

interface Props {
  previsao: PrevisaoIA;
}

export function IAPredictCards({ previsao }: Props) {
  const TrendIcon =
    previsao.tendencia7d === 'Subindo'
      ? TrendingUp
      : previsao.tendencia7d === 'Caindo'
        ? TrendingDown
        : Minus;
  const trendColor =
    previsao.tendencia7d === 'Subindo'
      ? 'text-red-600 dark:text-red-400'
      : previsao.tendencia7d === 'Caindo'
        ? 'text-green-600 dark:text-green-400'
        : 'text-gray-600 dark:text-gray-400';

  const cards = [
    {
      label: 'Probabilidade de Enchente',
      value: `${previsao.probabilidadeEnchente}%`,
      icon: Droplets,
      cor: 'text-blue-600 bg-blue-50 dark:bg-blue-900/40 dark:text-blue-300',
    },
    {
      label: 'Risco de Deslizamento',
      value: `${previsao.riscoDeslizamento}%`,
      icon: Mountain,
      cor: 'text-orange-600 bg-orange-50 dark:bg-orange-900/40 dark:text-orange-300',
    },
    {
      label: 'Índice Geral de Risco',
      value: previsao.indiceGeralRisco,
      icon: AlertTriangle,
      cor: 'text-red-600 bg-red-50 dark:bg-red-900/40 dark:text-red-300',
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
      <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
        <div className="mb-3 inline-flex rounded-lg bg-gray-100 p-2 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
          <TrendIcon size={20} className={trendColor} />
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">Tendência 7 dias</p>
        <p className={`mt-1 text-2xl font-bold ${trendColor}`}>{previsao.tendencia7d}</p>
      </div>
    </div>
  );
}
