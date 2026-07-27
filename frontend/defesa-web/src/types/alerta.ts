export type TipoAlerta =
| "ChuvaIntensa"
| "Enchente"
| "Alagamento"
| "Enxurrada"
| "Deslizamento"
| "Vendaval"
| "Microexplosao"
| "Granizo"
| "Incendio"
| "Outros";

export const TiposAlerta: TipoAlerta[] = [
  "ChuvaIntensa",
  "Enchente",
  "Alagamento",
  "Enxurrada",
  "Deslizamento",
  "Vendaval",
  "Microexplosao",
  "Granizo",
  "Incendio",
  "Outros",
];

export type NivelAlerta = 'Baixo' | 'Moderado' | 'Alto' | 'Critico';

export const NiveisAlerta: NivelAlerta[] = ['Baixo', 'Moderado', 'Alto', 'Critico'];

export type StatusAlerta = 'Ativo' | 'Monitorando' | 'Encerrado' | 'Cancelado';

export const StatusAlertaValues: StatusAlerta[] = ['Ativo', 'Monitorando', 'Encerrado', 'Cancelado'];

export interface Alerta {
  id: number;
  titulo: string;
  descricao: string;
  tipo: TipoAlerta;
  nivel: NivelAlerta;
  status: StatusAlerta;
  cidade: string;
  latitude?: number | null;
  longitude?: number | null;
  dataInicio: string;
  dataFim?: string | null;
  responsavel?: string | null;
  observacoes?: string | null;
  createdAt: string;
  updatedAt?: string | null;
}

export interface CreateAlertaDto {
  titulo: string;
  descricao: string;
  tipo: TipoAlerta;
  nivel: NivelAlerta;
  cidade: string;
  latitude?: number;
  longitude?: number;
  dataInicio?: string;
  responsavel?: string;
  observacoes?: string;
}

export interface UpdateAlertaDto {
  titulo: string;
  descricao: string;
  tipo: TipoAlerta;
  nivel: NivelAlerta;
  status?: StatusAlerta;
  cidade: string;
  latitude?: number;
  longitude?: number;
  dataInicio?: string;
  dataFim?: string;
  responsavel?: string;
  observacoes?: string;
}

export interface AlertaFiltros {
  status?: StatusAlerta | "Todos";
  nivel?: NivelAlerta | "Todos";
  tipo?: TipoAlerta | "Todos";
  cidade?: string;
  busca?: string;
}
