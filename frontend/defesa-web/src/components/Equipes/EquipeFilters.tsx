import React, { useState } from "react";
import { Search } from "lucide-react";
import { StatusEquipe, TiposEquipe } from "@/types/equipe";

interface EquipeFilterValues {
  search: string;
  status: string;
  tipo: string;
}

interface EquipeFiltersProps {
  onFilter: (filters: EquipeFilterValues) => void;
  onClear: () => void;
}

const emptyFilters: EquipeFilterValues = {
  search: "",
  status: "",
  tipo: "",
};

export const EquipeFilters: React.FC<EquipeFiltersProps> = ({
  onFilter,
  onClear,
}) => {
  const [filters, setFilters] = useState<EquipeFilterValues>(emptyFilters);
  const hasFilters = Object.values(filters).some((value) => value !== "");

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    setFilters((currentFilters) => ({
      ...currentFilters,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onFilter(filters);
  };

  const handleClear = () => {
    setFilters(emptyFilters);
    onClear();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="md:col-span-2">
          <label
            htmlFor="equipe-search"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            <Search size={16} className="mr-1 inline" />
            Buscar
          </label>
          <input
            id="equipe-search"
            type="text"
            name="search"
            value={filters.search}
            onChange={handleChange}
            placeholder="Nome, responsável ou município..."
            className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="equipe-status"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Status
          </label>
          <select
            id="equipe-status"
            name="status"
            value={filters.status}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">Todos</option>
            {Object.entries(StatusEquipe).map(([key, value]) => (
              <option key={key} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="equipe-tipo"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Tipo
          </label>
          <select
            id="equipe-tipo"
            name="tipo"
            value={filters.tipo}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">Todos</option>
            {Object.entries(TiposEquipe).map(([key, value]) => (
              <option key={key} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Filtrar
        </button>
        {hasFilters && (
          <button
            type="button"
            onClick={handleClear}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            Limpar
          </button>
        )}
      </div>
    </form>
  );
};
