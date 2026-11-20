import type { PrevisaoDia } from '../../types/iaPredict';

interface Props {
  previsao7d: PrevisaoDia[];
}

export function IAPredictChart({ previsao7d }: Props) {
  const max = Math.max(...previsao7d.map((p) => p.indice), 1);
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
      <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
        Previsão dos Próximos 7 Dias
      </h3>
      <div className="flex h-48 items-end gap-2">
        {previsao7d.map((p, i) => (
          <div key={`${p.dia}-${i}`} className="flex flex-1 flex-col items-center gap-1">
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{p.indice}</span>
            <div
              className="w-full rounded-t bg-gradient-to-t from-indigo-600 to-indigo-400"
              style={{ height: `${(p.indice / max) * 100}%` }}
            />
            <span className="text-[10px] text-gray-500 dark:text-gray-400">{p.dia}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
