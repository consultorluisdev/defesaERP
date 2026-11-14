import { useEffect, useMemo, useState } from "react";
import {
    FaExclamationTriangle,
    FaPlus,
    FaShieldAlt,
    FaUsers,
} from "react-icons/fa";

import RiscoDetails from "../../components/Riscos/RiscoDetails";
import RiscoFilters from "../../components/Riscos/RiscoFilters";
import RiscoForm from "../../components/Riscos/RiscoForm";
import RiscoMap from "../../components/Riscos/RiscoMap";
import RiscoList from "../../components/Riscos/RiscoList";

import { riscoService } from "../../services/riscoService";
import type {
    Risco,
    CreateRiscoDto,
    UpdateRiscoDto,
    RiscoFilters as RiscoFiltersType,
} from "../../types/risco";

const initialFilters: RiscoFiltersType = {
    busca: "",
    tipo: "",
    nivel: "",
    status: "",
    municipio: "",
};

export default function RiscosPage() {
    const [riscos, setRiscos] = useState<Risco[]>([]);
    const [filters, setFilters] = useState<RiscoFiltersType>(initialFilters);
    const [selectedRisco, setSelectedRisco] = useState<Risco | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [editingRisco, setEditingRisco] = useState<Risco | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const carregarRiscos = async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await riscoService.getAll();
            setRiscos(data);
        } catch {
            setError("Não foi possível carregar as áreas de risco.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        carregarRiscos();
    }, []);

    const filteredRiscos = useMemo(() => {
        const search = filters.busca.trim().toLowerCase();
        const municipality = filters.municipio.trim().toLowerCase();

        return riscos.filter((risco) => {
            const matchesSearch =
                !search ||
                risco.nome.toLowerCase().includes(search) ||
                risco.endereco.toLowerCase().includes(search) ||
                risco.descricao.toLowerCase().includes(search);

            const matchesMunicipality =
                !municipality ||
                risco.municipio.toLowerCase().includes(municipality);

            return (
                matchesSearch &&
                matchesMunicipality &&
                (!filters.tipo || risco.tipo === filters.tipo) &&
                (!filters.nivel || risco.nivel === filters.nivel) &&
                (!filters.status || risco.status === filters.status)
            );
        });
    }, [riscos, filters]);

    const total = riscos.length;
    const highRisk = riscos.filter(
        (risco) => risco.nivel === "Alto" || risco.nivel === "MuitoAlto",
    ).length;
    const affectedPopulation = riscos.reduce(
        (sum, risco) => sum + risco.populacaoAfetada,
        0,
    );

    const handleSalvar = async (data: CreateRiscoDto) => {
        try {
            setSaving(true);
            setError(null);

            if (editingRisco) {
                await riscoService.update(editingRisco.id, data as UpdateRiscoDto);
            } else {
                await riscoService.create(data);
            }

            setShowForm(false);
            setEditingRisco(null);
            setSelectedRisco(null);
            await carregarRiscos();
        } catch {
            setError(
                editingRisco
                    ? "Não foi possível atualizar a área de risco."
                    : "Não foi possível cadastrar a área de risco.",
            );
        } finally {
            setSaving(false);
        }
    };

    const handleEditar = (risco: Risco) => {
        setError(null);
        setEditingRisco(risco);
        setSelectedRisco(null);
        setShowForm(true);
    };

    const handleExcluir = async (risco: Risco) => {
        if (!window.confirm(`Excluir a área de risco "${risco.nome}"?`)) return;

        try {
            setError(null);
            await riscoService.delete(risco.id);
            setSelectedRisco(null);
            await carregarRiscos();
        } catch {
            setError("Não foi possível excluir a área de risco.");
        }
    };

    const handleNova = () => {
        setError(null);
        setEditingRisco(null);
        setShowForm(true);
    };

    const handleClear = () => {
        setFilters(initialFilters);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400">
                            <FaExclamationTriangle />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Áreas de Risco
                            </h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Cadastro e monitoramento de áreas vulneráveis
                            </p>
                        </div>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={handleNova}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                    <FaPlus />
                    Nova área de risco
                </button>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex items-center gap-3">
                        <FaShieldAlt className="text-blue-500" />
                        <span className="text-sm text-gray-500 dark:text-gray-400">Áreas cadastradas</span>
                    </div>
                    <p className="mt-3 text-2xl font-bold text-gray-900 dark:text-white">{total}</p>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex items-center gap-3">
                        <FaExclamationTriangle className="text-orange-500" />
                        <span className="text-sm text-gray-500 dark:text-gray-400">Risco alto ou muito alto</span>
                    </div>
                    <p className="mt-3 text-2xl font-bold text-gray-900 dark:text-white">{highRisk}</p>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex items-center gap-3">
                        <FaUsers className="text-purple-500" />
                        <span className="text-sm text-gray-500 dark:text-gray-400">População potencialmente afetada</span>
                    </div>
                    <p className="mt-3 text-2xl font-bold text-gray-900 dark:text-white">{affectedPopulation.toLocaleString("pt-BR")}</p>
                </div>
            </div>

            {error && (
                <div className="flex items-center justify-between rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
                    <span>{error}</span>

                    <button
                        type="button"
                        onClick={carregarRiscos}
                        className="font-medium underline hover:no-underline"
                    >
                        Tentar novamente
                    </button>
                </div>
            )}

            {loading && (
                <div className="flex h-32 items-center justify-center">
                    <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-blue-500" />
                </div>
            )}

            <RiscoFilters
                filters={filters}
                onChange={setFilters}
                onClear={handleClear}
            />

            <section className="space-y-3">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Visualização geográfica
                </h2>
                <RiscoMap
                    riscos={filteredRiscos}
                    onSelect={setSelectedRisco}
                />
            </section>

            <section className="space-y-3">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Áreas cadastradas
                </h2>
                <RiscoList
                    riscos={filteredRiscos}
                    onSelect={setSelectedRisco}
                />
            </section>

            {showForm && (
                <RiscoForm
                    initialData={editingRisco}
                    isEditing={Boolean(editingRisco)}
                    onSubmit={handleSalvar}
                    onCancel={() => {
                        setShowForm(false);
                        setEditingRisco(null);
                    }}
                    loading={saving}
                    error={error}
                />
            )}

            {selectedRisco && (
                <RiscoDetails
                    risco={selectedRisco}
                    onClose={() => setSelectedRisco(null)}
                    onEdit={() => handleEditar(selectedRisco)}
                    onDelete={() => handleExcluir(selectedRisco)}
                />
            )}
        </div>
    );
}