import type { DitherType } from "./shaders/ditherShader";
import { DITHER_TYPES } from "./shaders/ditherShader";

export type GradientPreset = {
  complexity: number;
  speed: number;
  noiseType: "value" | "simplex" | "worley";
  colorA: string;
  colorB: string;
  scale: number;
  warp: number;
  contrast: number;
  bias: number;
  rotation: number;
  autoRotate: boolean;
  autoRotateSpeed: number;
  ditherEnabled: boolean;
  ditherScale: number;
  ditherContrast: number;
  ditherBrightness: number;
  ditherType: DitherType;
  ditherErrorDiffusion: number;
  ditherThreshold: number;
  ditherLevels: number;
  renderMode: "advanced" | "simple";
  simpleSpeed: number;
  simpleScale: number;
  simpleDirection: "forward" | "reverse";
  simpleAngle: number;
  simpleAnimateAngle: boolean;
  simpleAngleSpeed: number;
  simpleAngleDirection: "cw" | "ccw";
  simpleType: "hard" | "smooth";
};

export const DEFAULT_PRESET: GradientPreset = {
  complexity: 4,
  speed: 1.0,
  noiseType: "simplex",
  colorA: "#0a0a0a",
  colorB: "#4f46e5",
  scale: 1.0,
  warp: 0.5,
  contrast: 1.0,
  bias: 0.0,
  rotation: 0,
  autoRotate: true,
  autoRotateSpeed: 5.0,
  ditherEnabled: false,
  ditherScale: 1.0,
  ditherContrast: 1.0,
  ditherBrightness: 1.0,
  ditherType: DITHER_TYPES.BAYER_4X4,
  ditherErrorDiffusion: 1.0,
  ditherThreshold: 0.5,
  ditherLevels: 4,
  renderMode: "advanced",
  simpleSpeed: 0.3,
  simpleScale: 1.0,
  simpleDirection: "forward",
  simpleAngle: 55,
  simpleAnimateAngle: false,
  simpleAngleSpeed: 0.2,
  simpleAngleDirection: "cw",
  simpleType: "hard",
};

export const DARK_PRESET: GradientPreset = {
  complexity: 2,
  speed: 0.22,
  noiseType: "simplex",
  colorA: "#16120f",
  colorB: "#73809C",
  scale: 0.29,
  warp: 0.34,
  contrast: 2.33,
  bias: 0.20,
  rotation: -46,
  autoRotate: true,
  autoRotateSpeed: -3.8,
  ditherEnabled: true,
  ditherScale: 0.25,
  ditherContrast: 1.0,
  ditherBrightness: 1.0,
  ditherType: DITHER_TYPES.BLUE_NOISE,
  ditherErrorDiffusion: 1.0,
  ditherThreshold: 0.5,
  ditherLevels: 2,
  renderMode: "advanced",
  simpleSpeed: 0.3,
  simpleScale: 1.0,
  simpleDirection: "forward",
  simpleAngle: 55,
  simpleAnimateAngle: false,
  simpleAngleSpeed: 0.2,
  simpleAngleDirection: "cw",
  simpleType: "hard",
  backgroundSource: "three",
};

export const LIGHT_PRESET: GradientPreset = {
  complexity: 2,
  speed: 0.22,
  noiseType: "simplex",
  colorA: "#FFFFEB",
  colorB: "#E0E1FF",
  scale: 0.29,
  warp: 0.34,
  contrast: 1.11,
  bias: 0.27,
  rotation: -46,
  autoRotate: true,
  autoRotateSpeed: -3.8,
  ditherEnabled: true,
  ditherScale: 0.25,
  ditherContrast: 1.0,
  ditherBrightness: 1.0,
  ditherType: DITHER_TYPES.BLUE_NOISE,
  ditherErrorDiffusion: 1.0,
  ditherThreshold: 0.5,
  ditherLevels: 2,
  renderMode: "advanced",
  simpleSpeed: 0.3,
  simpleScale: 1.0,
  simpleDirection: "forward",
  simpleAngle: 55,
  simpleAnimateAngle: false,
  simpleAngleSpeed: 0.2,
  simpleAngleDirection: "cw",
  simpleType: "hard",
  backgroundSource: "three",
};
