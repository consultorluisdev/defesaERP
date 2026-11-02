const legendItems = [
    { label: "Alerta", className: "bg-red-500" },
    { label: "Ocorrência", className: "bg-orange-500" },
    { label: "Risco", className: "bg-yellow-500" },
    { label: "Monitoramento", className: "bg-blue-500" },
    { label: "Outro", className: "bg-gray-500" },
];

export default function RadarLegend() {
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
                Legenda
            </h3>

            <div className="flex flex-wrap gap-4">
                {legendItems.map((item) => (
                    <div
                        key={item.label}
                        className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300"
                    >
                        <span
                            className={`h-3 w-3 rounded-full ${item.className}`}
                        />

                        {item.label}
                    </div>
                ))}
            </div>
        </div>
    );
}