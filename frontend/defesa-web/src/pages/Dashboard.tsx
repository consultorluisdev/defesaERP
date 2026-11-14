import React, { useEffect, useState } from 'react';
import api from '../services/api';
import {
  AlertTriangle,
  MapPin,
  CloudRain,
  Wind,
  Droplets,
  Users,
  Home,
  Activity,
  Truck,
  Bell,
  Clock,
  ChevronRight
} from 'lucide-react';

interface CidadeMonitoramento {
  cidade: string;
  risco: string;
}

interface DashboardData {
  alertasAtivos: number;
  ocorrenciaAbertas: number;
  abrigosDisponiveis: number;
  riscoGeral: string;
  equipesEmCampo: string;
  temperatura: number;
  umidade: number;
  velocidadeVento: number;
  indiceRisco: number;
  cidades: { nome: string; clima: string; temperatura: string; risco: string }[];
  ultimosAlertas: { id: number; alerta: string; tempo: string; cidade: string; nivel: string; dataHora: string }[];
  equipes: { id: number; nome: string; status: string; local: string; icone: string }[];
}

const Dashboard: React.FC = () => {
  const [cidades, setCidades] = useState<CidadeMonitoramento[]>([]);
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/Monitoramento')
      .then(res => setCidades(res.data))
      .catch(() => {
        setCidades([
          { cidade: "Brusque", risco: "Crítico" },
          { cidade: "Itajaí", risco: "Alto" },
          { cidade: "Blumenau", risco: "Moderado" },
        ]);
      });
  }, []);

  useEffect(() => {
    api.get('/Dashboard')
      .then(res => setDashboard(res.data))
      .catch(() => setDashboard(null))
      .finally(() => setLoading(false));
  }, []);

  const nivelMap: Record<string, string> = {
    "Critico": "Crítico",
    "Alto": "Alto",
    "Moderado": "Moderado",
    "Baixo": "Baixo",
    "Risco FORTE": "Crítico",
    "Risco MÉDIO": "Moderado",
    "Risco Normal": "Baixo",
  };

  const getRiscoBadge = (risco: string) => {
    const configs: Record<string, string> = {
      Alto: 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800',
      Moderado: 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800',
      Baixo: 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800',
    };
    const classes = configs[risco] || 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800';
    return (
      <span className={`px-2 py-1 rounded-full border text-xs font-semibold ${classes}`}>
        {risco}
      </span>
    );
  };

  const getNivelBadge = (nivel: string) => {
    const configs: Record<string, string> = {
      Crítico: 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800',
      Alto: 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800',
      Moderado: 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800',
    };
    const classes = configs[nivel] || 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-700/40 dark:text-gray-300 dark:border-gray-600';
    return (
      <span className={`px-2 py-1 rounded-full border text-xs font-semibold ${classes}`}>
        {nivel}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400"></div>
      </div>
    );
  }

  const d = dashboard;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Home</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Monitoramento em tempo real dos alertas da defesa civil
        </p>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-4 py-1.5 bg-green-100 dark:bg-green-500/10 border border-green-200 dark:border-green-800 rounded-lg">
            <div className="w-2 h-2 rounded-full bg-green-600 dark:bg-green-400 animate-pulse"></div>
            <span className="text-xs font-medium text-green-700 dark:text-green-400">Sistema Online</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-red-100 dark:bg-red-500/10 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">{d?.alertasAtivos ?? 0}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Alertas Ativos</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">+2 nas últimas 24h</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-red-100 dark:bg-red-500/10 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">{d?.ocorrenciaAbertas ?? 0}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Ocorrências abertas</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">5 aguardando atendimento</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-500/10 rounded-lg">
              <CloudRain className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              {d ? `${d.temperatura}°C` : '--'}
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Clima Atual</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Temperatura atual</p>
          <div className="flex items-center justify-end gap-3 mt-2 text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1"><Activity className="w-4 h-4" /> {d?.temperatura ?? '--'}°C</span>
            <span className="flex items-center gap-1"><Droplets className="w-4 h-4" /> {d?.umidade ?? '--'}%</span>
            <span className="flex items-center gap-1"><Wind className="w-4 h-4" /> {d?.velocidadeVento ?? '--'} km/h</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-red-100 dark:bg-red-500/10 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">{d?.riscoGeral ?? '--'}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Risco Geral</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Indice: {d?.indiceRisco ?? '--'}/10</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-500/10 rounded-lg">
              <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">{d?.equipes?.length ?? 0}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Equipes em Campo</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{d?.equipesEmCampo || 'Nenhuma equipe'}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-green-100 dark:bg-green-500/10 rounded-lg">
              <Home className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">{d?.abrigosDisponiveis ?? 0}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Abrigos Disponíveis</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Capacidade: 450 pessoas</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Monitoramento por cidade</h2>
              </div>
              <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                Detalhes <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700/50">
                  <tr>
                    <th className="text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase px-4 py-2">Cidade</th>
                    <th className="text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase px-4 py-2">Nível</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {cidades.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{item.cidade}</td>
                      <td className="px-4 py-3 text-sm">{getRiscoBadge(nivelMap[item.risco] || item.risco)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="relative h-80 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4 flex items-center justify-center overflow-hidden">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-gray-400 mb-4 dark:text-gray-500 mx-auto" />
              <p className="text-gray-500 dark:text-gray-400">Mapa de Ocorrência (em desenvolvimento)</p>
            </div>
            <div className="absolute top-1/4 left-1/3">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-ping absolute"></div>
              <div className="w-3 h-3 rounded-full bg-red-500 relative"></div>
            </div>
            <div className="absolute bottom-1/3 right-1/3">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-ping absolute"></div>
              <div className="w-3 h-3 rounded-full bg-red-500 relative"></div>
            </div>
            <div className="absolute top-2/3 right-1/4">
              <div className="relative">
                <div className="w-3 h-3 rounded-full bg-yellow-500 animate-ping absolute"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 relative"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Últimos Alertas</h2>
              </div>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {(d?.ultimosAlertas ?? []).map((alerta) => (
                <div key={alerta.id} className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{alerta.cidade}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{alerta.alerta}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getNivelBadge(nivelMap[alerta.nivel] || alerta.nivel)}
                      <span className="text-xs text-gray-400 dark:text-gray-500">{alerta.tempo}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-green-600 dark:text-green-400" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Equipes em Campo</h2>
              </div>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {(d?.equipes ?? []).map((equipe) => (
                <div key={equipe.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{equipe.icone}</div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 dark:text-white">{equipe.nome}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{equipe.local}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-green-600 dark:text-green-400">ativo</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700">
              <button className="w-full text-center text-sm text-blue-600 dark:text-blue-400 hover:underline">
                Ver todas as equipes →
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Logística e Suprimentos</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
