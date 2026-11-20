import type { Relatorio, RelatorioFormData } from '../types/relatorio';

const delay = (ms = 200) => new Promise<void>((r) => setTimeout(r, ms));

let relatorios: Relatorio[] = [
  {
    id: '1',
    titulo: 'Ocorrências Novembro',
    tipo: 'Ocorrencias',
    periodoInicio: '2026-11-01',
    periodoFim: '2026-11-30',
    status: 'Gerado',
    formato: 'PDF',
    criadoPor: 'Maria Silva',
    criadoEm: '2026-11-30T10:00:00',
    tamanho: '2.4 MB',
  },
  {
    id: '2',
    titulo: 'Alertas Emitidos',
    tipo: 'Alertas',
    periodoInicio: '2026-10-01',
    periodoFim: '2026-10-31',
    status: 'Gerado',
    formato: 'CSV',
    criadoPor: 'João Santos',
    criadoEm: '2026-11-01T09:00:00',
    tamanho: '450 KB',
  },
  {
    id: '3',
    titulo: 'Equipes Mobilizadas',
    tipo: 'Equipes',
    periodoInicio: '2026-11-01',
    periodoFim: '2026-11-15',
    status: 'Processando',
    formato: 'XLSX',
    criadoPor: 'Ana Costa',
    criadoEm: '2026-11-16T08:00:00',
    tamanho: '—',
  },
  {
    id: '4',
    titulo: 'Abrigos Ativos',
    tipo: 'Abrigos',
    periodoInicio: '2026-11-01',
    periodoFim: '2026-11-20',
    status: 'Gerado',
    formato: 'PDF',
    criadoPor: 'Carlos Lima',
    criadoEm: '2026-11-20T14:00:00',
    tamanho: '1.1 MB',
  },
  {
    id: '5',
    titulo: 'Frota de Viaturas',
    tipo: 'Viaturas',
    periodoInicio: '2026-09-01',
    periodoFim: '2026-09-30',
    status: 'Falhou',
    formato: 'CSV',
    criadoPor: 'Pedro Alves',
    criadoEm: '2026-10-01T11:00:00',
    tamanho: '—',
  },
  {
    id: '6',
    titulo: 'Riscos Monitorados',
    tipo: 'Riscos',
    periodoInicio: '2026-11-01',
    periodoFim: '2026-11-18',
    status: 'Gerado',
    formato: 'PDF',
    criadoPor: 'Juliana Rocha',
    criadoEm: '2026-11-18T16:00:00',
    tamanho: '3.2 MB',
  },
  {
    id: '7',
    titulo: 'Ocorrências Outubro',
    tipo: 'Ocorrencias',
    periodoInicio: '2026-10-01',
    periodoFim: '2026-10-31',
    status: 'Gerado',
    formato: 'XLSX',
    criadoPor: 'Roberto Dias',
    criadoEm: '2026-11-01T10:30:00',
    tamanho: '1.8 MB',
  },
  {
    id: '8',
    titulo: 'Alertas Semanal',
    tipo: 'Alertas',
    periodoInicio: '2026-11-11',
    periodoFim: '2026-11-17',
    status: 'Gerado',
    formato: 'CSV',
    criadoPor: 'Marina Alves',
    criadoEm: '2026-11-18T07:00:00',
    tamanho: '120 KB',
  },
];

export const relatorioService = {
  async listar(): Promise<Relatorio[]> {
    await delay();
    return [...relatorios];
  },
  async obterPorId(id: string): Promise<Relatorio | null> {
    await delay();
    return relatorios.find((r) => r.id === id) ?? null;
  },
  async criar(dados: RelatorioFormData): Promise<Relatorio> {
    await delay();
    const novo: Relatorio = {
      ...dados,
      id: String(Date.now()),
      status: 'Processando',
      criadoEm: new Date().toISOString(),
      tamanho: '—',
    };
    relatorios = [novo, ...relatorios];
    setTimeout(() => {
      relatorios = relatorios.map((r) =>
        r.id === novo.id ? { ...r, status: 'Gerado', tamanho: '1.0 MB' } : r,
      );
    }, 3000);
    return novo;
  },
  async atualizar(id: string, dados: Partial<Relatorio>): Promise<Relatorio> {
    await delay();
    relatorios = relatorios.map((r) => (r.id === id ? { ...r, ...dados } : r));
    const e = relatorios.find((r) => r.id === id);
    if (!e) throw new Error('Relatório não encontrado');
    return e;
  },
  async remover(id: string): Promise<void> {
    await delay();
    relatorios = relatorios.filter((r) => r.id !== id);
  },
};
