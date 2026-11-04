import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import SolicitacaoPage from "./pages/SolicitacaoPage";
import { EquipePage } from "./pages/EquipesPage";
import { OcorrenciaPage } from "./pages/OcorrenciaPage";
import { AlertasPage } from "./pages/AlertasPage";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { PrivateRoute } from "./routes/PrivateRoute";
import VistoriaPage from "./pages/Vistorias/VistoriaPage";
import RadarPage from "./pages/Radar/RadarPage";
import   RiscosPage  from "./pages/Riscos/RiscosPage";
import { AbrigosPage } from "./pages/Abrigos/AbrigosPage";
import { ViaturasPage } from "./pages/Viaturas/ViaturasPage";
import { RelatoriosPage } from "./pages/Relatorios/RelatoriosPage";
import { AnalisesPage } from "./pages/Analises/AnalisesPage";
import { PerfisPage } from "./pages/Perfis/PerfisPage";
import { ConfiguracoesPage } from "./pages/Configuracoes/ConfiguracoesPage";
import Layout from './components/Layout/Layout';

function Placeholder({ title }: { title: string }) {
    return (
        <div className="flex items-center justify-center h-64">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">{title}</h1>
                <p className="text-sm text-gray-500 mt-2">Página em desenvolvimento</p>
            </div>
        </div>
    );
}

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
                            <Route path="/ia-predict-ia" element={<Placeholder title="IA Predict" />} />
                            <Route path="/perfis" element={<PerfisPage />} />
                            <Route path="/configuracoes" element={<ConfiguracoesPage />} />
                            <Route path="/vistorias" element={<VistoriaPage />} />
                        </Route>
                        <Route path="*" element={<h1 className="p-8 text-center text-gray-500">404 - Página não encontrada</h1>} />
                    </Routes>
                </Router>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
