import { FaMapMarkerAlt } from "react-icons/fa";
import type { Risco } from "../../types/risco";

interface RiscoMapProps {
    riscos: Risco[];
    onSelect?: (risco: Risco) => void;
}

const positions = [
    { left: "25%", top: "30%" },
    { left: "58%", top: "42%" },
    { left: "72%", top: "68%" },
    { left: "38%", top: "72%" },
];

const colors: Record<string, string> = {
    Baixo: "bg-green-500",
    Medio: "bg-yellow-500",
    Alto: "bg-orange-500",
    MuitoAlto: "bg-red-600",
};

export default function RiscoMap({ riscos, onSelect }: RiscoMapProps) {
    return (
        <div className="relative min-h-[320px] overflow-hidden rounded-xl border border-gray-200 bg-gray-100 dark:border-gray-700 dark:bg-gray-900">
            <div
                className="absolute inset-0 opacity-40"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(100,116,139,.18) 1px, transparent 1px), linear-gradient(90deg, rgba(100,116,139,.18) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            />

            {riscos.map((risco, index) => (
                <button
                    key={risco.id}
                    type="button"
                    onClick={() => onSelect?.(risco)}
                    title={risco.nome}
                    className={`absolute flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white text-white shadow-lg transition hover:scale-110 dark:border-gray-900 ${colors[risco.nivel] ?? "bg-gray-500"}`}
                    style={positions[index % positions.length]}
                >
                    <FaMapMarkerAlt size={13} />
                </button>
            ))}

            {riscos.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
                    <div>
                        <FaMapMarkerAlt className="mx-auto mb-3 text-2xl text-gray-400" />
                        <p className="font-semibold text-gray-700 dark:text-gray-200">
                            Nenhuma área de risco para exibir
                        </p>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            A visualização geográfica será preenchida com os registros disponíveis.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}