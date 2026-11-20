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
    <div className="min-h-screen p-8 text-zinc-900 dark:text-gray-100">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Bell size={22} className="text-amber-400" />
            <h1 className="text-xl font-bold text-zinc-900 dark:text-gray-100">Alertas</h1>
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
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="alerta-modal-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowForm(false);
              setEditando(null);
            }
          }}
        >
          <div className="relative max-h-[calc(100dvh-24px)] w-full max-w-2xl overflow-y-auto rounded-lg border border-gray-200 bg-white p-4 shadow-2xl sm:p-6 dark:border-gray-700 dark:bg-gray-900">
            <div className="mb-4 flex items-center justify-between gap-3 border-b border-gray-200 pb-4 dark:border-gray-700">
              <h2 id="alerta-modal-title" className="text-lg font-bold text-gray-900 dark:text-gray-100">
                {editando ? "Editar Alerta" : "Novo Alerta"}
              </h2>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditando(null);
                }}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-gray-200 text-xl leading-none text-gray-600 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                aria-label="Fechar modal"
              >
                ×
              </button>
            </div>
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
