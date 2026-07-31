import { useEffect, useState } from "react";
import { Alerta, AlertaFiltros } from "../types/alerta";
import { alertaService } from "../services/alertaService";
import { AlertaFilters } from "../components/Alertas/AlertaFilters";
import { AlertaList } from "../components/Alertas/AlertaList";
import { AlertaDetails } from "../components/Alertas/AlertaDetails";
import { AlertaForm } from "../components/Alertas/AlertaForm";
import { Plus, Bell } from "lucide-react";

export function AlertasPage() {
  const [alertas, setAlertas] = useState<Alerta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filtros, setFiltros] = useState<AlertaFiltros>({});
  const [showForm, setShowForm] = useState(false);
  const [selecionada, setSelecionada] = useState<Alerta | null>(null);
  const [editando, setEditando] = useState<Alerta | null>(null);

  const carregar = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await alertaService.listar();
      setAlertas(data);
    } catch {
      setError("Erro ao carregar alertas. Verifique se a API está rodando.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  const filtradas = alertas.filter((a) => {
    const matchStatus = !filtros.status || filtros.status === "Todos" || a.status === filtros.status;
    const matchNivel = !filtros.nivel || filtros.nivel === "Todos" || a.nivel === filtros.nivel;
    const matchTipo = !filtros.tipo || filtros.tipo === "Todos" || a.tipo === filtros.tipo;
    const busca = filtros.busca?.toLowerCase() ?? "";
    const matchBusca =
      busca === "" ||
      a.titulo.toLowerCase().includes(busca) ||
      a.cidade.toLowerCase().includes(busca);
    return matchStatus && matchNivel && matchTipo && matchBusca;
  });

  const handleExcluir = async (id: number) => {
    if (!confirm("Deseja realmente excluir este alerta?")) return;
    try {
      await alertaService.excluir(id);
      setSelecionada(null);
      await carregar();
    } catch {
      setError("Erro ao excluir alerta.");
    }
  };

  return (
    <div className="p-8 min-h-screen bg-[#0b1222] text-gray-200">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Bell size={22} className="text-amber-400" />
            <h1 className="text-xl font-bold text-gray-100">Alertas</h1>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Monitoramento de alertas de Defesa Civil
          </p>
        </div>
        <button
          onClick={() => {
            setEditando(null);
            setShowForm(true);
          }}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus size={16} />
          Novo Alerta
        </button>
      </div>

      <AlertaFilters filtros={filtros} onChange={setFiltros} />

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-4 text-red-400 text-sm">
          {error}
        </div>
      )}

      <AlertaList alertas={filtradas} loading={loading} erro={error} onSelect={setSelecionada} />

      {selecionada && (
        <AlertaDetails
          alerta={selecionada}
          onClose={() => setSelecionada(null)}
          onEdit={() => {
            setEditando(selecionada);
            setSelecionada(null);
            setShowForm(true);
          }}
          onDelete={handleExcluir}
        />
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#111a2c] rounded-lg border border-[#1e293b] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-lg font-bold text-gray-100 mb-4">
              {editando ? "Editar Alerta" : "Novo Alerta"}
            </h2>
            <AlertaForm
              alerta={editando}
              onSuccess={async () => {
                setShowForm(false);
                setEditando(null);
                await carregar();
              }}
              onCancel={() => {
                setShowForm(false);
                setEditando(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
