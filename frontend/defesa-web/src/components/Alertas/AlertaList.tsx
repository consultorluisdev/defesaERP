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
        className="bg-white border border-gray-200 rounded-xl p-8 text-center text-red-600 text-sm dark:bg-gray-900 dark:border-gray-700 dark:text-red-400"
      >
        Carregando alertas...
      </div>
    );
  }

  if (erro) {
    return (
      <div
        className="bg-white border border-gray-200 rounded-xl p-8 text-center text-red-600 text-sm dark:bg-gray-900 dark:border-gray-700 dark:text-red-400"
      >
        {erro}
      </div>
    );
  }

  if (alertas.length === 0) {
    return (
      <div
        className="bg-white border border-gray-200 rounded-xl p-8 text-center text-gray-500 text-sm dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400"
      >
        Nenhum alerta encontrado para esse filtro.
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden dark:bg-gray-900 dark:border-gray-700">
      {alertas.map((a) => (
        <AlertaCard key={a.id} alerta={a} onClick={onSelect} />
      ))}
    </div>
  );
}
