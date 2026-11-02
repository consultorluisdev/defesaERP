import { PerfilList } from "../../components/Perfis/PerfilList";

export function PerfisPage() {
    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Perfis</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Estrutura inicial do módulo de perfis.
                </p>
            </header>
            <PerfilList />
        </div>
    );
}
