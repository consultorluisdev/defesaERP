import { X } from 'lucide-react';
import { useState } from 'react';
import type { PerfilFormData, PerfilNivel } from '../../types/perfil';
import { PerfilPermissions } from './PerfilPermissions';

interface Props {
  onClose: () => void;
  onSubmit: (dados: PerfilFormData) => void;
}

export function PerfilForm({ onClose, onSubmit }: Props) {
  const [form, setForm] = useState<PerfilFormData>({
    nome: '',
    descricao: '',
    nivel: 'Operador',
    permissoes: [],
    usuarios: 0,
    ativo: true,
  });
  const [erro, setErro] = useState('');
  const set = <K extends keyof PerfilFormData>(k: K, v: PerfilFormData[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handle = () => {
    if (!form.nome) {
      setErro('Preencha o nome do perfil.');
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
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Novo Perfil</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={label}>Nome</label>
            <input
              className={cls}
              value={form.nome}
              onChange={(e) => set('nome', e.target.value)}
            />
          </div>
          <div className="sm:col-span-2">
            <label className={label}>Descrição</label>
            <input
              className={cls}
              value={form.descricao}
              onChange={(e) => set('descricao', e.target.value)}
            />
          </div>
          <div>
            <label className={label}>Nível</label>
            <select
              className={cls}
              value={form.nivel}
              onChange={(e) => set('nivel', e.target.value as PerfilNivel)}
            >
              {(['Administrador', 'Gestor', 'Operador', 'Visualizador'] as PerfilNivel[]).map(
                (n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ),
              )}
            </select>
          </div>
          <div>
            <label className={label}>Usuários</label>
            <input
              type="number"
              className={cls}
              value={form.usuarios}
              onChange={(e) => set('usuarios', Number(e.target.value))}
            />
          </div>
          <div className="sm:col-span-2 flex items-center gap-2">
            <input
              id="ativo"
              type="checkbox"
              checked={form.ativo}
              onChange={(e) => set('ativo', e.target.checked)}
              className="accent-blue-600"
            />
            <label htmlFor="ativo" className="text-sm text-gray-700 dark:text-gray-300">
              Perfil ativo
            </label>
          </div>
          <div className="sm:col-span-2">
            <label className={label}>Permissões</label>
            <PerfilPermissions
              selecionadas={form.permissoes}
              onChange={(l) => set('permissoes', l)}
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
