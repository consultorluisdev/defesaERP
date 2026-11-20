import type { Risco, RiscoFormData } from '../types/risco';

const delay = (ms = 200) => new Promise<void>((r) => setTimeout(r, ms));

let riscos: Risco[] = [
  {
    id: '1',
    titulo: 'Enchente no Córrego Central',
    tipo: 'Enchente',
    nivel: 'Critico',
    status: 'Ativo',
    cidade: 'São Paulo',
    bairro: 'Centro',
    latitude: -23.55,
    longitude: -46.63,
    dataOcorrencia: '2026-11-15',
    descricao: 'Nível do córrego acima do normal.',
    responsavel: 'Maria Silva',
  },
  {
    id: '2',
    titulo: 'Deslizamento Morro Alto',
    tipo: 'Deslizamento',
    nivel: 'Alto',
    status: 'Monitorando',
    cidade: 'Santos',
    bairro: 'Morro Alto',
    latitude: -23.96,
    longitude: -46.33,
    dataOcorrencia: '2026-11-10',
    descricao: 'Solo encharcado.',
    responsavel: 'Carlos Lima',
  },
  {
    id: '3',
    titulo: 'Incêndio em vegetação',
    tipo: 'Incendio',
    nivel: 'Moderado',
    status: 'Ativo',
    cidade: 'Campinas',
    bairro: 'Zona Rural',
    latitude: -22.9,
    longitude: -47.06,
    dataOcorrencia: '2026-11-17',
    descricao: 'Foco controlado.',
    responsavel: 'Ana Costa',
  },
  {
    id: '4',
    titulo: 'Vendaval na Zona Sul',
    tipo: 'Vendaval',
    nivel: 'Alto',
    status: 'Monitorando',
    cidade: 'São Paulo',
    bairro: 'Zona Sul',
    latitude: -23.65,
    longitude: -46.7,
    dataOcorrencia: '2026-11-14',
    descricao: 'Rajadas de até 80 km/h.',
    responsavel: 'João Santos',
  },
  {
    id: '5',
    titulo: 'Desabamento de muro',
    tipo: 'Desabamento',
    nivel: 'Critico',
    status: 'Ativo',
    cidade: 'Osasco',
    bairro: 'Vila Yara',
    latitude: -23.53,
    longitude: -46.79,
    dataOcorrencia: '2026-11-16',
    descricao: 'Muro de contenção cedeu.',
    responsavel: 'Pedro Alves',
  },
  {
    id: '6',
    titulo: 'Enchente na Vila Nova',
    tipo: 'Enchente',
    nivel: 'Moderado',
    status: 'Resolvido',
    cidade: 'Guarulhos',
    bairro: 'Vila Nova',
    latitude: -23.45,
    longitude: -46.53,
    dataOcorrencia: '2026-11-05',
    descricao: 'Área já drenada.',
    responsavel: 'Juliana Rocha',
  },
  {
    id: '7',
    titulo: 'Risco de deslizamento',
    tipo: 'Deslizamento',
    nivel: 'Baixo',
    status: 'Monitorando',
    cidade: 'Campinas',
    bairro: 'Jardim América',
    latitude: -22.91,
    longitude: -47.07,
    dataOcorrencia: '2026-11-12',
    descricao: 'Encosta estável.',
    responsavel: 'Roberto Dias',
  },
  {
    id: '8',
    titulo: 'Incêndio em residência',
    tipo: 'Incendio',
    nivel: 'Alto',
    status: 'Resolvido',
    cidade: 'Santos',
    bairro: 'Gonzaga',
    latitude: -23.97,
    longitude: -46.32,
    dataOcorrencia: '2026-11-08',
    descricao: 'Combate concluído.',
    responsavel: 'Marina Alves',
  },
];

export const riscoService = {
  async listar(): Promise<Risco[]> {
    await delay();
    return [...riscos];
  },
  async obterPorId(id: string): Promise<Risco | null> {
    await delay();
    return riscos.find((r) => r.id === id) ?? null;
  },
  async criar(dados: RiscoFormData): Promise<Risco> {
    await delay();
    const novo: Risco = { ...dados, id: String(Date.now()) };
    riscos = [novo, ...riscos];
    return novo;
  },
  async atualizar(id: string, dados: Partial<Risco>): Promise<Risco> {
    await delay();
    riscos = riscos.map((r) => (r.id === id ? { ...r, ...dados } : r));
    const e = riscos.find((r) => r.id === id);
    if (!e) throw new Error('Risco não encontrado');
    return e;
  },
  async remover(id: string): Promise<void> {
    await delay();
    riscos = riscos.filter((r) => r.id !== id);
  },
};
