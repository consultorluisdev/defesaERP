import { AbrigoCard } from "./AbrigoCard";

export function AbrigoList() {
    return (
        <section className="space-y-3">
            <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Lista de abrigos</h2>
            <AbrigoCard />
        </section>
    );
}
