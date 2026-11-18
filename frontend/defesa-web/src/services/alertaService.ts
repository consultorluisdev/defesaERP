import { api, ensureApiList } from "./api";
import {
  Alerta,
  CreateAlertaDto,
  UpdateAlertaDto,
  NivelAlerta,
} from "../types/alerta";


const BASE_URL = "/alertas";

export const alertaService = {
  async listar(): Promise<Alerta[]> {
    const { data } = await api.get<unknown>(BASE_URL);
    return ensureApiList<Alerta>(data, "alertas");
  },

  async buscarPorId(id: number): Promise<Alerta> {
    const { data } = await api.get<Alerta>(`${BASE_URL}/${id}`);
    return data;
  },

  async criar(dto: CreateAlertaDto): Promise<Alerta> {
    const { data } = await api.post<Alerta>(BASE_URL, dto);
    return data;
  },

  async update(id: number, dto: UpdateAlertaDto): Promise<Alerta> {
    const { data } = await api.put<Alerta>(`${BASE_URL}/${id}`, dto);
    return data;
  },

  async excluir(id: number): Promise<void> {
    await api.delete(`${BASE_URL}/${id}`);
  },

  async listaAtivos(): Promise<Alerta[]> {
    const { data } = await api.get<unknown>(`${BASE_URL}/ativos`);
    return ensureApiList<Alerta>(data, "alertas ativos");
  },

  async listaPorCidade(cidade: string): Promise<Alerta[]> {
    const { data } = await api.get<unknown>(`${BASE_URL}/cidade/${cidade}`);
    return ensureApiList<Alerta>(data, "alertas da cidade");
  },

  async listaPorNivel(nivel: NivelAlerta): Promise<Alerta[]> {
    const { data } = await api.get<unknown>(`${BASE_URL}/nivel/${nivel}`);
    return ensureApiList<Alerta>(data, "alertas por nível");
  },

  async listarEncerrados(): Promise<Alerta[]> {
    const { data } = await api.get<unknown>(`${BASE_URL}/encerrados`);
    return ensureApiList<Alerta>(data, "alertas encerrados");
  },
};
