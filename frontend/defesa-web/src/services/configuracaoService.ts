import type { Configuracoes } from '../types/configuracao';

const delay = (ms = 300) => new Promise<void>((r) => setTimeout(r, ms));

let config: Configuracoes = {
  geral: {
    nomeInstituicao: 'Defesa Civil Municipal',
    cidade: 'São Paulo',
    fusoHorario: 'America/Sao_Paulo',
    idioma: 'pt-BR',
  },
  notificacoes: {
    email: true,
    push: true,
    sms: false,
    alertasCriticos: true,
    alertasOperacionais: true,
    resumoSemanal: false,
  },
  seguranca: { doisFatores: false, tempoSessaoMin: 60, politicaSenha: 'Forte' },
  sistema: { tema: 'sistema', densidade: 'padrao', backupAutomatico: true, versaoSistema: '1.4.2' },
};

export const configuracaoService = {
  async obterConfiguracoes(): Promise<Configuracoes> {
    await delay();
    return structuredClone(config);
  },
  async salvarConfiguracoes(dados: Configuracoes): Promise<Configuracoes> {
    await delay();
    config = structuredClone(dados);
    return structuredClone(config);
  },
};
