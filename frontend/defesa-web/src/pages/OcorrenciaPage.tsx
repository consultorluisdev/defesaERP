import { useEffect, useState } from "react";
import { Ocorrencia, OcorrenciaFiltros, StatusOcorrencia } from "../types/ocorrencia";
import { ocorrenciaService } from "../services/ocorrenciaService";
import { OcorrenciaFilters } from "../components/Ocorrencias/OcorrenciaFilters";
import { OcorrenciaList } from "../components/Ocorrencias/OcorrenciaList";
import { OcorrenciaForm } from "../components/Ocorrencias/OcorrenciaForm";
import { OcorrenciaDetails } from "../components/Ocorrencias/OcorrenciaDetails";
import { Plus, AlertTriangle } from "lucide-react";

export function OcorrenciaPage() {
    const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filtros, setFiltros] = useState<OcorrenciaFiltros>({});
    const [showForm, setShowForm] = useState(false);
    const [selecionada, setSelecionada] = useState<Ocorrencia | null>(null);

    const carregar = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await ocorrenciaService.lista();
            setOcorrencias(data);
        } catch {
            setError("Erro ao carregar ocorrências. Verifique se a API está rodando.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        carregar();
    }, []);

    const filtradas = ocorrencias.filter((o) => {
        const matchStatus = !filtros.status || filtros.status === "Todas" || o.status === filtros.status;
        const matchPrioridade = !filtros.prioridade || filtros.prioridade === "Todas" || o.prioridade === filtros.prioridade;
        const busca = filtros.busca?.toLowerCase() ?? "";
        const matchBusca = busca === "" ||
            o.descricao.toLowerCase().includes(busca) ||
            o.endereco.toLowerCase().includes(busca) ||
            o.numeroProtocolo.toLowerCase().includes(busca) ||
            o.cidade.toLowerCase().includes(busca);
        return matchStatus && matchPrioridade && matchBusca;
    });

    const handleChangeStatus = async (id: number, status: StatusOcorrencia) => {
        const ocorrencia = ocorrencias.find((o) => o.id === id);
        if (!ocorrencia) return;
        await ocorrenciaService.atualizar(id, {
            status,
            dataOcorrencia: ocorrencia.dataHora,
        });
        await carregar();
        setSelecionada(null);
    };

    return (
        <div className="p-8 min-h-screen bg-[#0b1222] text-gray-200">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <div>
                    <div className="flex items-center gap-2">
                        <AlertTriangle size={22} className="text-orange-400" />
                        <h1 className="text-xl font-bold text-gray-100">Ocorrências</h1>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                        Registro e acompanhamento de ocorrências de Defesa Civil
                    </p>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                    <Plus size={16} />
                    Nova Ocorrência
                </button>
            </div>

            <OcorrenciaFilters filtros={filtros} onChange={setFiltros} />

            {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-4 text-red-400 text-sm">
                    {error}
                </div>
            )}

            {loading ? (
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
                </div>
            ) : (
                <OcorrenciaList ocorrencias={filtradas} onSelect={setSelecionada} />
            )}

            {selecionada && (
                <OcorrenciaDetails
                    ocorrencia={selecionada}
                    onClose={() => setSelecionada(null)}
                    onChangeStatus={handleChangeStatus}
                />
            )}

            {showForm && (
                <OcorrenciaForm
                    onClose={() => setShowForm(false)}
                    onSaved={async () => {
                        setShowForm(false);
                        await carregar();
                    }}
                />
            )}
        </div>
    );
}
