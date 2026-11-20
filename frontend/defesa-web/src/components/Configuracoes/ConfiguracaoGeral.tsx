import type { ConfiguracaoGeral } from '../../types/configuracao';

interface Props {
  dados: ConfiguracaoGeral;
  onChange: (d: ConfiguracaoGeral) => void;
}

export function ConfiguracaoGeralSection({ dados, onChange }: Props) {
  const set = <K extends keyof ConfiguracaoGeral>(k: K, v: ConfiguracaoGeral[K]) =>
    onChange({ ...dados, [k]: v });
  const cls =
    'w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100';
  const label = 'text-xs font-medium text-gray-600 dark:text-gray-400';

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
      <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">Geral</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={label}>Nome da Instituição</label>
          <input
            className={cls}
            value={dados.nomeInstituicao}
            onChange={(e) => set('nomeInstituicao', e.target.value)}
          />
        </div>
        <div>
          <label className={label}>Cidade</label>
          <input
            className={cls}
            value={dados.cidade}
            onChange={(e) => set('cidade', e.target.value)}
          />
        </div>
        <div>
          <label className={label}>Fuso Horário</label>
          <input
            className={cls}
            value={dados.fusoHorario}
            onChange={(e) => set('fusoHorario', e.target.value)}
          />
        </div>
        <div>
          <label className={label}>Idioma</label>
          <input
            className={cls}
            value={dados.idioma}
            onChange={(e) => set('idioma', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
