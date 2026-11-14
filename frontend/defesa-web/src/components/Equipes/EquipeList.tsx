import React from "react";
import { Equipe } from "../../types/equipe";
import { EquipeCard } from "./EquipeCard";

interface EquipeListProps {
    equipes: Equipe[];
    onSelect: (id: number) => void;
}

export const EquipeList: React.FC<EquipeListProps> = ({
    equipes,
    onSelect,
}) => {
    if (equipes.length === 0) {
        return (
            <div className="rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center dark:border-gray-700 dark:bg-gray-800">
                <p className="text-gray-500 dark:text-gray-400">
                    Nenhuma equipe encontrada.
                </p>

            </div>
        );
    }


    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {equipes.map((equipe) => (
                <EquipeCard
                    key={equipe.id}
                    equipe={equipe}
                    onClick={onSelect}
                />
            ))}
        </div>
    );
}