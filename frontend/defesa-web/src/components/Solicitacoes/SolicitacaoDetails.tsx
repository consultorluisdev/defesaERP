import React from "react";
import { X } from "lucide-react";
import { Solicitacao } from "@/types/solicitacao";

interface SolicitacaoDetailsProps {
    solicitacao: Solicitacao;
    onClose: () => void;
    onEdit: () => void;
    onDelete: () => void;
}

export const SolicitacaoDetails: React.FC<SolicitacaoDetailsProps> = ({
    solicitacao,
    onClose,
    onEdit,
    onDelete,
}) => {
    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString("pt-BR");
    };

    const getPriorityClass = (prioridade: string) => {
        switch (prioridade) {
            case "Urgente":
                return "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800";
            case "Alta":
                return "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800";
            case "Media":
                return "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800";
            case "Baixa":
                return "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800";
            default:
                return "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700";
        }
    };

    const getStatusClass = (status: string) => {
        switch (status) {
            case "Aberta":
                return "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800";
            case "EmAnalise":
                return "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800";
            case "EmAtendimento":
                return "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800";
            case "Concluida":
                return "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800";
            case "Cancelada":
                return "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800";
            default:
                return "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700";
        }
    };

    const formatLabel = (value: string) => {
        return value
            .replace(/([a-z])([A-Z])/g, "$1 $2")
            .replace(/_/g, " ");
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
            <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-900">
                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Detalhes da Solicitação
                        </h2>

                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Protocolo: {solicitacao.protocolo}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                        aria-label="Fechar"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="space-y-6 p-6">
                    <div className="flex flex-wrap gap-2">
                        <span
                            className={`rounded-full border px-3 py-1 text-xs font-medium ${getStatusClass(
                                solicitacao.status
                            )}`}
                        >
                            Status: {formatLabel(solicitacao.status)}
                        </span>

                        <span
                            className={`rounded-full border px-3 py-1 text-xs font-medium ${getPriorityClass(
                                solicitacao.prioridade
                            )}`}
                        >
                            Prioridade: {formatLabel(solicitacao.prioridade)}
                        </span>
                    </div>

                    <section>
                        <h3 className="mb-3 text-sm font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                            Solicitação
                        </h3>

                        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/60">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">Tipo</span>
                                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                        {formatLabel(solicitacao.tipo)}
                                    </p>
                                </div>

                                <div>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">Protocolo</span>
                                    <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                                        {solicitacao.protocolo}
                                    </p>
                                </div>

                                <div className="md:col-span-2">
                                    <span className="text-xs text-gray-500 dark:text-gray-400">Descrição</span>
                                    <p className="mt-1 whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-200">
                                        {solicitacao.descricao}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h3 className="mb-3 text-sm font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                            Solicitante
                        </h3>

                        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/60">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">Nome</span>
                                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                        {solicitacao.solicitante}
                                    </p>
                                </div>

                                <div>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">Telefone</span>
                                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                        {solicitacao.telefone}
                                    </p>
                                </div>

                                {solicitacao.email && (
                                    <div className="md:col-span-2">
                                        <span className="text-xs text-gray-500 dark:text-gray-400">E-mail</span>
                                        <p className="mt-1 break-all text-sm text-gray-900 dark:text-white">
                                            {solicitacao.email}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>

                    <section>
                        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                            Localização
                        </h3>

                        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/60">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="md:col-span-2">
                                    <span className="text-xs text-gray-500 dark:text-gray-400">Endereço</span>
                                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                        {solicitacao.endereco}
                                    </p>
                                </div>

                                {solicitacao.bairro && (
                                    <div>
                                        <span className="text-xs text-gray-500 dark:text-gray-400">Bairro</span>
                                        <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                            {solicitacao.bairro}
                                        </p>
                                    </div>
                                )}

                                <div>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">Município</span>
                                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                        {solicitacao.municipio}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {solicitacao.responsavel && (
                        <section>
                            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                                Atendimento
                            </h3>

                            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/60">
                                <span className="text-xs text-gray-500 dark:text-gray-400">Responsável</span>
                                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                    {solicitacao.responsavel}
                                </p>
                            </div>
                        </section>
                    )}

                    {solicitacao.observacoes && (
                        <section>
                            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                                Observações
                            </h3>

                            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/60">
                                <p className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-200">
                                    {solicitacao.observacoes}
                                </p>
                            </div>
                        </section>
                    )}

                    <section>
                        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                            Registro
                        </h3>

                        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/60">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">Criada em</span>
                                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                        {formatDate(solicitacao.createdAt)}
                                    </p>
                                </div>

                                {solicitacao.updatedAt && (
                                    <div>
                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                                            Última atualização
                                        </span>
                                        <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                            {formatDate(solicitacao.updatedAt)}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                </div>

                <div className="flex flex-wrap justify-end gap-3 border-t border-gray-200 px-6 py-4 dark:border-gray-700">
                    <button
                        type="button"
                        onClick={onDelete}
                        className="rounded-lg border border-red-200 bg-red-50 px-5 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100 dark:border-red-800 dark:bg-red-950/40 dark:text-red-300 dark:hover:bg-red-900/40"
                    >
                        Excluir
                    </button>

                    <button
                        type="button"
                        onClick={onEdit}
                        className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                    >
                        Editar
                    </button>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    );
};
