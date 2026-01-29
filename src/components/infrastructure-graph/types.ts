export type Category = 'TRANSPORT' | 'WATER' | 'ENERGY' | 'DIGITAL' | 'CIVIC';

export interface InfrastructureNode {
    id: string;
    name: string;
    category: Category;
    parentId: string | null; // The ID of the predecessor tech
    startYear: number;       // e.g., -312 (312 BC)
    endYear: number;         // e.g., 2025
    peakYear?: number;       // When adoption was highest
    description: string;
    magnitude: number;       // 1-10 scale for line thickness relative to others
    image?: string;          // Optional image URL for the detail overlay
}
