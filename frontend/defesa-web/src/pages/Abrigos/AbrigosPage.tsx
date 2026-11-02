import { AbrigoFilters } from "../../components/Abrigos/AbrigoFilters";
import { AbrigoList } from "../../components/Abrigos/AbrigoList";

export function AbrigosPage() {
    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Abrigos</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Estrutura inicial do módulo de abrigos.
                </p>
            </header>
            <AbrigoFilters />
            <AbrigoList />
        </div>
    );
}
