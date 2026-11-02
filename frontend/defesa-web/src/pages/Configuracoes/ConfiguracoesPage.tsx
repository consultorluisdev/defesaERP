import { ConfiguracaoGeral } from "../../components/Configuracoes/ConfiguracaoGeral";
import { ConfiguracaoNotificacoes } from "../../components/Configuracoes/ConfiguracaoNotificacoes";
import { ConfiguracaoSeguranca } from "../../components/Configuracoes/ConfiguracaoSeguranca";
import { ConfiguracaoSistema } from "../../components/Configuracoes/ConfiguracaoSistema";

export function ConfiguracoesPage() {
    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Configurações</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Estrutura inicial do módulo de configurações.
                </p>
            </header>
            <ConfiguracaoGeral />
            <ConfiguracaoNotificacoes />
            <ConfiguracaoSeguranca />
            <ConfiguracaoSistema />
        </div>
    );
}
