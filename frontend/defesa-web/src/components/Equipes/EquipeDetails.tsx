import { Mail, MapPin, Phone, Users, X } from "lucide-react";
import type { Equipe } from "@/types/equipe";

interface EquipeDetailsProps {
    equipe: Equipe;
    onClose: () => void;
}

export function EquipeDetails({
    equipe,
    onClose,
}: EquipeDetailsProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <div className="w-full max-w-lg rounded-xl border border-[#1e293b] bg-[#111a2c] p-6">
                <div className="mb-5 flex items-start justify-between">
                    <div>
                        <h2 className="text-lg font-bold text-gray-100">
                            {equipe.nome}
                        </h2>

                        <p className="mt-1 text-xs text-gray-500">
                            {equipe.tipo}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="text-gray-400 transition-colors hover:text-gray-200"
                        aria-label="Fechar"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="mb-5">
                    <span className="rounded-full border border-gray-600 bg-gray-800 px-3 py-1 text-xs font-medium text-gray-200">
                        {equipe.status}
                    </span>
                </div>

                {equipe.descricao && (
                    <p className="mb-5 text-sm text-gray-300">
                        {equipe.descricao}
                    </p>
                )}

                <div className="grid grid-cols-1 gap-3 text-sm text-gray-400 sm:grid-cols-2">
                    <div className="flex items-center gap-2">
                        <Users size={16} className="text-gray-500" />

                        <span>
                            {equipe.quantidadeMembros} membros
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-gray-500" />

                        <span>
                            {equipe.municipio || "Município não informado"}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Phone size={16} className="text-gray-500" />

                        <span>
                            {equipe.telefone}
                        </span>
                    </div>

                    {equipe.email && (
                        <div className="flex items-center gap-2">
                            <Mail size={16} className="text-gray-500" />

                            <span>
                                {equipe.email}
                            </span>
                        </div>
                    )}
                </div>

                <div>
                    <div className="mt-5 border-t border-[#1e293b] pt-4">
                        <div className="space-y-2 text-xs text-gray-400">
                            <p>
                                <span className="font-medium text-gray-300">
                                    Responsável:
                                </span>{" "}
                                {equipe.responsavel}
                            </p>

                            <p>
                                <span className="font-medium text-gray-300">
                                    Endereço:
                                </span>{" "}
                                {equipe.endereco || "Não informado"}
                            </p>

                            <p>
                                <span className="font-medium text-gray-300">
                                    Localização atual:
                                </span>{" "}
                            </p>
                            {equipe.observacoes && (
                                <p>
                                    <span className="font-medium text-gray-300">
                                        Observações:
                                    </span>{" "}
                                </p>
                            )}

                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}