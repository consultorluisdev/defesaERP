import type { ReactNode } from "react";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";

type AuthShellProps = {
    header: ReactNode;
    children: ReactNode;
};

/**
 * Fundo + cartão compartilhados entre Login e Register (tema claro/escuro).
 */
export function AuthShell({ header, children }: AuthShellProps) {
    return (
        <div
            className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-orange-50 via-amber-100 to-orange-100 p-4 pt-20 dark:from-zinc-950 dark:via-orange-600 dark:to-red-700"
        >
            <div className="absolute right-4 top-4 z-10">
                <ThemeToggle />
            </div>
            <div className="animate-fadeInUp w-full max-w-sm">
                <div
                    className="rounded-2xl border border-orange-300/50 bg-white/90 p-6 shadow-xl shadow-orange-900/10 backdrop-blur-xl dark:border-orange-300/30 dark:bg-zinc-950/60 dark:shadow-orange-950/50"
                >
                    {header}
                    {children}
                </div>
            </div>
        </div>
    );
}
