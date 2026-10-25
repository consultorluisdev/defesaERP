import React from "react";
import { Solicitacao } from "@/types/solicitacao";
import { SolicitacaoCard } from "./SolicitacaoCard";

interface SolicitacaoListProps {
    solicitacoes: Solicitacao[];
    onSelect: (id: number) => void;
}

export const SolicitacaoList: React.FC<SolicitacaoListProps> = ({
    solicitacoes,
    onSelect,
}) => {
    if(solicitacoes.length === 0){
        return (
            <div className="rounded-lg border border-gray-700 bg-[#111827] p-8 text-center">
                <p className="text-gray-400">
                    Nenhuma solicitação encontrada.
                </p>
            </div>
        );
    }

    return(
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {solicitacoes.map((solicitacao) => (
                <SolicitacaoCard
                key={solicitacao.id}
                solicitacao={solicitacao}
                onClick={onSelect}
                />
            ))}
        </div>
    )
}