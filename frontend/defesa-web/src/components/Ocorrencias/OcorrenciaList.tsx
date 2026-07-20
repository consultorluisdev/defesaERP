import { Ocorrencia } from "../../types/ocorrencia";
import { OcorrenciaCard } from "./OcorrenciaCard";

interface Props {
    ocorrencias: Ocorrencia[];
    onSelect: (ocorrencia: Ocorrencia) => void;
}

export function OcorrenciaList({ ocorrencias, onSelect }: Props) {
    if (ocorrencias.length === 0) {
        return (
            <div className="text-center text-gray-500 py-12">
                <p className="text-sm">Nenhuma ocorrência encontrada.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {ocorrencias.map((o) => (
                <OcorrenciaCard key={o.id} ocorrencia={o} onClick={() => onSelect(o)} />
            ))}
        </div>
    );
}
