import { X } from 'lucide-react';
import { useState } from 'react';
import type { RiscoFormData, RiscoNivel, RiscoStatus, RiscoTipo } from '../../types/risco';

interface Props {
  onClose: () => void;
  onSubmit: (dados: RiscoFormData) => void;
}

export function RiscoForm({ onClose, onSubmit }: Props) {
  const [form, setForm] = useState<RiscoFormData>({
    titulo: '',
    tipo: 'Enchente',
    nivel: 'Moderado',
    status: 'Monitorando',
    cidade: '',
    bairro: '',
    latitude: 0,
    longitude: 0,
    dataOcorrencia: new Date().toISOString().slice(0, 10),
    descricao: '',
    responsavel: '',
  });
  const [erro, setErro] = useState('');
  const set = <K extends keyof RiscoFormData>(k: K, v: RiscoFormData[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handle = () => {
    if (!form.titulo || !form.cidade) {
      setErro('Preencha título e cidade.');
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
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Novo Risco</h3>
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
              onChange={(e) => set('tipo', e.target.value as RiscoTipo)}
            >
              {(
                [
                  'Enchente',
                  'Deslizamento',
                  'Desabamento',
                  'Incendio',
                  'Vendaval',
                  'Outro',
                ] as RiscoTipo[]
              ).map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={label}>Nível</label>
            <select
              className={cls}
              value={form.nivel}
              onChange={(e) => set('nivel', e.target.value as RiscoNivel)}
            >
              {(['Baixo', 'Moderado', 'Alto', 'Critico'] as RiscoNivel[]).map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={label}>Status</label>
            <select
              className={cls}
              value={form.status}
              onChange={(e) => set('status', e.target.value as RiscoStatus)}
            >
              {(['Monitorando', 'Ativo', 'Resolvido'] as RiscoStatus[]).map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={label}>Data</label>
            <input
              type="date"
              className={cls}
              value={form.dataOcorrencia}
              onChange={(e) => set('dataOcorrencia', e.target.value)}
            />
          </div>
          <div>
            <label className={label}>Cidade</label>
            <input
              className={cls}
              value={form.cidade}
              onChange={(e) => set('cidade', e.target.value)}
            />
          </div>
          <div>
            <label className={label}>Bairro</label>
            <input
              className={cls}
              value={form.bairro}
              onChange={(e) => set('bairro', e.target.value)}
            />
          </div>
          <div>
            <label className={label}>Latitude</label>
            <input
              type="number"
              step="0.001"
              className={cls}
              value={form.latitude}
              onChange={(e) => set('latitude', Number(e.target.value))}
            />
          </div>
          <div>
            <label className={label}>Longitude</label>
            <input
              type="number"
              step="0.001"
              className={cls}
              value={form.longitude}
              onChange={(e) => set('longitude', Number(e.target.value))}
            />
          </div>
          <div className="sm:col-span-2">
            <label className={label}>Responsável</label>
            <input
              className={cls}
              value={form.responsavel}
              onChange={(e) => set('responsavel', e.target.value)}
            />
          </div>
          <div className="sm:col-span-2">
            <label className={label}>Descrição</label>
            <textarea
              rows={3}
              className={cls}
              value={form.descricao}
              onChange={(e) => set('descricao', e.target.value)}
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
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
