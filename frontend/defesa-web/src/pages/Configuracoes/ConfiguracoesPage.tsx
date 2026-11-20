import { Save } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ConfiguracaoGeralSection } from '../../components/Configuracoes/ConfiguracaoGeral';
import { ConfiguracaoNotificacoesSection } from '../../components/Configuracoes/ConfiguracaoNotificacoes';
import { ConfiguracaoSegurancaSection } from '../../components/Configuracoes/ConfiguracaoSeguranca';
import { ConfiguracaoSistemaSection } from '../../components/Configuracoes/ConfiguracaoSistema';
import { configuracaoService } from '../../services/configuracaoService';
import type { Configuracoes } from '../../types/configuracao';

export function ConfiguracoesPage() {
  const [config, setConfig] = useState<Configuracoes | null>(null);
  const [salvando, setSalvando] = useState(false);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    void configuracaoService.obterConfiguracoes().then(setConfig);
  }, []);

  const salvar = async () => {
    if (!config) return;
    setSalvando(true);
    await configuracaoService.salvarConfiguracoes(config);
    setSalvando(false);
    setFeedback('Configurações salvas com sucesso!');
    setTimeout(() => setFeedback(''), 3000);
  };

  if (!config) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-10 text-center text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400">
        Carregando configurações...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Configurações</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Ajustes gerais do sistema.</p>
        </div>
        <button
          onClick={salvar}
          disabled={salvando}
          className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          <Save size={16} /> {salvando ? 'Salvando...' : 'Salvar alterações'}
        </button>
      </div>

      {feedback && (
        <div className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700 dark:bg-green-900/30 dark:text-green-300">
          {feedback}
        </div>
      )}

      <ConfiguracaoGeralSection
        dados={config.geral}
        onChange={(geral) => setConfig({ ...config, geral })}
      />
      <ConfiguracaoNotificacoesSection
        dados={config.notificacoes}
        onChange={(notificacoes) => setConfig({ ...config, notificacoes })}
      />
      <ConfiguracaoSegurancaSection
        dados={config.seguranca}
        onChange={(seguranca) => setConfig({ ...config, seguranca })}
      />
      <ConfiguracaoSistemaSection
        dados={config.sistema}
        onChange={(sistema) => setConfig({ ...config, sistema })}
      />
    </div>
  );
}
