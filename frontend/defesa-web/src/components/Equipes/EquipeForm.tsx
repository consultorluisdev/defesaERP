import { useState, type FormEvent } from "react";
import {
    CreateEquipeDto,
    StatusEquipe,
    TiposEquipe,
} from "../../types/equipe";
import { equipeService } from "@/services/equipeService";
import { X } from "lucide-react";

interface EquipeFormProps {
    onClose: () => void;
    onSaved: () => void;
}

export function EquipeForm({
    onClose,
    onSaved,
}: EquipeFormProps) {
    const [form, setForm] = useState<CreateEquipeDto>({
        nome: "",
        descricao: "",
        tipo: TiposEquipe.ATENDIMENTO,
        status: StatusEquipe.DISPONIVEL,
        responsavel: "",
        telefone: "",
        email: "",
        municipio: "",
        endereco: "",
        quantidadeMembros: 0,
        localizacaoAtual: "",
        observacoes: "",
    });

    const [saving, setSaving] = useState(false);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setSaving(true);

        try{
            await equipeService.create(form);
            onSaved();
        } catch {
            setSaving(false);
        }
    };
    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl border border-[#1e203b] bg-[#111a2C] p-6">
                <div className="mb-5 flex items-center justify-between">
                    <h2 className="text-base font-bold text-gray-100">
                        Nova Equipe
                    </h2>

                    <button
                    type="button"
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-200"
                    >
                        <X size={18} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Campos serão adicionados aqui */}
                    <div className="flex gap-2 pt-2">
                        <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 rounded-lg border border-[#1e293b] py-2 text-sm text-gray-400 hover:text-gray-200"
                        >
                            Cancelar
                        </button>

                        <button
                        type="submit"
                        disabled={saving}
                        className="flex-1 rounded-lg bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700 disable:opacity-50"
                        >
                            {saving ? "Salvando.." : "Salvar"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}