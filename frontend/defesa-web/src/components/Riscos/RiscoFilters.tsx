import {
    TiposRisco,
    NiveisRisco,
    StatusRiscoOptions,
    type RiscoFilters as RiscoFiltersType,
} from '../../types/risco';

interface RiscoFiltersProps {
    filters: RiscoFiltersType;
    onChange: (filters: RiscoFiltersType) => void;
    onClear: () => void;
}

export default function RiscoFilters({
    filters,
    onChange,
    onClear,
}: RiscoFiltersProps){
    return(
        <>
        <div className='rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800'>
            <div>
                <label htmlFor="risco-busca" className='mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300'>
                    Buscar
                </label>
                <input id='risco-busca'
                value={filters.busca}
                onChange={(e) => onChange({ ...filters, busca: e.target.value })} 
                placeholder='Nome ou endereço...'
                className='w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white'                
                />
            </div>
            <div>
                <label htmlFor="risco-tipo" className='mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300'>
                    Tipo
                </label>

                <select
                id="risco-tipo"
                value={filters.tipo}
                onChange={(e) => onChange({ ...filters, tipo: e.target.value as RiscoFiltersType["tipo"]})}
                className='w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
                >
                    <option value="">Todos</option>
                    {TiposRisco.map((tipo) => <option key={tipo} value={tipo}>{tipo}</option>)}
                </select>
            </div>

            <div>
                <label htmlFor="risco-nivel" className='mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300'>
                    Nível
                </label>
                <select id="risco-nivel"
                value={filters.nivel}
                onChange={(e) => onChange({ ...filters, nivel: e.target.value as RiscoFiltersType["nivel"] })}

                    className='w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
                    
                >
                    <option value="">Todos</option>
                    {NiveisRisco.map((nivel) => <option key={nivel} value={nivel}>{nivel}</option>)}
                </select>
            </div>

            <div>
                <label htmlFor="risco-status" className='mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300'>
                    Status
                </label>
            
                <select id="risco-status"
                value={filters.status}
                onChange={(e) => onChange({ ...filters, status: e.target.value as RiscoFiltersType["status"] })}

                    className='w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
                    
                >
                    <option value="">Todos</option>
                    {StatusRiscoOptions.map((status) => <option key={status} value={status}>{status}</option>)}
                </select>
            </div>
            
            <div>
                <label htmlFor="risco-municipio" className='mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300'>
                    Município
                </label>
            
                <input 
                id="risco-municipio"
                value={filters.municipio}
                onChange={(e) => onChange({ ...filters, municipio: e.target.value })}
                placeholder="Município..."
                    className='w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
                />
            </div>
        </div>
        <div className='mt-4 flex justify-end'>
            <button
            type='button'
            onClick={onClear}
            className='rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
            >
                Limpar filtros

            </button>

        </div>
        </>
    )
}

export { RiscoFilters };