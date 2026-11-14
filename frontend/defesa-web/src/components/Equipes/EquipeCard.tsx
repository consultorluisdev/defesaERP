import React from 'react';
import { Equipe } from '../../types/equipe';
import { Users, MapPin, Phone, Mail} from 'lucide-react';

interface EquipeCardProps {
  equipe: Equipe;
  onClick: (id: number) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Disponivel': return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800';
    case 'EmAtendimento': return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800';
    case 'EmDeslocamento': return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800';
    case 'EmApoio': return 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800';
    case 'Indisponivel': return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700';
    default: return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Disponivel': return "✅";
    case 'EmAtendimento': return "🔄";
    case 'EmDeslocamento': return "🚗";
    case 'EmApoio': return "🤝";
    case 'Indisponivel': return "⛔";
    default: return "❓";
  }
};

export const EquipeCard: React.FC<EquipeCardProps> = ({ equipe, onClick }) => {
  return (
    <div className='bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-200 cursor-pointer border border-gray-100 hover:border-blue-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-blue-600 overflow-hidden'
    onClick={() => onClick(equipe.id)}
    >
      <div className='p-5'>
        <div className='flex justify-between items-start
         mb-3'>
          <h3 className='text-lg font-semibold text-gray-900 dark:text-white truncate'>
            {equipe.nome}
          </h3>
          <p className='text-sm text-gray-500 dark:text-gray-400 truncate'>{equipe.tipo}</p>
        </div>
        <div className={`ml-2 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(equipe.status)}`}>
          <span className='mr-1'>{getStatusIcon(equipe.status)}</span>
          {equipe.status}
        </div>
      </div>

      <p className='text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3'>
        {equipe.descricao || 'Sem descrição'}
      </p>

      <div className='space-y-1.5 text-sm text-gray-600 dark:text-gray-300'>
        <div className='flex items-center gap-2'>
          <Users size={16} className='text-gray-400 dark:text-gray-500 flex-shrink: 0' />
            <span>{equipe.quantidadeMembros} membros</span>
        </div>

        <div className='flex items-center gap-2'>
          <MapPin size={16} className='text-gray-400 dark:text-gray-500 flex-shrink: 0' />

          <span>{equipe.municipio || 'Município não informado'}</span>
        </div>
        <div className='flex items-center gap-2'>
          <Phone size={16} className='text-gray-400 dark:text-gray-500 flex-shrink: 0' />
          <span>{equipe.telefone}</span>
        </div>
        {equipe.email &&(
          <div className='flex items-center gap-2'>
            <Mail size={16} className='text-gray-400 dark:text-gray-500 flex-shrink-0' />
            <span className='truncate'>{equipe.email}</span>
          </div>
        )}
      </div>

      <div className='mt-3 pt-3 border-t border-gray-100 dark:border-gray-700'>
        <p className='text-xs text-gray-400 dark:text-gray-500'>
          Reponsavel: <span className='font-medium text-gray-600 dark:text-gray-300'>
            {equipe.responsavel}
          </span>
        </p>
      </div>
    </div>
  );
};
