import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { ThemeToggle } from "../../ThemeToggle/ThemeToggle";
import "./Topbar.css";

type TopbarProps = {
    onOpenMobileNav?: () => void;
};

const PAGE_NAMES: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/ocorrencias": "Ocorrências",
    "/alertas": "Alertas",
    "/radar": "Radar",
    "/riscos": "Riscos",
    "/equipes": "Equipes",
    "/abrigo": "Abrigos",
    "/viaturas": "Viaturas",
    "/relatorios": "Relatórios",
    "/analises": "Análises",
    "/ia-predict-ia": "IA Predict",
    "/perfis": "Perfis",
    "/configuracoes": "Configurações",
};

const Topbar: React.FC<TopbarProps> = ({ onOpenMobileNav }) => {
    const location = useLocation();
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatDate = (date: Date) => {
        return date.toLocaleString("pt-BR", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "2-digit",
        });
    };

    const formatTime = (date: Date) => {
        return date.toLocaleString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });
    };

    const pageName = PAGE_NAMES[location.pathname] ?? "Defesa Civil";

    return (
        <header className="topbar">
            <div className="topbar-left">
                {onOpenMobileNav ? (
                    <button
                        type="button"
                        className="icon-btn topbar-menu-btn"
                        onClick={onOpenMobileNav}
                        aria-label="Abrir menu"
                    >
                        <FaBars className="topbar-menu-icon" aria-hidden />
                    </button>
                ) : null}
                <div className="page-info">
                    <h2>{pageName}</h2>
                    <p className="page-info-sub">
                        {formatDate(currentTime)} — {formatTime(currentTime)}
                    </p>
                </div>
            </div>
            <div className="topbar-right">
                <ThemeToggle compact />
                <div className="live-badge">
                    <span className="live-dot" aria-hidden />
                    <span>AO VIVO</span>
                </div>
                <div className="datetime">
                    <span className="time">{formatTime(currentTime)}</span>
                </div>
                <button type="button" className="icon-btn" aria-label="Notificações">
                    🔔
                    <span className="notification-badge">7</span>
                </button>
                <button type="button" className="icon-btn" aria-label="Idioma ou rede">
                    🌐
                </button>
            </div>
        </header>
    );
};

export default Topbar;
