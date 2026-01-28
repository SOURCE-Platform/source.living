export type RGB = { r: number; g: number; b: number };

// Gameboy-style green palette (2-color reduction)
const PALETTE_GAMEBOY: RGB[] = [
    { r: 15, g: 56, b: 15 },    // Darkest
    // { r: 109, g: 138, b: 87 },  // Midtone (Removed)
    { r: 202, g: 220, b: 159 }, // Lightest
];


/**
 * Finds the closest color in the palette to the input color.
 */
function findClosestColor(color: RGB, palette: RGB[]): RGB {
    let minDistance = Infinity;
    let closest = palette[0];

    for (const p of palette) {
        const distance = Math.sqrt(
            Math.pow(color.r - p.r, 2) +
            Math.pow(color.g - p.g, 2) +
            Math.pow(color.b - p.b, 2)
        );
        if (distance < minDistance) {
            minDistance = distance;
            closest = p;
        }
    }
    return closest;
}

/**
 * Applies Floyd-Steinberg dithering to ImageData.
 * Modifies the imageData in place.
 */
export function floydSteinbergDither(imageData: ImageData, palette: RGB[] = PALETTE_GAMEBOY) {
    const width = imageData.width;
    const height = imageData.height;
    const data = imageData.data;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const i = (y * width + x) * 4;

            const oldR = data[i];
            const oldG = data[i + 1];
            const oldB = data[i + 2];

            const closest = findClosestColor({ r: oldR, g: oldG, b: oldB }, palette);

            data[i] = closest.r;
            data[i + 1] = closest.g;
            data[i + 2] = closest.b;
            // Alpha remains unchanged (usually 255)

            const errR = oldR - closest.r;
            const errG = oldG - closest.g;
            const errB = oldB - closest.b;

            // Distribute error to neighbors
            // Right
            if (x + 1 < width) {
                const ni = (y * width + (x + 1)) * 4;
                data[ni] = clamp(data[ni] + errR * 7 / 16);
                data[ni + 1] = clamp(data[ni + 1] + errG * 7 / 16);
                data[ni + 2] = clamp(data[ni + 2] + errB * 7 / 16);
            }

            // Bottom Left
            if (x - 1 >= 0 && y + 1 < height) {
                const ni = ((y + 1) * width + (x - 1)) * 4;
                data[ni] = clamp(data[ni] + errR * 3 / 16);
                data[ni + 1] = clamp(data[ni + 1] + errG * 3 / 16);
                data[ni + 2] = clamp(data[ni + 2] + errB * 3 / 16);
            }

            // Bottom
            if (y + 1 < height) {
                const ni = ((y + 1) * width + x) * 4;
                data[ni] = clamp(data[ni] + errR * 5 / 16);
                data[ni + 1] = clamp(data[ni + 1] + errG * 5 / 16);
                data[ni + 2] = clamp(data[ni + 2] + errB * 5 / 16);
            }

            // Bottom Right
            if (x + 1 < width && y + 1 < height) {
                const ni = ((y + 1) * width + (x + 1)) * 4;
                data[ni] = clamp(data[ni] + errR * 1 / 16);
                data[ni + 1] = clamp(data[ni + 1] + errG * 1 / 16);
                data[ni + 2] = clamp(data[ni + 2] + errB * 1 / 16);
            }
        }
    }
}

function clamp(value: number): number {
    return Math.max(0, Math.min(255, value));
}
