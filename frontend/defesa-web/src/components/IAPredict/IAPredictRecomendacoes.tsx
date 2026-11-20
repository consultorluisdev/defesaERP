import { Lightbulb } from 'lucide-react';
import type { RecomendacaoIA } from '../../types/iaPredict';

interface Props {
  recomendacoes: RecomendacaoIA[];
}

const prioridadeStyles: Record<RecomendacaoIA['prioridade'], string> = {
  Alta: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
  Média: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300',
  Baixa: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
};

export function IAPredictRecomendacoes({ recomendacoes }: Props) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
      <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-gray-100">Recomendações</h3>
      <ul className="space-y-3">
        {recomendacoes.map((r) => (
          <li
            key={r.id}
            className="flex items-start gap-3 rounded-lg border border-gray-100 p-3 dark:border-gray-800"
          >
            <Lightbulb size={18} className="mt-0.5 text-yellow-500" />
            <div className="flex-1">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{r.titulo}</p>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${prioridadeStyles[r.prioridade]}`}
                >
                  {r.prioridade}
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">{r.descricao}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
