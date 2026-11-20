import { Plus } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { ViaturaDetails } from '../../components/Viaturas/ViaturaDetails';
import { ViaturaFilters } from '../../components/Viaturas/ViaturaFilters';
import { ViaturaForm } from '../../components/Viaturas/ViaturaForm';
import { ViaturaList } from '../../components/Viaturas/ViaturaList';
import { viaturaService } from '../../services/viaturaService';
import type { Viatura, ViaturaFormData, ViaturaStatus, ViaturaTipo } from '../../types/viatura';

export function ViaturasPage() {
  const [viaturas, setViaturas] = useState<Viatura[]>([]);
  const [busca, setBusca] = useState('');
  const [tipo, setTipo] = useState<ViaturaTipo | ''>('');
  const [status, setStatus] = useState<ViaturaStatus | ''>('');
  const [detalhe, setDetalhe] = useState<Viatura | null>(null);
  const [mostrarForm, setMostrarForm] = useState(false);

  const carregar = () => viaturaService.listar().then(setViaturas);
  useEffect(() => {
    void carregar();
  }, []);

  const filtradas = useMemo(() => {
    const q = busca.toLowerCase();
    return viaturas.filter(
      (v) =>
        (!q ||
          v.prefixo.toLowerCase().includes(q) ||
          v.placa.toLowerCase().includes(q) ||
          v.modelo.toLowerCase().includes(q)) &&
        (!tipo || v.tipo === tipo) &&
        (!status || v.status === status),
    );
  }, [viaturas, busca, tipo, status]);

  const cards = [
    { label: 'Total', value: viaturas.length },
    { label: 'Disponíveis', value: viaturas.filter((v) => v.status === 'Disponivel').length },
    { label: 'Em Operação', value: viaturas.filter((v) => v.status === 'EmOperacao').length },
    { label: 'Em Manutenção', value: viaturas.filter((v) => v.status === 'EmManutencao').length },
  ];

  const handleCriar = async (dados: ViaturaFormData) => {
    await viaturaService.criar(dados);
    setMostrarForm(false);
    void carregar();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Viaturas</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Frota da Defesa Civil.</p>
        </div>
        <button
          onClick={() => setMostrarForm(true)}
          className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          <Plus size={16} /> Nova Viatura
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((c) => (
          <div
            key={c.label}
            className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">{c.label}</p>
            <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-gray-100">{c.value}</p>
          </div>
        ))}
      </div>

      <ViaturaFilters
        busca={busca}
        tipo={tipo}
        status={status}
        onBusca={setBusca}
        onTipo={setTipo}
        onStatus={setStatus}
      />
      <ViaturaList viaturas={filtradas} onDetails={setDetalhe} />

      {detalhe && <ViaturaDetails viatura={detalhe} onClose={() => setDetalhe(null)} />}
      {mostrarForm && <ViaturaForm onClose={() => setMostrarForm(false)} onSubmit={handleCriar} />}
    </div>
  );
}
