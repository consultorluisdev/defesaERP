import React from "react";
import { FaShieldAlt } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";

const Dashboard: React.FC = () => {
    const { user } = useAuth();

    const greetingName = user?.name ?? user?.email ?? "visitante";

    return (
        <div className="dashboard-shell flex min-h-0 flex-1 flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-orange-50 via-amber-100 to-orange-100 p-4 shadow-inner sm:p-6 dark:from-zinc-950 dark:via-orange-600 dark:to-red-700">
            <div className="w-full max-w-lg animate-fadeInUp">
                <div className="rounded-2xl border border-orange-300/50 bg-white/90 p-6 text-center shadow-xl shadow-orange-900/15 backdrop-blur-xl sm:p-8 dark:border-orange-300/30 dark:bg-zinc-950/60 dark:shadow-orange-950/40">
                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 shadow-lg shadow-orange-900/35 dark:shadow-orange-900/40">
                        <FaShieldAlt className="text-3xl text-white" aria-hidden />
                    </div>
                    <h1 className="mb-2 break-words text-2xl font-bold text-zinc-900 md:text-3xl dark:text-white">
                        Olá, {greetingName}
                    </h1>
                    <p className="mb-6 text-sm text-zinc-600 md:text-base dark:text-amber-100/90">
                        Painel da Defesa Civil — Brusque · SC
                    </p>
                    <div className="rounded-xl border border-orange-200/60 bg-orange-50/50 px-4 py-3 text-left dark:border-orange-200/20 dark:bg-white/5">
                        <p className="text-xs font-semibold uppercase tracking-wide text-orange-800 dark:text-amber-200/80">
                            Sessão ativa
                        </p>
                        <p className="mt-1 truncate text-sm text-zinc-800 dark:text-white">
                            {user?.email ?? "—"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
