import api, { ensureApiList } from "./api";
import {
  Ocorrencia,
  CriarOcorrenciaDto,
  AtualizarOcorrenciaDto,
} from "../types/ocorrencia";

export const ocorrenciaService = {
  async lista(): Promise<Ocorrencia[]> {
    const { data } = await api.get<unknown>("/Ocorrencias");
    return ensureApiList<Ocorrencia>(data, "ocorrências");
  },

  async buscarPorId(id: number): Promise<Ocorrencia | null> {
    try {
      const { data } = await api.get<Ocorrencia>(`/Ocorrencias/${id}`);
      return data;
    } catch {
      return null;
    }
  },

  async criar(dto: CriarOcorrenciaDto): Promise<Ocorrencia> {
    const { data } = await api.post<Ocorrencia>("/Ocorrencias", dto);
    return data;
  },

  async atualizar(id: number, dto: AtualizarOcorrenciaDto): Promise<Ocorrencia> {
    const { data } = await api.put<Ocorrencia>(`/Ocorrencias/${id}`, dto);
    return data;
  },

  async deletar(id: number): Promise<void> {
    await api.delete(`/Ocorrencias/${id}`);
  },

  async buscarPorStatus(status: string): Promise<Ocorrencia[]> {
    const { data } = await api.get<unknown>(`/Ocorrencias/status/${status}`);
    return ensureApiList<Ocorrencia>(data, "ocorrências");
  },

  async buscarPorPrioridade(prioridade: string): Promise<Ocorrencia[]> {
    const { data } = await api.get<unknown>(`/Ocorrencias/prioridade/${prioridade}`);
    return ensureApiList<Ocorrencia>(data, "ocorrências");
  },

  async buscarAbertas(): Promise<Ocorrencia[]> {
    const { data } = await api.get<unknown>("/Ocorrencias/dashboard/abertas");
    return ensureApiList<Ocorrencia>(data, "ocorrências abertas");
  },
};
