import { useEffect, useState, type FormEvent } from "react";
import {
    NiveisRisco,
    StatusRiscoOptions,
    TiposRisco,
    type CreateRiscoDto,
    type Risco,
} from "../../types/risco";

interface RiscoFormProps {
    initialData?: Risco | null;
    isEditing?: boolean;
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
    coordenadas: null,
    populacaoAfetada: 0,
    responsavel: "",
    observacoes: "",
};

const toForm = (risco?: Risco | null): CreateRiscoDto => {
    if (!risco) return { ...initialForm };

    return {
        nome: risco.nome,
        descricao: risco.descricao,
        tipo: risco.tipo,
        nivel: risco.nivel,
        status: risco.status,
        municipio: risco.municipio,
        bairro: risco.bairro,
        endereco: risco.endereco,
        coordenadas: risco.coordenadas ?? null,
        populacaoAfetada: risco.populacaoAfetada,
        responsavel: risco.responsavel ?? "",
        observacoes: risco.observacoes ?? "",
    };
};

const inputClassName =
    "w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white";

export default function RiscoForm({
    initialData = null,
    isEditing = false,
    onSubmit,
    onCancel,
    loading,
    error,
}: RiscoFormProps) {
    const [form, setForm] = useState<CreateRiscoDto>(() => toForm(initialData));
    const [latitude, setLatitude] = useState(
        initialData?.coordenadas?.latitude?.toString() ?? "",
    );
    const [longitude, setLongitude] = useState(
        initialData?.coordenadas?.longitude?.toString() ?? "",
    );

    useEffect(() => {
        setForm(toForm(initialData));
        setLatitude(initialData?.coordenadas?.latitude?.toString() ?? "");
        setLongitude(initialData?.coordenadas?.longitude?.toString() ?? "");
    }, [initialData]);

    const update = <K extends keyof CreateRiscoDto>(key: K, value: CreateRiscoDto[K]) =>
        setForm((current) => ({ ...current, [key]: value }));

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const hasCoordinates = latitude.trim() !== "" && longitude.trim() !== "";

        const payload: CreateRiscoDto = {
            ...form,
            bairro: form.bairro.trim(),
            endereco: form.endereco.trim(),
            responsavel: form.responsavel?.trim() || undefined,
            observacoes: form.observacoes?.trim() || undefined,
            coordenadas: hasCoordinates
                ? {
                      latitude: Number(latitude),
                      longitude: Number(longitude),
                  }
                : null,
        };

        await onSubmit(payload);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800"
        >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {isEditing ? "Editar área de risco" : "Nova área de risco"}
            </h2>

            {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}

            <input
                required
                value={form.nome}
                onChange={(e) => update("nome", e.target.value)}
                placeholder="Nome"
                className={inputClassName}
            />
            <textarea
                required
                value={form.descricao}
                onChange={(e) => update("descricao", e.target.value)}
                placeholder="Descrição"
                className={inputClassName}
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <select
                    value={form.tipo}
                    onChange={(e) => update("tipo", e.target.value as CreateRiscoDto["tipo"])}
                    className={inputClassName}
                >
                    {TiposRisco.map((item) => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </select>
                <select
                    value={form.nivel}
                    onChange={(e) => update("nivel", e.target.value as CreateRiscoDto["nivel"])}
                    className={inputClassName}
                >
                    {NiveisRisco.map((item) => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </select>
                <select
                    value={form.status}
                    onChange={(e) => update("status", e.target.value as CreateRiscoDto["status"])}
                    className={inputClassName}
                >
                    {StatusRiscoOptions.map((item) => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </select>
                <input
                    required
                    value={form.municipio}
                    onChange={(e) => update("municipio", e.target.value)}
                    placeholder="Município"
                    className={inputClassName}
                />
                <input
                    required
                    value={form.bairro}
                    onChange={(e) => update("bairro", e.target.value)}
                    placeholder="Bairro"
                    className={inputClassName}
                />
                <input
                    required
                    value={form.endereco}
                    onChange={(e) => update("endereco", e.target.value)}
                    placeholder="Endereço"
                    className={inputClassName}
                />
                <input
                    type="number"
                    step="any"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    placeholder="Latitude"
                    className={inputClassName}
                />
                <input
                    type="number"
                    step="any"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                    placeholder="Longitude"
                    className={inputClassName}
                />
                <input
                    required
                    type="number"
                    min="0"
                    value={form.populacaoAfetada}
                    onChange={(e) => update("populacaoAfetada", Number(e.target.value))}
                    placeholder="População afetada"
                    className={inputClassName}
                />
                <input
                    value={form.responsavel ?? ""}
                    onChange={(e) => update("responsavel", e.target.value)}
                    placeholder="Responsável"
                    className={inputClassName}
                />
            </div>

            <textarea
                value={form.observacoes ?? ""}
                onChange={(e) => update("observacoes", e.target.value)}
                placeholder="Observações"
                className={inputClassName}
            />

            <div className="flex justify-end gap-3">
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={loading}
                    className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
                >
                    {loading ? "Salvando..." : isEditing ? "Salvar alterações" : "Salvar"}
                </button>
            </div>
        </form>
    );
}
