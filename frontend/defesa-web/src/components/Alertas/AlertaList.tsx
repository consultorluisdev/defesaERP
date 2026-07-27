import { Alerta } from "../../types/alerta";
import { AlertaCard } from "./AlertaCard";

interface Props {
  alertas: Alerta[];
  loading: boolean;
  erro: string | null;
  onSelect: (a: Alerta) => void;
}

export function AlertaList({ alertas, loading, erro, onSelect }: Props) {
  if (loading) {
    return (
      <div
        className="bg-[#111a2c] border border-[#1e293b] rounded-xl p-8 text-center text-red-400 text-sm"
      >
        Carregando alertas...
      </div>
    );
  }

  if (erro) {
    return (
      <div
        className="bg-[#111a2c] border border-[#1e293b] rounded-xl p-8 text-center text-red-400 text-sm"
      >
        {erro}
      </div>
    );
  }

  if (alertas.length === 0) {
    return (
      <div
        className="bg-[#111a2c] border border-[#1e293b] rounded-xl p-8 text-center text-red-400 text-sm"
      >
        Nenhum alerta encontrado para esse filtro.
      </div>
    );
  }

  return (
    <div className="bg-[#111a2c] border border-[#1e293b] rounded-xl overflow-hidden">
      {alertas.map((a) => (
        <AlertaCard key={a.id} alerta={a} onClick={onSelect} />
      ))}
    </div>
  );
}
