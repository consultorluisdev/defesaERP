import { Info, MapPin, Phone, User, X } from 'lucide-react';
import type { Abrigo } from '../../types/abrigo';

interface Props {
  abrigo: Abrigo;
  onClose: () => void;
}

export function AbrigoDetails({ abrigo, onClose }: Props) {
  const pct = Math.min(100, Math.round((abrigo.ocupacao / abrigo.capacidade) * 100));
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl dark:bg-gray-900">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{abrigo.nome}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
        <div className="mt-4 space-y-3 text-sm text-gray-700 dark:text-gray-300">
          <p className="flex items-center gap-2">
            <MapPin size={16} /> {abrigo.endereco}, {abrigo.bairro} â€” {abrigo.cidade}
          </p>
          <p className="flex items-center gap-2">
            <User size={16} /> Responsável: {abrigo.responsavel}
          </p>
          <p className="flex items-center gap-2">
            <Phone size={16} /> {abrigo.telefone}
          </p>
          <div>
            <p className="mb-1 font-medium">Ocupação</p>
            <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800">
              <div className="h-2 rounded-full bg-blue-500" style={{ width: `${pct}%` }} />
            </div>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {abrigo.ocupacao} de {abrigo.capacidade} vagas ({pct}%)
            </p>
          </div>
          {abrigo.observacoes && (
            <p className="flex items-start gap-2">
              <Info size={16} className="mt-0.5" /> {abrigo.observacoes}
            </p>
          )}
        </div>
        <button
          onClick={onClose}
          className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          Fechar
        </button>
      </div>
    </div>
  );
}
