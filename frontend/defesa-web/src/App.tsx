import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { AbrigosPage } from './pages/Abrigos/AbrigosPage';
import { AlertasPage } from './pages/AlertasPage';
import { AnalisesPage } from './pages/Analises/AnalisesPage';
import { ConfiguracoesPage } from './pages/Configuracoes/ConfiguracoesPage';
import Dashboard from './pages/Dashboard';
import { EquipePage } from './pages/EquipesPage';
import { IAPredictPage } from './pages/IAPredict/IAPredictPage';
import Login from './pages/Login';
import { OcorrenciaPage } from './pages/OcorrenciaPage';
import { PerfisPage } from './pages/Perfis/PerfisPage';
import RadarPage from './pages/Radar/RadarPage';
import Register from './pages/Register';
import { RelatoriosPage } from './pages/Relatorios/RelatoriosPage';
import { RiscosPage } from './pages/Riscos/RiscosPage';
import SolicitacaoPage from './pages/SolicitacaoPage';
import { ViaturasPage } from './pages/Viaturas/ViaturasPage';
import VistoriaPage from './pages/Vistorias/VistoriaPage';
import { PrivateRoute } from './routes/PrivateRoute';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              element={
                <PrivateRoute>
                  <Layout />
                </PrivateRoute>
              }
            >
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/ocorrencias" element={<OcorrenciaPage />} />
              <Route path="/alertas" element={<AlertasPage />} />
              <Route path="/solicitacoes" element={<SolicitacaoPage />} />
              <Route path="/radar" element={<RadarPage />} />
              <Route path="/riscos" element={<RiscosPage />} />
              <Route path="/equipes" element={<EquipePage />} />
              <Route path="/abrigo" element={<AbrigosPage />} />
              <Route path="/viaturas" element={<ViaturasPage />} />
              <Route path="/relatorios" element={<RelatoriosPage />} />
              <Route path="/analises" element={<AnalisesPage />} />
              <Route path="/ia-predict" element={<IAPredictPage />} />
              <Route path="/ia-predict-ia" element={<Navigate to="/ia-predict" replace />} />
              <Route path="/perfis" element={<PerfisPage />} />
              <Route path="/configuracoes" element={<ConfiguracoesPage />} />
              <Route path="/vistorias" element={<VistoriaPage />} />
            </Route>
            <Route
              path="*"
              element={
                <h1 className="p-8 text-center text-gray-500">404 - Página não encontrada</h1>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
