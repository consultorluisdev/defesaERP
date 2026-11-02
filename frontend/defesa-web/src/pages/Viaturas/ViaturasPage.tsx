import { ViaturaFilters } from "../../components/Viaturas/ViaturaFilters";
import { ViaturaList } from "../../components/Viaturas/ViaturaList";

export function ViaturasPage() {
    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Viaturas</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Estrutura inicial do módulo de viaturas.
                </p>
            </header>
            <ViaturaFilters />
            <ViaturaList />
        </div>
    );
}
