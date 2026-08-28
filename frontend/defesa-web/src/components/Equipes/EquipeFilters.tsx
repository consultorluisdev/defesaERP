import React, { useState } from 'react';
import { StatusEquipe, TiposEquipe } from '../../types/equipe';
import { Search } from 'lucide-react';


interface EquipeFiltersProps {
  onFilter: (filters: any) => void;
  onClear: () => void;
}

export const EquipeFilters: React.FC<EquipeFiltersProps> = ({ onFilters, onClear }) => {
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    tipo: ''
  });

  const [hasFilters, setFilters] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FocusEvent) => {
    e.preventDefault();
    const hasActiveFilters = Object.values(filters).some(v => v !== '');
    setHasFilters(hasActiveFilters);
    onFilters(filters)
  };

  const handleClear = () => {
    setFilters({
      search: '',
      status: '',
      tipo: ''
    });
    setHasFilters(false);
    onClear();
  };

  return (
    <form onSubmit={handleSubmit} className='bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200'>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        <div className='md:col-span-2'>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          <Search size={16} className='inline mr-1' />
            Buscar
        </label>
        <input
        type="text"
        name='search'
        value={filters.search}
        onChange={handleChange}
        placeholder='Nome, responsável ou municipio...'
        className='w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
        />
        </div>
      </div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Status
      </label>
      <select name="status"
      value={filters.status}
      onChange={handleChange}
      className='w-full rounded-md border-gray-300 shadow-sm focus:'></select>
    </form>
  )
}
