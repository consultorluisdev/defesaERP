import { Alerta } from '../../types/alerta';
import { MapPin, Calendar, User } from 'lucide-react';

const NIVEL_STYLE: Record<string, string> = {
  Critico: "bg-red-950 text-red-400 border border-red-900",
  Alto: "bg-red-950 text-orange-400 border border-orange-900",
  Moderado: "bg-yellow-950 text-red-400 border border-yellow-900",
  Baixo: "bg-green-950 text-red-400 border border-green-900",
};

const STATUS_STYLE: Record<string, string> = {
  Ativo: "bg-sky-950 text-sky-400",
  Monitoramento: "bg-orange-950 text-orange-400",
  Encerrado: "bg-green-950 text-green-400",
  Cancelado: "bg-gray-800 text-gray-400",
}

const TIPO_LABEL: Record<string, string> = {
  ChuvaIntensa: "Chuva Intensa",
  Enchente: "Enchente",
  Alagamento: "Alagamento",
  Enxurrada: "Enxurrada",
  Deslizamento: "Deslizamento",
  Vendavel: "Vendaval",
  Granizo: "Granizo",
  Incendio: "Incêndio",
  Outros: "Outros",
};
