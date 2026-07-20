import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { OcorrenciaPage } from "./pages/OcorrenciaPage";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { PrivateRoute } from "./routes/PrivateRoute";
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
                            <Route path="/alertas" element={<Placeholder title="Alertas" />} />
                            <Route path="/radar" element={<Placeholder title="Radar" />} />
                            <Route path="/riscos" element={<Placeholder title="Riscos" />} />
                            <Route path="/equipes" element={<Placeholder title="Equipes" />} />
                            <Route path="/abrigo" element={<Placeholder title="Abrigos" />} />
                            <Route path="/viaturas" element={<Placeholder title="Viaturas" />} />
                            <Route path="/relatorios" element={<Placeholder title="Relatórios" />} />
                            <Route path="/analises" element={<Placeholder title="Análises" />} />
                            <Route path="/ia-predict-ia" element={<Placeholder title="IA Predict" />} />
                            <Route path="/perfis" element={<Placeholder title="Perfis" />} />
                            <Route path="/configuracoes" element={<Placeholder title="Configurações" />} />
                        </Route>
                        <Route path="*" element={<h1 className="p-8 text-center text-gray-500">404 - Página não encontrada</h1>} />
                    </Routes>
                </Router>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
