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
            <div className="bg-[#111a2c] border border-[#1e293b] rounded-xl w-full max-w-lg p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h2 className="text-base font-bold text-gray-100">{o.numeroProtocolo}</h2>
                        <p className="text-xs text-gray-500">{o.endereco} - {o.bairro}, {o.cidade}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-200 flex-shrink-0 ml-4"
                    >
                        <X size={18} />
                    </button>
                </div>

                <p className="text-sm text-gray-300 mb-4">{o.descricao}</p>

                <div className="grid grid-cols-2 gap-3 text-xs text-gray-400 mb-5">
                    <div>Tipo: <span className="text-gray-200">{o.tipoOcorrencia}</span></div>
                    <div>Prioridade: <span className="text-gray-200">{o.prioridade}</span></div>
                    <div>Solicitante: <span className="text-gray-200">{o.nomeSolicitante ?? "Não informado"}</span></div>
                    <div>Responsável: <span className="text-gray-200">{o.responsavel ?? "Não atribuído"}</span></div>
                    <div>Status: <span className="text-gray-200">{o.status}</span></div>
                    <div>Data: <span className="text-gray-200">{new Date(o.dataHora).toLocaleString("pt-BR")}</span></div>
                </div>

                {o.observacoes && (
                    <div className="text-xs text-gray-400 mb-4">
                        <span className="font-medium">Observações:</span> {o.observacoes}
                    </div>
                )}

                {NEXT_STATUS[o.status].length > 0 && (
                    <div className="flex gap-2">
                        {NEXT_STATUS[o.status].map((s) => (
                            <button
                                key={s}
                                onClick={() => onChangeStatus(o.id, s)}
                                className="flex-1 bg-[#0b1220] border border-[#1e293b] hover:border-amber-500 rounded-lg py-2 text-xs font-semibold text-gray-200"
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
