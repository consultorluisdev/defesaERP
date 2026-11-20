import type { Risco, RiscoNivel } from '../../types/risco';

const nivelCor: Record<RiscoNivel, string> = {
  Baixo: 'bg-green-500',
  Moderado: 'bg-yellow-500',
  Alto: 'bg-orange-500',
  Critico: 'bg-red-500',
};

interface Props {
  riscos: Risco[];
}

export function RiscoMap({ riscos }: Props) {
  if (riscos.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-6 text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400">
        Sem riscos para exibir no mapa.
      </div>
    );
  }

  const lats = riscos.map((r) => r.latitude);
  const lngs = riscos.map((r) => r.longitude);
  const minLat = Math.min(...lats),
    maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs),
    maxLng = Math.max(...lngs);

  const posX = (lng: number) =>
    maxLng === minLng ? 50 : ((lng - minLng) / (maxLng - minLng)) * 100;
  const posY = (lat: number) =>
    maxLat === minLat ? 50 : ((maxLat - lat) / (maxLat - minLat)) * 100;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
      <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">
        Mapa de Riscos (visual)
      </h3>
      <div className="relative h-80 w-full overflow-hidden rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 dark:from-gray-800 dark:to-gray-900">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)',
            backgroundSize: '10% 10%',
          }}
        />
        {riscos.map((r) => (
          <div
            key={r.id}
            className="group absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${posX(r.longitude)}%`, top: `${posY(r.latitude)}%` }}
          >
            <div
              className={`h-3 w-3 rounded-full ring-2 ring-white dark:ring-gray-900 ${nivelCor[r.nivel]}`}
            />
            <div className="pointer-events-none absolute left-4 top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white group-hover:block dark:bg-gray-100 dark:text-gray-900">
              {r.titulo} â€” {r.nivel}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-3 text-xs text-gray-600 dark:text-gray-400">
        {(['Baixo', 'Moderado', 'Alto', 'Critico'] as RiscoNivel[]).map((n) => (
          <span key={n} className="flex items-center gap-1">
            <span className={`h-2 w-2 rounded-full ${nivelCor[n]}`} /> {n}
          </span>
        ))}
      </div>
    </div>
  );
}
