import { Download, Eye, FileText } from 'lucide-react';
import type { Relatorio, RelatorioStatus } from '../../types/relatorio';

const statusStyles: Record<RelatorioStatus, string> = {
  Gerado: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  Processando: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300',
  Falhou: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
};

interface Props {
  relatorio: Relatorio;
  onDetails: (r: Relatorio) => void;
  onBaixar: (r: Relatorio) => void;
}

export function RelatorioCard({ relatorio, onDetails, onBaixar }: Props) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-indigo-50 p-2 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-300">
            <FileText size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">{relatorio.titulo}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {relatorio.tipo} â€¢ {relatorio.formato} â€¢ {relatorio.tamanho}
            </p>
          </div>
        </div>
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[relatorio.status]}`}
        >
          {relatorio.status}
        </span>
      </div>
      <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
        Período: {relatorio.periodoInicio} a {relatorio.periodoFim}
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">Criado por {relatorio.criadoPor}</p>
      <div className="mt-4 flex gap-2">
        <button
          onClick={() => onDetails(relatorio)}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
        >
          <Eye size={16} /> Detalhes
        </button>
        <button
          onClick={() => onBaixar(relatorio)}
          disabled={relatorio.status !== 'Gerado'}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Download size={16} /> Baixar
        </button>
      </div>
    </div>
  );
}
