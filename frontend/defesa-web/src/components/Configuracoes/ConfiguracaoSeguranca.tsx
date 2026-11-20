import type { ConfiguracaoSeguranca } from '../../types/configuracao';

interface Props {
  dados: ConfiguracaoSeguranca;
  onChange: (d: ConfiguracaoSeguranca) => void;
}

export function ConfiguracaoSegurancaSection({ dados, onChange }: Props) {
  const cls =
    'w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100';
  const label = 'text-xs font-medium text-gray-600 dark:text-gray-400';
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
      <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">Segurança</h3>
      <div className="space-y-3">
        <label className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-300">
          Autenticação em dois fatores
          <input
            type="checkbox"
            checked={dados.doisFatores}
            onChange={(e) => onChange({ ...dados, doisFatores: e.target.checked })}
            className="h-4 w-4 accent-blue-600"
          />
        </label>
        <div>
          <label className={label}>Expiração de sessão (min)</label>
          <input
            type="number"
            className={cls}
            value={dados.tempoSessaoMin}
            onChange={(e) => onChange({ ...dados, tempoSessaoMin: Number(e.target.value) })}
          />
        </div>
        <div>
          <label className={label}>Política de senha</label>
          <select
            className={cls}
            value={dados.politicaSenha}
            onChange={(e) =>
              onChange({
                ...dados,
                politicaSenha: e.target.value as ConfiguracaoSeguranca['politicaSenha'],
              })
            }
          >
            <option value="Fraca">Fraca</option>
            <option value="Media">Média</option>
            <option value="Forte">Forte</option>
          </select>
        </div>
      </div>
    </div>
  );
}
