import { RiscoCard } from "./RiscoCard";

export function RiscoList() {
    return (
        <section className="space-y-3">
            <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Lista de riscos</h2>
            <RiscoCard />
        </section>
    );
}
