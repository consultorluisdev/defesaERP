import type { AnalisePeriodo } from '../../types/analise';

interface Props {
  periodo: AnalisePeriodo;
  onChange: (p: AnalisePeriodo) => void;
}

const opcoes: { value: AnalisePeriodo; label: string }[] = [
  { value: '7d', label: '7 dias' },
  { value: '30d', label: '30 dias' },
  { value: '90d', label: '90 dias' },
  { value: 'ano', label: 'Ano' },
];

export function AnaliseHeader({ periodo, onChange }: Props) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Análises</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Indicadores e tendências operacionais.
        </p>
      </div>
      <div className="flex gap-1 rounded-lg border border-gray-200 bg-white p-1 dark:border-gray-700 dark:bg-gray-900">
        {opcoes.map((o) => (
          <button
            key={o.value}
            onClick={() => onChange(o.value)}
            className={`rounded-md px-3 py-1.5 text-sm font-medium ${periodo === o.value ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'}`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}
