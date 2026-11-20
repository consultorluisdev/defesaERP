import { Plus } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { RiscoDetails } from '../../components/Riscos/RiscoDetails';
import { RiscoFilters } from '../../components/Riscos/RiscoFilters';
import { RiscoForm } from '../../components/Riscos/RiscoForm';
import { RiscoList } from '../../components/Riscos/RiscoList';
import { RiscoMap } from '../../components/Riscos/RiscoMap';
import { riscoService } from '../../services/riscoService';
import type { Risco, RiscoFormData, RiscoNivel, RiscoStatus, RiscoTipo } from '../../types/risco';

export function RiscosPage() {
  const [riscos, setRiscos] = useState<Risco[]>([]);
  const [busca, setBusca] = useState('');
  const [tipo, setTipo] = useState<RiscoTipo | ''>('');
  const [nivel, setNivel] = useState<RiscoNivel | ''>('');
  const [status, setStatus] = useState<RiscoStatus | ''>('');
  const [detalhe, setDetalhe] = useState<Risco | null>(null);
  const [mostrarForm, setMostrarForm] = useState(false);

  const carregar = () => riscoService.listar().then(setRiscos);
  useEffect(() => {
    void carregar();
  }, []);

  const filtrados = useMemo(() => {
    const q = busca.toLowerCase();
    return riscos.filter(
      (r) =>
        (!q || r.titulo.toLowerCase().includes(q) || r.cidade.toLowerCase().includes(q)) &&
        (!tipo || r.tipo === tipo) &&
        (!nivel || r.nivel === nivel) &&
        (!status || r.status === status),
    );
  }, [riscos, busca, tipo, nivel, status]);

  const resumo = (['Baixo', 'Moderado', 'Alto', 'Critico'] as RiscoNivel[]).map((n) => ({
    label: n,
    value: riscos.filter((r) => r.nivel === n).length,
  }));

  const handleCriar = async (dados: RiscoFormData) => {
    await riscoService.criar(dados);
    setMostrarForm(false);
    void carregar();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Riscos</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Mapeamento de riscos da região.
          </p>
        </div>
        <button
          onClick={() => setMostrarForm(true)}
          className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          <Plus size={16} /> Novo Risco
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {resumo.map((c) => (
          <div
            key={c.label}
            className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">Nível {c.label}</p>
            <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-gray-100">{c.value}</p>
          </div>
        ))}
      </div>

      <RiscoFilters
        busca={busca}
        tipo={tipo}
        nivel={nivel}
        status={status}
        onBusca={setBusca}
        onTipo={setTipo}
        onNivel={setNivel}
        onStatus={setStatus}
      />
      <RiscoMap riscos={filtrados} />
      <RiscoList riscos={filtrados} onDetails={setDetalhe} />

      {detalhe && <RiscoDetails risco={detalhe} onClose={() => setDetalhe(null)} />}
      {mostrarForm && <RiscoForm onClose={() => setMostrarForm(false)} onSubmit={handleCriar} />}
    </div>
  );
}
