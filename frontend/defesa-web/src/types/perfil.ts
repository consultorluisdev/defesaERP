export type PerfilNivel = 'Administrador' | 'Gestor' | 'Operador' | 'Visualizador';

export interface Perfil {
  id: string;
  nome: string;
  descricao: string;
  nivel: PerfilNivel;
  permissoes: string[];
  usuarios: number;
  ativo: boolean;
}

export type PerfilFormData = Omit<Perfil, 'id'>;
