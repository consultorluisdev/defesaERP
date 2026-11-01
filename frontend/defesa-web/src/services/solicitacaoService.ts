import api from "./api";
import {
    CreateSolicitacaoDto,
    Solicitacao,
    UpdateSolicitacaoDto,
} from '../types/solicitacao';

const BASE_URL = '/Solicitacoes';

export const solicitacaoService = {
    async getAll(): Promise<Solicitacao[]> {
        const response = await api.get<Solicitacao[]>(BASE_URL);
        return response.data;
    },

    async getById(id: number): Promise<Solicitacao> {
        const response = await api.get<Solicitacao>(`${BASE_URL}/${id}`);
        return response.data;
    },

    async create(data: CreateSolicitacaoDto): Promise<Solicitacao> {
        const response = await api.post<Solicitacao>(BASE_URL, data);
        return response.data;
    },

    async update(
        id: number,
        data: UpdateSolicitacaoDto
    ): Promise<Solicitacao> {
        const response = await api.put<Solicitacao>(
            `${BASE_URL}/${id}`,
            data
        );

        return response.data;
    },

    async delete(id: number): Promise<void> {
        await api.delete(`${BASE_URL}/${id}`);
    },

};