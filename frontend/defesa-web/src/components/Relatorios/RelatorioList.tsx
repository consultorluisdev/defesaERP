import { RelatorioCard } from "./RelatorioCard";

export function RelatorioList() {
    return (
        <section className="space-y-3">
            <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Lista de relatórios</h2>
            <RelatorioCard />
        </section>
    );
}
