import RadarHeader from "../../components/Radar/RadarHeader";
import { RadarFilters } from "../../components/Radar/RadarFilters";
import { RadarMap } from "../../components/Radar/RadarMap";
import { RadarPanel } from "../../components/Radar/RadarPanel";
import { RadarLegend } from "../../components/Radar/RadarLegend";

export function RadarPage() {
    return (
        <div className="space-y-6">
            <RadarHeader />
            <RadarFilters />
            <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
                <RadarMap />
                <RadarPanel />
            </div>
            <RadarLegend />
        </div>
    );
}
