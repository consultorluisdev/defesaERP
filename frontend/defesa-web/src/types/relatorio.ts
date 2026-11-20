export type RelatorioTipo =
  | 'Ocorrencias'
  | 'Alertas'
  | 'Equipes'
  | 'Abrigos'
  | 'Viaturas'
  | 'Riscos';
export type RelatorioStatus = 'Gerado' | 'Processando' | 'Falhou';
export type RelatorioFormato = 'PDF' | 'CSV' | 'XLSX';

export interface Relatorio {
  id: string;
  titulo: string;
  tipo: RelatorioTipo;
  periodoInicio: string;
  periodoFim: string;
  status: RelatorioStatus;
  formato: RelatorioFormato;
  criadoPor: string;
  criadoEm: string;
  tamanho: string;
}

export type RelatorioFormData = Omit<Relatorio, 'id' | 'status' | 'criadoEm' | 'tamanho'>;
