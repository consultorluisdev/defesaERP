import { X } from 'lucide-react';
import { useState } from 'react';
import type { AbrigoFormData, AbrigoStatus } from '../../types/abrigo';

interface Props {
  onClose: () => void;
  onSubmit: (dados: AbrigoFormData) => void;
}

export function AbrigoForm({ onClose, onSubmit }: Props) {
  const [form, setForm] = useState<AbrigoFormData>({
    nome: '',
    endereco: '',
    bairro: '',
    cidade: '',
    capacidade: 0,
    ocupacao: 0,
    status: 'Disponivel',
    responsavel: '',
    telefone: '',
    observacoes: '',
  });
  const [erro, setErro] = useState('');

  const set = <K extends keyof AbrigoFormData>(k: K, v: AbrigoFormData[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = () => {
    if (!form.nome || !form.cidade || form.capacidade <= 0) {
      setErro('Preencha nome, cidade e capacidade válida.');
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
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Novo Abrigo</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={labelCls}>Nome</label>
            <input
              className={inputCls}
              value={form.nome}
              onChange={(e) => set('nome', e.target.value)}
            />
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls}>Endereço</label>
            <input
              className={inputCls}
              value={form.endereco}
              onChange={(e) => set('endereco', e.target.value)}
            />
          </div>
          <div>
            <label className={labelCls}>Bairro</label>
            <input
              className={inputCls}
              value={form.bairro}
              onChange={(e) => set('bairro', e.target.value)}
            />
          </div>
          <div>
            <label className={labelCls}>Cidade</label>
            <input
              className={inputCls}
              value={form.cidade}
              onChange={(e) => set('cidade', e.target.value)}
            />
          </div>
          <div>
            <label className={labelCls}>Capacidade</label>
            <input
              type="number"
              className={inputCls}
              value={form.capacidade}
              onChange={(e) => set('capacidade', Number(e.target.value))}
            />
          </div>
          <div>
            <label className={labelCls}>Ocupação</label>
            <input
              type="number"
              className={inputCls}
              value={form.ocupacao}
              onChange={(e) => set('ocupacao', Number(e.target.value))}
            />
          </div>
          <div>
            <label className={labelCls}>Status</label>
            <select
              className={inputCls}
              value={form.status}
              onChange={(e) => set('status', e.target.value as AbrigoStatus)}
            >
              <option value="Disponivel">Disponível</option>
              <option value="Lotado">Lotado</option>
              <option value="EmManutencao">Em Manutenção</option>
              <option value="Fechado">Fechado</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Responsável</label>
            <input
              className={inputCls}
              value={form.responsavel}
              onChange={(e) => set('responsavel', e.target.value)}
            />
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls}>Telefone</label>
            <input
              className={inputCls}
              value={form.telefone}
              onChange={(e) => set('telefone', e.target.value)}
            />
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls}>Observações</label>
            <textarea
              className={inputCls}
              rows={3}
              value={form.observacoes}
              onChange={(e) => set('observacoes', e.target.value)}
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
            onClick={handleSubmit}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
