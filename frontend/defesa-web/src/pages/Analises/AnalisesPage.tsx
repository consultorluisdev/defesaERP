import { AnaliseHeader } from "../../components/Analises/AnaliseHeader";
import { AnaliseFilters } from "../../components/Analises/AnaliseFilters";
import { AnaliseCards } from "../../components/Analises/AnaliseCards";
import { AnaliseCharts } from "../../components/Analises/AnaliseCharts";

export function AnalisesPage() {
    return (
        <div className="space-y-6">
            <AnaliseHeader />
            <AnaliseFilters />
            <AnaliseCards />
            <AnaliseCharts />
        </div>
    );
}
