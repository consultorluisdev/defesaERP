import RiscoCard from "./RiscoCard";
import type { Risco } from "@/types/risco";

interface RiscoListProps {
    riscos: Risco[];
    onSelect: (risco: Risco) => void;
}

export default function RiscoList({
    riscos,
    onSelect,
}: RiscoListProps){
    if(riscos.length === 0){
        return(
            <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center dark:border-gray-700 dark:bg-gray-800">
                <h3 className="text-gray-900 dark:text-white">
                    Nenhuma área de risco encontrada
                </h3>

                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Não existe 
                </p>

            </div>
        )
    }

    return(
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            {riscos.map((risco) => (
                <RiscoCard
                key={risco.id}
                risco={risco}
                onClick={() => onSelect(risco)}
                />
            ))}
        </div>
    );
}

export { RiscoList };