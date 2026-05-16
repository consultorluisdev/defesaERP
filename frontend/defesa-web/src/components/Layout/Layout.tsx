import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Siderbar/Siderbar";
import Topbar from "./Topbar/Topbar";
import "./Layout.css";

const Layout: React.FC = () => {
    const location = useLocation();
    const [mobileNavOpen, setMobileNavOpen] = useState(false);

    useEffect(() => {
        setMobileNavOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        if (!mobileNavOpen) return;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileNavOpen]);

    return (
        <div className="app-layout">
            {mobileNavOpen ? (
                <button
                    type="button"
                    className="layout-mobile-backdrop"
                    aria-label="Fechar menu"
                    onClick={() => setMobileNavOpen(false)}
                />
            ) : null}
            <Sidebar mobileOpen={mobileNavOpen} />
            <main className="main-wrapper">
                <Topbar onOpenMobileNav={() => setMobileNavOpen(true)} />
                <div className="page-content">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;
