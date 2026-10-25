import { useEffect, useState } from "react";
import { Plus, Users } from "lucide-react";
import { Equipe } from "../types/equipe";
import { equipeService } from "../services/equipeService";
import { EquipeFilters } from "../components/Equipes/EquipeFilters";
import { EquipeList } from "../components/Equipes/EquipeList";
import { EquipeForm } from "../components/Equipes/EquipeForm";
import { EquipeDetails } from "../components/Equipes/EquipeDetails";

interface EquipeFiltersValues {
    search: string;
    status: string;
    tipo: string;
}

export function EquipePage() {
    const [equipes, setEquipes] = useState<Equipe[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [filtros, setFiltros] = useState<EquipeFiltersValues>({
        search: "",
        status: "",
        tipo: "",
    });
    const [selecionada, setSelecionada] = useState<Equipe | null>(null);
    const [showForm, setShowForm] = useState(false);

    const carregar = async () => {
        setLoading(true);
        setError(null);

        try{
            const data = await equipeService.getAll();
            setEquipes(data);
        }catch {
            setError(
                "Erro ao carregar equipes. Verifique se API está rodando.",
            );
        }finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        carregar();
    }, []);

    const handleFilter = (filters: EquipeFiltersValues) => {
        setFiltros(filters);
    };

    const handleClear = () => {
        setFiltros({
            search: "",
            status: "",
            tipo: "",
        });
    };

    const filtradas = equipes.filter((equipe) => {
        const busca = filtros.search.toLowerCase().trim();

        const matchBusca = 
        busca === "" ||
        equipe.nome.toLocaleLowerCase().includes(busca) ||
        equipe.responsavel.toLowerCase().includes(busca);

        const matchStatus = 
        filtros.status === "" ||
        equipe.status === filtros.status;

        const matchTipo = 
        filtros.tipo === "" ||
        equipe.tipo === filtros.tipo;

        return matchBusca && matchStatus && matchTipo;
    });

    return(
        <div className="min-h-screen bg-[#0b1222] p-8 text-gray-200">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div>
                    <div className="flex items-center gap-2">
                        <Users size={22} className="text-blue-400" />

                        <h1 className="text-xl font-bold text-gray-100">
                            Equipes
                        </h1>
                    </div>

                    <p className="mt-1 text-xs text-gray-500">
                        Gerenciamento das equipes da Defesa Civil
                    </p>
                </div>

                <button
                type="button"
                onClick={() => setShowForm(true)}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                >
                    <Plus size={16} />
                    Nova Equipe
                </button>
            </div>

            <EquipeFilters
            onFilter={handleFilter}
            onClear={handleClear}
            />

            {error && (
                <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
                    {error}
                </div>
            )}

            {loading ? (
                <div className="flex h-64 items-center justify-center">
                    <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500" />
                    {error}
                </div>
                ): (
                    <EquipeList
                    equipes={filtradas}
                    onSelect={(id) => {
                        const equipe = equipes.find(
                            (item) => item.id === id,
                        );
                        if(equipe){
                            setSelecionada(equipe)
                        }
                    }}
                />
                )}
                {selecionada &&(
                    <EquipeDetails
                    equipe={selecionada}
                    onClose={() => setSelecionada(null)}
                    />
                )}
                {showForm && (
                    <EquipeForm
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