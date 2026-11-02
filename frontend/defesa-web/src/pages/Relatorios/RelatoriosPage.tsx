import { RelatorioFilters } from "../../components/Relatorios/RelatorioFilters";
import { RelatorioList } from "../../components/Relatorios/RelatorioList";

export function RelatoriosPage() {
    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Relatórios</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Estrutura inicial do módulo de relatórios.
                </p>
            </header>
            <RelatorioFilters />
            <RelatorioList />
        </div>
    );
}
