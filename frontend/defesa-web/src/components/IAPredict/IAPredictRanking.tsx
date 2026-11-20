import type { RankingCidade } from '../../types/iaPredict';

interface Props {
  ranking: RankingCidade[];
}

export function IAPredictRanking({ ranking }: Props) {
  const max = Math.max(...ranking.map((r) => r.indice), 1);
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
      <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
        Ranking de Cidades por Risco
      </h3>
      <div className="space-y-2">
        {ranking.map((r, i) => (
          <div key={r.cidade}>
            <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
              <span>
                {i + 1}. {r.cidade}
              </span>
              <span>{r.indice}</span>
            </div>
            <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-yellow-500 to-red-500"
                style={{ width: `${(r.indice / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
