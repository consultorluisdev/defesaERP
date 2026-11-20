import type { Viatura, ViaturaFormData } from '../types/viatura';

const delay = (ms = 200) => new Promise<void>((r) => setTimeout(r, ms));

let viaturas: Viatura[] = [
  {
    id: '1',
    prefixo: 'VC-001',
    modelo: 'Sprinter',
    marca: 'Mercedes',
    placa: 'ABC-1D23',
    tipo: 'Ambulancia',
    status: 'EmOperacao',
    kmAtual: 45230,
    proximaManutencao: '2026-12-15',
    responsavel: 'Carlos Silva',
    base: 'Base Central',
  },
  {
    id: '2',
    prefixo: 'VC-002',
    modelo: 'Hilux',
    marca: 'Toyota',
    placa: 'DEF-4G56',
    tipo: 'Pickup',
    status: 'Disponivel',
    kmAtual: 32100,
    proximaManutencao: '2026-11-25',
    responsavel: 'Ana Souza',
    base: 'Base Norte',
  },
  {
    id: '3',
    prefixo: 'VC-003',
    modelo: 'Daily',
    marca: 'Iveco',
    placa: 'GHI-7J89',
    tipo: 'Caminhao',
    status: 'EmManutencao',
    kmAtual: 89000,
    proximaManutencao: '2026-10-10',
    responsavel: 'Pedro Lima',
    base: 'Base Sul',
  },
  {
    id: '4',
    prefixo: 'VC-004',
    modelo: 'Master',
    marca: 'Renault',
    placa: 'JKL-0M12',
    tipo: 'Van',
    status: 'Disponivel',
    kmAtual: 15600,
    proximaManutencao: '2027-01-05',
    responsavel: 'Julia Dias',
    base: 'Base Central',
  },
  {
    id: '5',
    prefixo: 'VC-005',
    modelo: 'CG 160',
    marca: 'Honda',
    placa: 'MNO-3P45',
    tipo: 'Motocicleta',
    status: 'EmOperacao',
    kmAtual: 8200,
    proximaManutencao: '2026-12-30',
    responsavel: 'Rafael Melo',
    base: 'Base Leste',
  },
  {
    id: '6',
    prefixo: 'VC-006',
    modelo: 'Sprinter',
    marca: 'Mercedes',
    placa: 'PQR-6S78',
    tipo: 'Ambulancia',
    status: 'Disponivel',
    kmAtual: 21000,
    proximaManutencao: '2027-02-14',
    responsavel: 'Marina Alves',
    base: 'Base Oeste',
  },
  {
    id: '7',
    prefixo: 'VC-007',
    modelo: 'Ranger',
    marca: 'Ford',
    placa: 'STU-9V01',
    tipo: 'Pickup',
    status: 'Inativa',
    kmAtual: 120000,
    proximaManutencao: '2026-09-20',
    responsavel: 'Fábio Costa',
    base: 'Base Sul',
  },
  {
    id: '8',
    prefixo: 'VC-008',
    modelo: 'Daily',
    marca: 'Iveco',
    placa: 'VWX-2Y34',
    tipo: 'Caminhao',
    status: 'Disponivel',
    kmAtual: 54000,
    proximaManutencao: '2026-12-08',
    responsavel: 'Tatiane Rocha',
    base: 'Base Norte',
  },
];

export const viaturaService = {
  async listar(): Promise<Viatura[]> {
    await delay();
    return [...viaturas];
  },
  async obterPorId(id: string): Promise<Viatura | null> {
    await delay();
    return viaturas.find((v) => v.id === id) ?? null;
  },
  async criar(dados: ViaturaFormData): Promise<Viatura> {
    await delay();
    const novo: Viatura = { ...dados, id: String(Date.now()) };
    viaturas = [novo, ...viaturas];
    return novo;
  },
  async atualizar(id: string, dados: Partial<Viatura>): Promise<Viatura> {
    await delay();
    viaturas = viaturas.map((v) => (v.id === id ? { ...v, ...dados } : v));
    const e = viaturas.find((v) => v.id === id);
    if (!e) throw new Error('Viatura não encontrada');
    return e;
  },
  async remover(id: string): Promise<void> {
    await delay();
    viaturas = viaturas.filter((v) => v.id !== id);
  },
};
