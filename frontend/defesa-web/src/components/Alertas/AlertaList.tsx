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
        className="bg-white border border-gray-200 rounded-xl p-8 text-center text-gray-500 text-sm dark:bg-[#111a2c] dark:border-[#1e293b] dark:text-gray-400"
      >
        Carregando alertas...
      </div>
    );
  }

  if (erro) {
    return (
      <div
        className="bg-red-50 border border-red-200 rounded-xl p-8 text-center text-red-700 text-sm dark:bg-[#111a2c] dark:border-[#1e293b] dark:text-red-400"
      >
        {erro}
      </div>
    );
  }

  if (alertas.length === 0) {
    return (
      <div
        className="bg-white border border-gray-200 rounded-xl p-8 text-center text-gray-500 text-sm dark:bg-[#111a2c] dark:border-[#1e293b] dark:text-gray-400"
      >
        Nenhum alerta encontrado para esse filtro.
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden dark:bg-[#111a2c] dark:border-[#1e293b]">
      {alertas.map((a) => (
        <AlertaCard key={a.id} alerta={a} onClick={onSelect} />
      ))}
    </div>
  );
}
