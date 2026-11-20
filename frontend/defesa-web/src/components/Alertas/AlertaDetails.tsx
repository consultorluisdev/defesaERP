import React from "react";
import { Alerta } from "../../types/alerta";

interface AlertaDetailsProps {
  alerta: Alerta;
  onClose: () => void;
  onEdit: () => void;
  onDelete: (id: number) => void;
}

const getNivelColor = (nivel: string) => {
  switch (nivel) {
    case "Baixo":
      return "bg-green-100 text-green-800";
    case "Moderado":
      return "bg-yellow-100 text-yellow-800";
    case "Alto":
      return "bg-orange-100 text-orange-800";
    case "Critico":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Ativo":
      return "bg-red-100 text-red-800";
    case "Monitorando":
      return "bg-blue-100 text-blue-800";
    case "Encerrado":
    case "Cancelado":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export const AlertaDetails: React.FC<AlertaDetailsProps> = ({
  alerta,
  onClose,
  onEdit,
  onDelete,
}) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Detalhes do alerta"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-lg border border-gray-200 max-w-2xl w-full max-h-[calc(100dvh-24px)] overflow-y-auto dark:bg-gray-900 dark:border-gray-700">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{alerta.titulo}</h3>
              <p className="text-gray-400 text-sm">{alerta.tipo}</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getNivelColor(alerta.nivel)}`}
              >
                {alerta.nivel}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(alerta.status)}`}
              >
                {alerta.status}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-1">Descrição</h4>
              <p className="text-gray-900 dark:text-white">{alerta.descricao}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-1">Cidade</h4>
                <p className="text-gray-900 dark:text-white">{alerta.cidade}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-1">Responsável</h4>
                <p className="text-gray-900 dark:text-white">{alerta.responsavel || "Não atribuído"}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-1">Data Início</h4>
                <p className="text-gray-900 dark:text-white">{formatDate(alerta.dataInicio)}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-1">Data Fim</h4>
                <p className="text-gray-900 dark:text-white">
                  {alerta.dataFim ? formatDate(alerta.dataFim) : "Em andamento"}
                </p>
              </div>
            </div>

            {alerta.latitude != null && alerta.longitude != null && (
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-1">Coordenadas</h4>
                <p className="text-gray-900 dark:text-white">
                  {alerta.latitude}, {alerta.longitude}
                </p>
              </div>
            )}

            {alerta.observacoes && (
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-1">Observações</h4>
                <p className="text-gray-900 dark:text-white">{alerta.observacoes}</p>
              </div>
            )}
          </div>

          <div className="text-xs text-gray-500 pt-4 border-t border-gray-200 dark:border-gray-700 mt-4">
            <p>Criado em: {formatDate(alerta.createdAt)}</p>
            {alerta.updatedAt && <p>Atualizado em: {formatDate(alerta.updatedAt)}</p>}
          </div>
        </div>

        <div className="flex gap-2 px-6 pb-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onEdit}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Editar
          </button>
          <button
            onClick={() => onDelete(alerta.id)}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Excluir
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 bg-white text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
