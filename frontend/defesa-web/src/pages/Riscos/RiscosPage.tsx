import { RiscoFilters } from "../../components/Riscos/RiscoFilters";
import { RiscoList } from "../../components/Riscos/RiscoList";
import { RiscoMap } from "../../components/Riscos/RiscoMap";

export function RiscosPage() {
    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Riscos</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Estrutura inicial do módulo de riscos.
                </p>
            </header>
            <RiscoFilters />
            <RiscoList />
            <RiscoMap />
        </div>
    );
}
