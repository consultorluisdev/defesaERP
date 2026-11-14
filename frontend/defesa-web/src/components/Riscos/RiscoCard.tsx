import {
    FaMapMarkerAlt,
    FaUsers,
} from "react-icons/fa";
import type { Risco } from "@/types/risco";

interface RiscoCardProps {
    risco: Risco;
    onClick: () => void;
}

const nivelClasses: Record<string, string> = {
    Baixo: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    Medio: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    Alto: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    MuitoAlto: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
}

export default function RiscoCard({ risco, onClick }: RiscoCardProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="w-full rounded-xl border border-gray-200 bg-white p-5 text-left shadow-sm transition hover:border-blue-400 hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
        >
            <div>
                <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                        {risco.nome}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {risco.tipo}
                    </p>
                </div>
            

            <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${nivelClasses[risco.nivel] ?? nivelClasses.Baixo
                    }`}
            >
                {risco.nivel}
            </span>
            </div>

            <p className="mt-3 line-clamp-2 text-sm text-gray-600 dark:text-gray-300">
                {risco.descricao}
            </p>

            <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-2">
                    <FaMapMarkerAlt />
                    {risco.municipio} - {risco.bairro}
                </span>

                <span className="flex items-center gap-2">
                    <FaUsers />
                    {risco.status}
                </span>
            </div>
        </button>
    )
}