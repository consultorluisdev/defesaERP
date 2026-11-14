import { Ocorrencia, StatusOcorrencia } from "../../types/ocorrencia";
import { X } from "lucide-react";

interface Props {
    ocorrencia: Ocorrencia;
    onClose: () => void;
    onChangeStatus: (id: number, status: StatusOcorrencia) => void;
}

const NEXT_STATUS: Record<StatusOcorrencia, StatusOcorrencia[]> = {
    Aberta: ["Em Andamento", "Concluída"],
    "Em Andamento": ["Concluída", "Cancelada"],
    Concluída: [],
    Cancelada: [],
};

export function OcorrenciaDetails({ ocorrencia: o, onClose, onChangeStatus }: Props) {
    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-white border border-gray-200 dark:bg-[#111a2c] dark:border-[#1e293b] rounded-xl w-full max-w-lg p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h2 className="text-base font-bold text-gray-900 dark:text-white">{o.numeroProtocolo}</h2>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{o.endereco} - {o.bairro}, {o.cidade}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 flex-shrink-0 ml-4"
                    >
                        <X size={18} />
                    </button>
                </div>

                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">{o.descricao}</p>

                <div className="grid grid-cols-2 gap-3 text-xs text-gray-500 dark:text-gray-400 mb-5">
                    <div>Tipo: <span className="text-gray-900 dark:text-white">{o.tipoOcorrencia}</span></div>
                    <div>Prioridade: <span className="text-gray-900 dark:text-white">{o.prioridade}</span></div>
                    <div>Solicitante: <span className="text-gray-900 dark:text-white">{o.nomeSolicitante ?? "Não informado"}</span></div>
                    <div>Responsável: <span className="text-gray-900 dark:text-white">{o.responsavel ?? "Não atribuído"}</span></div>
                    <div>Status: <span className="text-gray-900 dark:text-white">{o.status}</span></div>
                    <div>Data: <span className="text-gray-900 dark:text-white">{new Date(o.dataHora).toLocaleString("pt-BR")}</span></div>
                </div>

                {o.observacoes && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                        <span className="font-medium">Observações:</span> {o.observacoes}
                    </div>
                )}

                {NEXT_STATUS[o.status].length > 0 && (
                    <div className="flex gap-2">
                        {NEXT_STATUS[o.status].map((s) => (
                            <button
                                key={s}
                                onClick={() => onChangeStatus(o.id, s)}
                                className="flex-1 bg-white border border-gray-300 text-gray-900 hover:border-amber-500 dark:bg-[#0b1220] dark:border-[#1e293b] dark:text-gray-200 rounded-lg py-2 text-xs font-semibold"
                            >
                                Marcar como {s}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
