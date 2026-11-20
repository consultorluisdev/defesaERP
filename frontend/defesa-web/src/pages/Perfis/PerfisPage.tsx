import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { PerfilDetails } from '../../components/Perfis/PerfilDetails';
import { PerfilForm } from '../../components/Perfis/PerfilForm';
import { PerfilList } from '../../components/Perfis/PerfilList';
import { perfilService } from '../../services/perfilService';
import type { Perfil, PerfilFormData } from '../../types/perfil';

export function PerfisPage() {
  const [perfis, setPerfis] = useState<Perfil[]>([]);
  const [detalhe, setDetalhe] = useState<Perfil | null>(null);
  const [mostrarForm, setMostrarForm] = useState(false);

  const carregar = () => perfilService.listar().then(setPerfis);
  useEffect(() => {
    void carregar();
  }, []);

  const cards = [
    { label: 'Total de Perfis', value: perfis.length },
    { label: 'Ativos', value: perfis.filter((p) => p.ativo).length },
    { label: 'Usuários Vinculados', value: perfis.reduce((s, p) => s + p.usuarios, 0) },
  ];

  const handleCriar = async (dados: PerfilFormData) => {
    await perfilService.criar(dados);
    setMostrarForm(false);
    void carregar();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Perfis</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Perfis de acesso e permissões.</p>
        </div>
        <button
          onClick={() => setMostrarForm(true)}
          className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          <Plus size={16} /> Novo Perfil
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
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

      <PerfilList perfis={perfis} onDetails={setDetalhe} />
      {detalhe && <PerfilDetails perfil={detalhe} onClose={() => setDetalhe(null)} />}
      {mostrarForm && <PerfilForm onClose={() => setMostrarForm(false)} onSubmit={handleCriar} />}
    </div>
  );
}
