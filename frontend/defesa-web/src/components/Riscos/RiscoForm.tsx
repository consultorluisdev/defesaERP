import { useState, type FormEvent } from "react";
import {
    NiveisRisco,
    StatusRiscoOptions,
    TiposRisco,
    type CreateRiscoDto,
} from "../../types/risco";

interface RiscoFormProps {
    onSubmit: (data: CreateRiscoDto) => void | Promise<void>;
    onCancel: () => void;
    loading: boolean;
    error: string | null;
}

const initialForm: CreateRiscoDto = {
    nome: "",
    descricao: "",
    tipo: "Outro",
    nivel: "Baixo",
    status: "Monitorado",
    municipio: "",
    bairro: "",
    endereco: "",
    populacaoAfetada: 0,
};

export default function RiscoForm({
    onSubmit,
    onCancel,
    loading,
    error,
}: RiscoFormProps) {
    const [form, setForm] = useState<CreateRiscoDto>(initialForm);
    const update = <K extends keyof CreateRiscoDto>(key: K, value: CreateRiscoDto[K]) =>
        setForm((current) => ({ ...current, [key]: value }));

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await onSubmit(form);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Nova área de risco</h2>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <input required value={form.nome} onChange={(e) => update("nome", e.target.value)} placeholder="Nome" className="w-full rounded-lg border px-3 py-2" />
            <textarea required value={form.descricao} onChange={(e) => update("descricao", e.target.value)} placeholder="Descrição" className="w-full rounded-lg border px-3 py-2" />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <select value={form.tipo} onChange={(e) => update("tipo", e.target.value as CreateRiscoDto["tipo"])} className="rounded-lg border px-3 py-2">
                    {TiposRisco.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
                <select value={form.nivel} onChange={(e) => update("nivel", e.target.value as CreateRiscoDto["nivel"])} className="rounded-lg border px-3 py-2">
                    {NiveisRisco.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
                <select value={form.status} onChange={(e) => update("status", e.target.value as CreateRiscoDto["status"])} className="rounded-lg border px-3 py-2">
                    {StatusRiscoOptions.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
                <input required value={form.municipio} onChange={(e) => update("municipio", e.target.value)} placeholder="Município" className="rounded-lg border px-3 py-2" />
                <input required value={form.bairro} onChange={(e) => update("bairro", e.target.value)} placeholder="Bairro" className="rounded-lg border px-3 py-2" />
                <input required value={form.endereco} onChange={(e) => update("endereco", e.target.value)} placeholder="Endereço" className="rounded-lg border px-3 py-2" />
                <input required type="number" min="0" value={form.populacaoAfetada} onChange={(e) => update("populacaoAfetada", Number(e.target.value))} placeholder="População afetada" className="rounded-lg border px-3 py-2" />
            </div>
            <div className="flex justify-end gap-3">
                <button type="button" onClick={onCancel} disabled={loading} className="rounded-lg border px-4 py-2">Cancelar</button>
                <button type="submit" disabled={loading} className="rounded-lg bg-blue-600 px-4 py-2 text-white disabled:opacity-50">
                    {loading ? "Salvando..." : "Salvar"}
                </button>
            </div>
        </form>
    );
}
