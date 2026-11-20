import { useEffect, useState } from 'react';
import { AnaliseCards } from '../../components/Analises/AnaliseCards';
import { AnaliseCharts } from '../../components/Analises/AnaliseCharts';
import { AnaliseHeader } from '../../components/Analises/AnaliseHeader';
import { analiseService } from '../../services/analiseService';
import type { AnalisePeriodo, DadosAnalise } from '../../types/analise';

export function AnalisesPage() {
  const [periodo, setPeriodo] = useState<AnalisePeriodo>('30d');
  const [dados, setDados] = useState<DadosAnalise | null>(null);

  useEffect(() => {
    let ativo = true;
    void analiseService.obter(periodo).then((d) => {
      if (ativo) setDados(d);
    });
    return () => {
      ativo = false;
    };
  }, [periodo]);

  return (
    <div className="space-y-6">
      <AnaliseHeader periodo={periodo} onChange={setPeriodo} />
      {!dados ? (
        <div className="rounded-xl border border-gray-200 bg-white p-10 text-center text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400">
          Carregando análises...
        </div>
      ) : (
        <>
          <AnaliseCards indicadores={dados.indicadores} />
          <AnaliseCharts
            porTipo={dados.porTipo}
            porCidade={dados.porCidade}
            tendencia={dados.tendencia}
          />
        </>
      )}
    </div>
  );
}
