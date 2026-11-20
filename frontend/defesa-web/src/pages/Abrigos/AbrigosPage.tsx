import { Plus } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { AbrigoDetails } from '../../components/Abrigos/AbrigoDetails';
import { AbrigoFilters } from '../../components/Abrigos/AbrigoFilters';
import { AbrigoForm } from '../../components/Abrigos/AbrigoForm';
import { AbrigoList } from '../../components/Abrigos/AbrigoList';
import { abrigoService } from '../../services/abrigoService';
import type { Abrigo, AbrigoFormData, AbrigoStatus } from '../../types/abrigo';

export function AbrigosPage() {
  const [abrigos, setAbrigos] = useState<Abrigo[]>([]);
  const [busca, setBusca] = useState('');
  const [cidade, setCidade] = useState('');
  const [status, setStatus] = useState<AbrigoStatus | ''>('');
  const [detalhe, setDetalhe] = useState<Abrigo | null>(null);
  const [mostrarForm, setMostrarForm] = useState(false);

  const carregar = () => abrigoService.listar().then(setAbrigos);
  useEffect(() => {
    void carregar();
  }, []);

  const cidades = useMemo(
    () => Array.from(new Set(abrigos.map((a) => a.cidade))).sort(),
    [abrigos],
  );

  const filtrados = useMemo(() => {
    const q = busca.toLowerCase();
    return abrigos.filter(
      (a) =>
        (!q ||
          a.nome.toLowerCase().includes(q) ||
          a.bairro.toLowerCase().includes(q) ||
          a.cidade.toLowerCase().includes(q)) &&
        (!cidade || a.cidade === cidade) &&
        (!status || a.status === status),
    );
  }, [abrigos, busca, cidade, status]);

  const total = abrigos.length;
  const disponiveis = abrigos.filter((a) => a.status === 'Disponivel').length;
  const lotados = abrigos.filter((a) => a.status === 'Lotado').length;
  const ocupacaoTotal = abrigos.reduce((s, a) => s + a.ocupacao, 0);
  const capacidadeTotal = abrigos.reduce((s, a) => s + a.capacidade, 0);
  const pctOcup = capacidadeTotal ? Math.round((ocupacaoTotal / capacidadeTotal) * 100) : 0;

  const handleCriar = async (dados: AbrigoFormData) => {
    await abrigoService.criar(dados);
    setMostrarForm(false);
    void carregar();
  };

  const cards = [
    { label: 'Total de Abrigos', value: total },
    { label: 'Disponíveis', value: disponiveis },
    { label: 'Ocupação Total', value: `${pctOcup}%` },
    { label: 'Lotados', value: lotados },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Abrigos</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Gerencie os abrigos da Defesa Civil.
          </p>
        </div>
        <button
          onClick={() => setMostrarForm(true)}
          className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          <Plus size={16} /> Novo Abrigo
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

      <AbrigoFilters
        busca={busca}
        cidade={cidade}
        status={status}
        cidades={cidades}
        onBusca={setBusca}
        onCidade={setCidade}
        onStatus={setStatus}
      />
      <AbrigoList abrigos={filtrados} onDetails={setDetalhe} />

      {detalhe && <AbrigoDetails abrigo={detalhe} onClose={() => setDetalhe(null)} />}
      {mostrarForm && <AbrigoForm onClose={() => setMostrarForm(false)} onSubmit={handleCriar} />}
    </div>
  );
}
