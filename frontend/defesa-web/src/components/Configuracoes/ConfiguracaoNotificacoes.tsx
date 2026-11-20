import type { ConfiguracaoNotificacoes } from '../../types/configuracao';

interface Props {
  dados: ConfiguracaoNotificacoes;
  onChange: (d: ConfiguracaoNotificacoes) => void;
}

export function ConfiguracaoNotificacoesSection({ dados, onChange }: Props) {
  const toggles: { key: keyof ConfiguracaoNotificacoes; label: string }[] = [
    { key: 'email', label: 'E-mail' },
    { key: 'push', label: 'Push' },
    { key: 'sms', label: 'SMS' },
    { key: 'alertasCriticos', label: 'Alertas críticos' },
    { key: 'alertasOperacionais', label: 'Alertas operacionais' },
    { key: 'resumoSemanal', label: 'Resumo semanal' },
  ];
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
      <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">Notificações</h3>
      <div className="space-y-2">
        {toggles.map((t) => (
          <label
            key={t.key}
            className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-300"
          >
            {t.label}
            <input
              type="checkbox"
              checked={dados[t.key]}
              onChange={(e) => onChange({ ...dados, [t.key]: e.target.checked })}
              className="h-4 w-4 accent-blue-600"
            />
          </label>
        ))}
      </div>
    </div>
  );
}
