import React, { useState, useEffect } from "react";
import {
  Alerta,
  CreateAlertaDto,
  UpdateAlertaDto,
  TiposAlerta,
  NiveisAlerta,
  StatusAlertaValues,
} from "../../types/alerta";
import { alertaService } from "../../services/alertaService";

interface AlertaFormProps {
  alerta?: Alerta | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export const AlertaForm: React.FC<AlertaFormProps> = ({
  alerta,
  onSuccess,
  onCancel,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<CreateAlertaDto | UpdateAlertaDto>({
    titulo: "",
    descricao: "",
    tipo: "",
    nivel: "",
    cidade: "",
    latitude: null,
    longitude: null,
    dataInicio: new Date().toISOString().slice(0, 16),
    responsavel: "",
    observacoes: "",
    ...(alerta ? { status: alerta.status, dataFim: alerta.dataFim || "" } : {}),
  });

  useEffect(() => {
    if (alerta) {
      setFormData({
        titulo: alerta.titulo,
        descricao: alerta.descricao,
        tipo: alerta.tipo,
        nivel: alerta.nivel,
        status: alerta.status,
        cidade: alerta.cidade,
        latitude: alerta.latitude,
        longitude: alerta.longitude,
        dataInicio: new Date(alerta.dataInicio).toISOString().slice(0, 16),
        dataFim: alerta.dataFim
          ? new Date(alerta.dataFim).toISOString().slice(0, 16)
          : "",
        responsavel: alerta.responsavel || "",
        observacoes: alerta.observacoes || "",
      });
    }
  }, [alerta]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (alerta) {
        await alertaService.update(alerta.id, formData as UpdateAlertaDto);
      } else {
        await alertaService.criar(formData as CreateAlertaDto);
      }
      onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao salvar alerta");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Título *
          </label>
          <input
            type="text"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            required
            className="w-full rounded-md bg-[#0b1220] border-[#1e293b] text-white focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Descrição *
          </label>
          <textarea
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            required
            rows={3}
            className="w-full rounded-md bg-[#0b1220] border-[#1e293b] text-white focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Tipo *
            </label>
            <select
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              required
              className="w-full rounded-md bg-[#0b1220] border-[#1e293b] text-white focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Selecione...</option>
              {TiposAlerta.map((tipo) => (
                <option key={tipo} value={tipo}>
                  {tipo}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Nível *
            </label>
            <select
              name="nivel"
              value={formData.nivel}
              onChange={handleChange}
              required
              className="w-full rounded-md bg-[#0b1220] border-[#1e293b] text-white focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Selecione...</option>
              {NiveisAlerta.map((nivel) => (
                <option key={nivel} value={nivel}>
                  {nivel}
                </option>
              ))}
            </select>
          </div>

          {alerta && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Status *
              </label>
              <select
                name="status"
                value={(formData as UpdateAlertaDto).status}
                onChange={handleChange}
                required
                className="w-full rounded-md bg-[#0b1220] border-[#1e293b] text-white focus:border-blue-500 focus:ring-blue-500"
              >
                {StatusAlertaValues.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Cidade *
            </label>
            <input
              type="text"
              name="cidade"
              value={formData.cidade}
              onChange={handleChange}
              required
              className="w-full rounded-md bg-[#0b1220] border-[#1e293b] text-white focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Data Início
            </label>
            <input
              type="datetime-local"
              name="dataInicio"
              value={formData.dataInicio}
              onChange={handleChange}
              className="w-full rounded-md bg-[#0b1220] border-[#1e293b] text-white focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {alerta && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Data Fim
              </label>
              <input
                type="datetime-local"
                name="dataFim"
                value={(formData as UpdateAlertaDto).dataFim || ""}
                onChange={handleChange}
                className="w-full rounded-md bg-[#0b1220] border-[#1e293b] text-white focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Latitude
            </label>
            <input
              type="number"
              step="any"
              name="latitude"
              value={formData.latitude || ""}
              onChange={handleChange}
              className="w-full rounded-md bg-[#0b1220] border-[#1e293b] text-white focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Longitude
            </label>
            <input
              type="number"
              step="any"
              name="longitude"
              value={formData.longitude || ""}
              onChange={handleChange}
              className="w-full rounded-md bg-[#0b1220] border-[#1e293b] text-white focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Responsável
            </label>
            <input
              type="text"
              name="responsavel"
              value={formData.responsavel || ""}
              onChange={handleChange}
              className="w-full rounded-md bg-[#0b1220] border-[#1e293b] text-white focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Observações
            </label>
            <textarea
              name="observacoes"
              value={formData.observacoes || ""}
              onChange={handleChange}
              rows={2}
              className="w-full rounded-md bg-[#0b1220] border-[#1e293b] text-white focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-6 pt-4 border-t border-[#1e293b]">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {loading ? "Salvando..." : "Salvar"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};
