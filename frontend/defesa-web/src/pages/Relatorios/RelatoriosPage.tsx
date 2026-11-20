import { Plus } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { RelatorioDetails } from '../../components/Relatorios/RelatorioDetails';
import { RelatorioFilters } from '../../components/Relatorios/RelatorioFilters';
import { RelatorioForm } from '../../components/Relatorios/RelatorioForm';
import { RelatorioList } from '../../components/Relatorios/RelatorioList';
import { relatorioService } from '../../services/relatorioService';
import type {
  Relatorio,
  RelatorioFormato,
  RelatorioFormData,
  RelatorioStatus,
  RelatorioTipo,
} from '../../types/relatorio';

function baixarCsv(relatorio: Relatorio) {
  const csv =
    `id;titulo;tipo;periodoInicio;periodoFim;status;formato;criadoPor;criadoEm;tamanho\n` +
    `${relatorio.id};${relatorio.titulo};${relatorio.tipo};${relatorio.periodoInicio};${relatorio.periodoFim};${relatorio.status};${relatorio.formato};${relatorio.criadoPor};${relatorio.criadoEm};${relatorio.tamanho}`;
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${relatorio.titulo.replace(/\s+/g, '_')}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export function RelatoriosPage() {
  const [relatorios, setRelatorios] = useState<Relatorio[]>([]);
  const [busca, setBusca] = useState('');
  const [tipo, setTipo] = useState<RelatorioTipo | ''>('');
  const [status, setStatus] = useState<RelatorioStatus | ''>('');
  const [formato, setFormato] = useState<RelatorioFormato | ''>('');
  const [detalhe, setDetalhe] = useState<Relatorio | null>(null);
  const [mostrarForm, setMostrarForm] = useState(false);

  const carregar = () => relatorioService.listar().then(setRelatorios);
  useEffect(() => {
    void carregar();
  }, []);

  const filtrados = useMemo(() => {
    const q = busca.toLowerCase();
    return relatorios.filter(
      (r) =>
        (!q || r.titulo.toLowerCase().includes(q) || r.criadoPor.toLowerCase().includes(q)) &&
        (!tipo || r.tipo === tipo) &&
        (!status || r.status === status) &&
        (!formato || r.formato === formato),
    );
  }, [relatorios, busca, tipo, status, formato]);

  const cards = [
    { label: 'Total', value: relatorios.length },
    { label: 'Gerados', value: relatorios.filter((r) => r.status === 'Gerado').length },
    { label: 'Processando', value: relatorios.filter((r) => r.status === 'Processando').length },
    { label: 'Falhas', value: relatorios.filter((r) => r.status === 'Falhou').length },
  ];

  const handleCriar = async (dados: RelatorioFormData) => {
    await relatorioService.criar(dados);
    setMostrarForm(false);
    void carregar();
    setTimeout(() => {
      void carregar();
    }, 3500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Relatórios</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Gere e baixe relatórios operacionais.
          </p>
        </div>
        <button
          onClick={() => setMostrarForm(true)}
          className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          <Plus size={16} /> Novo Relatório
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

      <RelatorioFilters
        busca={busca}
        tipo={tipo}
        status={status}
        formato={formato}
        onBusca={setBusca}
        onTipo={setTipo}
        onStatus={setStatus}
        onFormato={setFormato}
      />
      <RelatorioList relatorios={filtrados} onDetails={setDetalhe} onBaixar={baixarCsv} />

      {detalhe && <RelatorioDetails relatorio={detalhe} onClose={() => setDetalhe(null)} />}
      {mostrarForm && (
        <RelatorioForm onClose={() => setMostrarForm(false)} onSubmit={handleCriar} />
      )}
    </div>
  );
}
