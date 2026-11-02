import React from "react";
import type { Vistoria } from "../../types/vistoria";

interface VistoriaDetailsProps {
    vistoria: Vistoria;
    onClose: () => void;
}

const formatDate = (value?: string | null) => {
    if (!value) return "Não informado";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "Não informado";
    }

    return date.toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

const getStatusClass = (status: string) => {
    switch (status) {
        case "Agendada":
            return "bg-blue-500/20 text-blue-400";
        case "EmAndamento":
            return "bg-yellow-500/20 text-yellow-400";
        case "Concluida":
            return "bg-green-500/20 text-green-400";
        case "Cancelada":
            return "bg-red-500/20 text-red-400";
        default:
            return "bg-gray-500/20 text-gray-400";
    }
};

const getPriorityClass = (prioridade: string) => {
    switch (prioridade) {
        case "Urgente":
            return "bg-red-500/20 text-red-400";
        case "Alta":
            return "bg-orange-500/20 text-orange-400";
        case "Media":
            return "bg-yellow-500/20 text-yellow-400";
        case "Baixa":
            return "bg-green-500/20 text-green-400";
        default:
            return "bg-gray-500/20 text-gray-400";
    }
};

const formatLabel = (value?: string | null) => {
    if (!value) return "Não informado";

    return value
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/^./, (letter) => letter.toUpperCase());
};

interface InfoItemProps {
    label: string;
    value?: React.ReactNode;
}

function InfoItem({ label, value }: InfoItemProps) {
    return (
        <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                {label}
            </p>

            <p className="mt-1 text-sm text-gray-800 dark:text-gray-200">
                {value || "Não informado"}
            </p>
        </div>
    );
}

export function VistoriaDetails({
    vistoria,
    onClose,
}: VistoriaDetailsProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-xl bg-white shadow-2xl dark:bg-gray-900">

                {/* Header */}
                <div className="sticky top-0 z-10 flex items-start justify-between border-b border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
                    <div>
                        <div className="flex flex-wrap items-center gap-3">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                Detalhes da Vistoria
                            </h2>

                            <span
                                className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                                    vistoria.status
                                )}`}
                            >
                                {formatLabel(vistoria.status)}
                            </span>

                            <span
                                className={`rounded-full px-3 py-1 text-xs font-semibold ${getPriorityClass(
                                    vistoria.prioridade
                                )}`}
                            >
                                {formatLabel(vistoria.prioridade)}
                            </span>
                        </div>

                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Protocolo: {vistoria.protocolo}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                        aria-label="Fechar"
                    >
                        ✕
                    </button>
                </div>

                {/* Conteúdo */}
                <div className="space-y-6 p-6">

                    {/* Identificação */}
                    <section>
                        <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">
                            Identificação
                        </h3>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            <InfoItem
                                label="Protocolo"
                                value={vistoria.protocolo}
                            />

                            <InfoItem
                                label="Tipo"
                                value={formatLabel(vistoria.tipo)}
                            />

                            <InfoItem
                                label="Status"
                                value={formatLabel(vistoria.status)}
                            />

                            <InfoItem
                                label="Prioridade"
                                value={formatLabel(vistoria.prioridade)}
                            />

                            <InfoItem
                                label="Responsável"
                                value={vistoria.responsavel}
                            />

                            <InfoItem
                                label="Telefone"
                                value={vistoria.telefone}
                            />
                        </div>
                    </section>

                    {/* Solicitante */}
                    <section className="border-t border-gray-200 pt-6 dark:border-gray-700">
                        <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">
                            Solicitante
                        </h3>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <InfoItem
                                label="Nome"
                                value={vistoria.solicitante}
                            />

                            <InfoItem
                                label="Telefone"
                                value={vistoria.telefone}
                            />
                        </div>
                    </section>

                    {/* Localização */}
                    <section className="border-t border-gray-200 pt-6 dark:border-gray-700">
                        <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">
                            Localização
                        </h3>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            <InfoItem
                                label="Endereço"
                                value={vistoria.endereco}
                            />

                            <InfoItem
                                label="Bairro"
                                value={vistoria.bairro}
                            />

                            <InfoItem
                                label="Município"
                                value={vistoria.municipio}
                            />
                        </div>
                    </section>

                    {/* Descrição */}
                    <section className="border-t border-gray-200 pt-6 dark:border-gray-700">
                        <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
                            Descrição
                        </h3>

                        <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800/60">
                            <p className="whitespace-pre-wrap text-sm leading-6 text-gray-700 dark:text-gray-300">
                                {vistoria.descricao || "Não informado"}
                            </p>
                        </div>
                    </section>

                    {/* Datas */}
                    <section className="border-t border-gray-200 pt-6 dark:border-gray-700">
                        <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">
                            Agendamento e realização
                        </h3>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <InfoItem
                                label="Data de agendamento"
                                value={formatDate(vistoria.dataAgendamento)}
                            />

                            <InfoItem
                                label="Data de realização"
                                value={formatDate(vistoria.dataRealizacao)}
                            />
                        </div>
                    </section>

                    {/* Observações */}
                    <section className="border-t border-gray-200 pt-6 dark:border-gray-700">
                        <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
                            Observações
                        </h3>

                        <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800/60">
                            <p className="whitespace-pre-wrap text-sm leading-6 text-gray-700 dark:text-gray-300">
                                {vistoria.observacoes || "Nenhuma observação registrada."}
                            </p>
                        </div>
                    </section>

                    {/* Auditoria */}
                    <section className="border-t border-gray-200 pt-6 dark:border-gray-700">
                        <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">
                            Registro
                        </h3>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <InfoItem
                                label="Criado em"
                                value={formatDate(vistoria.createdAt)}
                            />

                            <InfoItem
                                label="Atualizado em"
                                value={formatDate(vistoria.updatedAt)}
                            />
                        </div>
                    </section>
                </div>

                {/* Footer */}
                <div className="flex justify-end border-t border-gray-200 p-6 dark:border-gray-700">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg bg-gray-800 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600"
                    >
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default VistoriaDetails;