import { useEffect, useState } from 'react';
import { IAPredictCards } from '../../components/IAPredict/IAPredictCards';
import { IAPredictChart } from '../../components/IAPredict/IAPredictChart';
import { IAPredictHeader } from '../../components/IAPredict/IAPredictHeader';
import { IAPredictRanking } from '../../components/IAPredict/IAPredictRanking';
import { IAPredictRecomendacoes } from '../../components/IAPredict/IAPredictRecomendacoes';
import { iaPredictService } from '../../services/iaPredictService';
import type { DadosIAPredict } from '../../types/iaPredict';

export function IAPredictPage() {
  const [dados, setDados] = useState<DadosIAPredict | null>(null);
  const [erro, setErro] = useState('');

  const carregar = async () => {
    setErro('');
    setDados(null);
    try {
      setDados(await iaPredictService.obter());
    } catch {
      setErro('Não foi possível carregar as previsões.');
    }
  };

  useEffect(() => {
    void carregar();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">IA Predict</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Previsões inteligentes de risco e recomendações.
        </p>
      </div>

      {erro ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-900/50 dark:bg-red-950/30">
          <p className="text-sm text-red-700 dark:text-red-300">{erro}</p>
          <button
            type="button"
            onClick={() => void carregar()}
            className="mt-3 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Tentar novamente
          </button>
        </div>
      ) : !dados ? (
        <div className="rounded-xl border border-gray-200 bg-white p-10 text-center text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400">
          Carregando previsões...
        </div>
      ) : (
        <>
          <IAPredictHeader status={dados.status} />
          <IAPredictCards previsao={dados.previsao} />
          <div className="grid gap-4 lg:grid-cols-2">
            <IAPredictChart previsao7d={dados.previsao7d} />
            <IAPredictRanking ranking={dados.ranking} />
          </div>
          <IAPredictRecomendacoes recomendacoes={dados.recomendacoes} />
        </>
      )}
    </div>
  );
}
