import type { Abrigo, AbrigoFormData } from '../types/abrigo';

const delay = (ms = 200) => new Promise<void>((r) => setTimeout(r, ms));

let abrigos: Abrigo[] = [
  {
    id: '1',
    nome: 'Abrigo Central',
    endereco: 'Rua das Flores, 100',
    bairro: 'Centro',
    cidade: 'São Paulo',
    capacidade: 150,
    ocupacao: 120,
    status: 'Disponivel',
    responsavel: 'Maria Silva',
    telefone: '(11) 99999-1111',
    observacoes: 'Estrutura completa com cozinha.',
  },
  {
    id: '2',
    nome: 'Abrigo Vila Nova',
    endereco: 'Av. Brasil, 450',
    bairro: 'Vila Nova',
    cidade: 'São Paulo',
    capacidade: 80,
    ocupacao: 80,
    status: 'Lotado',
    responsavel: 'João Santos',
    telefone: '(11) 99999-2222',
    observacoes: 'Prioridade para famílias.',
  },
  {
    id: '3',
    nome: 'Escola Municipal Esperança',
    endereco: 'Rua da Paz, 22',
    bairro: 'Jardim América',
    cidade: 'Campinas',
    capacidade: 200,
    ocupacao: 45,
    status: 'Disponivel',
    responsavel: 'Ana Costa',
    telefone: '(19) 99999-3333',
    observacoes: 'Acessibilidade completa.',
  },
  {
    id: '4',
    nome: 'Ginásio Municipal',
    endereco: 'Av. Esportes, 900',
    bairro: 'Centro',
    cidade: 'Santos',
    capacidade: 300,
    ocupacao: 300,
    status: 'Lotado',
    responsavel: 'Carlos Lima',
    telefone: '(13) 99999-4444',
    observacoes: 'Superlotação controlada.',
  },
  {
    id: '5',
    nome: 'Abrigo São José',
    endereco: 'Rua da Igreja, 15',
    bairro: 'São José',
    cidade: 'Guarulhos',
    capacidade: 60,
    ocupacao: 0,
    status: 'EmManutencao',
    responsavel: 'Pedro Alves',
    telefone: '(11) 99999-5555',
    observacoes: 'Reforma no telhado.',
  },
  {
    id: '6',
    nome: 'Centro Comunitário Norte',
    endereco: 'Rua Norte, 700',
    bairro: 'Zona Norte',
    cidade: 'São Paulo',
    capacidade: 120,
    ocupacao: 30,
    status: 'Disponivel',
    responsavel: 'Juliana Rocha',
    telefone: '(11) 99999-6666',
    observacoes: '',
  },
  {
    id: '7',
    nome: 'Abrigo Provisório Sul',
    endereco: 'Av. Sul, 1200',
    bairro: 'Zona Sul',
    cidade: 'Osasco',
    capacidade: 100,
    ocupacao: 0,
    status: 'Fechado',
    responsavel: 'Roberto Dias',
    telefone: '(11) 99999-7777',
    observacoes: 'Aguardando vistoria.',
  },
];

export const abrigoService = {
  async listar(): Promise<Abrigo[]> {
    await delay();
    return [...abrigos];
  },
  async obterPorId(id: string): Promise<Abrigo | null> {
    await delay();
    return abrigos.find((a) => a.id === id) ?? null;
  },
  async criar(dados: AbrigoFormData): Promise<Abrigo> {
    await delay();
    const novo: Abrigo = { ...dados, id: String(Date.now()) };
    abrigos = [novo, ...abrigos];
    return novo;
  },
  async atualizar(id: string, dados: Partial<Abrigo>): Promise<Abrigo> {
    await delay();
    abrigos = abrigos.map((a) => (a.id === id ? { ...a, ...dados } : a));
    const encontrado = abrigos.find((a) => a.id === id);
    if (!encontrado) throw new Error('Abrigo não encontrado');
    return encontrado;
  },
  async remover(id: string): Promise<void> {
    await delay();
    abrigos = abrigos.filter((a) => a.id !== id);
  },
};
