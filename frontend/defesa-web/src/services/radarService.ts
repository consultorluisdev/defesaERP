import type { RadarEvent } from '../types/radar';

export const radarService = {
    async getEvents(): Promise<RadarEvent[]> {
        return [];
    },

    async getEventById(id: number): Promise<RadarEvent | null> {
        const events = await this.getEvents();
        return events.find((event) => event.id === id) || null;
    }
}