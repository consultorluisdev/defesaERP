import api, { ensureApiList } from './api';
import { Equipe, CreateEquipeDto, UpdateEquipeDto } from '../types/equipe';

export const equipeService = {
  getAll: async (search?: string): Promise<Equipe[]> => {
    const params = search ?  `?search=${encodeURIComponent(search)}` : '';
    const response = await api.get<unknown>(`/Equipes${params}`);
    return ensureApiList<Equipe>(response.data, "equipes");
  },

  getById: async (id: number): Promise<Equipe> => {
    const response = await api.get(`/Equipes/${id}`);
    return response.data;
  },

  create: async(data: CreateEquipeDto): Promise<Equipe> => {
    const response = await api.post('/Equipes', data);
    return response.data;
  },

  update: async(id: number, data: UpdateEquipeDto): Promise<Equipe> => {
    const response = await api.put(`/Equipes/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/Equipes/${id}`);
  },

  getByStatus: async (status: string): Promise<Equipe[]> => {
    const response = await api.get<unknown>(`/Equipes/status/${status}`);
    return ensureApiList<Equipe>(response.data, "equipes por status");
  },
  getByTipo: async (tipo: string): Promise<Equipe[]> => {
    const response = await api.get<unknown>(`/Equipes/tipo/${tipo}`);
    return ensureApiList<Equipe>(response.data, "equipes por tipo");
  }

};
