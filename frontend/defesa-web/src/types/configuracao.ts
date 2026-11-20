export interface ConfiguracaoGeral {
  nomeInstituicao: string;
  cidade: string;
  fusoHorario: string;
  idioma: string;
}

export interface ConfiguracaoNotificacoes {
  email: boolean;
  push: boolean;
  sms: boolean;
  alertasCriticos: boolean;
  alertasOperacionais: boolean;
  resumoSemanal: boolean;
}

export interface ConfiguracaoSeguranca {
  doisFatores: boolean;
  tempoSessaoMin: number;
  politicaSenha: 'Fraca' | 'Media' | 'Forte';
}

export interface ConfiguracaoSistema {
  tema: 'claro' | 'escuro' | 'sistema';
  densidade: 'compacta' | 'padrao' | 'confortavel';
  backupAutomatico: boolean;
  versaoSistema: string;
}

export interface Configuracoes {
  geral: ConfiguracaoGeral;
  notificacoes: ConfiguracaoNotificacoes;
  seguranca: ConfiguracaoSeguranca;
  sistema: ConfiguracaoSistema;
}
