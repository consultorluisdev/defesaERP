import { useState, type FormEvent } from "react";
import { CriarOcorrenciaDto, TipoOcorrencia, PrioridadeOcorrencia } from "../../types/ocorrencia";
import { ocorrenciaService } from "../../services/ocorrenciaService";
import { X } from "lucide-react";

interface Props {
    onClose: () => void;
    onSaved: () => void;
}

const TIPOS: TipoOcorrencia[] = ["Alagamento", "Deslizamento", "Incêndio", "Queda de Árvore", "Microexplosão", "Resgate", "Interdição", "Outros"];
const PRIORIDADES: PrioridadeOcorrencia[] = ["Crítica", "Alta", "Média", "Baixa"];

export function OcorrenciaForm({ onClose, onSaved }: Props) {
    const [form, setForm] = useState<CriarOcorrenciaDto>({
        numeroProtocolo: "",
        tipoOcorrencia: "Alagamento",
        descricao: "",
        dataHora: new Date().toISOString().slice(0, 16),
        cidade: "",
        bairro: "",
        endereco: "",
        prioridade: "Média",
    });
    const [saving, setSaving] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            await ocorrenciaService.criar(form);
            onSaved();
        } catch {
            setSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-[#111a2c] border border-[#1e293b] rounded-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-base font-bold text-gray-100">Nova Ocorrência</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-200">
                        <X size={18} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs text-gray-400 mb-1">Protocolo</label>
                            <input
                                required
                                maxLength={20}
                                value={form.numeroProtocolo}
                                onChange={(e) => setForm({ ...form, numeroProtocolo: e.target.value })}
                                className="w-full bg-[#0b1222] border border-[#1e293b] rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-400 mb-1">Data/Hora</label>
                            <input
                                required
                                type="datetime-local"
                                value={form.dataHora}
                                onChange={(e) => setForm({ ...form, dataHora: e.target.value })}
                                className="w-full bg-[#0b1222] border border-[#1e293b] rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs text-gray-400 mb-1">Descrição</label>
                        <textarea
                            required
                            rows={3}
                            maxLength={500}
                            value={form.descricao}
                            onChange={(e) => setForm({ ...form, descricao: e.target.value })}
                            className="w-full bg-[#0b1222] border border-[#1e293b] rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs text-gray-400 mb-1">Tipo</label>
                            <select
                                value={form.tipoOcorrencia}
                                onChange={(e) => setForm({ ...form, tipoOcorrencia: e.target.value as TipoOcorrencia })}
                                className="w-full bg-[#0b1222] border border-[#1e293b] rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-blue-500"
                            >
                                {TIPOS.map((t) => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs text-gray-400 mb-1">Prioridade</label>
                            <select
                                value={form.prioridade}
                                onChange={(e) => setForm({ ...form, prioridade: e.target.value as PrioridadeOcorrencia })}
                                className="w-full bg-[#0b1222] border border-[#1e293b] rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-blue-500"
                            >
                                {PRIORIDADES.map((p) => <option key={p} value={p}>{p}</option>)}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs text-gray-400 mb-1">Cidade</label>
                        <input
                            required
                            maxLength={100}
                            value={form.cidade}
                            onChange={(e) => setForm({ ...form, cidade: e.target.value })}
                            className="w-full bg-[#0b1222] border border-[#1e293b] rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs text-gray-400 mb-1">Bairro</label>
                            <input
                                maxLength={50}
                                value={form.bairro}
                                onChange={(e) => setForm({ ...form, bairro: e.target.value })}
                                className="w-full bg-[#0b1222] border border-[#1e293b] rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-400 mb-1">Endereço</label>
                            <input
                                maxLength={200}
                                value={form.endereco}
                                onChange={(e) => setForm({ ...form, endereco: e.target.value })}
                                className="w-full bg-[#0b1222] border border-[#1e293b] rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs text-gray-400 mb-1">Nome Solicitante</label>
                            <input
                                maxLength={100}
                                value={form.nomeSolicitante ?? ""}
                                onChange={(e) => setForm({ ...form, nomeSolicitante: e.target.value })}
                                className="w-full bg-[#0b1222] border border-[#1e293b] rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-400 mb-1">Telefone</label>
                            <input
                                maxLength={20}
                                value={form.telefoneSolicitante ?? ""}
                                onChange={(e) => setForm({ ...form, telefoneSolicitante: e.target.value })}
                                className="w-full bg-[#0b1222] border border-[#1e293b] rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 border border-[#1e293b] rounded-lg py-2 text-sm text-gray-400 hover:text-gray-200"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={saving}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 rounded-lg py-2 text-sm font-medium text-white disabled:opacity-50"
                        >
                            {saving ? "Salvando..." : "Salvar"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
