import type { Perfil, PerfilFormData } from '../types/perfil';

const delay = (ms = 200) => new Promise<void>((r) => setTimeout(r, ms));

let perfis: Perfil[] = [
  {
    id: '1',
    nome: 'Administrador',
    descricao: 'Acesso total ao sistema.',
    nivel: 'Administrador',
    permissoes: [
      'ocorrencias.criar',
      'ocorrencias.editar',
      'ocorrencias.excluir',
      'usuarios.gerenciar',
      'relatorios.gerar',
      'configuracoes.editar',
    ],
    usuarios: 2,
    ativo: true,
  },
  {
    id: '2',
    nome: 'Gestor',
    descricao: 'Gerencia operações e equipes.',
    nivel: 'Gestor',
    permissoes: [
      'ocorrencias.criar',
      'ocorrencias.editar',
      'equipes.gerenciar',
      'relatorios.gerar',
    ],
    usuarios: 5,
    ativo: true,
  },
  {
    id: '3',
    nome: 'Operador',
    descricao: 'Registra ocorrências em campo.',
    nivel: 'Operador',
    permissoes: ['ocorrencias.criar', 'ocorrencias.editar'],
    usuarios: 18,
    ativo: true,
  },
  {
    id: '4',
    nome: 'Visualizador',
    descricao: 'Somente leitura.',
    nivel: 'Visualizador',
    permissoes: ['ocorrencias.visualizar', 'relatorios.visualizar'],
    usuarios: 30,
    ativo: true,
  },
  {
    id: '5',
    nome: 'Auditor',
    descricao: 'Perfil antigo desativado.',
    nivel: 'Visualizador',
    permissoes: ['relatorios.visualizar'],
    usuarios: 3,
    ativo: false,
  },
];

export const perfilService = {
  async listar(): Promise<Perfil[]> {
    await delay();
    return [...perfis];
  },
  async obterPorId(id: string): Promise<Perfil | null> {
    await delay();
    return perfis.find((p) => p.id === id) ?? null;
  },
  async criar(dados: PerfilFormData): Promise<Perfil> {
    await delay();
    const novo: Perfil = { ...dados, id: String(Date.now()) };
    perfis = [novo, ...perfis];
    return novo;
  },
  async atualizar(id: string, dados: Partial<Perfil>): Promise<Perfil> {
    await delay();
    perfis = perfis.map((p) => (p.id === id ? { ...p, ...dados } : p));
    const e = perfis.find((p) => p.id === id);
    if (!e) throw new Error('Perfil não encontrado');
    return e;
  },
  async remover(id: string): Promise<void> {
    await delay();
    perfis = perfis.filter((p) => p.id !== id);
  },
};
