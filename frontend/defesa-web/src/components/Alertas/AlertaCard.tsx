import { Alerta } from "../../types/alerta";
import { MapPin, Calendar, User } from "lucide-react";

const NIVEL_STYLE: Record<string, string> = {
  Critico: "bg-red-950 text-red-400 border border-red-900",
  Alto: "bg-red-950 text-orange-400 border border-orange-900",
  Moderado: "bg-yellow-950 text-red-400 border border-yellow-900",
  Baixo: "bg-green-950 text-red-400 border border-green-900",
};

const STATUS_STYLE: Record<string, string> = {
  Ativo: "bg-sky-950 text-sky-400",
  Monitorando: "bg-orange-950 text-orange-400",
  Encerrado: "bg-green-950 text-green-400",
  Cancelado: "bg-gray-800 text-gray-400",
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
      className="flex justify-between items-center gap-4 px-5 py-4 border-b border-[#1e293b] last:border-0 hover:bg-[#0f1729] cursor-pointer"
    >
      <div className="flex-1 min-w-0">
        <span className="flex items-center gap-2 mb-1.5">{a.titulo}</span>
        <span className="text-xs bg-[#1a2332] text-gray-400 px-2.5 py-0.5 rounded-full whitespace-nowrap">
          {TIPO_LABEL[a.tipo]}
        </span>
      </div>
      <div className="flex gap-4 text-xs text-gray-500 flex-wrap">
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
