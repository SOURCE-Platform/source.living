export const MIN_YEAR = -4000;
export const MAX_YEAR = 2050;
export const DEFAULT_ZOOM = 2; // Pixels per year

/**
 * Calculates the X coordinate for a given year.
 */
export function getX(year: number, zoomLevel: number): number {
    return (year - MIN_YEAR) * zoomLevel;
}

/**
 * Inverse of getX, returns year for a given X coordinate.
 */
export function getYear(x: number, zoomLevel: number): number {
    return (x / zoomLevel) + MIN_YEAR;
}

/**
 * Assigns a vertical "lane" index to each item to avoid overlapping.
 * Returns a Map of { itemId: laneIndex }
 */
export function calculateLayout(items: import('./types').InfrastructureNode[]): Map<string, number> {
    // Sort by start year to pack efficiently
    const sorted = [...items].sort((a, b) => a.startYear - b.startYear);

    const lanes: number[] = []; // Stores the end year of the last item in each lane
    const layout = new Map<string, number>();

    sorted.forEach(item => {
        let placed = false;

        // Find the first lane where this item fits
        // We add a buffer of 50 years to ensure visual separation
        const minStart = item.startYear;

        for (let i = 0; i < lanes.length; i++) {
            if (lanes[i] < minStart) {
                layout.set(item.id, i);
                lanes[i] = item.endYear + 50; // Update lane end year + buffer
                placed = true;
                break;
            }
        }

        // If no lane found, create a new one
        if (!placed) {
            layout.set(item.id, lanes.length);
            lanes.push(item.endYear + 50); // Buffer
        }
    });

    return layout;
}
