import { api } from "./api";
import {
  Alerta,
  CreateAlertaDto,
  NivelAlerta,
} from "../types/alerta";


const BASE_URL = "/api/alertas";

export const alertaService = {
  async listar(): Promise<Alerta[]> {
    const { data } = await api.get<Alerta[]>(BASE_URL);
    return data;
  },

  async buscarPorId(id: number): Promise<Alerta> {
    const { data } = await api.get<Alerta>(`${BASE_URL}/${id}`);
    return data;
  },

  async criar(dto: CreateAlertaDto): Promise<Alerta> {
    const { data } = await api.post<Alerta>(BASE_URL, dto);
    return data;
  },

  async excluir(id: number): Promise<void> {
    await api.delete(`${BASE_URL}/${id}`);
  },

  async listaAtivos(): Promise<Alerta[]> {
    const { data } = await api.get<Alerta[]>(`${BASE_URL}/ativos`);
    return data;
  },

  async listaPorCidade(cidade: string): Promise<Alerta[]> {
    const { data } = await api.get<Alerta[]>(`${BASE_URL}/cidade/${cidade}`);
    return data;
  },

  async listaPorNivel(nivel: NivelAlerta): Promise<Alerta[]> {
    const { data } = await api.get<Alerta[]>(`${BASE_URL}/nivel/${nivel}`);
    return data;
  },

  async listarEncerrados(): Promise<Alerta[]> {
    const { data } = await api.get<Alerta[]>(`${BASE_URL}/encerrados`);
    return data;
  },
};
