/** Classes Tailwind compartilhadas entre Login e Register (claro / escuro). */

export const authLabelClass =
    "mb-2 block text-sm font-medium text-zinc-700 dark:text-amber-100";

const INPUT_BASE =
    "w-full rounded-xl border py-2.5 pl-10 transition-all focus:outline-none disabled:opacity-60 " +
    "border-orange-300/60 bg-white text-zinc-900 shadow-sm placeholder:text-zinc-400 " +
    "focus:border-amber-500 focus:ring-2 focus:ring-amber-400/35 " +
    "dark:border-orange-200/30 dark:bg-white/10 dark:text-white dark:shadow-none " +
    "dark:placeholder:text-amber-200/70 dark:focus:border-amber-400 dark:focus:ring-amber-400/25";

export const authInputClass = `${INPUT_BASE} pr-3`;

export const authPasswordInputClass = `${INPUT_BASE} pr-12`;

export const authFieldIconClass =
    "pointer-events-none absolute left-3 top-1/2 h-[1.05rem] w-[1.05rem] -translate-y-1/2 text-amber-600 dark:text-amber-300";

export const authErrorBannerClass =
    "flex items-start gap-2 rounded-xl border border-red-500/75 bg-red-500/15 p-3 text-sm text-red-800 dark:border-red-500/80 dark:bg-red-500/20 dark:text-red-200";

export const authErrorIconClass =
    "mt-0.5 h-4 w-4 shrink-0 text-red-600 dark:text-red-400";

export const authDismissBtnClass =
    "shrink-0 rounded-lg p-1 text-red-600 transition hover:bg-red-500/15 hover:text-red-900 dark:text-red-300 dark:hover:bg-red-500/20 dark:hover:text-white";

export const authSubmitClass =
    "flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-600 py-2.5 font-semibold text-white transition hover:opacity-95 disabled:opacity-50";

export const authFooterLinkClass =
    "text-sm text-orange-800 transition hover:text-orange-950 dark:text-amber-200 dark:hover:text-white";

export const authTogglePwdBtnClass =
    "absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-amber-700 transition hover:bg-orange-100 hover:text-amber-900 dark:text-amber-300 dark:hover:bg-white/10 dark:hover:text-amber-100";

export const authDividerClass =
    "border-t border-zinc-200 pt-4 text-center dark:border-white/10";
