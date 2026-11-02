import { VistoriaCard } from "./VistoriaCard";
import type { Vistoria } from "../../types/vistoria";

interface VistoriaListProps {
    vistorias: Vistoria[];
    onSelect: (vistoria: Vistoria) => void;
}

export default function VistoriaList({
    vistorias,
    onSelect,
}: VistoriaListProps) {
    if (vistorias.length === 0) {
        return (
            <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center dark:border-gray-700 dark:bg-gray-900">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Nenhuma vistoria encontrada
                </h3>

                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Tente ajustar seus filtros ou criar uma nova vistoria.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 xl:grid-cols-3">
            {vistorias.map((vistoria) => (
                <VistoriaCard
                    key={vistoria.id}
                    vistoria={vistoria}
                    onSelect={onSelect}
                />
            ))}
        </div>
    );
}
