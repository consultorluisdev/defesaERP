import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "../../contexts/ThemeContext";

type ThemeToggleProps = {
    /** Botão menor em barras compactas */
    compact?: boolean;
};

export function ThemeToggle({ compact }: ThemeToggleProps) {
    const { theme, toggleTheme } = useTheme();
    const dark = theme === "dark";

    return (
        <button
            type="button"
            onClick={toggleTheme}
            aria-label={dark ? "Ativar tema claro" : "Ativar tema escuro"}
            title={dark ? "Tema claro" : "Tema escuro"}
            className={
                compact
                    ? "inline-flex h-9 w-9 items-center justify-center rounded-lg border border-orange-300/50 bg-white/90 text-amber-800 shadow-sm transition hover:bg-orange-50 dark:border-orange-400/25 dark:bg-white/10 dark:text-amber-200 dark:hover:bg-white/15"
                    : "inline-flex items-center gap-2 rounded-xl border border-orange-300/50 bg-white/90 px-3 py-2 text-sm font-medium text-amber-900 shadow-sm transition hover:bg-orange-50 dark:border-orange-400/25 dark:bg-white/10 dark:text-amber-100 dark:hover:bg-white/15"
            }
        >
            {dark ? (
                <>
                    <FaSun className="h-4 w-4 shrink-0" aria-hidden />
                    {!compact ? <span>Claro</span> : null}
                </>
            ) : (
                <>
                    <FaMoon className="h-4 w-4 shrink-0" aria-hidden />
                    {!compact ? <span>Escuro</span> : null}
                </>
            )}
        </button>
    );
}
