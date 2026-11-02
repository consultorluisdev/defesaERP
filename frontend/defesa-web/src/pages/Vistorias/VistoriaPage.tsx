import { useEffect, useMemo, useState } from "react";
import VistoriaDetails from "../../components/Vistorias/VistoriaDetails";
import VistoriaFilters from "../../components/Vistorias/vistoriaFilters";
import VistoriaForm from "../../components/Vistorias/VistoriaForm";
import VistoriaList from "../../components/Vistorias/VistoriaList";
import type {
    Vistoria,
    CreateVistoriaDto,
} from "../../types/vistoria";
import { vistoriaService } from "../../services/vistoriaService";

export default function VistoriaPage() {
    const [vistorias, setVistorias] = useState<Vistoria[]>([]);
    const [selectedVistoria, setSelectedVistoria] =
        useState<Vistoria | null>(null);

    const [showForm, setShowForm] = useState(false);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [busca, setBusca] = useState("");
    const [tipo, setTipo] = useState("");
    const [status, setStatus] = useState("");
    const [prioridade, setPrioridade] = useState("");

    const carregarVistorias = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await vistoriaService.getAll();

            setVistorias(response);
        } catch (err) {
            console.error(err);
            setError("Não foi possível carregar as vistorias.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        carregarVistorias();
    }, []);

    const vistoriasFiltradas = useMemo(() => {
        const termo = busca.trim().toLowerCase();

        return vistorias.filter((vistoria) => {
            const correspondeBusca =
                !termo ||
                vistoria.protocolo?.toLowerCase().includes(termo) ||
                vistoria.solicitante?.toLowerCase().includes(termo) ||
                vistoria.municipio?.toLowerCase().includes(termo) ||
                vistoria.endereco?.toLowerCase().includes(termo);

            const correspondeTipo =
                !tipo || vistoria.tipo === tipo;

            const correspondeStatus =
                !status || vistoria.status === status;

            const correspondePrioridade =
                !prioridade || vistoria.prioridade === prioridade;

            return (
                correspondeBusca &&
                correspondeTipo &&
                correspondeStatus &&
                correspondePrioridade
            );
        });
    }, [vistorias, busca, tipo, status, prioridade]);

    const limparFiltros = () => {
        setBusca("");
        setTipo("");
        setStatus("");
        setPrioridade("");
    };

    const handleCriar = async (data: CreateVistoriaDto) => {
        try {
            setSaving(true);
            setError(null);

            await vistoriaService.create(data);

            setShowForm(false);
            await carregarVistorias();
        } catch (err) {
            console.error(err);
            setError("Não foi possível criar a vistoria.");
        } finally {
            setSaving(false);
        }
    };

    const handleSelect = async (vistoria: Vistoria) => {
        try {
            const detalhes = await vistoriaService.getById(vistoria.id);
            setSelectedVistoria(detalhes);
        } catch (err) {
            console.error(err);
            setSelectedVistoria(vistoria);
        }
    };

    const total = vistorias.length;
    const agendadas = vistorias.filter(
        (item) => item.status === "Agendada"
    ).length;
    const emAndamento = vistorias.filter(
        (item) => item.status === "EmAndamento"
    ).length;
    const concluidas = vistorias.filter(
        (item) => item.status === "Concluida"
    ).length;

    return (
        <div className="space-y-6">

            {/* Cabeçalho */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Vistorias
                    </h1>

                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Gerencie e acompanhe as vistorias da Defesa Civil.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => {
                        setError(null);
                        setShowForm(true);
                    }}
                    className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
                >
                    + Nova Vistoria
                </button>
            </div>

            {/* Indicadores */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Total
                    </p>

                    <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                        {total}
                    </p>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Agendadas
                    </p>

                    <p className="mt-2 text-2xl font-bold text-blue-600">
                        {agendadas}
                    </p>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Em andamento
                    </p>

                    <p className="mt-2 text-2xl font-bold text-yellow-600">
                        {emAndamento}
                    </p>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Concluídas
                    </p>

                    <p className="mt-2 text-2xl font-bold text-green-600">
                        {concluidas}
                    </p>
                </div>
            </div>

            {/* Erro */}
            {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
                    {error}
                </div>
            )}

            {/* Filtros */}
            <VistoriaFilters
                busca={busca}
                tipo={tipo}
                status={status}
                prioridade={prioridade}
                onBuscaChange={setBusca}
                onTipoChange={setTipo}
                onStatusChange={setStatus}
                onPrioridadeChange={setPrioridade}
                onLimpar={limparFiltros}
            />

            {/* Conteúdo */}
            <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">

                {loading ? (
                    <div className="flex min-h-48 items-center justify-center p-6">
                        <div className="text-center">
                            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />

                            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                                Carregando vistorias...
                            </p>
                        </div>
                    </div>
                ) : vistoriasFiltradas.length === 0 ? (
                    <div className="flex min-h-48 items-center justify-center p-6">
                        <div className="text-center">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Nenhuma vistoria encontrada
                            </h3>

                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Ajuste os filtros ou cadastre uma nova vistoria.
                            </p>

                            <button
                                type="button"
                                onClick={() => {
                                    limparFiltros();
                                    setShowForm(true);
                                }}
                                className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                            >
                                Nova Vistoria
                            </button>
                        </div>
                    </div>
                ) : (
                    <VistoriaList
                        vistorias={vistoriasFiltradas}
                        onSelect={handleSelect}
                    />
                )}
            </div>

            {/* Formulário */}
            {showForm && (
                <VistoriaForm
                    onSubmit={handleCriar}
                    onCancel={() => setShowForm(false)}
                    loading={saving}
                    error={error}
                />
            )}

            {/* Detalhes */}
            {selectedVistoria && (
                <VistoriaDetails
                    vistoria={selectedVistoria}
                    onClose={() => setSelectedVistoria(null)}
                />
            )}
        </div>
    );
}