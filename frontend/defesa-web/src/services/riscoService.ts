import api from "./api";
import type {
    Risco,
    CreateRiscoDto,
    UpdateRiscoDto,
} from "../types/risco";


export const riscoService = {
    async getAll(): Promise<Risco[]>{
        const response = await api.get<Risco[]>("/Risco");
        return response.data;
    },

    async getById(id: number): Promise<Risco>{
        const response = await api.get<Risco>(`/Risco/${id}`);
        return response.data;

    },

    async create(data: CreateRiscoDto): Promise<Risco>{
        const response = await api.post<Risco>("/Risco", data);
        return response.data;
    },

    async update(id: number, data: UpdateRiscoDto): Promise<Risco>{
        const response = await api.put<Risco>(`/Risco/${id}`, data)
        return response.data;
    },

    async delete(id: number): Promise<void>{
        await api.delete(`/Risco/${id}`);
    },
}
