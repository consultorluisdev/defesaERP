import React, { useEffect, useMemo, useState } from 'react';
import { SolicitacaoFilters } from '../components/Solicitacoes/SolicitacaoFilters';
import { SolicitacaoList } from '../components/Solicitacoes/SolicitacaoList';
import { SolicitacaoForm } from '../components/Solicitacoes/SolicitacaoForm';
import { SolicitacaoDetails } from '../components/Solicitacoes/SolicitacaoDetails';
import { solicitacaoService } from '../services/solicitacaoService';
import {
    CreateSolicitacaoDto,
    Solicitacao,
} from '../types/solicitacao';

const SolicitacaoPage: React.FC = () => {
    const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [busca, setBusca] = useState('');
    const [tipo, setTipo] = useState('');
    const [status, setStatus] = useState('');
    const [prioridade, setPrioridade] = useState('');

    const [showForm, setShowForm] = useState(false);
    const [selectedSolicitacao, setSelectedSolicitacao] =
        useState<Solicitacao | null>(null);

    const carregarSolicitacoes = async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await solicitacaoService.getAll();
            setSolicitacoes(data);
        } catch {
            setError('Não foi possível carregar as solicitações.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        carregarSolicitacoes();
    }, []);

    const solicitacoesFiltradas = useMemo(() => {
        const termo = busca.trim().toLowerCase();

        return solicitacoes.filter((solicitacao) => {
            const correspondeBusca =
                !termo ||
                solicitacao.protocolo.toLowerCase().includes(termo) ||
                solicitacao.solicitante.toLowerCase().includes(termo) ||
                solicitacao.endereco.toLowerCase().includes(termo);

            const correspondeTipo =
                !tipo || solicitacao.tipo === tipo;

            const correspondeStatus =
                !status || solicitacao.status === status;

            const correspondePrioridade =
                !prioridade || solicitacao.prioridade === prioridade;

            return (
                correspondeBusca &&
                correspondeTipo &&
                correspondeStatus &&
                correspondePrioridade
            );
        });
    }, [solicitacoes, busca, tipo, status, prioridade]);

    const handleCreate = async (data: CreateSolicitacaoDto) => {
        try {
            setSaving(true);
            setError(null);

            await solicitacaoService.create(data);

            setShowForm(false);
            await carregarSolicitacoes();
        } catch {
            setError('Não foi possível criar a solicitação.');
        } finally {
            setSaving(false);
        }
    };

    const handleSelect = (id: number) => {
        setSelectedSolicitacao(
            solicitacoes.find((solicitacao) => solicitacao.id === id) ?? null
        );
    };

    const handleLimparFiltros = () => {
        setBusca('');
        setTipo('');
        setStatus('');
        setPrioridade('');
    };

    return (
        <div className='min-h-full bg-gray-950 p-4 text-white md:p-6'>
            <div className='mx-auto max-w-7xl'>
                <div className='mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
                    <div>
                        <h1 className='text-xl font-bold text-white'>
                            Solicitações
                        </h1>

                        <p className='mt-1 text-sm text-gray-400'>
                            Gerencie as solicitações recebidas pela Defesa Civil
                        </p>
                    </div>

                    <button
                        type='button'
                        onClick={() => {
                            setError(null);
                            setShowForm(true);
                        }}
                        className='rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500'
                    >
                        + Nova Solicitação
                    </button>
                </div>

                {error && (
                    <div className='mb-6 flex items-center justify-between rounded-lg border border-red-800 bg-red-950 px-4 py-3 text-sm text-red-300'>
                        <span>{error}</span>

                        <button
                            type='button'
                            onClick={carregarSolicitacoes}
                            className='font-medium text-red-200 underline hover:text-white'
                        >
                            Tentar novamente
                        </button>
                    </div>
                )}

                <SolicitacaoFilters
                    busca={busca}
                    tipo={tipo}
                    status={status}
                    prioridade={prioridade}
                    onBuscaChange={setBusca}
                    onTipoChange={setTipo}
                    onStatusChange={setStatus}
                    onPrioridadeChange={setPrioridade}
                    onLimpar={handleLimparFiltros}
                />

                {loading ? (
                    <div className='flex h-64 items-center justify-center'>
                        <div className='h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500' />
                    </div>
                ) : (
                    <>
                        <p className='mb-4 text-sm text-gray-400'>
                            {solicitacoesFiltradas.length}{' '}
                            {solicitacoesFiltradas.length === 1
                                ? 'solicitação encontrada'
                                : 'solicitações encontradas'}
                        </p>

                        <SolicitacaoList
                            solicitacoes={solicitacoesFiltradas}
                            onSelect={handleSelect}
                        />
                    </>
                )}
            </div>

            {showForm && (
                <SolicitacaoForm
                    onSubmit={handleCreate}
                    onCancel={() => setShowForm(false)}
                    loading={saving}
                    error={error}
                />
            )}

            {selectedSolicitacao && (
                <SolicitacaoDetails
                    solicitacao={selectedSolicitacao}
                    onClose={() => setSelectedSolicitacao(null)}
                />
            )}
        </div>
    );
};

export default SolicitacaoPage;
