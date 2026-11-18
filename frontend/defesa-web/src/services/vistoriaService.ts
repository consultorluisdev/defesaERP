import api, { ensureApiList } from './api';
import type {
    Vistoria,
    CreateVistoriaDto,
    UpdateVistoriaDto,
} from '../types/vistoria';

export const vistoriaService = {
    async getAll(): Promise<Vistoria[]> {
        const response = await api.get<unknown>('/Vistorias');
        return ensureApiList<Vistoria>(response.data, "vistorias");
    },

    async getById(id: number): Promise<Vistoria> {
        const response = await api.get<Vistoria>(`/Vistorias/${id}`);
        return response.data;
    },

    async create(data: CreateVistoriaDto): Promise<Vistoria> {
        const response = await api.post<Vistoria>('/Vistorias', data);
        return response.data;
    },

    async update(id: number, data: UpdateVistoriaDto): Promise<Vistoria> {
        const response = await api.put<Vistoria>(`/Vistorias/${id}`, data);
        return response.data;
    },
    async delete(id: number): Promise<void> {
        await api.delete(`/Vistorias/${id}`);
    }
}