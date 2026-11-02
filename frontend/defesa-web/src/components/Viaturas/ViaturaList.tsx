import { ViaturaCard } from "./ViaturaCard";

export function ViaturaList() {
    return (
        <section className="space-y-3">
            <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Lista de viaturas</h2>
            <ViaturaCard />
        </section>
    );
}
