import type { OcorrenciaPorCidade, OcorrenciaPorTipo, TendenciaPonto } from '../../types/analise';

interface Props {
  porTipo: OcorrenciaPorTipo[];
  porCidade: OcorrenciaPorCidade[];
  tendencia: TendenciaPonto[];
}

export function AnaliseCharts({ porTipo, porCidade, tendencia }: Props) {
  const maxTipo = Math.max(...porTipo.map((t) => t.total), 1);
  const maxCidade = Math.max(...porCidade.map((c) => c.total), 1);
  const maxTend = Math.max(...tendencia.map((t) => t.total), 1);

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
        <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
          Ocorrências por Tipo
        </h3>
        <div className="flex h-48 items-end justify-around gap-2">
          {porTipo.map((t) => (
            <div key={t.tipo} className="flex flex-1 flex-col items-center gap-1">
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                {t.total}
              </span>
              <div
                className="w-full rounded-t bg-blue-500"
                style={{ height: `${(t.total / maxTipo) * 100}%` }}
              />
              <span className="text-[10px] text-gray-500 dark:text-gray-400">{t.tipo}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
        <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
          Ocorrências por Cidade
        </h3>
        <div className="space-y-2">
          {porCidade.map((c) => (
            <div key={c.cidade}>
              <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                <span>{c.cidade}</span>
                <span>{c.total}</span>
              </div>
              <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800">
                <div
                  className="h-2 rounded-full bg-emerald-500"
                  style={{ width: `${(c.total / maxCidade) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5 lg:col-span-2 dark:border-gray-700 dark:bg-gray-900">
        <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
          Tendência no Período
        </h3>
        <div className="flex h-40 items-end gap-1">
          {tendencia.map((p, i) => (
            <div key={`${p.dia}-${i}`} className="flex flex-1 flex-col items-center gap-1">
              <div
                className="w-full rounded-t bg-indigo-500"
                style={{ height: `${(p.total / maxTend) * 100}%` }}
                title={`${p.dia}: ${p.total}`}
              />
              <span className="text-[9px] text-gray-500 dark:text-gray-400">{p.dia}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
