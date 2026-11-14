import { Alerta } from "../../types/alerta";
import { MapPin, Calendar, User } from "lucide-react";

const NIVEL_STYLE: Record<string, string> = {
  Critico: "bg-red-100 text-red-700 border border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-900",
  Alto: "bg-orange-100 text-orange-700 border border-orange-200 dark:bg-orange-950 dark:text-orange-400 dark:border-orange-900",
  Moderado: "bg-yellow-100 text-yellow-700 border border-yellow-200 dark:bg-yellow-950 dark:text-yellow-400 dark:border-yellow-900",
  Baixo: "bg-green-100 text-green-700 border border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-900",
};

const STATUS_STYLE: Record<string, string> = {
  Ativo: "bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-400",
  Monitorando: "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-400",
  Encerrado: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400",
  Cancelado: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
};

const TIPO_LABEL: Record<string, string> = {
  ChuvaIntensa: "Chuva Intensa",
  Enchente: "Enchente",
  Alagamento: "Alagamento",
  Enxurrada: "Enxurrada",
  Deslizamento: "Deslizamento",
  Vendaval: "Vendaval",
  Microexplosao: "Microexplosão",
  Granizo: "Granizo",
  Incendio: "Incêndio",
  Outros: "Outros",
};

const NIVEL_LABEL: Record<string, string> = {
  Critico: "Critico",
  Alto: "Alto",
  Moderado: "Moderado",
  Baixo: "Baixo",
};

const STATUS_LABEL: Record<string, string> = {
  Ativo: "Ativo",
  Monitorando: "Monitorando",
  Encerrado: "Encerrado",
  Cancelado: "Cancelado",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

interface Props {
  alerta: Alerta;
  onClick: (a: Alerta) => void;
}

export function AlertaCard({ alerta: a, onClick }: Props) {
  return (
    <div
      onClick={() => onClick(a)}
      className="flex justify-between items-center gap-4 px-5 py-4 border-b border-gray-200 last:border-0 hover:bg-gray-50 dark:border-[#1e293b] dark:hover:bg-[#0f1729] cursor-pointer"
    >
      <div className="flex-1 min-w-0">
        <span className="flex items-center gap-2 mb-1.5 text-gray-900 dark:text-white">{a.titulo}</span>
        <span className="text-xs bg-gray-100 text-gray-600 dark:bg-[#1a2332] dark:text-gray-400 px-2.5 py-0.5 rounded-full whitespace-nowrap">
          {TIPO_LABEL[a.tipo]}
        </span>
      </div>
      <div className="flex gap-4 text-xs text-gray-500 dark:text-gray-400 flex-wrap">
        <span className="flex items-center gap-1">
          <MapPin size={12} />
          {a.cidade}
          {a.responsavel && (
            <span className="flex items-center gap-1">
              <User size={12} />
              {a.responsavel}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {formatDate(a.dataInicio)}
          </span>
        </span>
        <div className="flex gap-2 items-center flex-shrink-0">
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${NIVEL_STYLE[a.nivel]}`}
          >
            {NIVEL_LABEL[a.nivel]}
          </span>
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${STATUS_STYLE[a.status]}`}
          >
            {STATUS_LABEL[a.status]}
          </span>
        </div>
      </div>
    </div>
  );
}
