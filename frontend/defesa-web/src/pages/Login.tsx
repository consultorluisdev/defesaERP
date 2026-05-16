import { useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
    FaEnvelope,
    FaExclamationTriangle,
    FaEye,
    FaEyeSlash,
    FaLock,
    FaShieldAlt,
    FaSignInAlt,
    FaSpinner,
    FaTimes,
} from "react-icons/fa";
import { AuthShell } from "../components/auth/AuthShell";
import {
    authDividerClass,
    authDismissBtnClass,
    authErrorBannerClass,
    authErrorIconClass,
    authFieldIconClass,
    authFooterLinkClass,
    authInputClass,
    authLabelClass,
    authPasswordInputClass,
    authSubmitClass,
    authTogglePwdBtnClass,
} from "../components/auth/authStyles";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { login, error, setError } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const result = await login(email, password);
        if (result.success) {
            navigate("/dashboard");
        }
        setLoading(false);
    };

    const header = (
        <div className="mb-6 text-center">
            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 shadow-lg shadow-orange-900/40 ring-2 ring-amber-400/30 dark:shadow-orange-900/50 dark:ring-amber-400/25">
                <FaShieldAlt className="h-8 w-8 text-white drop-shadow-md" aria-hidden />
            </div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Defesa Civil</h1>
            <p className="mt-1 text-sm text-zinc-600 dark:text-amber-100">Brusque · SC</p>
        </div>
    );

    return (
        <AuthShell header={header}>
            <form onSubmit={handleSubmit} className="space-y-4">
                {error ? (
                    <div className={authErrorBannerClass}>
                        <FaExclamationTriangle className={authErrorIconClass} aria-hidden />
                        <span className="min-w-0 flex-1">{error}</span>
                        <button
                            type="button"
                            onClick={() => setError(null)}
                            className={authDismissBtnClass}
                            aria-label="Fechar mensagem"
                        >
                            <FaTimes className="h-4 w-4" aria-hidden />
                        </button>
                    </div>
                ) : null}

                <div>
                    <label htmlFor="login-email" className={authLabelClass}>
                        E-mail
                    </label>
                    <div className="relative">
                        <FaEnvelope className={authFieldIconClass} aria-hidden />
                        <input
                            id="login-email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={loading}
                            autoComplete="email"
                            className={authInputClass}
                            placeholder="seu@email.com"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="login-password" className={authLabelClass}>
                        Senha
                    </label>
                    <div className="relative">
                        <FaLock className={authFieldIconClass} aria-hidden />
                        <input
                            id="login-password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={loading}
                            autoComplete="current-password"
                            className={authPasswordInputClass}
                            placeholder="••••••••"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className={authTogglePwdBtnClass}
                            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                        >
                            {showPassword ? (
                                <FaEyeSlash className="h-4 w-4" aria-hidden />
                            ) : (
                                <FaEye className="h-4 w-4" aria-hidden />
                            )}
                        </button>
                    </div>
                </div>

                <button type="submit" disabled={loading} className={authSubmitClass}>
                    {loading ? (
                        <>
                            <FaSpinner className="h-4 w-4 animate-spin" aria-hidden />
                            Entrando...
                        </>
                    ) : (
                        <>
                            <FaSignInAlt className="h-4 w-4" aria-hidden />
                            Entrar
                        </>
                    )}
                </button>

                <div className={authDividerClass}>
                    <Link to="/register" className={authFooterLinkClass}>
                        Não tem conta? <strong>Cadastre-se</strong>
                    </Link>
                </div>
            </form>
        </AuthShell>
    );
};

export default Login;
