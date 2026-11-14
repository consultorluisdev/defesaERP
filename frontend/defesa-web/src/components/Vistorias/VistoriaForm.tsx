import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import {
    PrioridadesVistoria,
    StatusVistoria,
    TiposVistoria,
    type Vistoria,
    type VistoriaFormValues,
} from "../../types/vistoria";

interface VistoriaFormProps {
    initialData?: Vistoria | null;
    isEditing?: boolean;
    onSubmit: (data: VistoriaFormValues) => Promise<void>;
    onCancel: () => void;
    loading?: boolean;
    error?: string | null;
}

const initialFormData: VistoriaFormValues = {
    solicitante: "",
    telefone: "",
    tipo: TiposVistoria.PREVENTIVA,
    descricao: "",
    endereco: "",
    bairro: "",
    municipio: "",
    prioridade: PrioridadesVistoria.MEDIA,
    responsavel: "",
    observacoes: "",
    dataAgendamento: "",
    status: StatusVistoria.AGENDADA,
    dataRealizacao: "",
};

const pad = (value: number) => String(value).padStart(2, "0");

const toDateTimeLocal = (value?: string | null) => {
    if (!value) return "";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return "";

    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
        date.getDate(),
    )}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

const toFormValues = (vistoria?: Vistoria | null): VistoriaFormValues => {
    if (!vistoria) return { ...initialFormData };

    return {
        solicitante: vistoria.solicitante,
        telefone: vistoria.telefone,
        tipo: vistoria.tipo,
        descricao: vistoria.descricao,
        endereco: vistoria.endereco,
        bairro: vistoria.bairro ?? "",
        municipio: vistoria.municipio,
        prioridade: vistoria.prioridade,
        responsavel: vistoria.responsavel ?? "",
        observacoes: vistoria.observacoes ?? "",
        dataAgendamento: toDateTimeLocal(vistoria.dataAgendamento),
        status: vistoria.status,
        dataRealizacao: toDateTimeLocal(vistoria.dataRealizacao),
    };
};

const inputClassName =
    "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white";

const labelClassName =
    "mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300";

export default function VistoriaForm({
    initialData = null,
    isEditing = false,
    onSubmit,
    onCancel,
    loading = false,
    error = null,
}: VistoriaFormProps) {
    const [formData, setFormData] = useState<VistoriaFormValues>(() =>
        toFormValues(initialData),
    );

    useEffect(() => {
        setFormData(toFormValues(initialData));
    }, [initialData]);

    const handleChange = (
        event: ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >,
    ) => {
        const { name, value } = event.target;

        setFormData((current) => ({
            ...current,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const payload: VistoriaFormValues = {
            ...formData,
            bairro: formData.bairro?.trim() || undefined,
            responsavel: formData.responsavel?.trim() || undefined,
            observacoes: formData.observacoes?.trim() || undefined,
            dataAgendamento: formData.dataAgendamento
                ? new Date(formData.dataAgendamento).toISOString()
                : undefined,
            dataRealizacao: formData.dataRealizacao
                ? new Date(formData.dataRealizacao).toISOString()
                : undefined,
            status: isEditing ? formData.status : undefined,
        };

        await onSubmit(payload);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white shadow-2xl dark:bg-gray-900">
                <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                            {isEditing ? "Editar Vistoria" : "Nova Vistoria"}
                        </h2>

                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            {isEditing
                                ? "Atualize os dados da vistoria."
                                : "Preencha os dados para agendar uma nova vistoria."}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onCancel}
                        className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                        aria-label="Fechar"
                    >
                        ✕
                    </button>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6 p-6"
                >
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <label htmlFor="solicitante" className={labelClassName}>
                                Solicitante
                            </label>

                            <input
                                id="solicitante"
                                name="solicitante"
                                value={formData.solicitante}
                                onChange={handleChange}
                                className={inputClassName}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="telefone" className={labelClassName}>
                                Telefone
                            </label>

                            <input
                                id="telefone"
                                name="telefone"
                                value={formData.telefone}
                                onChange={handleChange}
                                className={inputClassName}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="tipo" className={labelClassName}>
                                Tipo
                            </label>

                            <select
                                id="tipo"
                                name="tipo"
                                value={formData.tipo}
                                onChange={handleChange}
                                className={inputClassName}
                                required
                            >
                                {Object.values(TiposVistoria).map((tipo) => (
                                    <option key={tipo} value={tipo}>
                                        {tipo}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="prioridade" className={labelClassName}>
                                Prioridade
                            </label>

                            <select
                                id="prioridade"
                                name="prioridade"
                                value={formData.prioridade}
                                onChange={handleChange}
                                className={inputClassName}
                                required
                            >
                                {Object.values(PrioridadesVistoria).map(
                                    (prioridade) => (
                                        <option
                                            key={prioridade}
                                            value={prioridade}
                                        >
                                            {prioridade}
                                        </option>
                                    ),
                                )}
                            </select>
                        </div>

                        {isEditing && (
                            <div>
                                <label htmlFor="status" className={labelClassName}>
                                    Status
                                </label>

                                <select
                                    id="status"
                                    name="status"
                                    value={formData.status ?? StatusVistoria.AGENDADA}
                                    onChange={handleChange}
                                    className={inputClassName}
                                >
                                    {Object.values(StatusVistoria).map((status) => (
                                        <option key={status} value={status}>
                                            {status}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <div>
                            <label htmlFor="municipio" className={labelClassName}>
                                Município
                            </label>

                            <input
                                id="municipio"
                                name="municipio"
                                value={formData.municipio}
                                onChange={handleChange}
                                className={inputClassName}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="bairro" className={labelClassName}>
                                Bairro
                            </label>

                            <input
                                id="bairro"
                                name="bairro"
                                value={formData.bairro ?? ""}
                                onChange={handleChange}
                                className={inputClassName}
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label htmlFor="endereco" className={labelClassName}>
                                Endereço
                            </label>

                            <input
                                id="endereco"
                                name="endereco"
                                value={formData.endereco}
                                onChange={handleChange}
                                className={inputClassName}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="responsavel" className={labelClassName}>
                                Responsável
                            </label>

                            <input
                                id="responsavel"
                                name="responsavel"
                                value={formData.responsavel ?? ""}
                                onChange={handleChange}
                                className={inputClassName}
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="dataAgendamento"
                                className={labelClassName}
                            >
                                Data de agendamento
                            </label>

                            <input
                                id="dataAgendamento"
                                name="dataAgendamento"
                                type="datetime-local"
                                value={formData.dataAgendamento ?? ""}
                                onChange={handleChange}
                                className={inputClassName}
                            />
                        </div>

                        {isEditing && (
                            <div>
                                <label
                                    htmlFor="dataRealizacao"
                                    className={labelClassName}
                                >
                                    Data de realização
                                </label>

                                <input
                                    id="dataRealizacao"
                                    name="dataRealizacao"
                                    type="datetime-local"
                                    value={formData.dataRealizacao ?? ""}
                                    onChange={handleChange}
                                    className={inputClassName}
                                />
                            </div>
                        )}
                    </div>

                    <div>
                        <label htmlFor="descricao" className={labelClassName}>
                            Descrição
                        </label>

                        <textarea
                            id="descricao"
                            name="descricao"
                            value={formData.descricao}
                            onChange={handleChange}
                            className={inputClassName}
                            rows={4}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="observacoes" className={labelClassName}>
                            Observações
                        </label>

                        <textarea
                            id="observacoes"
                            name="observacoes"
                            value={formData.observacoes ?? ""}
                            onChange={handleChange}
                            className={inputClassName}
                            rows={3}
                        />
                    </div>

                    {error && (
                        <p
                            role="alert"
                            className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400"
                        >
                            {error}
                        </p>
                    )}

                    <div className="flex justify-end gap-3 border-t border-gray-200 pt-6 dark:border-gray-700">
                        <button
                            type="button"
                            onClick={onCancel}
                            disabled={loading}
                            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {loading
                                ? "Salvando..."
                                : isEditing
                                  ? "Salvar alterações"
                                  : "Salvar vistoria"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
