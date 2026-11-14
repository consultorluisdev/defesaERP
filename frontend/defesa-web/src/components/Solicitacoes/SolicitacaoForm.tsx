import React, { useEffect, useState } from "react";
import {
  PrioridadesSolicitacao,
  StatusSolicitacao,
  TiposSolicitacao,
  type Solicitacao,
  type SolicitacaoFormValues,
} from "../../types/solicitacao";

interface SolicitacaoFormProps {
  initialData?: Solicitacao | null;
  isEditing?: boolean;
  onSubmit: (data: SolicitacaoFormValues) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
  error?: string | null;
}

const initialFormData: SolicitacaoFormValues = {
  solicitante: "",
  telefone: "",
  email: "",
  tipo: TiposSolicitacao.INFORMACAO,
  descricao: "",
  endereco: "",
  bairro: "",
  municipio: "",
  prioridade: PrioridadesSolicitacao.MEDIA,
  observacoes: "",
  status: StatusSolicitacao.ABERTA,
  responsavel: "",
};

const toFormValues = (solicitacao?: Solicitacao | null): SolicitacaoFormValues => {
  if (!solicitacao) return { ...initialFormData };

  return {
    solicitante: solicitacao.solicitante,
    telefone: solicitacao.telefone,
    email: solicitacao.email ?? "",
    tipo: solicitacao.tipo,
    descricao: solicitacao.descricao,
    endereco: solicitacao.endereco,
    bairro: solicitacao.bairro ?? "",
    municipio: solicitacao.municipio,
    prioridade: solicitacao.prioridade,
    observacoes: solicitacao.observacoes ?? "",
    status: solicitacao.status,
    responsavel: solicitacao.responsavel ?? "",
  };
};

const inputClassName =
  "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white";

export const SolicitacaoForm: React.FC<SolicitacaoFormProps> = ({
  initialData = null,
  isEditing = false,
  onSubmit,
  onCancel,
  loading = false,
  error = null,
}) => {
  const [formData, setFormData] = useState<SolicitacaoFormValues>(() =>
    toFormValues(initialData),
  );

  useEffect(() => {
    setFormData(toFormValues(initialData));
  }, [initialData]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload: SolicitacaoFormValues = {
      ...formData,
      email: formData.email?.trim() || undefined,
      bairro: formData.bairro?.trim() || undefined,
      observacoes: formData.observacoes?.trim() || undefined,
      responsavel: formData.responsavel?.trim() || undefined,
      status: isEditing ? formData.status : undefined,
    };

    await onSubmit(payload);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800"
    >
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
        {isEditing ? "Editar Solicitação" : "Nova Solicitação"}
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="solicitante" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Solicitante
          </label>
          <input
            id="solicitante"
            name="solicitante"
            value={formData.solicitante}
            onChange={handleChange}
            className={inputClassName}
            required
          />
        </div>

        <div>
          <label htmlFor="telefone" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Telefone
          </label>
          <input
            id="telefone"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            className={inputClassName}
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email ?? ""}
            onChange={handleChange}
            className={inputClassName}
          />
        </div>

        <div>
          <label htmlFor="municipio" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Município
          </label>
          <input
            id="municipio"
            name="municipio"
            value={formData.municipio}
            onChange={handleChange}
            className={inputClassName}
            required
          />
        </div>

        <div>
          <label htmlFor="tipo" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Tipo
          </label>
          <select
            id="tipo"
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            className={inputClassName}
            required
          >
            <option value="">Selecione um tipo</option>
            {Object.entries(TiposSolicitacao).map(([label, value]) => (
              <option key={value} value={value}>
                {label.replace(/_/g, " ")}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="prioridade" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Prioridade
          </label>
          <select
            id="prioridade"
            name="prioridade"
            value={formData.prioridade}
            onChange={handleChange}
            className={inputClassName}
            required
          >
            {Object.entries(PrioridadesSolicitacao).map(([label, value]) => (
              <option key={value} value={value}>
                {label.replace(/_/g, " ")}
              </option>
            ))}
          </select>
        </div>

        {isEditing && (
          <div>
            <label htmlFor="status" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status ?? StatusSolicitacao.ABERTA}
              onChange={handleChange}
              className={inputClassName}
            >
              {Object.entries(StatusSolicitacao).map(([label, value]) => (
                <option key={value} value={value}>
                  {label.replace(/_/g, " ")}
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label htmlFor="endereco" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Endereço
          </label>
          <input
            id="endereco"
            name="endereco"
            value={formData.endereco}
            onChange={handleChange}
            className={inputClassName}
            required
          />
        </div>

        <div>
          <label htmlFor="bairro" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Bairro
          </label>
          <input
            id="bairro"
            name="bairro"
            value={formData.bairro ?? ""}
            onChange={handleChange}
            className={inputClassName}
          />
        </div>

        {isEditing && (
          <div>
            <label htmlFor="responsavel" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Responsável
            </label>
            <input
              id="responsavel"
              name="responsavel"
              value={formData.responsavel ?? ""}
              onChange={handleChange}
              className={inputClassName}
            />
          </div>
        )}
      </div>

      <div>
        <label htmlFor="descricao" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Descrição
        </label>
        <textarea
          id="descricao"
          name="descricao"
          value={formData.descricao}
          onChange={handleChange}
          className={inputClassName}
          rows={4}
          required
        />
      </div>

      <div>
        <label htmlFor="observacoes" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Observações
        </label>
        <textarea
          id="observacoes"
          name="observacoes"
          value={formData.observacoes ?? ""}
          onChange={handleChange}
          className={inputClassName}
          rows={3}
        />
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Salvando..."
            : isEditing
              ? "Salvar alterações"
              : "Salvar solicitação"}
        </button>
      </div>
    </form>
  );
};
