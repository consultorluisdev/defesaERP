import React from "react";
import { Alerta } from "../../types/alerta";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface AlertaDetailsProps {
  alerta: Alerta;
  onClose: () => void;
  onEdit: () => void;
  onDelet: (id: number) => void;
}

const getNivelColor = (nivel: string) => {
  switch (nivel) {
    case 'Baixo': return 'bg-green-100 text-green-800';
    case 'Moderado': return 'bg-yellow-100 text-yellow-800';
    case 'Alto': return 'bg-orange-100 text-orange-800';
    case 'Critico': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};
