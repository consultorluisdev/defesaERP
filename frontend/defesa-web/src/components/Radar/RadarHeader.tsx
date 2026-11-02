import { FaBroadcastTower, FaSyncAlt } from 'react-icons/fa';

interface RadarHeaderProps {
    onRefresh?: () => void;
    loading?: boolean;
}

export default function RadarHeader({
    onRefresh,
    loading = false,
}: RadarHeaderProps) {
    return (
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                        <FaBroadcastTower />
                    </div>

                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Radar
                        </h1>

                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Monitoramento geográfico de eventos e ocorrências em tempo real, permitindo uma visão abrangente das situações críticas e facilitando a tomada de decisões estratégicas.
                        </p>
                    </div>
                </div>
            </div>

            <button
                type="button"
                onClick={onRefresh}
                disabled={loading}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            >
                <FaSyncAlt className={loading ? "animate-spin" : ""} />
                Atualizar
            </button>
        </div>
    );
}