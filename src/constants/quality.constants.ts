/**
 * Rendering quality presets.
 *
 * Every geometry segment count and shadow‑map size in the 3D scene
 * is driven from these values so we can drop quality for low‑end
 * devices without touching individual components.
 */

export type QualityTier = "low" | "medium" | "high";

export interface QualityPreset {
    /** Profile‑curve sample count for the disk LatheGeometry. */
    diskProfileSamples: number;
    /** Radial segment count for the disk LatheGeometry. */
    diskRadialSegments: number;
    /** Radial segment count for tower CylinderGeometry. */
    towerRadialSegments: number;
    /** Width × Height segment counts for the tower‑cap SphereGeometry. */
    towerCapSegments: [number, number];
    /** Shadow map resolution (square, px). */
    shadowMapSize: number;
}

export const QUALITY_PRESETS: Record<QualityTier, QualityPreset> = {
    low: {
        diskProfileSamples: 12,
        diskRadialSegments: 16,
        towerRadialSegments: 12,
        towerCapSegments: [16, 8],
        shadowMapSize: 1024,
    },
    medium: {
        diskProfileSamples: 24,
        diskRadialSegments: 32,
        towerRadialSegments: 24,
        towerCapSegments: [24, 12],
        shadowMapSize: 2048,
    },
    high: {
        diskProfileSamples: 48,
        diskRadialSegments: 48,
        towerRadialSegments: 32,
        towerCapSegments: [32, 16],
        shadowMapSize: 2048,
    },
};

/**
 * The active preset.  Change this single value to switch the entire
 * scene's geometry budget.  In a future iteration this could be driven
 * by `useDetectGPU()` or a user‑facing settings menu.
 */
export const QUALITY: QualityPreset = QUALITY_PRESETS.medium;
