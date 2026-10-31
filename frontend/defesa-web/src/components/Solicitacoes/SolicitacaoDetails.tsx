import React from "react";
import { X } from "lucide-react";
import { Solicitacao } from "@/types/solicitacao";

interface SolicitacaoDetailsProps {
    solicitacao: Solicitacao;
    onClose: () => void;
}

export const SolicitacaoDetails: React.FC<SolicitacaoDetailsProps> = ({
    solicitacao,
    onClose,
}) => {
    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString("pt-BR");
    };

    const getPriorityClass = (prioridade: string) => {
        switch (prioridade) {
            case "Urgente":
                return "bg-red-900/40 text-red-300 border-red-800";
            case "Alta":
                return "bg-orange-900/40 text-orange-300 border-orange-800";
            case "Media":
                return "bg-yellow-900/40 text-yellow-300 border-yellow-800";
            case "Baixa":
                return "bg-green-900/40 text-green-300 border-green-800";
            default:
                return "bg-gray-800 text-gray-300 border-gray-700";
        }
    };

    const getStatusClass = (status: string) => {
        switch (status) {
            case "Aberta":
                return "bg-blue-900/40 text-blue-300 border-blue-800";
            case "EmAnalise":
                return "bg-yellow-900/40 text-yellow-300 border-yellow-800";
            case "EmAtendimento":
                return "bg-purple-900/40 text-purple-300 border-purple-800";
            case "Concluida":
                return "bg-green-900/40 text-green-300 border-green-800";
            case "Cancelada":
                return "bg-red-900/40 text-red-300 border-red-800";
            default:
                return "bg-gray-800 text-gray-300 border-gray-700";
        }
    };

    const formatLabel = (value: string) => {
        return value
            .replace(/([a-z])([A-Z])/g, "$1 $2")
            .replace(/_/g, " ");
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
            <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl border border-gray-700 bg-gray-900 shadow-2xl">
                <div className="flex items-center justify-between border-b border-gray-700 px-6 py-4">
                    <div>
                        <h2 className="text-xl font-semibold text-white">
                            Detalhes da Solicitação
                        </h2>

                        <p className="mt-1 text-sm text-gray-400">
                            Protocolo: {solicitacao.protocolo}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-800 hover:text-white"
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
                        <h3 className="mb-3 text-sm font-medium uppercase tracking-wide text-gray-400">
                            Solicitação
                        </h3>

                        <div className="rounded-lg border border-gray-700 bg-gray-800/60 p-4">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <span className="text-xs text-gray-500">Tipo</span>
                                    <p className="mt-1 text-sm text-white">
                                        {formatLabel(solicitacao.tipo)}
                                    </p>
                                </div>

                                <div>
                                    <span className="text-xs text-gray-500">Protocolo</span>
                                    <p className="mt-1 text-sm font-medium text-white">
                                        {solicitacao.protocolo}
                                    </p>
                                </div>

                                <div className="md:col-span-2">
                                    <span className="text-xs text-gray-500">Descrição</span>
                                    <p className="mt-1 whitespace-pre-wrap text-sm text-gray-200">
                                        {solicitacao.descricao}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h3 className="mb-3 text-sm font-medium uppercase tracking-wide text-gray-400">
                            Solicitante
                        </h3>

                        <div className="rounded-lg border border-gray-700 bg-gray-800/60 p-4">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <span className="text-xs text-gray-500">Nome</span>
                                    <p className="mt-1 text-sm text-white">
                                        {solicitacao.solicitante}
                                    </p>
                                </div>

                                <div>
                                    <span className="text-xs text-gray-500">Telefone</span>
                                    <p className="mt-1 text-sm text-white">
                                        {solicitacao.telefone}
                                    </p>
                                </div>

                                {solicitacao.email && (
                                    <div className="md:col-span-2">
                                        <span className="text-xs text-gray-500">E-mail</span>
                                        <p className="mt-1 break-all text-sm text-white">
                                            {solicitacao.email}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>

                    <section>
                        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-400">
                            Localização
                        </h3>

                        <div className="rounded-lg border border-gray-700 bg-gray-800/60 p-4">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="md:col-span-2">
                                    <span className="text-xs text-gray-500">Endereço</span>
                                    <p className="mt-1 text-sm text-white">
                                        {solicitacao.endereco}
                                    </p>
                                </div>

                                {solicitacao.bairro && (
                                    <div>
                                        <span className="text-xs text-gray-500">Bairro</span>
                                        <p className="mt-1 text-sm text-white">
                                            {solicitacao.bairro}
                                        </p>
                                    </div>
                                )}

                                <div>
                                    <span className="text-xs text-gray-500">Município</span>
                                    <p className="mt-1 text-sm text-white">
                                        {solicitacao.municipio}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {solicitacao.responsavel && (
                        <section>
                            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-400">
                                Atendimento
                            </h3>

                            <div className="rounded-lg border border-gray-700 bg-gray-800/60 p-4">
                                <span className="text-xs text-gray-500">Responsável</span>
                                <p className="mt-1 text-sm text-white">
                                    {solicitacao.responsavel}
                                </p>
                            </div>
                        </section>
                    )}

                    {solicitacao.observacoes && (
                        <section>
                            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-400">
                                Observações
                            </h3>

                            <div className="rounded-lg border border-gray-700 bg-gray-800/60 p-4">
                                <p className="whitespace-pre-wrap text-sm text-gray-200">
                                    {solicitacao.observacoes}
                                </p>
                            </div>
                        </section>
                    )}

                    <section>
                        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-400">
                            Registro
                        </h3>

                        <div className="rounded-lg border border-gray-700 bg-gray-800/60 p-4">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <span className="text-xs text-gray-500">Criada em</span>
                                    <p className="mt-1 text-sm text-white">
                                        {formatDate(solicitacao.createdAt)}
                                    </p>
                                </div>

                                {solicitacao.updatedAt && (
                                    <div>
                                        <span className="text-xs text-gray-500">
                                            Última atualização
                                        </span>
                                        <p className="mt-1 text-sm text-white">
                                            {formatDate(solicitacao.updatedAt)}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                </div>

                <div className="flex justify-end border-t border-gray-700 px-6 py-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg border border-gray-700 bg-gray-800 px-5 py-2 text-sm font-medium text-gray-300 transition hover:bg-gray-700 hover:text-white"
                    >
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    );
};
