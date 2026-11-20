import { X } from 'lucide-react';
import { useState } from 'react';
import type { RelatorioFormData, RelatorioFormato, RelatorioTipo } from '../../types/relatorio';

interface Props {
  onClose: () => void;
  onSubmit: (dados: RelatorioFormData) => void;
}

export function RelatorioForm({ onClose, onSubmit }: Props) {
  const [form, setForm] = useState<RelatorioFormData>({
    titulo: '',
    tipo: 'Ocorrencias',
    periodoInicio: '',
    periodoFim: '',
    formato: 'PDF',
    criadoPor: '',
  });
  const [erro, setErro] = useState('');
  const set = <K extends keyof RelatorioFormData>(k: K, v: RelatorioFormData[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handle = () => {
    if (!form.titulo || !form.periodoInicio || !form.periodoFim) {
      setErro('Preencha título e período.');
      return;
    }
    onSubmit(form);
  };

  const cls =
    'w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100';
  const label = 'text-xs font-medium text-gray-600 dark:text-gray-400';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6 shadow-xl dark:bg-gray-900">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Gerar Relatório
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={label}>Título</label>
            <input
              className={cls}
              value={form.titulo}
              onChange={(e) => set('titulo', e.target.value)}
            />
          </div>
          <div>
            <label className={label}>Tipo</label>
            <select
              className={cls}
              value={form.tipo}
              onChange={(e) => set('tipo', e.target.value as RelatorioTipo)}
            >
              {(
                [
                  'Ocorrencias',
                  'Alertas',
                  'Equipes',
                  'Abrigos',
                  'Viaturas',
                  'Riscos',
                ] as RelatorioTipo[]
              ).map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={label}>Formato</label>
            <select
              className={cls}
              value={form.formato}
              onChange={(e) => set('formato', e.target.value as RelatorioFormato)}
            >
              {(['PDF', 'CSV', 'XLSX'] as RelatorioFormato[]).map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={label}>Início</label>
            <input
              type="date"
              className={cls}
              value={form.periodoInicio}
              onChange={(e) => set('periodoInicio', e.target.value)}
            />
          </div>
          <div>
            <label className={label}>Fim</label>
            <input
              type="date"
              className={cls}
              value={form.periodoFim}
              onChange={(e) => set('periodoFim', e.target.value)}
            />
          </div>
          <div className="sm:col-span-2">
            <label className={label}>Criado por</label>
            <input
              className={cls}
              value={form.criadoPor}
              onChange={(e) => set('criadoPor', e.target.value)}
            />
          </div>
        </div>
        {erro && <p className="mt-3 text-sm text-red-600 dark:text-red-400">{erro}</p>}
        <div className="mt-5 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm dark:border-gray-700 dark:text-gray-200"
          >
            Cancelar
          </button>
          <button
            onClick={handle}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Gerar
          </button>
        </div>
      </div>
    </div>
  );
}
