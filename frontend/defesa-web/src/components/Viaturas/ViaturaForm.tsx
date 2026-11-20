import { X } from 'lucide-react';
import { useState } from 'react';
import type { ViaturaFormData, ViaturaStatus, ViaturaTipo } from '../../types/viatura';

interface Props {
  onClose: () => void;
  onSubmit: (dados: ViaturaFormData) => void;
}

export function ViaturaForm({ onClose, onSubmit }: Props) {
  const [form, setForm] = useState<ViaturaFormData>({
    prefixo: '',
    modelo: '',
    marca: '',
    placa: '',
    tipo: 'Pickup',
    status: 'Disponivel',
    kmAtual: 0,
    proximaManutencao: '',
    responsavel: '',
    base: '',
  });
  const [erro, setErro] = useState('');
  const set = <K extends keyof ViaturaFormData>(k: K, v: ViaturaFormData[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handle = () => {
    if (!form.prefixo || !form.placa || !form.base) {
      setErro('Preencha prefixo, placa e base.');
      return;
    }
    onSubmit(form);
  };

  const inputCls =
    'w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100';
  const labelCls = 'text-xs font-medium text-gray-600 dark:text-gray-400';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6 shadow-xl dark:bg-gray-900">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Nova Viatura</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div>
            <label className={labelCls}>Prefixo</label>
            <input
              className={inputCls}
              value={form.prefixo}
              onChange={(e) => set('prefixo', e.target.value)}
            />
          </div>
          <div>
            <label className={labelCls}>Placa</label>
            <input
              className={inputCls}
              value={form.placa}
              onChange={(e) => set('placa', e.target.value)}
            />
          </div>
          <div>
            <label className={labelCls}>Marca</label>
            <input
              className={inputCls}
              value={form.marca}
              onChange={(e) => set('marca', e.target.value)}
            />
          </div>
          <div>
            <label className={labelCls}>Modelo</label>
            <input
              className={inputCls}
              value={form.modelo}
              onChange={(e) => set('modelo', e.target.value)}
            />
          </div>
          <div>
            <label className={labelCls}>Tipo</label>
            <select
              className={inputCls}
              value={form.tipo}
              onChange={(e) => set('tipo', e.target.value as ViaturaTipo)}
            >
              <option value="Ambulancia">Ambulância</option>
              <option value="Caminhao">Caminhão</option>
              <option value="Pickup">Pickup</option>
              <option value="Van">Van</option>
              <option value="Motocicleta">Motocicleta</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Status</label>
            <select
              className={inputCls}
              value={form.status}
              onChange={(e) => set('status', e.target.value as ViaturaStatus)}
            >
              <option value="Disponivel">Disponível</option>
              <option value="EmOperacao">Em Operação</option>
              <option value="EmManutencao">Em Manutenção</option>
              <option value="Inativa">Inativa</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>KM Atual</label>
            <input
              type="number"
              className={inputCls}
              value={form.kmAtual}
              onChange={(e) => set('kmAtual', Number(e.target.value))}
            />
          </div>
          <div>
            <label className={labelCls}>Próx. Manutenção</label>
            <input
              type="date"
              className={inputCls}
              value={form.proximaManutencao}
              onChange={(e) => set('proximaManutencao', e.target.value)}
            />
          </div>
          <div>
            <label className={labelCls}>Responsável</label>
            <input
              className={inputCls}
              value={form.responsavel}
              onChange={(e) => set('responsavel', e.target.value)}
            />
          </div>
          <div>
            <label className={labelCls}>Base</label>
            <input
              className={inputCls}
              value={form.base}
              onChange={(e) => set('base', e.target.value)}
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
