import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    FaEnvelope,
    FaExclamationTriangle,
    FaEye,
    FaEyeSlash,
    FaLock,
    FaShieldAlt,
    FaSpinner,
    FaTimes,
    FaUserPlus,
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

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { register, error, setError } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            setError("As senhas não conferem");
            return;
        }

        setLoading(true);
        const result = await register({ email, password });
        setLoading(false);

        if (result.success) {
            navigate("/login");
        }
    };

    const header = (
        <div className="mb-6 text-center">
            <div className="relative mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 shadow-lg shadow-orange-900/40 ring-2 ring-amber-400/30 dark:shadow-orange-900/50 dark:ring-amber-400/25">
                <FaShieldAlt className="absolute h-10 w-10 text-white/25 dark:text-white/20" aria-hidden />
                <FaUserPlus className="relative h-8 w-8 text-white drop-shadow-md" aria-hidden />
            </div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Criar conta</h1>
            <p className="mt-1 text-sm text-zinc-600 dark:text-amber-100">
                Defesa Civil · Brusque · SC
            </p>
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
                    <label htmlFor="register-email" className={authLabelClass}>
                        E-mail
                    </label>
                    <div className="relative">
                        <FaEnvelope className={authFieldIconClass} aria-hidden />
                        <input
                            id="register-email"
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
                    <label htmlFor="register-password" className={authLabelClass}>
                        Senha
                    </label>
                    <div className="relative">
                        <FaLock className={authFieldIconClass} aria-hidden />
                        <input
                            id="register-password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={loading}
                            autoComplete="new-password"
                            className={authPasswordInputClass}
                            placeholder="••••••••"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className={authTogglePwdBtnClass}
                            aria-label={showPassword ? "Ocultar senhas" : "Mostrar senhas"}
                        >
                            {showPassword ? (
                                <FaEyeSlash className="h-4 w-4" aria-hidden />
                            ) : (
                                <FaEye className="h-4 w-4" aria-hidden />
                            )}
                        </button>
                    </div>
                </div>

                <div>
                    <label htmlFor="register-confirm" className={authLabelClass}>
                        Confirmar senha
                    </label>
                    <div className="relative">
                        <FaLock className={authFieldIconClass} aria-hidden />
                        <input
                            id="register-confirm"
                            type={showPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            disabled={loading}
                            autoComplete="new-password"
                            className={authInputClass}
                            placeholder="••••••••"
                        />
                    </div>
                </div>

                <button type="submit" disabled={loading} className={authSubmitClass}>
                    {loading ? (
                        <>
                            <FaSpinner className="h-4 w-4 animate-spin" aria-hidden />
                            Cadastrando...
                        </>
                    ) : (
                        <>
                            <FaUserPlus className="h-4 w-4" aria-hidden />
                            Cadastrar
                        </>
                    )}
                </button>

                <div className={authDividerClass}>
                    <Link to="/login" className={authFooterLinkClass}>
                        Já tem conta? <strong>Entrar</strong>
                    </Link>
                </div>
            </form>
        </AuthShell>
    );
};

export default Register;
