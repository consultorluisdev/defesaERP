import { FaMapMarkerAlt, FaUsers, FaTimes } from "react-icons/fa";
import type { Risco } from "../../types/risco";

interface RiscoDetailsProps {
    risco: Risco;
    onClose: () => void;
    onEdit: () => void;
    onDelete: () => void;
}

export default function RiscoDetails({ risco, onClose, onEdit, onDelete }: RiscoDetailsProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-6 shadow-xl dark:bg-gray-800">
                <div className="mb-6 flex items-start justify-between">
                    <div>
                        <span className="text-xs font-semibold uppercase text-blue-600 dark:text-blue-400">
                            Detalhes da área de risco
                        </span>
                        <h2 className="mt-1 text-xl font-bold text-gray-900 dark:text-white">
                            {risco.nome}
                        </h2>
                    </div>

                    <button type="button" onClick={onClose} aria-label="Fechar" className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700">
                        <FaTimes />
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Tipo</p>
                        <p className="font-medium text-gray-900 dark:text-white">{risco.tipo}</p>
                    </div>

                    <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Nível</p>
                        <p className="font-medium text-gray-900 dark:text-white">{risco.nivel}</p>
                    </div>

                    <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Status</p>
                        <p className="font-medium text-gray-900 dark:text-white">{risco.status}</p>
                    </div>

                    <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Responsável</p>
                        <p className="font-medium text-gray-900 dark:text-white">{risco.responsavel || "Não informado"}</p>
                    </div>

                    <div className="md:col-span-2">
                        <p className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400"><FaMapMarkerAlt /> Localização</p>
                        <p className="font-medium text-gray-900 dark:text-white">{risco.endereco}, {risco.bairro} — {risco.municipio}</p>
                    </div>

                    <div>
                        <p className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400"><FaUsers /> População potencialmente afetada</p>
                        <p className="font-medium text-gray-900 dark:text-white">{risco.populacaoAfetada}</p>
                    </div>

                    <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Coordenadas</p>
                        <p className="font-medium text-gray-900 dark:text-white">
                            {risco.coordenadas
                                ? `${risco.coordenadas.latitude}, ${risco.coordenadas.longitude}`
                                : "Não informadas"}
                        </p>
                    </div>

                    <div className="md:col-span-2">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Descrição</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{risco.descricao}</p>
                    </div>

                    {risco.observacoes && (
                        <div className="md:col-span-2">
                            <p className="text-xs text-gray-500 dark:text-gray-400">Observações</p>
                            <p className="text-sm text-gray-700 dark:text-gray-300">{risco.observacoes}</p>
                        </div>
                    )}
                </div>

                <div className="mt-6 flex flex-wrap justify-end gap-3">
                    <button
                        type="button"
                        onClick={onDelete}
                        className="rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50 dark:border-red-900/60 dark:text-red-400 dark:hover:bg-red-950/30"
                    >
                        Excluir
                    </button>

                    <button
                        type="button"
                        onClick={onEdit}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                        Editar
                    </button>

                    <button type="button" onClick={onClose} className="rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium text-white dark:bg-gray-700">
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    );
}