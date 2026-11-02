import { PerfilCard } from "./PerfilCard";

export function PerfilList() {
    return (
        <section className="space-y-3">
            <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Lista de perfis</h2>
            <PerfilCard />
        </section>
    );
}
