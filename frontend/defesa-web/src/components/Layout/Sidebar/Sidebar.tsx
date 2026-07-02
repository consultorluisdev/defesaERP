import React, { useMemo, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import type { IconType } from "react-icons/lib";
import {
    FaBell,
    FaBroadcastTower,
    FaChartBar,
    FaClipboardList,
    FaCog,
    FaExclamationTriangle,
    FaFileAlt,
    FaHome,
    FaRobot,
    FaShieldAlt,
    FaSignOutAlt,
    FaChevronLeft,
    FaChevronRight,
    FaTruck,
    FaUserCog,
    FaUsers,
    FaWarehouse,
} from "react-icons/fa";
import { useAuth } from "../../../contexts/AuthContext";
import "./Sidebar.css";

type MenuItem = {
    Icon: IconType;
    label: string;
    path: string;
    section: string;
    badge?: string;
};

const sections: Record<string, { title: string; order: number }> = {
    monitoramento: { title: "MONITORAMENTO", order: 1 },
    operacoes: { title: "OPERAÇÕES", order: 2 },
    relatorios: { title: "RELATÓRIOS", order: 3 },
    sistema: { title: "SISTEMA", order: 4 },
};

const menuItems: MenuItem[] = [
    { Icon: FaHome, label: "Dashboard", path: "/dashboard", section: "monitoramento" },
    { Icon: FaBell, label: "Alertas", path: "/alertas", badge: "7", section: "monitoramento" },
    { Icon: FaBroadcastTower, label: "Radar", path: "/radar", section: "monitoramento" },
    { Icon: FaExclamationTriangle, label: "Riscos", path: "/riscos", badge: "12", section: "monitoramento" },
    { Icon: FaClipboardList, label: "Ocorrências", path: "/ocorrencias", badge: "3", section: "operacoes" },
    { Icon: FaUsers, label: "Equipes", path: "/equipes", section: "operacoes" },
    { Icon: FaWarehouse, label: "Abrigo", path: "/abrigo", section: "operacoes" },
    { Icon: FaTruck, label: "Viaturas", path: "/viaturas", section: "operacoes" },
    { Icon: FaFileAlt, label: "Relatórios", path: "/relatorios", section: "relatorios" },
    { Icon: FaChartBar, label: "Análises", path: "/analises", section: "relatorios" },
    { Icon: FaRobot, label: "IA Predict", path: "/ia-predict-ia", section: "relatorios" },
    { Icon: FaUserCog, label: "Perfis", path: "/perfis", section: "sistema" },
    { Icon: FaCog, label: "Configurações", path: "/configuracoes", section: "sistema" },
];

type SiderbarProps = {
    /** Drawer aberto em viewport mobile (≤768px). */
    mobileOpen?: boolean;
};

const Siderbar: React.FC<SiderbarProps> = ({ mobileOpen = false }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);

    /** No drawer mobile, sempre mostrar labels ainda que desktop esteja colapsado. */
    const showExpandedNav = !collapsed || mobileOpen;

    const sortedSections = useMemo(
        () =>
            Object.entries(sections).sort((a, b) => a[1].order - b[1].order),
        [],
    );

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const displayName = user?.name ?? user?.email ?? "Usuário";
    const initials =
        displayName
            .split(/\s+/)
            .filter(Boolean)
            .slice(0, 2)
            .map((part) => part[0]?.toUpperCase() ?? "")
            .join("") || "?";

    const CollapseIcon = collapsed ? FaChevronRight : FaChevronLeft;

    return (
        <aside
            className={["sidebar", collapsed ? "collapsed" : "", mobileOpen ? "mobile-open" : ""]
                .filter(Boolean)
                .join(" ")}
        >
            <div className="logo">
                <div className="logo-icon" aria-hidden>
                    <FaShieldAlt />
                </div>
                {showExpandedNav ? (
                    <div className="logo-text">
                        <h1>Defesa Civil</h1>
                        <p>Brusque · SC</p>
                    </div>
                ) : null}
                <button
                    type="button"
                    className="collapse-btn"
                    onClick={() => setCollapsed((c) => !c)}
                    aria-expanded={!collapsed}
                    aria-label={collapsed ? "Expandir menu" : "Recolher menu"}
                >
                    <CollapseIcon />
                </button>
            </div>

            <nav className="nav" aria-label="Menu principal">
                {sortedSections.map(([sectionKey, sectionMeta]) => (
                    <div key={sectionKey} className="nav-section">
                        {showExpandedNav ? (
                            <span className="section-title">{sectionMeta.title}</span>
                        ) : null}
                        {menuItems
                            .filter((item) => item.section === sectionKey)
                            .map((item) => {
                                const { Icon } = item;
                                return (
                                    <NavLink
                                        key={`${sectionKey}-${item.path}`}
                                        to={item.path}
                                        className={({ isActive }) =>
                                            `nav-item${isActive ? " active" : ""}`
                                        }
                                        title={showExpandedNav ? undefined : item.label}
                                    >
                                        <Icon className="nav-icon" aria-hidden />
                                        {showExpandedNav ? (
                                            <span className="nav-label">{item.label}</span>
                                        ) : null}
                                        {showExpandedNav && item.badge ? (
                                            <span className="nav-badge">{item.badge}</span>
                                        ) : null}
                                        {!showExpandedNav && item.badge ? (
                                            <span className="nav-badge nav-badge--collapsed">{item.badge}</span>
                                        ) : null}
                                    </NavLink>
                                );
                            })}
                    </div>
                ))}
            </nav>

            <div className="sidebar-footer">
                <div className="user-avatar">{initials}</div>
                {showExpandedNav ? (
                    <div className="user-info">
                        <h4>{displayName}</h4>
                        {user?.role ? <p>{user.role}</p> : null}
                    </div>
                ) : null}
                <button
                    type="button"
                    className="logout-btn"
                    onClick={handleLogout}
                    title="Sair"
                >
                    <FaSignOutAlt aria-hidden />
                    {showExpandedNav ? (
                        <span className="logout-btn-label">Sair</span>
                    ) : null}
                </button>
            </div>
        </aside>
    );
};

export default Siderbar;
