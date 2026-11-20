import type { ConfiguracaoSistema } from '../../types/configuracao';

interface Props {
  dados: ConfiguracaoSistema;
  onChange: (d: ConfiguracaoSistema) => void;
}

export function ConfiguracaoSistemaSection({ dados, onChange }: Props) {
  const cls =
    'w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100';
  const label = 'text-xs font-medium text-gray-600 dark:text-gray-400';
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
      <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">Sistema</h3>
      <div className="space-y-3">
        <div>
          <label className={label}>Tema</label>
          <select
            className={cls}
            value={dados.tema}
            onChange={(e) =>
              onChange({ ...dados, tema: e.target.value as ConfiguracaoSistema['tema'] })
            }
          >
            <option value="claro">Claro</option>
            <option value="escuro">Escuro</option>
            <option value="sistema">Sistema</option>
          </select>
        </div>
        <div>
          <label className={label}>Densidade</label>
          <select
            className={cls}
            value={dados.densidade}
            onChange={(e) =>
              onChange({ ...dados, densidade: e.target.value as ConfiguracaoSistema['densidade'] })
            }
          >
            <option value="compacta">Compacta</option>
            <option value="padrao">Padrão</option>
            <option value="confortavel">Confortável</option>
          </select>
        </div>
        <label className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-300">
          Backup automático
          <input
            type="checkbox"
            checked={dados.backupAutomatico}
            onChange={(e) => onChange({ ...dados, backupAutomatico: e.target.checked })}
            className="h-4 w-4 accent-blue-600"
          />
        </label>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Versão do sistema: {dados.versaoSistema}
        </p>
      </div>
    </div>
  );
}
